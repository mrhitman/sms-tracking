import db from "../services/db";
import { Model } from "objection";

export default class Payment extends Model {
  public id: number;
  public amount: number;
  public user_id: number;
  public created_at: number;

  static get tableName() {
    return "payment";
  }

  static get jsonSchema() {
    return {
      type: "object",
      properties: {
        amount: { type: "number" },
        user_id: { type: "number" },
        created_at: { type: "number" }
      }
    };
  }
}

Payment.knex(db);
