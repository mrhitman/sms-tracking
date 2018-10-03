"use strict";

module.exports = async ctx => {
  ctx.body = ctx.state.user;
};
