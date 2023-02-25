const router = require("express").Router();
import auth from "../routers/auth.router";
import role from "../routers/role.router";



router.use("/auth", auth);
router.use("/", role);



export default router;
