const Router = require("koa-router");

const router = new Router();

router.post("/order", require("./create"));
router.post("/order/update", require("./update"));

module.exports = router;
