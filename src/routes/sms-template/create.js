const SmsTemplate = require("../../models/sms-template");

module.exports = async ctx => {
  const { user_id, template } = ctx.request.body;
  const smsTemplate = await SmsTemplate.query().insert({ user_id, template });
  ctx.body = smsTemplate;
  ctx.status = 201;
};
