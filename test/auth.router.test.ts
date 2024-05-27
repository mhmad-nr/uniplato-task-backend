import { startMockServer } from "./mocks/MockServer";
import { utils } from "../src/helpers/utils";
import { FastifyInstance } from "fastify";
import { Server } from "http";
import { chai } from "./user.router.test";

const { expect, request } = chai;

const baseUrl = "localhost:";
const serverPort = 1122;

const accessToken = (email = "unauthorized@gmail.com") => utils.getJWT({ email });

describe("Auth", function () {

    let server: FastifyInstance<Server>;

    before(async () => {
        server = await startMockServer(serverPort);
    });

    after(async () => {
        server.close();
    });

    // describe("signUp", function () {
    //     it('should return 400 because request body does not exist', function (done) {
    //         request(baseUrl + serverPort)
    //             .post('/api/auth/signup')
    //             .end(function (err, res) {
    //                 expect(res).to.have.status(400);
    //                 expect(res.body.errors).to.exist;
    //                 done();
    //             });
    //     });

    //     it('should return 400 because request body "password" does not exist', function (done) {
    //         request(baseUrl + serverPort)
    //             .post('/api/auth/signup')
    //             .send({
    //                 username: "example",
    //                 email: "test@example.com",
    //             })
    //             .end(function (err, res) {
    //                 expect(res).to.have.status(400);
    //                 expect(res.body.errors).to.exist;
    //                 expect(res.body.errors).to.be.an("array");
    //                 expect(res.body.errors[0].message).to.equal('Required property');
    //                 expect(res.body.errors[1].message).to.equal('Expected string');
    //                 done();
    //             });
    //     });

    //     it('should return 400 because request body "username" does not exist', function (done) {
    //         request(baseUrl + serverPort)
    //             .post('/api/auth/signup')
    //             .send({
    //                 email: "test@example.com",
    //                 password: "1234qwerQ@",
    //             })
    //             .end(function (err, res) {
    //                 expect(res).to.have.status(400);
    //                 expect(res.body.errors).to.exist;
    //                 expect(res.body.errors).to.be.an("array");
    //                 expect(res.body.errors[0].message).to.equal('Required property');
    //                 expect(res.body.errors[1].message).to.equal('Expected string');
    //                 done();
    //             });
    //     });

    //     it('should return 400 because request body "email" does not exist', function (done) {
    //         request(baseUrl + serverPort)
    //             .post('/api/auth/signup')
    //             .send({
    //                 username: "example",
    //                 password: "1234qwerQ@",
    //             })
    //             .end(function (err, res) {
    //                 expect(res).to.have.status(400);
    //                 expect(res.body.errors).to.exist;
    //                 expect(res.body.errors).to.be.an("array");
    //                 expect(res.body.errors[0].message).to.equal('Required property');
    //                 expect(res.body.errors[1].message).to.equal('Expected string');
    //                 done();
    //             });
    //     });

    //     it('should return 400 because request body has unexpected property', function (done) {
    //         request(baseUrl + serverPort)
    //             .post('/api/auth/signup')
    //             .send({
    //                 username: "example",
    //                 email: "test@example.com",
    //                 password: "1234qwerQ@",
    //                 unexpected: "unexpected",
    //             })
    //             .end(function (err, res) {
    //                 expect(res).to.have.status(400);
    //                 expect(res.body.errors).to.exist;
    //                 expect(res.body.errors).to.be.an("array");
    //                 expect(res.body.errors[0].message).to.equal("Unexpected property");
    //                 done();
    //             });
    //     });

    //     it('should return 200 when request is valid', function (done) {
    //         request(baseUrl + serverPort)
    //             .post('/api/auth/signup')
    //             .send({
    //                 username: "example",
    //                 email: "test@example.com",
    //                 password: "1234qwerQ@",
    //             })
    //             .end(function (err, res) {
    //                 expect(res).to.have.status(200);
    //                 expect(res.body).to.have.property("token");
    //                 expect(res.body.errors).to.not.exist;
    //                 done();
    //             });
    //     });
    // });

    describe("login", function () {
        it('should return 400 because request body does not exist', function (done) {
            request(baseUrl + serverPort)
                .post('/api/auth/login')
                .end(function (err, res) {
                    expect(res).to.have.status(400);
                    expect(res.body.errors).to.exist;
                    done();
                });
        });

        it('should return 400 because request body "password" does not exist', function (done) {
            request(baseUrl + serverPort)
                .post('/api/auth/login')
                .send({
                    email: "test@example.com",
                })
                .end(function (err, res) {
                    expect(res).to.have.status(400);
                    expect(res.body.errors).to.exist;
                    expect(res.body.errors).to.be.an("array");
                    expect(res.body.errors[0].message).to.equal('Required property');
                    expect(res.body.errors[1].message).to.equal('Expected string');
                    done();
                });
        });

        it('should return 400 because request body "email" does not exist', function (done) {
            request(baseUrl + serverPort)
                .post('/api/auth/login')
                .send({
                    password: "1234qwerQ@",
                })
                .end(function (err, res) {
                    expect(res).to.have.status(400);
                    expect(res.body.errors).to.exist;
                    expect(res.body.errors).to.be.an("array");
                    expect(res.body.errors[0].message).to.equal('Required property');
                    expect(res.body.errors[1].message).to.equal('Expected string');
                    done();
                });
        });

        it('should return 400 because request body has unexpected property', function (done) {
            request(baseUrl + serverPort)
                .post('/api/auth/login')
                .send({
                    email: "test@example.com",
                    password: "1234qwerQ@",
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

        it('should return 200 when request is valid', function (done) {
            request(baseUrl + serverPort)
                .post('/api/auth/login')
                .send({
                    email: "test@example.com",
                    password: "1234qwerQ@",
                })
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property("token");
                    expect(res.body.errors).to.not.exist;
                    done();
                });
        });
    });

    describe("changePassword", function () {
        it('should return 400 because request body does not exist', function (done) {
            request(baseUrl + serverPort)
                .put('/api/auth/change-password')
                .end(function (err, res) {
                    expect(res).to.have.status(400);
                    expect(res.body.errors).to.exist;
                    done();
                });
        });

        it('should return 400 because request body "password" does not exist', function (done) {
            request(baseUrl + serverPort)
                .put('/api/auth/change-password')
                .send({})
                .end(function (err, res) {
                    expect(res).to.have.status(400);
                    expect(res.body.errors).to.exist;
                    expect(res.body.errors).to.be.an("array");
                    expect(res.body.errors[0].message).to.equal('Required property');
                    expect(res.body.errors[1].message).to.equal('Expected string');
                    done();
                });
        });

        it('should return 400 because request body has unexpected property', function (done) {
            request(baseUrl + serverPort)
                .put('/api/auth/change-password')
                .send({
                    password: "1234qwerQ@",
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

        it('should return 403 because authorization token is not provided', function (done) {
            request(baseUrl + serverPort)
                .put('/api/auth/change-password')
                .send({
                    password: "1234qwerQ@sdasdad",
                })
                .end(function (err, res) {
                    expect(res).to.have.status(403);
                    done();
                });
        });

        it('should return 400 if the provided token is not correct', function (done) {
            request(baseUrl + serverPort)
                .put('/api/auth/change-password')
                .auth("accessToken", { type: 'bearer' })
                .send({
                    password: "1234qwerQ@sdasdad",
                })
                .end(function (err, res) {
                    expect(res).to.have.status(400);
                    done();
                });
        });

        it('should return 200 when request is valid', function (done) {
            request(baseUrl + serverPort)
                .put('/api/auth/change-password')
                .auth(accessToken(), { type: 'bearer' })
                .send({
                    password: "1234qwerQ@sdasdad",
                })
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    done();
                });
        });
    });
    describe("logout", function () {

        it('should return 403 because request header auth token is not passed', function (done) {
            request(baseUrl + serverPort)
                .post('/api/auth/logout')
                .end(function (err, res) {
                    expect(res).to.have.status(403);
                    done();
                });
        });

        it('should return 400 because request header auth token is not correct', function (done) {
            request(baseUrl + serverPort)
                .post('/api/auth/logout')
                .auth("accessToken", { type: 'bearer' })
                .end(function (err, res) {
                    expect(res).to.have.status(400);
                    done();
                });
        });
        it('should return 403 because loged out already', function (done) {
            request(baseUrl + serverPort)
                .post('/api/auth/logout')
                .auth(accessToken(), { type: 'bearer' })
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body.message).to.be.equal('Logged out successfully');
                });
            request(baseUrl + serverPort)
                .post('/api/auth/logout')
                .auth(accessToken(), { type: 'bearer' })
                .end(function (err, res) {
                    expect(res).to.have.status(403);
                    expect(res.body.message).to.be.equal('FORBIDDEN_ACCESS');
                    done()
                });
        });
        it('should return 200', function (done) {
            request(baseUrl + serverPort)
                .post('/api/auth/logout')
                .auth(accessToken("new@new.com"), { type: 'bearer' })
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body.message).to.be.equal('Logged out successfully');
                    done()
                });
        });


    });
});
