"use strict";

const Router = require("koa-router");

const router = new Router();

router.post("/order", require("./create"));
router.post("/order/update", require("./update"));
router.post("/order/pause", require("./pause"));
router.post("/order/unpause", require("./unpause"));
router.post("/order/load/csv", require("./load-csv"));
router.post("/order/load/xls", require("./load-xls"));
router.post("/order/load/txt", require("./load-txt"));
router.post("/order/load/json", require("./load-json"));

module.exports = router;
