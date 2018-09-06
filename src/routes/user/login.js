"use strict";

const User = require("../../models/user");
const RefreshToken = require("../../models/refresh-token");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const uuid = require("uuid");

module.exports = async ctx => {
  const { email, password } = ctx.request.body;
  const user = await User.query().findOne({ email });
  if (!user) {
    ctx.status = 403;
    return;
  }

  if (!bcrypt.compareSync(String(password), user.password)) {
    return;
  }

  const token = jwt.sign({ id: user.id }, process.env.SALT, {
    expiresIn: "1h"
  });

  let refreshToken = await RefreshToken.query().findOne({ user_id: user.id });
  if (!refreshToken) {
    refreshToken = await RefreshToken.query()
      .insertAndFetch({ user_id: user.id, token: uuid() })
      .execute();
  }

  ctx.body = {
    user,
    token,
    refreshToken: refreshToken.token
  };
};
