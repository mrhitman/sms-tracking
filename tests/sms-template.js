const { test } = require("mocha");
const { expect } = require("chai");
const { createApp } = require("../dist");
const agent = require("supertest-koa-agent");
const chance = require("chance")();
const issueToken = require("./helpers/issueToken");
const Scheduler = require("./mocks/scheduler");
const NovaPoshta = require("./mocks/novaposhta");

describe("template", () => {
  const api = new NovaPoshta();
  const scheduler = new Scheduler(api);
  const app = agent(createApp(scheduler));
  const token = issueToken({ id: 1 }, { expiresIn: "1m" });
  let template;

  test("create template", async () => {
    const response = await app
      .post("/sms-template")
      .set("Authorization", `Bearer ${token}`)
      .send({
        template: chance.paragraph()
      });
    template = response.body;
    expect(response.status).eq(201);
  });

  test("update", async () => {
    const response = await app
      .post("/sms-template/update")
      .set("Authorization", `Bearer ${token}`)
      .send({
        id: template.id,
        template: chance.paragraph()
      });
    expect(response.status).eq(200);
  });
});
