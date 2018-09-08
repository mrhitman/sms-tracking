"use strict";

const Order = require("../../models/order");
const NovaPosta = require("../../services/novaposhta")

module.exports = async ctx => {
  const { id } = ctx.params;
  const order = await Order.query().findById(id);
  const poshta = new NovaPosta();
  const response = await poshta.getStatusDocuments("", [order])
  ctx.body = response;
};
