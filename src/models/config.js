"use strict";

const { Model } = require("objection");
const db = require("../services/db");

class Config extends Model {
  static get tableName() {
    return "config";
  }

  static get jsonSchema() {
    return {
      type: "object",
      properties: {
        name: {
          type: "string"
        },
        value: {
          type: "string"
        },
      }
    };
  }
}

Config.knex(db);
module.exports = Config;