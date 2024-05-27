import { FastifyReply } from "fastify";
import { AuthController } from "../../../src/controller";
import { fakeData } from "../fakeData";
import { IUserRequest } from "../../../src/interfaces";
import { blacklist } from "../../../src/helpers/blacklist";
import { STANDARD } from "../../../src/helpers/constants";

export class MockAuthController extends AuthController {

    async changePassword(_, reply: FastifyReply) {

        reply.code(STANDARD.SUCCESS).send({ message: "your password changed successfully" });

    }
    async login(_, reply: FastifyReply) {
        reply.send({
            token: fakeData.token
        });


    }
    async signUp(_, reply: FastifyReply) {
        reply.send({
            data: fakeData.user
        });
    }
    async logout(request: IUserRequest, reply: FastifyReply) {
        const token = request.headers.authorization

        if (token) {
            blacklist.add(token);
        }
        reply.code(STANDARD.SUCCESS).send({ message: "Logged out successfully" });
    }
}