import db from '../services/db';
import { Model } from 'objection';

enum Status {
  sent = "sent",
  not_reached = "not_reached",
  in_progress = "in_progress"
}

export default class Sms extends Model {
  public id: number;
  public order_id: number;
  public user_id: number;
  public sms_template_id: number;
  public status: Status;
  public send_time: number;
  public sms_raw: string;

  static get tableName() {
    return "sms";
  }

  static get jsonSchema() {
    return {
      type: "object",
      properties: {
        order_id: { type: "number" },
        user_id: { type: "number" },
        sms_template_id: { type: "number" },
        status: { enum: ["sent", "not_reached", "in_progress"] },
        send_time: { type: "number" },
        sms_raw: { type: "string" }
      }
    };
  }
}

Sms.knex(db);
