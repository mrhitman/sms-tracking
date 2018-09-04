"use strict";

const { Model } = require("objection");
const db = require("../services/db");
const Sms = require("./sms");

class Order extends Model {
  static get tableName() {
    return "order";
  }

  async start() {
    if (this.status === "pending") {
      console.log(`Start ${this.id} order`);
      return await this.$query().update({ status: "in_progress" });
    }
  }

  async complete() {
    console.log(this.status);
    if (["in_progress", "paused"].indexOf(this.status) !== -1) {
      console.log(`Complete ${this.id} order`);
      return await this.$query().update({ status: "done" });
    }
  }

  async pause() {
    if (this.status === "in_progress") {
      console.log(`Pause ${this.id} order`);
      return this.$query().update({ status: "paused" });
    }
  }

  async unpause() {
    if (this.status === "paused") {
      console.log(`Unpause ${this.id} order`);
      return this.$query().update({ status: "in_progress" });
    }
  }

  static get relationMappings() {
    return {
      sms: {
        relation: Model.HasManyRelation,
        modelClass: Sms,
        join: {
          from: "order.id",
          to: "sms.order_id"
        }
      }
    };
  }

  static get jsonSchema() {
    return {
      type: "object",
      properties: {
        phone: { type: "string" },
        type: { enum: ["novaposhta"] },
        ttn: { type: "string" },
        user_id: { type: "number" },
        sms_template: { type: "string" },
        status: {
          enum: ["pending", "in_progress", "paused", "done", "refused"]
        },
        created_at: { type: "string" }
      }
    };
  }
}

Order.knex(db);
module.exports = Order;
