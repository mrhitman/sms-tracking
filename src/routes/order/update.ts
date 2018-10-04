import Order from '../../models/order';
import { joi, validate } from '../../helpers/validate';

const schema = joi.object().keys({
  id: joi.number().required(),
  phone: joi.string().phoneNumber({ format: "international" }),
  type: joi.string(),
  ttn: joi.number(),
  sms_template_id: joi.number(),
  status: joi.string()
});

export default async ctx => {
  const body = ctx.request.body;
  validate(ctx, schema);
  const order = await Order.query().updateAndFetchById(body.id, body);
  if (order) {
    ctx.body = order;
  }
};
