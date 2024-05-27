import fastify from "fastify";
import { authRouter, userRouter } from "../../src/routes";
import { MockAuthController, MockUserController } from "./controller";
import { FormatRegistry, TypeBoxTypeProvider, TypeBoxValidatorCompiler } from "@fastify/type-provider-typebox";
import { isEmail, isStrongPassword } from "class-validator";
import { fakeData } from "./fakeData";

export const startMockServer = async (port: number) => {
  const server = fastify();
  // Use the mock implementation

  server.setValidatorCompiler(TypeBoxValidatorCompiler);
  FormatRegistry.Set("email", (value) => isEmail(value));
  FormatRegistry.Set("password", (value) => isStrongPassword(value));
  server.withTypeProvider<TypeBoxTypeProvider>();

  server.decorateRequest("test", fakeData);
  server.decorate("authController", new MockAuthController());
  server.decorate("userController", new MockUserController());


  server.register(authRouter, { prefix: "/api/auth" });
  server.register(userRouter, { prefix: "/api/user" });
  server.setErrorHandler((error, request, reply) => {
    if (error.validation) {
      reply.status(400).send({
        message: "Validation error",
        errors: error.validation,
      });
    } else {
      reply.status(500).send({ message: "Internal Server Error" });
    }
    server.log.error(error);
  });
  await server.listen(port);

  return server;
};
