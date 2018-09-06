"use strict";

const { Model } = require("objection");
const db = require("../services/db");
const Order = require("./order");
const SmsTemplate = require("./sms-template");

class User extends Model {
  static get tableName() {
    return "user";
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      phone: this.phone,
      novaposhta_key: this.novaposhta_key,
      bsg_token: this.bsg_token,
      alpha_name: this.alpha_name,
      novaposhta_key: this.novaposhta_key,
      default_sms_template: this.default_sms_template
    };
  }

  static get relationMappings() {
    return {
      orders: {
        relation: Model.HasManyRelation,
        modelClass: Order,
        join: {
          from: "user.id",
          to: "order.user_id"
        }
      },
      smsTemplates: {
        relation: Model.HasManyRelation,
        modelClass: SmsTemplate,
        join: {
          from: "user.id",
          to: "sms_template.user_id"
        }
      }
    };
  }

  static get jsonSchema() {
    return {
      type: "object",
      properties: {
        name: { type: "string" },
        email: { type: "string" },
        password: { type: "string" },
        phone: { type: "string" },
        novaposhta_key: { type: "string" },
        bsg_token: { type: "string" },
        alpha_name: { type: "string" },
        reference: { type: "number" },
        default_sms_template: { type: "string" }
      }
    };
  }
}

User.knex(db);
module.exports = User;
