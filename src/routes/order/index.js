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
router.get("/order/track/:id", auth, require("./track"));
router.post("/order/load/csv", auth, require("./load-csv"));

module.exports = router;
