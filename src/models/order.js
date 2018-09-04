const { Model } = require("objection");
const db = require("../services/db");
const Sms = require("./sms");
const User = require("./user");

class Order extends Model {
  static get tableName() {
    return "order";
  }

  check() {}

  static get relationMappings() {
    return {
      sms: {
        relation: Model.HasManyRelation,
        modelClass: Sms,
        join: {
          from: 'order.id',
          to: 'sms.order_id',
        }
      },
      user: {
        relation: Model.HasOneRelation,
        modelClass: User,
        join: {
          from: 'order.user_id',
          to: 'user.id',
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
