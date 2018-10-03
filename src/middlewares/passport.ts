import { Strategy, ExtractJwt } from "passport-jwt";
import * as passport from "koa-passport";
import User from "../models/user";

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SALT
};

export default passport.use(
  new Strategy(opts, async (payload, done) => {
    const user = await User.query()
      .eager("[default_remind_sms_template,default_on_send_sms_template]")
      .findById(payload.id);
    return user ? done(null, user) : done(null, false);
  })
);
