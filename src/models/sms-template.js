const { Model } = require("objection");
const db = require("../services/db");

class SmsTemplate extends Model {
  static get tableName() {
    return "sms_template";
  }

  static get jsonSchema() {
    return {
      type: "object",
      properties: {
        user_id: { type: "number" },
        template: { type: "string" }
      }
    };
  }
}

SmsTemplate.knex(db);
module.exports = SmsTemplate;
