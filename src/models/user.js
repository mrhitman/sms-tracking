const { Model } = require("objection");
const db = require("../services/db");

class User extends Model {
  static get tableName() {
    return "user";
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
