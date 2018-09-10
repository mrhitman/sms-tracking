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
  sms_template_id: joi.number(),
  sms_template: joi.string()
});

module.exports = async ctx => {
  const user_id = ctx.state.user.id;
  validate(ctx.request.body, schema);
  const { phone, ttn, sms_template, sms_template_id } = ctx.request.body;
  const user = await User.query().findById(user_id);
  let smsTemplate;
  if (sms_template) {
    smsTemplate = await SmsTemplate.query().insert({
      user_id,
      template: sms_template
    });
  }
  if (!smsTemplate && !user.default_sms_template_id) {
    ctx.status = 400;
    ctx.body = "Can't create order without sms template";
  }
  const order = await Order.query().insert({
    user_id,
    ttn,
    phone: phone.replace(/\D/g, ""),
    status: "pending",
    type: "novaposhta",
    sms_template_id:
      sms_template_id || smsTemplate
        ? smsTemplate.id
        : user.default_sms_template_id,
    created_at: moment.unix()
  });
  ctx.body = order;
  ctx.status = 201;
};
