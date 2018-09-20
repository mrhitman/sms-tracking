"use strict";

const schedule = require("node-schedule");
const Order = require("../models/order");
const Config = require("../models/config");
const NovaPoshta = require("../services/novaposhta");
const { remind, on_send } = require("../services/sms");
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
    const interval = await Config.get("orders_check_interval");
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
    const orders = await Order.query().whereIn({ status: Code.ready });
    Promise.all(
      _.map(orders, order => {
        if (!order.last_sms_sent || moment().diff(moment(order.last_sms_sent)) >= 85400000) {
          return remind(order);
        }
        return Promise.resolve();
      })
    );
  };

  checkOrders = async () => {
    const api = new NovaPoshta();
    const novaposhtaKey = await Config.get("novaposhta_key");

    const orders = await Order.query().whereNotIn({
      status: [...Code.done, ...Code.refused, "paused"]
    });

    const cards = _.map(orders, _.partialRight(_.pick, ["ttn", "phone"]));
    const invoices = (await api.getStatusDocuments(novaposhtaKey, cards)).data;

    Promise.all(
      _.map(invoices, (invoice, i) => {
        const pl = [];
        const order = orders[i];
        if (invoice.StatusCode !== order.status) {
          if (Code.ready.includes(info.StatusCode)) {
            pl.push(this.ready(order, invoice));
          }
          if (Code.done.includes(info.StatusCode)) {
            pl.push(this.done(order, invoice));
          }
          if (Code.refuse.includes(info.StatusCode)) {
            pl.push(this.refuse(order, invoice));
          }
          if (Code.stopsaving.includes(info.StatusCode)) {
            pl.push(this.refuse(order, invoice));
          }
          pl.push(order.$query().update({ status: invoice.StatusCode }));
        }
      })
    );
  };

  async ready() {}

  async done() {}

  async refuse() {}
}

module.exports = Scheduler;
