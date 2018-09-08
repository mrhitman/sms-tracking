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
      },
      defaultSmsTemplate: {
        relation: Model.HasOneRelation,
        modelClass: SmsTemplate,
        join: {
          from: "user.default_sms_template_id",
          to: "sms_template.id"
        }
      }
    };
  }

  static get jsonSchema() {
    return {
      type: "object",
      properties: {
        name: {
          type: "string"
        },
        email: {
          type: "string"
        },
        password: {
          type: "string"
        },
        phone: {
          type: "string"
        },
        reference: {
          type: "number"
        },
        default_sms_template_id: {
          type: "number"
        }
      }
    };
  }
}

User.knex(db);
module.exports = User;