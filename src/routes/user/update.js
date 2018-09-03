const User = require("../../models/user");

module.exports = async ctx => {
  const { id } = ctx.request.body;
  const user = await User.query().findById(id);
  ctx.body = user;
};
