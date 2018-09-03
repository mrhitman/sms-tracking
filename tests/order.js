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
      ttl: chance.guid(),
      status: "pending"
    });
    expect(response.status).eq(201);
  });

  // test.todo("edit order");
  // test.todo("delete order");
});
