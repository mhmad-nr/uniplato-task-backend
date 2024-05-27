import { FastifyInstance, FastifyRequest } from "fastify";
import { Prisma, User } from "@prisma/client";
import { AuthController, UserController } from "controller";


export interface IUserRequest extends FastifyRequest {
  test: any;
  body: Prisma.UserCreateInput | Prisma.UserUpdateInput;
  authUser: User;
}

export interface ILoginRequest extends FastifyRequest {
  body: {
    email: string;
    password: string;
  };
}
export interface IUserGetRequest extends FastifyRequest {
  query: {
    offset?: string;
    limit?: string;
    sortBy: "username" | "created_at" | undefined;
    sortOrder: "asc" | "desc" | undefined;
  };
}
export interface IServerController extends FastifyInstance {
  test: any;
  authController: AuthController;
  userController: UserController;
}


export interface PasswordUpdateRequest extends FastifyRequest {
  body: {
    password: string;
  };
  authUser: User;
}

export interface IParam<T> {
  params: T;
}
export interface IID {
  id?: string;
}
