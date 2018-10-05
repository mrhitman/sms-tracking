import db from "../services/db";
import OrderHistory from "./order-history";
import Sms from "./sms";
import SmsTemplate from "./sms-template";
import { Model } from "objection";

export default class Order extends Model {
  public id: number;
  public phone: string;
  public type: string;
  public ttn: string;
  public user_id: number;
  public remind_sms_template_id: number;
  public on_send_sms_template_id: number;
  public status: string;
  public last_sms_sent: number;
  public created_at: number;

  static get tableName() {
    return "order";
  }

  async pause() {
    if (this.status === "ready") {
      return this.$query().update({ status: "paused" } as any);
    }
  }

  async unpause() {
    if (this.status === "paused") {
      return this.$query().update({ status: "ready" } as any);
    }
  }

  static get relationMappings() {
    return {
      sms: {
        relation: Model.HasManyRelation,
        modelClass: Sms,
        join: {
          from: "order.id",
          to: "sms.order_id"
        }
      },
      remind_template: {
        relation: Model.HasOneRelation,
        modelClass: SmsTemplate,
        join: {
          from: "order.remind_sms_template_id",
          to: "sms_template.id"
        }
      },
      on_send_template: {
        relation: Model.HasOneRelation,
        modelClass: SmsTemplate,
        join: {
          from: "order.on_send_sms_template_id",
          to: "sms_template.id"
        }
      },
      history: {
        relation: Model.HasManyRelation,
        modelClass: OrderHistory,
        join: {
          from: "order.id",
          to: "order_history.order_id"
        }
      }
    };
  }

  static get jsonSchema() {
    return {
      type: "object",
      properties: {
        phone: { type: "string" },
        type: { enum: ["novaposhta"] },
        ttn: { type: "string" },
        user_id: { type: "number" },
        remind_sms_template_id: { type: "number" },
        on_send_sms_template_id: { type: "number" },
        status: { type: "string" },
        last_sms_sent: { type: "number" },
        created_at: { type: "number" }
      }
    };
  }
}

Order.knex(db);
