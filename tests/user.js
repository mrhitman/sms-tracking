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
      email: chance.email()
    });
    expect(response.status).eq(201);
  });

  test("update", async () => {
    const response = await app.post("/user/update").send({
      id: 1,
      name: "Mr Hitman",
      email: "kabalx47@gmail.com",
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
});
