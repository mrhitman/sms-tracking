import auth from '../../middlewares/auth';
import * as Router from 'koa-router';

const router = new Router();

router.get("/sms-template", auth, require("./get").default);
router.post("/sms-template", auth, require("./create").default);
router.post("/sms-template/delete", auth, require("./delete").default);
router.post("/sms-template/update", auth, require("./update").default);

export default router;
