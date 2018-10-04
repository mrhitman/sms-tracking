import SmsTemplate from "../../models/sms-template";
import { joi, validate } from "../../helpers/validate";

const schema = joi.object().keys({
  template: joi.string().required()
});

export default async ctx => {
  const user_id = ctx.state.user.id;
  validate(ctx, schema);
  const { template } = ctx.request.body;
  const smsTemplate = await SmsTemplate.query().insert({ user_id, template });
  ctx.body = smsTemplate;
  ctx.status = 201;
};
