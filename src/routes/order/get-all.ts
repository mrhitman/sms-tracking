import Order from '../../models/order';

export default async ctx => {
  const user_id = ctx.state.user.id;
  ctx.body = await Order.query()
    .eager("[remind_template,on_send_template]")
    .where({ user_id });
};
