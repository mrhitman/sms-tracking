export default async ctx => {
  ctx.state.scheduler.notify();
  ctx.body = "ok";
};
