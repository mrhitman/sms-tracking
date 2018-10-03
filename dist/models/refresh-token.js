"use strict";
const { Model } = require("objection");
const db = require("../services/db");
class RefreshToken extends Model {
    static get idColumn() {
        return "token";
    }
    static get tableName() {
        return "refresh_token";
    }
    static get jsonSchema() {
        return {
            type: "object",
            properties: {
                user_id: { type: "number" },
                token: { type: "string" },
                created_at: { type: "number" }
            }
        };
    }
}
RefreshToken.knex(db);
module.exports = RefreshToken;
//# sourceMappingURL=refresh-token.js.map