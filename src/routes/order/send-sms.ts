import Order from "../../models/order";
import { remind } from "../../services/sms";
import { joi, validate } from "../../helpers/validate";

const schema = joi.object().keys({
  id: joi.number().required()
});

export default async ctx => {
  validate(ctx, schema);
  const { id } = ctx.request.body;
  const order = await Order.query()
    .eager("[on_send_template,remind_template]")
    .findById(id);
  remind(order);
  ctx.body = order;
};
