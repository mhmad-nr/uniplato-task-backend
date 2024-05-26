import fastify from "fastify";
import userRouter from "./routes/user.router";
import { API_PORT } from "./config";

const startServer = async () => {
  try {
    const server = fastify({
      logger: true,
    });

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
