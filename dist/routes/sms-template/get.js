"use strict";
const SmsTemplate = require("../../models/sms-template");
module.exports = async (ctx) => {
    const user_id = ctx.state.user.id;
    ctx.body = await SmsTemplate.query().where({ user_id });
};
//# sourceMappingURL=get.js.map