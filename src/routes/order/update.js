"use strict";

const Order = require("../../models/order");
const { joi, validate } = require("../../helpers/validate");

const schema = joi.object().keys({
  id: joi.number().required(),
  phone: joi.string().phoneNumber({ format: "international" }),
  type: joi.string(),
  ttn: joi.number(),
  sms_template_id: joi.number(),
  status: joi.string()
});

module.exports = async ctx => {
  const body = ctx.request.body;
  validate(ctx, schema);
  const order = await Order.query().updateAndFetchById(body.id, body);
  ctx.body = order;
};
