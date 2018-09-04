const { Model } = require("objection");
const db = require("../services/db");
const Order = require("./order");

class Sms extends Model {
  static get tableName() {
    return "sms";
  }
  
  static get relationMappings() {
    return {
      order: {
        relation: Model.HasOneRelation,
        modelClass: Order,
        join: {
          from: 'sms.order_id',
          to: 'order.id',
        }
      }
    }
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["order_id"],
      properties: {
        order_id: { type: "number" },
        status: { enum: ["sent", "not_reached", "in_progress"] },
        send_time: { type: "string" }
      }
    };
  }
}

Sms.knex(db);
module.exports = Sms;
