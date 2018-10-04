import auth from "../../middlewares/auth";
import * as Router from "koa-router";

const router = new Router();

router.get("/order", auth, require("./get").default);
router.post("/order", auth, require("./create").default);
router.post("/order/delete", auth, require("./delete").default);
router.post("/order/update", auth, require("./update").default);
router.post("/order/pause", auth, require("./pause").default);
router.post("/order/unpause", auth, require("./unpause").default);
router.post("/order/send-sms", auth, require("./send-sms").default);
router.post("/order/load/csv", auth, require("./load-csv").default);
router.get("/order/:id/history", auth, require("./history").default);
router.get("/order/:id/track", auth, require("./track").default);
router.get("/order/:id/sms", auth, require("./sms").default);

export default router;
