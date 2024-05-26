import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcryptjs";
import { JWT_SECRET } from "../config";
import * as JWT from "jsonwebtoken";
import { JwtPayload } from "../payload";

export const prisma = new PrismaClient();

export const utils = {
  isJSON: (data: string) => {
    try {
      JSON.parse(data);
    } catch (e) {
      return false;
    }
    return true;
  },
  getTime: () => {
    const date = new Date();
    const time = date.getTime();
    return time;
  },
  genSalt: (saltRounds: number, value: string) => {
    return new Promise((resolve, reject) => {
      const salt = bcrypt.genSaltSync(saltRounds);
      bcrypt.hash(value, salt, (err, hash) => {
        if (err) reject(err);
        resolve(hash);
      });
    });
  },
  compareHash: (hash: string, value: string) => {
    return new Promise((resolve, reject) => {
      bcrypt.compare(value, hash, (err, result): boolean | any => {
        if (err) reject(err);
        resolve(result);
      });
    });
  },
  healthCheck: (): Promise<void> => {
    return new Promise((resolve, reject) => {
      prisma.$queryRaw`SELECT 1`
        .then(() => {
          resolve();
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  getJWT: ({ email }: JwtPayload) =>
    JWT.sign(
      {
        email,
      },
      JWT_SECRET
    ),
};
