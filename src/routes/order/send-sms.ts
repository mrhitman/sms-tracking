"use strict";

const Order = require("../../models/order");
const { remind } = require("../../services/sms");
const { joi, validate } = require("../../helpers/validate");

const schema = joi.object().keys({
  id: joi.number().required()
});

module.exports = async ctx => {
  validate(ctx, schema);
  const { id } = ctx.request.body;
  const order = await Order.query()
    .eager("[on_send_template,remind_template]")
    .findById(id);
  remind(order);
  ctx.body = order;
};
