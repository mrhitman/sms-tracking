const Koa = require("koa");

function createApp() {
    const app = new Koa();
    app.use(require('./routes/user').routes());
    return app;
}

if (!module.parent) {
    const app = createApp();
    app.listen(process.env.PORT || 3000);
}

module.exports = createApp;