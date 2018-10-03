import schedule from "node-schedule";
import Order from "../models/order";
import OrderHistory from "../models/order-history";
import Config from "../models/config";
import NovaPoshta from "../services/novaposhta";
import { remind } from "../services/sms";
import * as moment from "moment";
import _ = require("lodash");

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

export default class Scheduler {
  private scheduler = [];

  constructor() {
    this.notify = this.notify.bind(this);
    this.checkOrders = this.checkOrders.bind(this);
    this.start();
  }

  async start() {
    const interval = await Config.get("orders_check_interval") || "*/10 * * * *";
    this.scheduler = [
      schedule.scheduleJob(interval, this.checkOrders),
      schedule.scheduleJob("* * * * *", this.notify),
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

  async notify() {
    console.log('____ notify ____');
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

  static getStatus(invoice) {
      if (Code.ready.includes(invoice.StatusCode)) {
          return "ready";
      }
      if (Code.done.includes(invoice.StatusCode)) {
          return "done";
      }
      if (Code.refuse.includes(invoice.StatusCode)) {
          return "refuse";
      }
      if (Code.stopsaving.includes(invoice.StatusCode)) {
          return "refuse";
      }
  }

  async checkOrders() {
    console.log('____ checkOrders ____');
    const api = new NovaPoshta();
    const novaposhtaKey = await Config.get("novaposhta_key");

    const orders = await Order.query().whereNotIn("status", ["done", "refused", "paused"]);

    const cards = _.map(orders, _.partialRight(_.pick, ["ttn", "phone"]));
    const invoices = (await api.getStatusDocuments(novaposhtaKey, cards)).data;

    Promise.all(
        _.map(invoices, (invoice, i) => {
            const order = orders[i];
            if (invoice.StatusCode !== order.status) {
                const status = Scheduler.getStatus(invoice);
                return OrderHistory.query(t).insert({
                    user_id: order.user_id,
                    order_id: order.id,
                    status: status,
                    created_at: moment().unix(),
                    data: JSON.stringify(invoice)
                });
            }
            return Promise.resolve();
        })
    );
  };
}
