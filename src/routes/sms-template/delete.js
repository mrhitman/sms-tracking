"use strict";

const SmsTemplate = require("../../models/sms-template");

module.exports = async ctx => {
  const { id } = ctx.request.body;
  console.log(id);
  await SmsTemplate.query().deleteById(id);
  ctx.body = { id };
};
