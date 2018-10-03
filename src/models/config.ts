"use strict";

import { Model } from "objection";
import db from "../services/db";
import { zipObject, map } from "lodash";

export default class Config extends Model {
  public name: string;
  public value: string;

  static get tableName() {
    return "config";
  }

  static async get(key: string) {
    return (await Config.query().findOne({ name: key })).value;
  }

  static async all() {
    const all = await Config.query().execute();
    return zipObject(map(all, "name"), map(all, "value"));
  }

  static get jsonSchema() {
    return {
      type: "object",
      properties: {
        name: { type: "string" },
        value: { type: "string" }
      }
    };
  }
}

Config.knex(db);
