"use strict";
const { Model } = require("objection");
const db = require("../services/db");
class OrderHistory extends Model {
    static get tableName() {
        return "order_history";
    }
    static get jsonSchema() {
        return {
            type: "object",
            properties: {
                user_id: { type: "number" },
                order_id: { type: "number" },
                status: { type: "string" },
                data: { type: "string" },
                created_at: { type: "number" }
            }
        };
    }
}
OrderHistory.knex(db);
module.exports = OrderHistory;
//# sourceMappingURL=order-history.js.map