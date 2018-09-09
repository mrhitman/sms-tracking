"use strict";

const Router = require("koa-router");
const auth = require("../../middlewares/auth");

const router = new Router();

router.post("/user", require("./create"));
router.post("/user/login", require("./login"));
router.post("/user/refresh", require("./refresh"));
router.get("/user", auth, require("./get"));
router.post("/user/logout", auth, require("./logout"));
router.post("/user/update", auth, require("./update"));

module.exports = router;
