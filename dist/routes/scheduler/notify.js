"use strict";
module.exports = async (ctx) => {
    ctx.state.scheduler.notify();
    ctx.body = "ok";
};
//# sourceMappingURL=notify.js.map