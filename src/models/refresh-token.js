"use strict";

const { Model } = require("objection");
const db = require("../services/db");

class RefreshToken extends Model {
  static get tableName() {
    return "refresh_token";
  }

  static get jsonSchema() {
    return {
      type: "object",
      properties: {
        user_id: { type: "number" },
        token: { type: "string" }
      }
    };
  }
}

RefreshToken.knex(db);
module.exports = RefreshToken;
