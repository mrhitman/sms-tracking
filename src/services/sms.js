// const bsg = require("bsg");
const Sms = require("../models/sms");

class SmsService {
  constructor() {
    // this.bsg = bsg("<YOUR_ACCESS_KEY>");
  }

  async processOrders(orders) {
    orders.map(async order => {
      await Sms.query().insert({
        order_id: order.id,
        status: "in_progress",
        send_time: moment.format()
      });
    });
  }

  async send(order) {
    // const response = await bsg.createSMS({
    // destination: order.phone,
    // originator: "alpha name",
    // body: order.sms_template,
    // msisdn: "380972000000",
    // reference: "ext_id_16",
    // validity: "1",
    // tariff: "0"
    // });
    // return response;
  }
}

module.exports = new SmsService();
