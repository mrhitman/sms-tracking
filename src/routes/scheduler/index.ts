import * as Router from "koa-router";
// const auth = require("../../middlewares/auth");

const router = new Router();

router.get("/scheduler/notify", require("./notify").default);
router.get("/scheduler/check-orders", require("./check-orders").default);

export default router;
