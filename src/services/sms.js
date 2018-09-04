"use strict";

const BSG = require("bsg-nodejs");
const moment = require("moment")();
const Sms = require("../models/sms");
const User = require("../models/user");
const _ = require("lodash");

const processOrders = async orders => {
  orders.map(send);
};

const send = async order => {
  const user = await User.query().findById(order.user_id);
  const bsg = BSG(user.smg_token);
  const sms = await Sms.query().insert({
    order_id: order.id,
    status: "in_progress",
    send_time: moment.format()
  });
  try {
    console.log("send sms");
    const response = await bsg.createSMS({
      destination: "phone",
      originator: "alpha name",
      body: order.sms_template,
      msisdn: order.phone,
      reference: `ext_id_${user.reference}`,
      validity: "1",
      tariff: "9"
    });
    if (response.error || (response.result && response.result.error)) {
      throw new Error(response.errorDescription);
    }
    console.log("sms sent");
    return await Promise.all([
      sms.$query().update({ status: "sent" }),
      user.$query().update({ reference: user.reference + 1 })
    ]);
  } catch (_) {
    return await sms.$query().update({ status: "not_reached" });
  }
};

module.exports = processOrders;
