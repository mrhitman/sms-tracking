"use strict";

const RefreshToken = require("../../models/refresh-token");

module.exports = async ctx => {
  const user = ctx.state.user;
  await RefreshToken.query()
    .delete()
    .where({ user_id: user.id });
  ctx.status = 204;
};
