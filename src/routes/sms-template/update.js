"use strict";

const SmsTemplate = require("../../models/sms-template");

module.exports = async ctx => {
  const body = ctx.request.body;
  const smsTemplate = await SmsTemplate.query().updateAndFetchById(
    body.id,
    body
  );
  ctx.body = smsTemplate;
};
