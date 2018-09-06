"use strict";

const Router = require("koa-router");
const passport = require("koa-passport");

const router = new Router();

router.get("/user/:id", require("./get"));
router.post("/user", require("./create"));
router.post("/user/login", require("./login"));
router.post("/user/logout", passport.authenticate("jwt", {
    session: false,
}), require("./logout"));
router.post("/user/refresh", require("./refresh"));
router.post("/user/update", require("./update"));

module.exports = router;