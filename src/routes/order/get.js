"use strict";

const Order = require("../../models/order");
const { joi, validate } = require("../../helpers/validate");

const schema = joi.object().keys({
  id: joi.number().required()
});

module.exports = async ctx => {
  const user_id = ctx.state.user.id;
  ctx.body = await Order.query()
    .eager("[template]")
    .where({ user_id });
};
