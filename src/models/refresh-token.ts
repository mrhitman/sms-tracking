import { Model } from "objection";
import db from "../services/db";

export default class RefreshToken extends Model {
  public user_id: number;
  public token: string;
  public created_at: number;

  static get idColumn() {
    return "token";
  }

  static get tableName() {
    return "refresh_token";
  }

  static get jsonSchema() {
    return {
      type: "object",
      properties: {
        user_id: { type: "number" },
        token: { type: "string" },
        created_at: { type: "number" }
      }
    };
  }
}

RefreshToken.knex(db);
