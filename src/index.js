"use strict";

const Koa = require("koa");
const logger = require("koa-morgan");
const bodyparser = require("koa-bodyparser");
const helmet = require("koa-helmet");
const passport = require("./middlewares/passport");
const Scheduler = require("./services/scheduler");
const cors = require("koa-cors");

require("dotenv").config();

function createApp() {
  const app = new Koa();
  app.use(helmet());
  app.use(cors());
  app.use(bodyparser());
  app.use(logger("tiny"));
  app.use(passport.initialize());
  app.use(require("./routes/user").routes());
  app.use(require("./routes/sms-template").routes());
  app.use(require("./routes/order").routes());
  app.scheduler = new Scheduler();
  return app;
}

if (!module.parent) {
  const app = createApp();
  app.listen(process.env.PORT || 3000, () => console.log(`Server UP`));
}

module.exports = createApp;
