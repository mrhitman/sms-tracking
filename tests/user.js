const { test } = require("mocha");
const { expect } = require("chai");
const createApp = require("../src");
const agent = require("supertest-koa-agent");
const chance = require("chance")();

describe("user", () => {
  const app = agent(createApp());

  test("create user", async () => {
    const response = await app.post("/user").send({
      name: chance.name(),
      phone: chance.phone(),
      email: chance.email(),
      password: '1',
    });
    expect(response.status).eq(201);
  });

  test("update", async () => {
    const response = await app.post("/user/update").send({
      id: 1,
      name: "Mr Hitman",
      email: "test@test.com",
      alpha_name: "Prom.ua",
      bsg_token: "test_jGIBEs3BXQwOg4ZVTwxd",
      novaposhta_key: "6610680b61f0ba4d96a92d6ba8052dcf",
      reference: 20,
      default_sms_template: "Test test test"
    });
    expect(response.status).eq(200);
  });

  test("get", async () => {
    const response = await app.get("/user/1");
    expect(response.status).eq(200);
    expect(response.body.id).eq(1);
  });

  test("get unexists", async () => {
    const response = await app.get("/user/update/999999");
    expect(response.status).eq(404);
  });

  test("Successfully login", async () => {
    const response = await request(app)
      .post("/user/login")
      .send({ email: "test@test.com", password: "1" });

    expect(response.status).eq(200);
    expect(response.body.token).a("string");
    expect(response.body.refreshToken).a("string");
  });

  test("Invalid login", async () => {
    const response = await request(app)
      .post("/user/login")
      .send({ email: "INVALID", password: "INVALID" });
    expect(response.status).eq(403);
  });

  test("Get error on expired token", async () => {
    const token = issueToken({ id }, { expiresIn: "0ms" });
    const response = await request(app)
      .post(`/user/profile/${id}`)
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).eq(401);
  });

  test("Get new token", async () => {
    const auth = await request(app)
      .post("/user/login")
      .send({ email: "test@test.com", password: "1" });
    expect(auth.status).eq(200);
    const response = await request(app)
      .post("/user/refresh")
      .send({ token: auth.body.refreshToken, user_id: id });
    expect(response.status).eq(200);
    expect(response.body.token).a("string");
    expect(response.body.refreshToken).not.eq(auth.body.refreshToken);
  });

  test("New token with invalid token", async () => {
    const response = await request(app)
      .post("/user/refresh")
      .send({ token: "INVALID", user_id: id });
    expect(response.status).eq(404);
  });

  test("Logout/Command with token", async () => {
    const auth = await request(app)
      .post("/user/login")
      .send({ email: "test@test.com", password: "1" });
    expect(auth.status).eq(200);
    const response = await request(app)
      .post("/user/logout")
      .set("Authorization", `Bearer ${auth.body.token}`);
    expect(response.status).eq(200);
  });
});
