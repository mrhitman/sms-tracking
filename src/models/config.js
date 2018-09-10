"use strict";

const { Model } = require("objection");
const db = require("../services/db");
const _ = require("lodash");

class Config extends Model {
  static get tableName() {
    return "config";
  }

  static async get(key) {
    return (await Config.query().findOne({ name: key })).value;
  }

  static async all() {
    const all = await Config.query().all();
    return _.zipObject(_.map(all, "name"), _.map(all, "value"));
  }

  static get jsonSchema() {
    return {
      type: "object",
      properties: {
        name: { type: "string" },
        value: { type: "string" },
      }
    };
  }
}

Config.knex(db);
module.exports = Config;