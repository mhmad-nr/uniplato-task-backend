import { FastifyInstance } from "fastify";
import { UserController } from "../controller";
import S from "fluent-json-schema";
import { userByIdSchema } from "../schema";

async function userRouter(fastify: FastifyInstance) {
  fastify.decorateRequest("authUser", "");
  const userController = new UserController();

  // Route to get all users
  fastify.route({
    method: "GET",
    url: "/",

    handler: userController.getAllUsers,
  });

  // Route to get a user by ID
  fastify.route({
    method: "GET",
    url: "/:id",
    handler: userController.getUserById,
  });

  // Route to create a new user
  fastify.route({
    method: "POST",
    url: "/",
    handler: userController.createUser,
  });

  // Route to update a user by ID
  fastify.route({
    method: "PUT",
    url: "/:id",
    handler: userController.updateUser,
  });

  // Route to delete a user by ID
  fastify.route({
    method: "DELETE",
    url: "/:id",
    schema: {
      body: S.null(),
    },
    handler: userController.deleteUser,
  });
}

export default userRouter;
