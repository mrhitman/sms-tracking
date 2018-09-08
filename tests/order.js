const { test } = require("mocha");
const { expect } = require("chai");
const createApp = require("../src");
const agent = require("supertest-koa-agent");
const chance = require("chance")();
const issueToken = require("./helpers/issueToken");

describe("order", () => {
  const app = agent(createApp());
  const token = issueToken({ id: 1 }, { expiresIn: "1m" });

  test("create order", async () => {
    const response = await app.post("/order").send({
      user_id: 1,
      phone: chance.phone(),
      ttn: chance.guid(),
      sms_template: 'Test template'
    }).set("Authorization", `Bearer ${token}`);
    expect(response.status).eq(201);
  });

  test("edit order", async () => {
    const response = await app.post("/order/update").send({
      id: 1,
      status: "in_progress"
    }).set("Authorization", `Bearer ${token}`);
    expect(response.status).eq(200);
    expect(response.body.status).eq("in_progress");
  });

  test("pause order", async () => {
    const response = await app.post("/order/pause").send({
      id: 1
    }).set("Authorization", `Bearer ${token}`);
    expect(response.status).eq(200);
    expect(response.body.status).eq("paused");
  });

  test("unpause order", async () => {
    {
      const response = await app.post("/order/unpause").send({
        id: 1
      }).set("Authorization", `Bearer ${token}`);
      expect(response.status).eq(200);
      expect(response.body.status).eq("in_progress");
    }
  });
});