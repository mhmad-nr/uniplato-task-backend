import { FastifyReply } from "fastify";
import { prisma } from "../helpers/utils";
import { ERRORS, handleServerError } from "../helpers/errors";
import { ERROR400, STANDARD } from "../helpers/constants";
import {
  IID,
  IParam,
  IUserCreateRequest,
  IUserGetRequest,
  IUserUpdateRequest,
} from "interfaces";
import { plainToInstance } from "class-transformer";
import { CreateUserDto, UpdateUserDto } from "../dto";

export class UserController {
  async getAllUsers(request: IUserGetRequest, reply: FastifyReply) {
    try {
      const limit = parseInt(request.query.limit) || 10; 
      const offset = parseInt(request.query.offset) || 0; 
      const sortBy = request.query.sortBy;
      const sortOrder = request.query.sortOrder; 

      const usersQuery = {
        take: limit,
        skip: offset,
        orderBy: sortBy ? { [sortBy]: sortOrder } : undefined,
      };

      const users = await prisma.user.findMany(usersQuery);
      reply.code(STANDARD.SUCCESS).send({ users });
    } catch (err) {
      handleServerError(reply, err);
    }
  }
  async getUserById(request: IParam<IID>, reply: FastifyReply) {
    try {
      const { id } = request.params;

      const user = await prisma.user.findUnique({
        where: { id: parseInt(id, 10) },
      });

      if (!user) {
        reply
          .code(ERROR400.statusCode)
          .send({ error: ERRORS.userNotExists.message });
        return;
      }

      reply.code(STANDARD.SUCCESS).send({ user });
    } catch (err) {
      handleServerError(reply, err);
    }
  }

  async createUser(request: IUserCreateRequest, reply: FastifyReply) {
    try {
      const userDto = plainToInstance(CreateUserDto, request.body);
      const { username, email, password } = userDto;

      if (!username || !email || !password) {
        reply.code(ERROR400.statusCode).send({ error: ERROR400.message });
        return;
      }

      const newUser = await prisma.user.create({
        data: {
          username,
          email,
          password,
        },
      });

      reply.code(STANDARD.SUCCESS).send({ user: newUser });
    } catch (err) {
      handleServerError(reply, err);
    }
  }

  async updateUser(request: IUserUpdateRequest, reply: FastifyReply) {
    try {
      const { id } = request.params;

      const userDto = plainToInstance(UpdateUserDto, request.body);
      const { username, email } = userDto;

      const updatedUser = await prisma.user.update({
        where: { id: parseInt(id, 10) },
        data: {
          username,
          email,
        },
      });

      reply.code(STANDARD.SUCCESS).send({ user: updatedUser });
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

  async deleteUser(request: IParam<IID>, reply: FastifyReply) {
    try {
      const { id } = request.params;
      const deletedUser = await prisma.user.delete({
        where: { id: parseInt(id, 10) },
      });

      reply.code(STANDARD.SUCCESS).send({ user: deletedUser });
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
