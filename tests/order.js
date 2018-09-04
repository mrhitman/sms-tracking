const { test } = require("mocha");
const { expect } = require("chai");
const createApp = require("../src");
const agent = require("supertest-koa-agent");
const chance = require("chance")();

describe("order", () => {
  const app = agent(createApp());
  test("create order", async () => {
    const response = await app.post("/order").send({
      user_id: 1,
      phone: chance.phone(),
      ttn: chance.guid(),
      status: "pending"
    });
    expect(response.status).eq(201);
  });

  test("edit order", async () => {
    const response = await app.post("/order/update").send({
      id: 1,
      status: "in_progress"
    });
    expect(response.status).eq(200);
  });

  test("pause order", async () => {
    const response = await app.post("/order/pause").send({
      id: 1
    });
    expect(response.status).eq(200);
    expect(response.body.status).eq("paused");
  });

  test("unpause order", async () => {
    {
      const response = await app.post("/order/unpause").send({
        id: 1
      });
      expect(response.status).eq(200);
      expect(response.body.status).eq("in_progress");
    }
  });
});
