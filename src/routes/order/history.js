"use strict";

const OrderHistory = require("../../models/order-history");

module.exports = async ctx => {
  const { id } = ctx.params;
  const user_id = ctx.state.user.id;
  ctx.body = await OrderHistory.query().find({ order_id: id, user_id });
};
