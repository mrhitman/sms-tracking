import { Model } from "objection";
const db = require("../services/db");
const SmsTemplate = require("./sms-template");
const Order = require("./order");

export default class User extends Model {
  public id: number;
  public name: string;
  public email: string;
  public phone: string;
  public default_remind_sms_template_id: number;
  public default_on_send_sms_template_id: number;
  public default_remind_sms_template?: SmsTemplate;
  public default_on_send_sms_template?: SmsTemplate;

  static get tableName() {
    return "user";
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      phone: this.phone,
      default_remind_sms_template_id: this.default_remind_sms_template_id,
      default_on_send_sms_template_id: this.default_on_send_sms_template_id,
      default_remind_sms_template: this.default_remind_sms_template
        ? this.default_remind_sms_template.template
        : "",
      default_on_send_sms_template: this.default_on_send_sms_template
        ? this.default_on_send_sms_template.template
        : ""
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
      default_remind_sms_template: {
        relation: Model.HasOneRelation,
        modelClass: SmsTemplate,
        join: {
          from: "user.default_remind_sms_template_id",
          to: "sms_template.id"
        }
      },
      default_on_send_sms_template: {
        relation: Model.HasOneRelation,
        modelClass: SmsTemplate,
        join: {
          from: "user.default_on_send_sms_template_id",
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
        default_remind_sms_template_id: {
          type: "number"
        },
        default_on_send_sms_template_id: {
          type: "number"
        }
      }
    };
  }
}

User.knex(db);
