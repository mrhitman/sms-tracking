const User = require("../../models/user");

module.exports = async ctx => {
  const { name, email, phone } = ctx.request.body;
  const user = await User.query().insert({ name, email, phone });
  ctx.body = user;
  ctx.status = 201;
};
