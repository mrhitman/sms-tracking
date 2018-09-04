const { test } = require("mocha");
const { expect } = require("chai");
const createApp = require("../src");
const agent = require("supertest-koa-agent");
const chance = require("chance")();

describe("template", () => {
  const app = agent(createApp());

  test("create template", async () => {
    const response = await app.post("/sms-template").send({
      user_id: 1,
      template: chance.paragraph()
    });
    expect(response.status).eq(201);
  });

  test("update", async () => {
    const response = await app.post("/sms-template/update").send({
      id: 1,
      template: chance.paragraph()
    });
    expect(response.status).eq(200);
  });
});
