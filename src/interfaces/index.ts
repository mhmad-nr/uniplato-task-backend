import { FastifyRequest } from "fastify";
import { Prisma } from "@prisma/client";

export interface IUserCreateRequest extends FastifyRequest {
  body: Prisma.usersCreateInput;
  params: IID;
}
export interface IUserGetRequest extends FastifyRequest {
  query: {
    offset?: string;
    limit?: string;
    sortBy: "username" | "created_at" | undefined;
    sortOrder: "asc" | "desc" | undefined;
  };
}
export interface IUserUpdateRequest extends FastifyRequest {
  body: Prisma.usersUpdateInput;
  params: IID;
}
export interface IParam<T> {
  params: T;
}
export interface IID {
  id?: string;
}

export interface IUserAuthToken {
  id: number;
  email: string;
}

export interface IGetPresign {
  fileName: string;
}

export interface IPutPresign {
  userId: number;
  fileName: string;
}
