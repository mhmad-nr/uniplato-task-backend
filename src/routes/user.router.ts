import { FastifyInstance } from "fastify";
import { UserController } from "../controller";
import { userSchema } from "../schema";
import { checkValidRequest, checkValidUser } from "../helpers/auth";

async function userRouter(fastify: FastifyInstance) {
  fastify.decorateRequest("authUser", "");

  const userController = new UserController();
  // Route to get all users

  fastify.route({
    method: "GET",
    url: "/",
    schema: userSchema.users,
    preHandler: [checkValidRequest],
    handler: userController.getAllUsers,
  });

  // Route to get a user by ID
  fastify.route({
    method: "GET",
    url: "/:id",
    schema: userSchema.userById,
    preHandler: [checkValidRequest],
    handler: userController.getUserById,
  });

  fastify.route({
    method: "PUT",
    url: "/user-name",
    schema: userSchema.updateUserName,
    preHandler: [checkValidRequest, checkValidUser],
    handler: userController.updateUserName,
  });

  // // Route to update a user by ID
  // fastify.route({
  //   method: "PUT",
  //   url: "/:id",
  //   schema: userSchema.update,
  //   preHandler: [checkValidRequest],
  //   handler: userController.updateUser,
  // });

  // Route to delete a user by ID
  fastify.route({
    method: "DELETE",
    url: "/:id",
    schema: userSchema.userById,
    preHandler: [checkValidRequest],
    handler: userController.deleteUser,
  });
}

export { userRouter };
