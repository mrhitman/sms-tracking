"use strict";

const Router = require("koa-router");

const router = new Router();

router.get("/user/:id", require("./get"));
router.post("/user", require("./create"));
router.post("/user/login", require("./login"));
router.post("/user/logout", require("./logout"));
router.post("/user/refresh", require("./refresh"));
router.post("/user/update", require("./update"));

module.exports = router;
