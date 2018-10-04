import SmsTemplate from '../../models/sms-template';

export default async ctx => {
  const user_id = ctx.state.user.id;
  ctx.body = await SmsTemplate.query().where({ user_id });
};
