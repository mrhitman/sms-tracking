"use strict";

const { Model } = require("objection");
const db = require("../services/db");
const Order = require("./order");

class OrderHistory extends Model {
  static get tableName() {
    return "order_history";
  }

  static get relationMappings() {
    return {
      order: {
        relation: Model.HasOneRelation,
        modelClass: Order,
        join: {
          from: "order.id",
          to: "sms.order_id"
        }
      },
    };
  }

  static get jsonSchema() {
    return {
      type: "object",
      properties: {
        user_id: { type: "number" },
        order_id: { type: "number" },
        status: { type: "string" },
        data: { type: "string" },
        created_at: { type: "number" }
      }
    };
  }
}

OrderHistory.knex(db);
module.exports = OrderHistory;
