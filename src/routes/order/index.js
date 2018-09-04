"use strict";

const Router = require("koa-router");

const router = new Router();

router.post("/order", require("./create"));
router.post("/order/update", require("./update"));
router.post("/order/pause", require("./pause"));
router.post("/order/unpause", require("./unpause"));

module.exports = router;
