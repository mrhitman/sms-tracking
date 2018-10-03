"use strict";
module.exports = async (ctx) => {
    ctx.scheduler.checkOrders();
    ctx.body = "ok";
};
//# sourceMappingURL=check-orders.js.map