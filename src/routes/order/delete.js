"use strict";

const User = require("../../models/user");
const Order = require("../../models/order");
const moment = require("moment")();

module.exports = async ctx => {
  const user_id = ctx.state.user.id;
  const { id } = ctx.request.body;
  await Order.query()
    .where({
      id,
      user_id
    })
    .delete();
  ctx.body = { id };
};
