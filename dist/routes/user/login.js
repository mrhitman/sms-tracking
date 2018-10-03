"use strict";
const User = require("../../models/user");
const RefreshToken = require("../../models/refresh-token");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const uuid = require("uuid");
const moment = require("moment")();
module.exports = async (ctx) => {
    const { email, password } = ctx.request.body;
    const user = await User.query()
        .eager("[default_remind_sms_template,default_on_send_sms_template]")
        .findOne({ email });
    if (!user) {
        ctx.status = 403;
        return;
    }
    if (!bcrypt.compareSync(String(password), user.password)) {
        return;
    }
    const token = jwt.sign({ id: user.id }, process.env.SALT, {
        expiresIn: "1h"
    });
    const refreshToken = await RefreshToken.query().insert({
        user_id: user.id,
        token: uuid(),
        created_at: moment.unix()
    });
    ctx.body = {
        user,
        token,
        refreshToken: refreshToken.token
    };
};
//# sourceMappingURL=login.js.map