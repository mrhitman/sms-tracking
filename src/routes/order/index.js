"use strict";

const Router = require("koa-router");
const auth = require("../../middlewares/auth");

const router = new Router();

router.get("/order", auth, require("./get"));
router.post("/order", auth, require("./create"));
router.post("/order/delete", auth, require("./delete"));
router.post("/order/update", auth, require("./update"));
router.post("/order/pause", auth, require("./pause"));
router.post("/order/unpause", auth, require("./unpause"));
router.post("/order/send-sms", auth, require("./send-sms"));
router.post("/order/load/csv", auth, require("./load-csv"));
router.get("/order/:id/history", auth, require("./history"));
router.get("/order/:id/track", auth, require("./track"));
router.get("/order/:id/sms", auth, require("./sms"));

module.exports = router;
