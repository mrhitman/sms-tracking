"use strict";

const User = require("../../models/user");
const SmsTemplate = require("../../models/sms-template");
const bcrypt = require("bcrypt");

module.exports = async ctx => {
  const { name, email, phone, password } = ctx.request.body;

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  if (await User.query().findOne({ email })) {
    ctx.body = "User with such email already exists";
    ctx.status = 409;
    return;
  }
  const user = await User.query().insert({
    name,
    email,
    phone,
    password: hash
  });
  const remindSmsTemplate = await SmsTemplate.query().insert({
    user_id: user.id,
    template: "Your order {{ttn}} has sent"
  });
  const onSendSmsTemplate = await SmsTemplate.query().insert({
    user_id: user.id,
    template: "Your order {{ttn}} had delivered, take it back please"
  });
  await user.$query().update({
    default_remind_sms_template_id: remindSmsTemplate.id,
    default_on_send_sms_template_id: onSendSmsTemplate.id
  });
  ctx.body = user;
  ctx.status = 201;
};
