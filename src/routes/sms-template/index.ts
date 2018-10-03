"use strict";

const Router = require("koa-router");
const auth = require("../../middlewares/auth");

const router = new Router();

router.get("/sms-template", auth, require("./get"));
router.post("/sms-template", auth, require("./create"));
router.post("/sms-template/delete", auth, require("./delete"));
router.post("/sms-template/update", auth, require("./update"));

module.exports = router;
