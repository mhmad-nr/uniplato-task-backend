import { FastifyInstance } from "fastify";
import { UserController } from "../controller";
import { userSchema } from "../schema";
import {
  FormatRegistry,
  TypeBoxTypeProvider,
  TypeBoxValidatorCompiler,
} from "@fastify/type-provider-typebox";
import { isEmail, isStrongPassword } from "class-validator";

async function userRouter(fastify: FastifyInstance) {
  fastify.decorateRequest("authUser", "");
  fastify.setValidatorCompiler(TypeBoxValidatorCompiler);
  fastify.withTypeProvider<TypeBoxTypeProvider>();
  const userController = new UserController();

  FormatRegistry.Set("email", (value) => isEmail(value));
  FormatRegistry.Set("password", (value) => isStrongPassword(value));

  // Route to get all users
  fastify.route({
    method: "GET",
    url: "/",
    schema: userSchema.queryParams,
    handler: userController.getAllUsers,
  });

  // Route to get a user by ID
  fastify.route({
    method: "GET",
    url: "/:id",
    schema: userSchema.byId,
    handler: userController.getUserById,
  });

  // Route to create a new user
  fastify.route({
    method: "POST",
    url: "/",
    schema: userSchema.create,
    handler: userController.createUser,
  });

  // Route to update a user by ID
  fastify.route({
    method: "PUT",
    url: "/:id",
    schema: userSchema.update,
    handler: userController.updateUser,
  });

  // Route to delete a user by ID
  fastify.route({
    method: "DELETE",
    url: "/:id",
    schema: userSchema.byId,
    handler: userController.deleteUser,
  });
}

export default userRouter;
