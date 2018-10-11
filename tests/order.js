const { test } = require("mocha");
const { expect } = require("chai");
const { createApp } = require("../dist");
const agent = require("supertest-koa-agent");
const chance = require("chance")();
const issueToken = require("./helpers/issueToken");
const Scheduler = require("./mocks/scheduler");
const NovaPoshta = require("./mocks/novaposhta");

describe.only("order", () => {
  const api = new NovaPoshta();
  const scheduler = new Scheduler(api);
  const app = agent(createApp(scheduler));
  const token = issueToken({ id: 1 }, { expiresIn: "1m" });
  let order;

  test("create order", async () => {
    const response = await app
      .post("/order")
      .send({
        phone: "+380994000000",
        ttn: String(chance.natural({ max: 9999999999 })),
        remind_sms_template_id: 1,
        send_sms: false
      })
      .set("Authorization", `Bearer ${token}`);
    order = response.body;
    expect(response.status).eq(201);
  });

  test("edit order", async () => {
    const response = await app
      .post("/order/update")
      .set("Authorization", `Bearer ${token}`)
      .send({ id: order.id, status: "ready" });
    expect(response.status).eq(200);
    expect(response.body.status).eq("ready");
  });

  test("pause order", async () => {
    const response = await app
      .post("/order/pause")
      .set("Authorization", `Bearer ${token}`)
      .send({ id: order.id });
    expect(response.status).eq(200);
    expect(response.body.status).eq("paused");
  });

  test("unpause order", async () => {
    {
      const response = await app
        .post("/order/unpause")
        .set("Authorization", `Bearer ${token}`)
        .send({ id: order.id });
      expect(response.status).eq(200);
      expect(response.body.status).eq("ready");
    }
  });

  test("track", async () => {
    const response = await app
      .get(`/order/${order.id}/track`)
      .set("Authorization", `Bearer ${token}`);
    expect(response.body).to.be.an("object");
  });

  test("create order with tracking", async () => {
    api.setOption(api.statusCodes.inlocation);
    const response = await app
      .post("/order")
      .send({
        phone: "+380994000000",
        ttn: String(chance.natural({ max: 9999999999 })),
        remind_sms_template_id: 1,
        send_sms: false
      })
      .set("Authorization", `Bearer ${token}`);
    order = response.body;
    expect(response.status).eq(201);
    console.log(response.body);
  });
});
