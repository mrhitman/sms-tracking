import Order from "../../models/order";
import Config from "../../models/config";
import NovaPosta from "../../services/novaposhta";

export default async ctx => {
  const { id } = ctx.params;
  const order = await Order.query().findById(id);
  if (!order) {
    return;
  }
  const poshta = new NovaPosta();
  const apiKey = await Config.get("novaposhta_key");
  const response = await poshta.getStatusDocuments(apiKey, [order]);
  ctx.body = response.data;
};
