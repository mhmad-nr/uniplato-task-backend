import { Type } from "@sinclair/typebox";

const create = {
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
};
const update = {
  body: Type.Object(
    {
      username: Type.Optional(Type.String()),
      password: Type.Optional(
        Type.String({
          minLength: 8,
        })
      ),
    },
    {
      additionalProperties: false,
    }
  ),
  params: Type.Object({
    id: Type.Number(),
  }),
};
const byId = {
  params: Type.Object({
    id: Type.Number(),
  }),
};
const queryParams = {
  querystring: Type.Object({
    limit: Type.Optional(
      Type.Integer({
        minimum: 1,
        maximum: 100,
        default: 10,
      })
    ),
    offset: Type.Optional(
      Type.Integer({
        minimum: 0,
        default: 0,
      })
    ),
    sortBy: Type.Optional(Type.String({ enum: ["username", "createdAt"] })),
    sortOrder: Type.Optional(Type.String({ enum: ["asc", "desc"] })),
  }),
};

export const userSchema = { create, byId, update ,queryParams };
