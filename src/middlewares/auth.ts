import * as passport from "koa-passport";

export default passport.authenticate("jwt", {
  session: false
});
