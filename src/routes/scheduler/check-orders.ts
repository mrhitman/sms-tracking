export default async ctx => {
  ctx.scheduler.checkOrders();
  ctx.body = "ok";
};
