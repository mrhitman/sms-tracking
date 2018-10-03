"use strict";

const OrderSms = require("../../models/sms");

module.exports = async ctx => {
  const { id } = ctx.params;
  const user_id = ctx.state.user.id;
  ctx.body = await OrderSms.query().where({ order_id: id, user_id });
};
