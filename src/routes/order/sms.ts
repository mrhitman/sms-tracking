import OrderSms from "../../models/sms";

export default async ctx => {
  const { id } = ctx.params;
  const user_id = ctx.state.user.id;
  ctx.body = await OrderSms.query().where({ order_id: id, user_id });
};
