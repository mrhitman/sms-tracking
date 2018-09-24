"use strict";

const User = require("../../models/user");
const { joi, validate } = require("../../helpers/validate");

const schema = joi.object().keys({
  name: joi.string().required(),
  email: joi
    .string()
    .email()
    .required(),
  phone: joi
    .string()
    .phoneNumber({ format: "international" })
    .required(),
  default_remind_sms_template_id: joi.number(),
  default_on_send_sms_template_id: joi.number()
});

module.exports = async ctx => {
  validate(ctx, schema);
  const body = ctx.request.body;
  const user = await User.query().updateAndFetchById(body.id, body);
  ctx.body = user;
};
