"use strict";

const Router = require("koa-router");
// const auth = require("../../middlewares/auth");

const router = new Router();

router.get("/scheduler/notify", require("./notify"));
router.get("/scheduler/check-orders", require("./check-orders"));

module.exports = router;
