"use strict";
const { Model } = require("objection");
const db = require("../services/db");
class Sms extends Model {
    static get tableName() {
        return "sms";
    }
    static get jsonSchema() {
        return {
            type: "object",
            properties: {
                order_id: { type: "number" },
                user_id: { type: "number" },
                sms_template_id: { type: "number" },
                status: { enum: ["sent", "not_reached", "in_progress"] },
                send_time: { type: "number" },
                sms_raw: { type: "string" }
            }
        };
    }
}
Sms.knex(db);
module.exports = Sms;
//# sourceMappingURL=sms.js.map