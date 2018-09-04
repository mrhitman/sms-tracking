"use strict";

const Order = require("../../models/order");

module.exports = async ctx => {
  const { id } = ctx.request.body;
  const order = await Order.query().findById(id);
  await order.unpause();
  ctx.body = order;
};
