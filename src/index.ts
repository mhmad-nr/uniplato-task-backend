import 'reflect-metadata';
import fastify from "fastify";
import { authRouter, userRouter } from "./routes";
import { API_PORT } from "./config";
import { FormatRegistry } from "@sinclair/typebox";
import { TypeBoxTypeProvider, TypeBoxValidatorCompiler } from "@fastify/type-provider-typebox";
import { isEmail, isStrongPassword } from "class-validator";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { AuthController, UserController } from "./controller";

const startServer = async () => {
  try {
    const server = fastify({
      logger: true,
    });
    // Register Swagger
    server.register(fastifySwagger, {
      mode: 'static',
      specification: {

        path: './swagger.yaml',
        baseDir: __dirname,
      },
    });

    server.setValidatorCompiler(TypeBoxValidatorCompiler);
    FormatRegistry.Set("email", (value) => isEmail(value));
    FormatRegistry.Set("password", (value) => isStrongPassword(value));

    server.withTypeProvider<TypeBoxTypeProvider>();



    server.register(fastifySwaggerUi, {
      routePrefix: '/documentation',
      staticCSP: true,
      transformSpecification: (swaggerObject, request, reply) => {
        return swaggerObject;
      },
    });
    server.decorate("authController", new AuthController());
    server.decorate("userController", new UserController());
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


    await server.listen(API_PORT);
  } catch (e) {
    console.error(e);
  }
};

process.on("unhandledRejection", (e) => {
  console.error(e);
  process.exit(1);
});

startServer();
