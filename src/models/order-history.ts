import { Model } from "objection";
import db from "../services/db";

export default class OrderHistory extends Model {
  static get tableName() {
    return "order_history";
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
