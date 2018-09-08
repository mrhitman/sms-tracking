"use strict";

const User = require("../../models/user");
const SmsTemplate = require("../../models/sms-template");
const bcrypt = require("bcrypt");

module.exports = async ctx => {
  const {
    name,
    email,
    phone,
    password
  } = ctx.request.body;

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  if (await User.query().findOne({
      email
    })) {
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
  const smsTemplate = await SmsTemplate.query().insert({
    user_id: user.id
  });
  await user.$query().update({
    default_sms_template_id: smsTemplate.id,
    description: "default sms template",
    template: "Your order has delivered"
  });
  ctx.body = user;
  ctx.status = 201;
};