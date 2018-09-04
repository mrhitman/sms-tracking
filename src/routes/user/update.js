const User = require("../../models/user");

module.exports = async ctx => {
  const body = ctx.request.body;
  const user = await User.query().updateAndFetchById(body.id, body);
  ctx.body = user;
};
