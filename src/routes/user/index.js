const Router = require("koa-router");

const router = new Router();

router.get("/user/:id", require("./get"));
router.post("/user", require("./create"));
router.post("/user/update", require("./update"));

module.exports = router;
