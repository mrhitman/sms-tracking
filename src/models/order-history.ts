import db from '../services/db';
import { Model } from 'objection';

export default class OrderHistory extends Model {
  public id: number;
  public user_id: number;
  public order_id: number;
  public status: string;
  public data: string;
  public created_at: number;

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
