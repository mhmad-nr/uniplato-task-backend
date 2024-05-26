import { FastifyInstance } from "fastify";
import { AuthController } from "../controller";
import { authSchema } from "../schema";
import { checkValidRequest, checkValidUser } from "../helpers/auth";

async function authRouter(fastify: FastifyInstance) {
  fastify.decorateRequest("authUser", "");
  const authController = new AuthController();

  fastify.route({
    method: "POST",
    url: "/login",
    schema: authSchema.login,
    handler: authController.login,
  });

  fastify.route({
    method: "POST",
    url: "/signup",
    schema: authSchema.signup,
    handler: authController.signUp,
  });

  fastify.route({
    method: "PUT",
    url: "/change-password",
    schema: authSchema.changePassword,
    preHandler: [checkValidRequest, checkValidUser],
    handler: authController.changePassword,
  });
}

export { authRouter };
