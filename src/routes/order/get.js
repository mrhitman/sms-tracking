"use strict";

const Order = require("../../models/order");

module.exports = async ctx => {
  const { user_id } = ctx.params;
  ctx.body = await Order.query()
    .eager("[template]")
    .where({ user_id });
};
