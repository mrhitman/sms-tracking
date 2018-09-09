"use strict";

const User = require("../../models/user");

module.exports = async ctx => {
  ctx.body = ctx.state.user;
};
