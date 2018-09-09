"use strict";

const BSG = require("bsg-nodejs");
const moment = require("moment");
const Sms = require("../models/sms");
const User = require("../models/user");
const Config = require("../models/config");
const _ = require("lodash");

const processOrders = async orders => {
  orders.map(send);
};

const canSendSms = order =>
  order.status === "in_progress" &&
  order.last_sms_sent &&
  moment().diff(moment(order.last_sms_sent)) < 86400000;

const send = async order => {
  if (!canSendSms(order)) {
    return;
  }
  const user = await User.query().findById(order.user_id);
  const bsg_token = await Config.get('bsg_token');
  const bsg = BSG(bsg_token);
  const sms = await Sms.query().insert({
    order_id: order.id,
    status: "in_progress",
    send_time: moment().unix()
  });
  try {
    const response = await bsg.createSMS({
      destination: "phone",
      originator: user.alpha_name,
      body: order.sms_template,
      msisdn: order.phone,
      reference: `ext_id_${user.reference}`,
      validity: "1",
      tariff: "9"
    });
    if (response.error || (response.result && response.result.error)) {
      throw new Error(response.errorDescription);
    }
    return await Promise.all([
      sms
        .$query()
        .update({ status: "sent", sms_raw: JSON.stringify(response) }),
      order.$query().update({ last_sms_sent: moment().unix() }),
      user.$query().update({ reference: user.reference + 1 })
    ]);
  } catch (_) {
    return await sms.$query().update({ status: "not_reached" });
  }
};

module.exports = processOrders;
