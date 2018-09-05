"use strict";

const Order = require("../../models/order");

module.exports = async ctx => {
  const { user_id } = ctx.params;
  ctx.body = await Order.query().where({ user_id });
};
