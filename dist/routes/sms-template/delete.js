"use strict";
const SmsTemplate = require("../../models/sms-template");
const { joi, validate } = require("../../helpers/validate");
const schema = joi.object().keys({
    id: joi.number().required()
});
module.exports = async (ctx) => {
    validate(ctx, schema);
    const { id } = ctx.request.body;
    const user_id = ctx.state.user.id;
    await SmsTemplate.query()
        .where({
        id,
        user_id
    })
        .delete();
    ctx.body = { id };
};
//# sourceMappingURL=delete.js.map