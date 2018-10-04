import Order from "../../models/order";
import { joi, validate } from "../../helpers/validate";

const schema = joi.object().keys({
  id: joi.number().required()
});

export default async ctx => {
  validate(ctx, schema);
  const { id } = ctx.request.body;
  const order = await Order.query().findById(id);
  await order.unpause();
  ctx.body = order;
};
