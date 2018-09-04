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
      name: chance.name()
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
