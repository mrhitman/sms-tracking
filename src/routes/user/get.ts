export default async ctx => {
  ctx.body = ctx.state.user;
};
