import Config from "../../models/config";
import Order from "../../models/order";
import { first } from "lodash";

export default async ctx => {
  const { id } = ctx.params;
  const order = await Order.query().findById(id);
  if (!order) {
    return;
  }
  const poshta = ctx.scheduler.api;
  const apiKey = await Config.get("novaposhta_key");
  const response = await poshta.getStatusDocuments(apiKey, [order]);
  ctx.body = first(response.data);
};
