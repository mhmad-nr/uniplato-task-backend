import { FastifyRequest } from "fastify";
import { Prisma, User } from "@prisma/client";

export interface IUserRequest extends FastifyRequest {
  body: Prisma.UserCreateInput |Prisma.UserUpdateInput;
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
