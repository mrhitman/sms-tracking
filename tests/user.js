const { test } = require("mocha");
const { expect } = require("chai");
const createApp = require("../src");
const agent = require("supertest-koa-agent");
const chance = require("chance")();
const issueToken = require("./helpers/issueToken");

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
    const token = issueToken({ id: 1 }, { expiresIn: "1h" });
    const response = await app
      .post("/user/update")
      .set("Authorization", `Bearer ${token}`)
      .send({
        id: 1,
        name: "Mr Hitman",
        email: "test@test.com",
        reference: 20,
      });
    expect(response.status).eq(200);
  });

  test("get", async () => {
    const token = issueToken({ id: 1 }, { expiresIn: "1m" });
    const response = await app
      .get("/user")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).eq(200);
    expect(response.body.id).eq(1);
  });

  test("get unexists", async () => {
    const token = issueToken({ id: 1111 }, { expiresIn: "1m" });
    const response = await app
      .post("/user/update")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).eq(404);
  });

  test("Successfully login", async () => {
    const token = issueToken({ id: 1 }, { expiresIn: "1m" });
    const response = await app
      .post("/user/login")
      .set("Authorization", `Bearer ${token}`)
      .send({
        email: "test@test.com",
        password: 1
      });

    expect(response.status).eq(200);
    expect(response.body.token).a("string");
    expect(response.body.refreshToken).a("string");
  });

  test("Invalid login", async () => {
    const token = issueToken({ id: 1 }, { expiresIn: "1m" });
    const response = await app
      .post("/user/login")
      .set("Authorization", `Bearer ${token}`)
      .send({
        email: "INVALID",
        password: "INVALID"
      });
    expect(response.status).eq(403);
  });

  test("Get error on expired token", async () => {
    const token = issueToken({ id: 1 }, { expiresIn: "0ms" });
    const response = await app
      .post(`/user/logout`)
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).eq(401);
  });

  test("Get new token", async () => {
    const auth = await app
      .post("/user/login")
      .send({
        email: "test@test.com",
        password: "1"
      });
    expect(auth.status).eq(200);
    const response = await app
      .post("/user/refresh")
      .send({
        token: auth.body.refreshToken,
      });
    expect(response.status).eq(200);
    expect(response.body.token).a("string");
    expect(response.body.refreshToken).not.eq(auth.body.refreshToken);
  });

  test("New token with invalid token", async () => {
    const response = await app.post("/user/refresh")
      .send({
        token: "INVALID",
        user_id: 1
      });
    expect(response.status).eq(404);
  });

  test("Logout/Command with token", async () => {
    const auth = await app.post("/user/login")
      .send({
        email: "test@test.com",
        password: 1
      });
    expect(auth.status).eq(200);
    const response = await app
      .post("/user/logout")
      .set("Authorization", `Bearer ${auth.body.token}`);
    expect(response.status).eq(204);
  });
});