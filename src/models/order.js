const { Model } = require("objection");
const db = require("../services/db");

class Order extends Model {
  static get tableName() {
    return "order";
  }

  check() {}

  static get relationMappings() {
    return {};
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
