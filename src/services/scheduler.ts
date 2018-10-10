import * as moment from "moment";
import * as schedule from "node-schedule";
import Config from "../models/config";
import NovaPoshta from "../services/novaposhta";
import Order from "../models/order";
import OrderHistory from "../models/order-history";
import { map, partialRight, pick } from "lodash";
import { remind } from "../services/sms";

export const Code = {
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
  private scheduler: any[] = [];

  constructor(public readonly api: NovaPoshta) {
    this.notify = this.notify.bind(this);
    this.checkOrders = this.checkOrders.bind(this);
  }

  async start() {
    const interval =
      (await Config.get("orders_check_interval")) || "*/10 * * * *";
    this.scheduler.push(schedule.scheduleJob(interval, this.checkOrders));
    this.scheduler.push(schedule.scheduleJob("* * * * *", this.notify));
    this.scheduler.push(schedule.scheduleJob("0 10 * * *", this.notify));
    this.scheduler.push(schedule.scheduleJob("0 11 * * *", this.notify));
    this.scheduler.push(schedule.scheduleJob("0 12 * * *", this.notify));
    this.scheduler.push(schedule.scheduleJob("0 13 * * *", this.notify));
    this.scheduler.push(schedule.scheduleJob("0 14 * * *", this.notify));
    this.scheduler.push(schedule.scheduleJob("0 15 * * *", this.notify));
    this.scheduler.push(schedule.scheduleJob("0 16 * * *", this.notify));
    this.scheduler.push(schedule.scheduleJob("0 17 * * *", this.notify));
    this.scheduler.push(schedule.scheduleJob("0 18 * * *", this.notify));
  }

  stop() {
    map(this.scheduler, task => task.cancel());
  }

  async notify() {
    console.log("____ notify ____");
    const orders = await Order.query().where({
      status: "ready"
    });
    Promise.all(
      map(orders, order => {
        if (
          !order.last_sms_sent ||
          moment().diff(moment(order.last_sms_sent)) >= 85400000
        ) {
          return remind(order);
        }
        return Promise.resolve();
      })
    );
  }

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
    return "unknown";
  }

  async checkOrders() {
    console.log("____ checkOrders ____");
    const novaposhtaKey = await Config.get("novaposhta_key");

    const orders = await Order.query().whereNotIn("status", [
      "done",
      "refused",
      "paused"
    ]);

    const cards = map(orders, partialRight(pick, ["ttn", "phone"]));
    const invoices = (await this.api.getStatusDocuments(novaposhtaKey, cards))
      .data;

    Promise.all(
      map(invoices, (invoice, i) => {
        const order = orders[i];
        if (invoice.StatusCode !== order.status) {
          const status = Scheduler.getStatus(invoice);
          return OrderHistory.query().insert({
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
  }
}
