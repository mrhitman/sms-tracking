import SmsTemplate from "../../models/sms-template";
import { joi, validate } from "../../helpers/validate";

const schema = joi.object().keys({
  id: joi.number(),
  template: joi.string(),
  description: joi.string()
});

export default async ctx => {
  validate(ctx, schema);
  const body = ctx.request.body;
  const smsTemplate = await SmsTemplate.query().updateAndFetchById(
    body.id,
    body
  );
  ctx.body = smsTemplate;
};
