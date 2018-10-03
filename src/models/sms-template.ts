import { Model } from "objection";
import db from "../services/db";

export default class SmsTemplate extends Model {
  public user_id: number;
  public template: string;
  public description: string;

  static get tableName() {
    return "sms_template";
  }

  static get jsonSchema() {
    return {
      type: "object",
      properties: {
        user_id: { type: "number" },
        template: { type: "string" },
        description: { type: "string" }
      }
    };
  }
}

SmsTemplate.knex(db);
