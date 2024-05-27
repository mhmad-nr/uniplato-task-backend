import { FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "../helpers/utils";
import { ERROR400, ERROR401, ERROR403 } from "./constants";
import * as JWT from "jsonwebtoken";
import { JWT_SECRET } from "../config";
import { IUserRequest } from "../interfaces";
import { JwtPayload } from "../payload";
import { blacklist } from "./blacklist";


export const checkValidRequest = (
  request: FastifyRequest,
  reply: FastifyReply,
  done
) => {
  try {

    let token = request.headers.authorization;
    token = token?.replace("Bearer ", "");
    if (token) {

      JWT.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
          return reply.code(ERROR400.statusCode).send({ statusCode: ERROR400.statusCode, message: "token is not correct" });
        }

        if (blacklist.isBlacklisted(request.headers.authorization)) {

          
          return reply.code(ERROR403.statusCode).send(ERROR403);
        }
        done();
      });
    } else {

      return reply.code(ERROR403.statusCode).send(ERROR403);
    }
  } catch (e) {
    return reply.code(ERROR400.statusCode).send(ERROR400);
  }
};

export const checkValidUser = async (
  request: IUserRequest,
  reply: FastifyReply
) => {
  try {
    let token = request.headers.authorization;
    token = token?.replace("Bearer ", "");

    if (!token) {
      return reply.code(ERROR401.statusCode).send(ERROR401);
    }
    const user: JwtPayload = JWT.verify(token, JWT_SECRET) as JwtPayload;

    if (!user.email) {
      return reply.code(ERROR401.statusCode).send(ERROR401);
    }
    let userData

    if (request.test) {
      userData = request.test
    } else {

      userData = await prisma.user.findUnique({
        where: { email: user.email },
      });
    }

    if (!userData) {
      return reply.code(ERROR401.statusCode).send(ERROR401);
    }
    request.authUser = userData;
  } catch (e) {
    return reply.code(ERROR401.statusCode).send(e);
  }
};
