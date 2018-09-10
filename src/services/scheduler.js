"use strict";

const schedule = require("node-schedule");
const Order = require("../models/order");
const Config = require("../models/config");
const NovaPoshta = require("../services/novaposhta");
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
  checking: [14],
  refuse: [102, 103, 108],
  stopsaving: [105]
};

class Scheduler {
  constructor() {
    this.sms = [];
    this.start();
  }

  async checkOrdersStatuses() {
    const novaposhta = new NovaPoshta();
    const pendingOrders = await Order.query().where({ status: "pending" });
    const novaposhtaKey = await Config.get('novaposhta_key');

    pendingOrders.map(async order => {
      const info = novaposhta.getStatusDocuments(novaposhtaKey, {
        phone: order.phone,
        ttn: order.ttn
      });
      if (TrackingStatus.ready.includes(info.status)) {
        await order.start();
      }
    });

    const inProgressOrders = await Order.query().where({
      status: "in_progress"
    });

    inProgressOrders.map(async order => {
      const info = novaposhta.getStatusDocuments(novaposhtaKey, {
        phone: order.phone,
        ttn: order.ttn
      });
      if (TrackingStatus.done.includes(info.status)) {
        await order.complete();
      }
      if (
        [...TrackingStatus.refuse, ...TrackingStatus.stopsaving].includes(
          info.status
        )
      ) {
        await order.complete();
      }
    });
    await processOrders(inProgressOrders);
  }

  async sendSms() {
    const orders = await Order.query().where({ status: "in_progress" });
    await processOrders(orders);
  }

  stop() {
    this.order.cancel();
    this.sms.map(item => item.cancel());
  }

  async start() {
    const ordersCheckInterval = await Config.get("orders_check_interval");
    this.order = schedule.scheduleJob(ordersCheckInterval, this.checkOrdersStatuses.bind(this));
    this.sms.push(schedule.scheduleJob("0 10 * * *", this.sendSms.bind(this)));
    this.sms.push(schedule.scheduleJob("0 11 * * *", this.sendSms.bind(this)));
    this.sms.push(schedule.scheduleJob("0 12 * * *", this.sendSms.bind(this)));
    this.sms.push(schedule.scheduleJob("0 13 * * *", this.sendSms.bind(this)));
    this.sms.push(schedule.scheduleJob("0 14 * * *", this.sendSms.bind(this)));
    this.sms.push(schedule.scheduleJob("0 16 * * *", this.sendSms.bind(this)));
    this.sms.push(schedule.scheduleJob("0 17 * * *", this.sendSms.bind(this)));
    this.sms.push(schedule.scheduleJob("0 18 * * *", this.sendSms.bind(this)));
  }
}

module.exports = Scheduler;
