"use strict";

const schedule = require("node-schedule");
const Order = require("../models/order");
const OrderHistory = require("../models/order-history");
const Config = require("../models/config");
const NovaPoshta = require("../services/novaposhta");
const { remind } = require("../services/sms");
const moment = require("moment");
const _ = require("lodash");

const Code = {
  wait: ["1"],
  deleted: ["2"],
  notfound: ["3"],
  inlocation: ["4"],
  inlocationexpress: ["41"],
  inprogress: ["5", "101"],
  inlocationinprogess: ["6"],
  ready: ["7", "8"],
  done: ["9"],
  taken: ["10", "11", "106"],
  checking: ["14"],
  refuse: ["102", "103", "108"],
  stopsaving: ["105"]
};

class Scheduler {
  constructor() {
    this.start();
  }

  async start() {
    const interval = await Config.get("orders_check_interval") || "*/10 * * * *";
    this.scheduler = [
      schedule.scheduleJob(interval, this.checkOrders),
      schedule.scheduleJob("0 10 * * *", this.notify),
      schedule.scheduleJob("0 11 * * *", this.notify),
      schedule.scheduleJob("0 12 * * *", this.notify),
      schedule.scheduleJob("0 13 * * *", this.notify),
      schedule.scheduleJob("0 14 * * *", this.notify),
      schedule.scheduleJob("0 15 * * *", this.notify),
      schedule.scheduleJob("0 16 * * *", this.notify),
      schedule.scheduleJob("0 17 * * *", this.notify),
      schedule.scheduleJob("0 18 * * *", this.notify)
    ];
  }

  stop() {
    _.map(this.scheduler, task => task.cancel());
  }

  notify = async () => {
    const orders = await Order.query().where({
      status: "ready"
    });
    Promise.all(_.map(orders, order => {
      if (!order.last_sms_sent || moment().diff(moment(order.last_sms_sent)) >= 85400000) {
        return remind(order);
      }
      return Promise.resolve();
    }));
  };

  checkOrders = async () => {
    const api = new NovaPoshta();
    const novaposhtaKey = await Config.get("novaposhta_key");

    const orders = await Order.query().whereNotIn({
      status: ["done", "refused", "paused"]
    });

    const cards = _.map(orders, _.partialRight(_.pick, ["ttn", "phone"]));
    const invoices = (await api.getStatusDocuments(novaposhtaKey, cards)).data;

    Promise.all(_.map(invoices, (invoice, i) => {
      const order = orders[i];
      const pl = [];
      if (invoice.StatusCode !== order.status) {
        if (Code.ready.includes(info.StatusCode)) {
          pl.push(order.$query().update({
            status: "ready"
          }));
        }
        if (Code.done.includes(info.StatusCode)) {
          pl.push(order.$query().update({
            status: "done"
          }));
        }
        if (Code.refuse.includes(info.StatusCode)) {
          pl.push(order.$query().update({
            status: "refuse"
          }));
        }
        if (Code.stopsaving.includes(info.StatusCode)) {
          pl.push(order.$query().update({
            status: "refuse"
          }));
        }
        pl.push(OrderHistory.query().insert({
          user_id: order.user_id,
          order_id: order.id,
          status: order.status,
          created_at: moment().unix(),
          data: JSON.stringify(invoice)
        }));
        return Promise.all(pl);
      }
      return Promise.resolve();
    }));
  };
}

module.exports = Scheduler;