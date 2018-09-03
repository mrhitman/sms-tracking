const Koa = require("koa");
const bodyparser = require("koa-bodyparser");
require("dotenv").config();

function createApp() {
  const app = new Koa();
  app.use(bodyparser());
  app.use(require("./routes/user").routes());
  app.use(require("./routes/order").routes());
  return app;
}

if (!module.parent) {
  const app = createApp();
  app.listen(process.env.PORT || 3000, () => console.log(`Server UP`));
}

module.exports = createApp;
