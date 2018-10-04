import User from "../../models/user";
import SmsTemplate from "../../models/sms-template";
import * as bcrypt from "bcrypt";
import { joi, validate } from "../../helpers/validate";

const schema = joi.object().keys({
  name: joi.string().required(),
  email: joi
    .string()
    .email()
    .required(),
  phone: joi
    .string()
    .phoneNumber({ format: "international" })
    .required(),
  password: joi.string().required(),
  "repeat-password": joi.string().required()
});

export default async ctx => {
  validate(ctx, schema);
  const { name, email, phone, password } = ctx.request.body;
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  if (await User.query().findOne({ email })) {
    ctx.body = "User with such email already exists";
    ctx.status = 409;
    return;
  }
  const user = await User.query().insert({
    name,
    email,
    phone,
    password: hash,
    reference: 0
  });
  const remindSmsTemplate = await SmsTemplate.query().insert({
    user_id: user.id,
    template: "Your order {{ttn}} has sent"
  });
  const onSendSmsTemplate = await SmsTemplate.query().insert({
    user_id: user.id,
    template: "Your order {{ttn}} had delivered, take it back please"
  });
  await user.$query().update({
    default_remind_sms_template_id: remindSmsTemplate.id,
    default_on_send_sms_template_id: onSendSmsTemplate.id
  });
  ctx.body = user;
  ctx.status = 201;
};
