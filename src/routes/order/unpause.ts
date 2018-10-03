"use strict";

const Order = require("../../models/order");
const { joi, validate } = require("../../helpers/validate");

const schema = joi.object().keys({
  id: joi.number().required()
});

module.exports = async ctx => {
  validate(ctx, schema);
  const { id } = ctx.request.body;
  const order = await Order.query().findById(id);
  await order.unpause();
  ctx.body = order;
};
