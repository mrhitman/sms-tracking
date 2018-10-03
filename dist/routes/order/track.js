"use strict";
const Order = require("../../models/order");
const Config = require("../../models/config");
const NovaPosta = require("../../services/novaposhta");
module.exports = async (ctx) => {
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
//# sourceMappingURL=track.js.map