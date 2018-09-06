"use strict";

const User = require("../../models/user");
const bcrypt = require("bcrypt");

module.exports = async ctx => {
  const { name, email, phone, password } = ctx.request.body;

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  if (await User.query().findOne({ email })) {
    ctx.body = "User with such email already exists";
    ctx.status = 409;
    return;
  }
  const user = await User.query().insert({ name, email, phone, password: hash });
  ctx.body = user;
  ctx.status = 201;
};
