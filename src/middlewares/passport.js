const { Strategy, ExtractJwt } = require("passport-jwt");
const passport = require("koa-passport");
const User = require('../models/user');

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SALT,
};

passport.use(
    new Strategy(opts, async (payload, done) => {
        const user = await User.query().findById(payload.id);
        return user ? done(null, user) : done(null, false);
    })
);

module.exports = passport;
