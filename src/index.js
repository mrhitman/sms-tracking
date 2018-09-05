"use strict";

const Koa = require("koa");
const logger = require("koa-morgan");
const bodyparser = require("koa-bodyparser");
const Scheduler = require("./services/scheduler");
const serve = require("koa-static");

require("dotenv").config();

function createApp() {
  const app = new Koa();
  app.scheduler = new Scheduler();
  app.use(bodyparser());
  app.use(logger("tiny"));
  app.use(require("./routes/user").routes());
  app.use(require("./routes/sms-template").routes());
  app.use(require("./routes/order").routes());
  app.use(serve(`${__dirname}/web`));
  return app;
}

if (!module.parent) {
  const app = createApp();
  app.listen(process.env.PORT || 3000, () => console.log(`Server UP`));
}

module.exports = createApp;
