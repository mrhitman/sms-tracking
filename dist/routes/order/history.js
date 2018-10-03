"use strict";
const OrderHistory = require("../../models/order-history");
module.exports = async (ctx) => {
    const { id } = ctx.params;
    const user_id = ctx.state.user.id;
    ctx.body = await OrderHistory.query()
        .where({ order_id: id, user_id })
        .orderBy("created_at");
};
//# sourceMappingURL=history.js.map