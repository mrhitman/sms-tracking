"use strict";

const SmsTemplate = require("../../models/sms-template");

module.exports = async ctx => {
  const { id } = ctx.request.body;
  const user_id = ctx.state.user.id;
  await SmsTemplate.query()
    .where({
      id,
      user_id
    })
    .delete();
  ctx.body = { id };
};
