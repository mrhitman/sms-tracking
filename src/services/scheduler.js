const schedule = require("node-schedule");
const moment = require("moment")();
const Order = require("../models/order");
const Sms = require("../models/sms");

const TrackingStatus = {
  wait: [1],
  deleted: [2],
  notfound: [3],
  inlocation: [4],
  inlocationexpress: [41],
  inprogress: [5, 101],
  inlocationinprogess: [6],
  ready: [7, 8],
  done: [9],
  taken: [10, 11, 106],
  checking: [14]
};

class Scheduler {
  constructor() {
    this.start();
  }

  async checkOrdersStatuses() {
    const orders = await Order.query().where({ status: "pending" });
    orders.map(
      async order => await order.$query().update({ status: "in_progress" })
    );
  }

  async sendSms() {
    const orders = await Order.query().where({ status: "in_progress" });
    orders.map(async order => {
      await Sms.query().insert({
        order_id: order.id,
        status: "in_progress",
        send_time: moment.format()
      });
    });
  }

  stop() {
    this.order.cancel();
    this.sms.cancel();
  }

  start() {
    this.order = schedule.scheduleJob(
      "*/30 * * * *",
      this.checkOrdersStatuses.bind(this)
    );
    this.sms = schedule.scheduleJob("0 10 * * *", this.sendSms.bind(this));
  }
}

module.exports = Scheduler;
