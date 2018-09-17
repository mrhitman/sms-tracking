"use strict";

const Order = require("../../models/order");
const { parse } = require("papaparse");
const moment = require("moment")();

module.exports = async ctx => {
  const result = parse(ctx.request.body.files[0], {
    skipEmptyLines: true,
    header: true
  });
  const user_id = ctx.state.user.id;
  const orders = await Promise.all(
    result.data.map(({ ttn, phone, sms_template }) => {
      return Order.query().insert({
        user_id,
        ttn,
        phone,
        status: "pending",
        type: "novaposhta",
        sms_template:
          sms_template || user.default_sms_template || "SMS template",
        created_at: moment.format()
      });
    })
  );
  ctx.body = orders;
  ctx.state = 201;
};
