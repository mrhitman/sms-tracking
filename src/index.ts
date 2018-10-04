import * as Koa from "koa";
import * as logger from "koa-morgan";
import * as bodyparser from "koa-bodyparser";
import * as helmet from "koa-helmet";
import passport from "./middlewares/passport";
import Scheduler from "./services/scheduler";
import * as cors from "koa-cors";

require("dotenv").config();

export function createApp() {
  const app = new Koa();
  app.use(helmet());
  app.use(cors());
  app.use(bodyparser());
  app.use(logger("tiny"));
  app.use(passport.initialize());
  app.use(require("./routes/user").default.routes());
  app.use(require("./routes/sms-template").default.routes());
  app.use(require("./routes/order").default.routes());
  app.use(require("./routes/scheduler").default.routes());
  (app.context as any).scheduler = new Scheduler();
  return app;
}

if (!module.parent) {
  const app = createApp();
  app.listen(process.env.PORT || 3000, () => console.log(`Server UP`));
}
