import { FastifyReply, FastifyRequest, RawServerDefault } from "fastify";
import { AuthController, UserController } from "../../../src/controller";
import { IID, IParam, PasswordUpdateRequest } from "../../../src/interfaces";
import { fakeData } from "../fakeData";
import { ERROR400 } from "../../../src/helpers/constants";
import { ERRORS } from "../../../src/helpers/errors";

export class MockUserController extends UserController {
    async getAllUsers(_, reply: FastifyReply) {
        reply.send({
            data: [fakeData.user],
        });
    }

    async getUserById(request: IParam<IID>, reply: FastifyReply) {


        const { id } = request.params;

        if (id != fakeData.user.id.toString()) {
            reply
                .code(ERROR400.statusCode)
                .send({ error: ERRORS.userNotExists.message });
            return;
        }
        reply.send({
            data: fakeData.user
        });
    }

    async updateUserName(request, reply: FastifyReply) {
        reply.send({
            data: fakeData.user
        });
    }

    async deleteUser(request: IParam<IID>, reply: FastifyReply) {
        const { id } = request.params;
        if (id != fakeData.user.id.toString()) {
            reply
                .code(ERROR400.statusCode)
                .send({ error: ERRORS.userNotExists.message });
            return;
        }
        reply.send({
            data: fakeData.user
        });
    }
}