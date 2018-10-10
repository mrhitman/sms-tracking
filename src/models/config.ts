import db from "../services/db";
import { map, zipObject } from "lodash";
import { Model } from "objection";

export default class Config extends Model {
  public id: number;
  public name: string;
  public value: string;

  static get tableName() {
    return "config";
  }

  static async get(key: string): Promise<string | number> {
    const config = await Config.query().findOne({ name: key });
    if (!config) {
      throw new Error(`No such config item:${key}`);
    }
    return config.value;
  }

  static async all(): Promise<Array<Config>> {
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
