import { FastifyReply } from "fastify";
import {
  ILoginRequest,
  IUserRequest,
  PasswordUpdateRequest,
} from "../interfaces";
import { prisma, utils } from "../helpers/utils";
import { ERRORS, getError, handleServerError } from "../helpers/errors";
import { ERROR400, STANDARD } from "../helpers/constants";
import { plainToInstance } from "class-transformer";
import { CreateUserDto, UpdateUserDto } from "../dto";
export class AuthController {
  async login(request: ILoginRequest, reply: FastifyReply) {
    try {
      const { email, password } = request.body;
      const user = await prisma.user.findUnique({ where: { email: email } });

      if (!user) {
        reply.code(ERROR400.statusCode).send(getError(ERRORS.userNotExists));
        return;
      }

      const checkPass = await utils.compareHash(user.password, password);

      if (!checkPass) {
        reply.code(ERROR400.statusCode).send(getError(ERRORS.userCredError));
      }

      const token = utils.getJWT({ email: user.email });
      reply.code(STANDARD.SUCCESS).send({
        token,
      });
    } catch (err) {
      handleServerError(reply, err);
    }
  }

  async signUp(request: IUserRequest, reply: FastifyReply) {
    try {
      const userDto = plainToInstance(CreateUserDto, request.body);
      const { username, email, password } = userDto;

      const user = await prisma.user.findUnique({ where: { email: email } });

      if (user) {
        reply.code(409).send(getError(ERRORS.userExists));
        return;
      }
      const hashPass = await utils.genSalt(10, password);

      const createdUser = await prisma.user.create({
        data: {
          email,
          username,
          password: String(hashPass),
        },
      });

      const token = utils.getJWT({ email: createdUser.email });
      return reply.code(STANDARD.SUCCESS).send({
        token,
      });
    } catch (err) {
      handleServerError(reply, err);
    }
  }

  async changePassword(request: PasswordUpdateRequest, reply: FastifyReply) {
    try {
      const userDto = plainToInstance(UpdateUserDto, request["authUser"]);

      const { id } = userDto;
      const { password: newPassword } = request.body;

      const hashPass = await utils.genSalt(10, newPassword);
      const updatedUser = await prisma.user.update({
        where: { id },
        data: {
          password: String(hashPass),
        },
      });

      reply.code(STANDARD.SUCCESS).send({ data: updatedUser });
    } catch (err) {
      if (err.code == "P2025") {
        reply
          .code(ERROR400.statusCode)
          .send({ error: ERRORS.userNotExists.message });
        return;
      }
      handleServerError(reply, err);
    }
  }
}
