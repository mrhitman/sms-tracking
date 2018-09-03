const { Model } = require("objection");
const db = require("../services/db");

class Order extends Model {
  static get tableName() {
    return "order";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["ttl", "status", "phone", "user_id"],
      properties: {
        phone: { type: "string" },
        type: { enum: ["novaposhta"] },
        ttl: { type: "string" },
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
