"use strict";

const RefreshToken = require("../../models/refresh-token");
const jwt = require("jsonwebtoken");
const uuid = require('uuid');
const moment = require('moment')();

module.exports = async ctx => {
  const { token } = ctx.request.body;
  
  let refreshToken = await RefreshToken.query().findOne({ token });
  if (!refreshToken) {
    return;
  }

  await refreshToken
    .$query()
    .update({ token: uuid(), created_at: moment.unix() })
    .execute();

  const newToken = jwt.sign({ id: refreshToken.user_id }, process.env.SALT, {
    expiresIn: "1h"
  });

  ctx.body = {
    token: newToken,
    refreshToken: refreshToken.token
  };
};
