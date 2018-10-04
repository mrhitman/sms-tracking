import SmsTemplate from '../../models/sms-template';
import { joi, validate } from '../../helpers/validate';

const schema = joi.object().keys({
  id: joi.number().required()
});

export default async ctx => {
  validate(ctx, schema);
  const { id } = ctx.request.body;
  const user_id = ctx.state.user.id;
  await SmsTemplate.query()
    .where({
      id,
      user_id
    })
    .delete();
  ctx.body = { id };
};
