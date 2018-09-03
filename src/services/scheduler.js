const schedule = require("node-schedule");
const Order = require("../models/order");

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

  checkOrdersStatuses = async () => {
    const orders = await Order.query().where({ status: "pending" });
    orders.map(
      async order => await order.$query().update({ status: "in_progress" })
    );
  };

  sendSms = async () => {
    const orders = await Order.query().where({ status: "pending" });
    orders.map(
      async order => await order.$query().update({ status: "in_progress" })
    );
  };

  stop() {
    this.order.cancel();
    this.sms.cancel();
  }

  start() {
    this.order = schedule.scheduleJob("*/30 * * * *", this.checkOrdersStatuses);
    this.sms = schedule.scheduleJob("0 10 * * *", this.sendSms);
  }
}

module.exports = Scheduler;
