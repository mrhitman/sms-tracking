"use strict";

const Koa = require("koa");
const logger = require("koa-morgan");
const bodyparser = require("koa-bodyparser");
const serve = require("koa-static");
const helmet = require("koa-helmet");
const passport = require("./middlewares/passport");
const Scheduler = require("./services/scheduler");

require("dotenv").config();

function createApp() {
  const app = new Koa();
  app.use(helmet());
  app.use(bodyparser());
  app.use(logger("tiny"));
  app.use(passport.initialize());
  app.use(require("./routes/user").routes());
  app.use(require("./routes/sms-template").routes());
  app.use(require("./routes/order").routes());
  app.use(serve(`${__dirname}/web`));
  app.scheduler = new Scheduler();
  return app;
}

if (!module.parent) {
  const app = createApp();
  app.listen(process.env.PORT || 3000, () => console.log(`Server UP`));
}

module.exports = createApp;
