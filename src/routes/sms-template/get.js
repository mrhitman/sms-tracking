const SmsTemplate = require("../../models/sms-template");

module.exports = async ctx => {
  const { user_id } = ctx.params;
  ctx.body = await SmsTemplate.query().where({ user_id });
};
