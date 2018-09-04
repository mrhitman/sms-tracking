"use strict";

const schedule = require("node-schedule");
const Order = require("../models/order");
const processOrders = require("./sms");

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

const orderTemplate = "*/30 * * * *";
const smsTemplate = "0 10 * * *";

class Scheduler {
  constructor() {
    this.start();
  }

  async checkOrdersStatuses() {
    const pendingOrders = await Order.query().where({ status: "pending" });
    pendingOrders.map(async order => order.start());

    const inProgressOrders = await Order.query().where({
      status: "in_progress"
    });

    inProgressOrders.map(async order => order.complete());
  }

  async sendSms() {
    console.log("check sms");
    const orders = await Order.query().where({ status: "in_progress" });
    await processOrders(orders);
  }

  stop() {
    this.order.cancel();
    this.sms.cancel();
  }

  start() {
    this.order = schedule.scheduleJob(
      orderTemplate,
      this.checkOrdersStatuses.bind(this)
    );
    this.sms = schedule.scheduleJob(smsTemplate, this.sendSms.bind(this));
  }
}

module.exports = Scheduler;
