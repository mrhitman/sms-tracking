const Koa = require("koa");
const app = new Koa();


app.use(require('./routes/user').routes());

app.listen(process.env.PORT || 3000);
