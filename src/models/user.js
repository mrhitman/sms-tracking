const { Model } = require("objection");
const db = require("../services/db");
const Order = require("./order");

class User extends Model {
  static get tableName() {
    return "user";
  }

  static get relationMappings() {
    return {
      orders: {
        relation: Model.HasManyRelation,
        modelClass: Order,
        join: {
          from: 'user.id',
          to: 'order.user_id',
        }
      }
    }
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name", "email", "phone"],
      properties: {
        name: { type: "string" },
        email: { type: "string" },
        phone: { type: "string" },
        novaposhta_key: { type: "string" },
        alpha_name: { type: "string" },
        default_sms_template: { type: "string" }
      }
    };
  }
}

User.knex(db);
module.exports = User;
