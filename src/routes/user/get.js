const User = require("../../models/user");

module.exports = async ctx => {
  const { id } = ctx.params;
  const user = await User.query()
    .eager("[orders,smsTemplates]")
    .findById(id);
  if (user) {
    ctx.body = user;
  }
};
