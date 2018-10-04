import User from '../../models/user';
import { joi, validate } from '../../helpers/validate';

const schema = joi.object().keys({
  name: joi.string().required(),
  email: joi.string().email(),
  phone: joi.string().phoneNumber({ format: "international" }),
  default_remind_sms_template_id: joi.number(),
  default_on_send_sms_template_id: joi.number(),
  reference: joi.number()
});

export default async ctx => {
  validate(ctx, schema);
  const user_id = ctx.state.user.id;
  const body = ctx.request.body;
  const user = await User.query().updateAndFetchById(user_id, body);
  ctx.body = user;
};
