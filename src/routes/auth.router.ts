import { authSchema } from "../schema";
import { checkValidRequest, checkValidUser } from "../helpers/auth";
import { IServerController } from "../interfaces";

async function authRouter(fastify: IServerController) {
  const authController = fastify.authController
  fastify.decorateRequest("authUser", "");

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
  
  fastify.route({
    method: "POST",
    url: "/logout",
    schema: authSchema.logout,
    preHandler: [checkValidRequest, checkValidUser],
    handler: authController.logout,
  });

}

export { authRouter };
