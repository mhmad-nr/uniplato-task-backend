import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../helpers/utils";
import { ERRORS, handleServerError } from "../helpers/errors";
import {  ERROR400, STANDARD } from "../helpers/constants";
import { IID, IParam, IUserRequest } from "interfaces";

export class UserController {
  async getAllUsers(request: FastifyRequest, reply: FastifyReply) {
    try {
      const users = await prisma.users.findMany();
      reply.code(STANDARD.SUCCESS).send({ users });
    } catch (err) {
      handleServerError(reply, err);
    }
  }
  async getUserById(request: IParam<IID>, reply: FastifyReply) {
    try {
      const { id } = request.params;

      const user = await prisma.users.findUnique({
        where: { id: parseInt(id, 10) },
      });

      if (!user) {
        reply.code(ERROR400.statusCode).send({ error: ERRORS.userNotExists.message });
        return;
      }

      reply.code(STANDARD.SUCCESS).send({ user });
    } catch (err) {
      
      handleServerError(reply, err);
    }
  }

  async createUser(request: IUserRequest, reply: FastifyReply) {
    try {
      const { username, email, password } = request.body;

      if (!username || !email || !password) {
        reply.code(ERROR400.statusCode).send({ error: ERROR400.message });
        return;
      }

      const newUser = await prisma.users.create({
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

  async updateUser(request: IUserRequest, reply: FastifyReply) {
    try {
      const { id } = request.params;
      const { username, email, password } = request.body;

      const updatedUser = await prisma.users.update({
        where: { id: parseInt(id, 10) },
        data: {
          username,
          email,
          password,
        },
      });

      reply.code(STANDARD.SUCCESS).send({ user: updatedUser });
    } catch (err) {
      if (err.code == "P2025") {
        reply.code(ERROR400.statusCode).send({ error: ERRORS.userNotExists.message });
        return;
      }
      handleServerError(reply, err);
    }
  }

  async deleteUser(request: IParam<IID>, reply: FastifyReply) {
    try {
      const { id } = request.params;
      const deletedUser = await prisma.users.delete({
        where: { id: parseInt(id, 10) },
      });

      reply.code(STANDARD.SUCCESS).send({ user: deletedUser });
    } catch (err) {
      if (err.code == "P2025") {
        reply.code(ERROR400.statusCode).send({ error: ERRORS.userNotExists.message });
        return;
      }
      handleServerError(reply, err);
    }
  }
}
