const Router = require("koa-router");

const router = new Router();

router.get("/sms-template/:user_id", require("./get"));
router.post("/sms-template", require("./create"));
router.post("/sms-template/update", require("./update"));

module.exports = router;
