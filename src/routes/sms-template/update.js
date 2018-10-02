"use strict";

const SmsTemplate = require("../../models/sms-template");
const { joi, validate } = require("../../helpers/validate");

const schema = joi.object().keys({
  id: joi.number(),
  template: joi.string(),
  description: joi.string()
});

module.exports = async ctx => {
  validate(ctx, schema);
  const body = ctx.request.body;
  const smsTemplate = await SmsTemplate.query().updateAndFetchById(
    body.id,
    body
  );
  ctx.body = smsTemplate;
};
