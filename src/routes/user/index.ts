import * as Router from "koa-router";
import auth from "../../middlewares/auth";

const router = new Router();

router.post("/user", require("./create").default);
router.post("/user/login", require("./login").default);
router.post("/user/refresh", require("./refresh").default);
router.get("/user", auth, require("./get").default);
router.post("/user/logout", auth, require("./logout").default);
router.post("/user/update", auth, require("./update").default);

export default router;
