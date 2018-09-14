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
  remind_sms_template_id: joi.number(),
  remind_sms_template: joi.string(),
  on_send_sms_template_id: joi.number(),
  on_send_sms_template: joi.string()
});

module.exports = async ctx => {
  const user_id = ctx.state.user.id;
  validate(ctx, schema);
  const {
    phone,
    ttn,
    remind_sms_template,
    remind_sms_template_id,
    on_send_sms_template,
    on_send_sms_template_id
  } = ctx.request.body;
  const user = await User.query().findById(user_id);
  let remindSmsTemplate;
  if (remind_sms_template) {
    remindSmsTemplate = await SmsTemplate.query().insert({
      user_id,
      template: remind_sms_template
    });
  }
  if (!remindSmsTemplate && !user.default_remind_sms_template_id) {
    ctx.status = 400;
    ctx.body = "Can't create order without remind sms template";
  }
  let onSendSmsTemplate;
  if (on_send_sms_template) {
    onSendSmsTemplate = await SmsTemplate.query().insert({
      user_id,
      template: on_send_sms_template
    });
  }
  if (!onSendSmsTemplate && !user.default_on_send_sms_template_id) {
    ctx.status = 400;
    ctx.body = "Can't create order without on send sms template";
  }
  const order = await Order.query().insert({
    user_id,
    ttn,
    phone: phone.replace(/\D/g, ""),
    status: "pending",
    type: "novaposhta",
    remind_sms_template_id:
      remind_sms_template_id || remindSmsTemplate
        ? remindSmsTemplate.id
        : user.default_remind_sms_template_id,
    on_send_sms_template_id:
      on_send_sms_template_id || onSendSmsTemplate
        ? onSendSmsTemplate.id
        : user.default_on_send_sms_template_id,
    created_at: moment.unix()
  });
  ctx.body = order;
  ctx.status = 201;
};
