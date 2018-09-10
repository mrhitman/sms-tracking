"use strict";

const Router = require("koa-router");
const auth = require("../../middlewares/auth");

const router = new Router();

router.get("/order/:user_id", auth, require("./get"));
router.post("/order", auth, require("./create"));
router.post("/order/delete", auth, require("./delete"));
router.post("/order/update", auth, require("./update"));
router.post("/order/pause", auth, require("./pause"));
router.post("/order/unpause", auth, require("./unpause"));
router.get("/order/track/:id", auth, require("./track"));

router.post("/order/load/csv", auth, require("./load-csv"));
router.post("/order/load/xls", auth, require("./load-xls"));
router.post("/order/load/txt", auth, require("./load-txt"));
router.post("/order/load/json", auth, require("./load-json"));

module.exports = router;
