import { Type } from "@sinclair/typebox";
export const user = Type.Object({
  id: Type.Number(),
  username: Type.String(),
  email: Type.String({
    format: "email",
  }),
  created_at: Type.String(),
},
  {
    additionalProperties: false,
  });

const updateUserName = {
  body: Type.Object(
    {
      username: Type.String(),
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

const userById = {
  params: Type.Object({
    id: Type.Number(),
  }),
  response: {
    "200": Type.Object({
      data: user,
    }),
  },
};

const users = {
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
    sortBy: Type.Optional(Type.String({ enum: ["username", "created_at"] })),
    sortOrder: Type.Optional(Type.String({ enum: ["asc", "desc"] })),

  },
    {
      additionalProperties: false,
    }),
  response: {
    "200": Type.Object({
      data: Type.Array(user),
    }),
  },
};

export const userSchema = {
  userById,
  updateUserName,
  users,
};
