"use strict";

const User = require("../../models/user");
const Order = require("../../models/order");
const SmsTemplate = require("../../models/sms-template");
const moment = require("moment")();

module.exports = async ctx => {
  const user_id = ctx.state.user.id;
  const { phone, ttn, sms_template } = ctx.request.body;
  const user = await User.query().findById(user_id);
  let smsTemplate;
  if (sms_template) {
    smsTemplate = await SmsTemplate.query().insert({
      user_id,
      template: sms_template,
    });
  }
  if (!smsTemplate && !user.default_sms_template_id) {
    ctx.status = 400;
    ctx.body = "Can't create order without sms template"
  }
  const order = await Order.query().insert({
    user_id,
    ttn,
    phone,
    status: "pending",
    type: "novaposhta",
    sms_template_id: smsTemplate ? smsTemplate.id : user.default_sms_template_id,
    created_at: moment.utc()
  });
  ctx.body = order;
  ctx.status = 201;
};