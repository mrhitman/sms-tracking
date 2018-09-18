"use strict";

const User = require("../../models/user");
const Order = require("../../models/order");
const SmsTemplate = require("../../models/sms-template");
const moment = require("moment")();
const { joi, validate } = require("../../helpers/validate");

const schema = joi.object().keys({
  phone: joi
    .string()
    .phoneNumber({ format: "international" })
    .required(),
  ttn: joi.number().required(),
  remind_sms_template_id: joi.number().required(),
  on_send_sms_template_id: joi.number().required()
});

module.exports = async ctx => {
  const user_id = ctx.state.user.id;
  validate(ctx, schema);
  const {
    phone,
    ttn,
    remind_sms_template_id,
    on_send_sms_template_id
  } = ctx.request.body;
  const order = await Order.query().insert({
    user_id,
    ttn,
    phone: phone.replace(/\D/g, ""),
    status: "pending",
    type: "novaposhta",
    remind_sms_template_id,
    on_send_sms_template_id,
    created_at: moment.unix()
  });
  ctx.body = order;
  ctx.status = 201;
};
