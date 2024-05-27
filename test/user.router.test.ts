import { startMockServer } from "./mocks/MockServer";
import * as chaiModule from "chai";
import chaiHttp from "chai-http";
import { utils } from "../src/helpers/utils";
import { FastifyInstance } from "fastify";
import { Server } from "http";
import { fakeData } from "./mocks/fakeData";

export const chai = chaiModule.use(chaiHttp);

const { expect, request } = chai;

const baseUrl = "localhost:";
const serverPort = 1122;

const accessToken = utils.getJWT({ email: "unauthorized@gmail.com" });

describe("User", function () {

    let server: FastifyInstance<Server>;

    before(async () => {
        server = await startMockServer(serverPort);
    });

    after(async () => {
        server.close();
    });

    describe("getAllUsers", function () {
        it('should return 403 because request header auth token is not passed', function (done) {
            request(baseUrl + serverPort)
                .get('/api/user')
                .end(function (err, res) {
                    expect(res).to.have.status(403);
                    done();
                });
        });

        it('should return 400 because request queries have unexpected params', function (done) {
            request(baseUrl + serverPort)
                .get('/api/user?unexpected=unexpected')
                .auth(accessToken, { type: 'bearer' })
                .end(function (err, res) {
                    expect(res).to.have.status(400);
                    expect(res.body.errors).to.be.an("array");
                    expect(res.body.errors[0].message).to.equal("Unexpected property");
                    done();
                });
        });

        it('should return 200', function (done) {
            request(baseUrl + serverPort)
                .get('/api/user')
                .auth(accessToken, { type: 'bearer' })
                .end(function (err, res) {
                    const expectedRes = { data: [fakeData.user] };

                    expect(res).to.have.status(200);
                    expect(res.body).to.deep.equal(expectedRes);
                    done();
                });
        });
    });

    describe("getUserById", function () {
        it('should return 403 because request header auth token is not passed', function (done) {
            request(baseUrl + serverPort)
                .get('/api/user/1')
                .end(function (err, res) {
                    expect(res).to.have.status(403);
                    done();
                });
        });

        it('should return 400 because user does not exist', function (done) {
            request(baseUrl + serverPort)
                .get('/api/user/2')
                .auth(accessToken, { type: 'bearer' })
                .end(function (err, res) {
                    expect(res).to.have.status(400);
                    expect(res.body.error).to.equal('User not exists');
                    done();
                });
        });

        it('should return 200', function (done) {
            request(baseUrl + serverPort)
                .get('/api/user/1')
                .auth(accessToken, { type: 'bearer' })
                .end(function (err, res) {
                    const expectedRes = { data: fakeData.user };

                    expect(res).to.have.status(200);
                    expect(res.body).to.deep.equal(expectedRes);
                    done();
                });
        });
    });

    describe("updateUserName", function () {
        it('should return 403 because request header auth token is not passed', function (done) {
            request(baseUrl + serverPort)
                .put('/api/user/user-name')
                .send({
                    username: "username",
                })
                .end(function (err, res) {
                    expect(res).to.have.status(403);
                    done();
                });
        });

        it('should return 400 because request body has unexpected property', function (done) {
            request(baseUrl + serverPort)
                .put('/api/user/user-name')
                .send({
                    username: "username",
                    unexpected: "unexpected",
                })
                .end(function (err, res) {
                    expect(res).to.have.status(400);
                    expect(res.body.errors).to.exist;
                    expect(res.body.errors).to.be.an("array");
                    expect(res.body.errors[0].message).to.equal("Unexpected property");
                    done();
                });
        });

        it('should return 400 because request body does not have expected property', function (done) {
            request(baseUrl + serverPort)
                .put('/api/user/user-name')
                .send({})
                .end(function (err, res) {
                    expect(res).to.have.status(400);
                    expect(res.body.errors).to.exist;
                    expect(res.body.errors).to.be.an("array");
                    expect(res.body.errors[0].message).to.equal("Required property");
                    done();
                });
        });

        it('should return 200', function (done) {
            request(baseUrl + serverPort)
                .put('/api/user/user-name')
                .auth(accessToken, { type: 'bearer' })
                .send({
                    username: "newusername",
                })
                .end(function (err, res) {
                    const expectedRes = { data: fakeData.user };

                    expect(res).to.have.status(200);
                    expect(res.body).to.deep.equal(expectedRes);
                    done();
                });
        });
    });

    describe("deleteUser", function () {
        it('should return 403 because request header auth token is not passed', function (done) {
            request(baseUrl + serverPort)
                .delete('/api/user/1')
                .end(function (err, res) {
                    expect(res).to.have.status(403);
                    done();
                });
        });

        it('should return 400 because user does not exist', function (done) {
            request(baseUrl + serverPort)
                .delete('/api/user/2')
                .auth(accessToken, { type: 'bearer' })
                .end(function (err, res) {
                    expect(res).to.have.status(400);
                    expect(res.body.error).to.equal('User not exists');
                    done();
                });
        });

        it('should return 200', function (done) {
            request(baseUrl + serverPort)
                .delete('/api/user/1')
                .auth(accessToken, { type: 'bearer' })
                .end(function (err, res) {
                    const expectedRes = { data: fakeData.user };

                    expect(res).to.have.status(200);
                    expect(res.body).to.deep.equal(expectedRes);
                    done();
                });
        });
    });
});
