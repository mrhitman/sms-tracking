"use strict";

const Order = require("../../models/order");
const { joi, validate } = require("../../helpers/validate");

const schema = joi.object().keys({
  id: joi.number().required()
});

module.exports = async ctx => {
  const user_id = ctx.state.user.id;
  validate(ctx, schema);
  const { id } = ctx.request.body;
  await Order.query()
    .where({
      id,
      user_id
    })
    .delete();
  ctx.body = { id };
};
