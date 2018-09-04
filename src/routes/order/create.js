const User = require("../../models/user");
const Order = require("../../models/order");
const moment = require("moment")();

module.exports = async ctx => {
  const { user_id, phone, ttn } = ctx.request.body;
  const user = await User.query().findById(user_id);
  const order = await Order.query().insert({
    user_id,
    ttn,
    phone,
    status: "pending",
    type: "novaposhta",
    sms_template:
      ctx.request.body.sms_template ||
      user.default_sms_template ||
      "SMS template",
    created_at: moment.format()
  });
  ctx.body = order;
  ctx.status = 201;
};
