"use strict";

const Order = require("../../models/order");
const OrderHistory = require("../../models/order-history");
const moment = require("moment");
const Config = require("../../models/config");
const NovaPoshta = require("../../services/novaposhta");
const { on_send } = require("../../services/sms");
const db = require("../../services/db");
const Scheduler = require("../../services/scheduler");
const { joi, validate } = require("../../helpers/validate");
const { transaction } = require("objection");
const _ = require("lodash");

const schema = joi.object().keys({
  phone: joi
    .string()
    .phoneNumber({ format: "international" })
    .required(),
  ttn: joi.number().required(),
  remind_sms_template_id: joi.number().required(),
  on_send_sms_template_id: joi.number(),
  send_sms: joi.boolean()
});

module.exports = async ctx => {
  const user_id = ctx.state.user.id;
  validate(ctx, schema);
  const { phone, ttn, remind_sms_template_id, on_send_sms_template_id, send_sms } = ctx.request.body;

  await transaction(db, async t => {
    const order = await Order.query(t).insert({
      user_id,
      ttn,
      phone: phone.replace(/\D/g, ""),
      status: "unknown",
      type: "novaposhta",
      last_sms_sent: 0,
      remind_sms_template_id,
      on_send_sms_template_id,
      created_at: moment().unix()
    });

    const api = new NovaPoshta();
    const novaposhtaKey = await Config.get("novaposhta_key");
    const invoice = _.first(
      (await api.getStatusDocuments(novaposhtaKey, [order])).data
    );

    if (invoice.StatusCode) {
      order.$query(t).update({ status: invoice.StatusCode});
    }

    await OrderHistory.query(t).insert({
      user_id: order.user_id,
      order_id: order.id,
      status: order.status,
      created_at: moment().unix(),
      data: JSON.stringify(invoice),
      created_at: moment().unix()
    });

    if (!!send_sms) {
      await on_send(order);
    }

    await OrderHistory.query(t).insert({
      order_id: order.id,
      user_id,
      data: JSON.stringify(invoice),
      status: invoice.StatusCode || "unknown",
      created_at: moment().unix()
    });
    ctx.body = order;
    ctx.status = 201;
  });
};
