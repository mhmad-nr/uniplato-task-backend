import { Type } from "@sinclair/typebox";
import { user } from "./user.schema";

const signup = {
  body: Type.Object(
    {
      username: Type.String(),
      email: Type.String({
        format: "email",
      }),
      password: Type.String({
        format: "password",
        minLength: 8,
      }),
    },
    {
      additionalProperties: false,
    }
  ),
  response: {
    "200": Type.Object({
      data: user,
    }),
  },
};

const login = {
  body: Type.Object(
    {
      email: Type.String({
        format: "email",
      }),
      password: Type.String({
        format: "password",
        minLength: 8,
      }),
    },
    {
      additionalProperties: false,
    }
  ),
  response: {
    "200": Type.Object({
      token: Type.String(),
    }),
  },
};
const changePassword = {
  body: Type.Object(
    {
      password: Type.String({
        minLength: 8,
        format: "password",
      }),
    },
    {
      additionalProperties: false,
    }
  ),

  response: {
    "200": Type.Object({
      message: Type.String(),
    }),
  },
};

const logout = {
  // body: Type.Undefined(),
  response: {
    "200": Type.Object({
      message: Type.String(),
    }),
  },
};

export const authSchema = { signup, logout, login, changePassword };
