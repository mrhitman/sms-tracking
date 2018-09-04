"use strict";

const Koa = require("koa");
const logger = require("koa-morgan");
const bodyparser = require("koa-bodyparser");
const Scheduler = require("./services/scheduler");
// const NovaPoshta = require("./services/novaposhta");

require("dotenv").config();

function createApp() {
  const app = new Koa();
  // const nova = new NovaPoshta({ apiKey: "6610680b61f0ba4d96a92d6ba8052dcf" });
  // nova
  // .getStatusDocuments([{ ttn: "59000360659572", phone: "" }])
  // .then(console.log);

  const scheduler = new Scheduler();
  app.use(bodyparser());
  app.use(logger("tiny"));
  app.use(require("./routes/user").routes());
  app.use(require("./routes/sms-template").routes());
  app.use(require("./routes/order").routes());
  return app;
}

if (!module.parent) {
  const app = createApp();
  app.listen(process.env.PORT || 3000, () => console.log(`Server UP`));
}

module.exports = createApp;
