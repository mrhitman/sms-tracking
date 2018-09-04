"use strict";

const Order = require("../../models/order");

module.exports = async ctx => {
  const body = ctx.request.body;
  const order = await Order.query().updateAndFetchById(body.id, body);
  ctx.body = order;
};
