import { FastifyRequest } from "fastify";
import { Prisma } from "@prisma/client";

export interface IUserRequest extends FastifyRequest {
  body: Prisma.usersCreateInput;
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
