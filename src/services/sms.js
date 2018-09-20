"use strict";

const BSG = require("bsg-nodejs");
const moment = require("moment");
const Sms = require("../models/sms");
const User = require("../models/user");
const Config = require("../models/config");
const { render } = require("mustache");
const _ = require("lodash");

const remind = async order => {
  send(order, order.remind_template);
};

const on_send = async order => {
  send(order, order.on_send);
};

const send = async (order, template) => {
  const user = await User.query().findById(order.user_id);
  const bsg_token = await Config.get("bsg_token");
  const bsg = BSG(bsg_token);
  const sms = await Sms.query().insert({
    order_id: order.id,
    status: "in_progress",
    send_time: moment().unix()
  });
  try {
    const alpha_name = await Config.get("alpha_name");
    const request = {
      destination: "phone",
      originator: alpha_name,
      body: render(template.template, {
        ...order,
        "user.phone": user.phone,
        "user.email": user.email
      }),
      msisdn: order.phone,
      reference: `ext_id_${user.reference}`,
      validity: "1",
      tariff: "9"
    };
    const response = await bsg.createSMS(request);
    if (response.error || (response.result && response.result.error)) {
      throw new Error(response.errorDescription);
    }
    return await Promise.all([
      sms.$query().update({
        status: "sent",
        sms_raw: JSON.stringify(response),
        sms_template_id: template.id
      }),
      order.$query().update({ last_sms_sent: moment().unix() }),
      user.$query().update({ reference: user.reference + 1 })
    ]);
  } catch (e) {
    return await sms.$query().update({
      status: "not_reached",
      sms_raw: e.toString(),
      sms_template_id: order.remind_template.id
    });
  }
};

module.exports = {
  remind,
  on_send
};
