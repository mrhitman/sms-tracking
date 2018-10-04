import Order from '../../models/order';
import { joi, validate } from '../../helpers/validate';

const schema = joi.object().keys({
  id: joi.number().required()
});

export default async ctx => {
  const user_id = ctx.state.user.id;
  validate(ctx, schema);
  const { id } = ctx.request.body;
  await Order.query()
    .where({
      id,
      user_id
    })
    .delete();
  ctx.body = { id };
};
