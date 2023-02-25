import { create } from "../controllers/role.controller";
import * as express from "express";
import { AdminAuthorization, tokenValidation } from "../helper/jwt";

const router = express.Router();
router.post("/role", tokenValidation, AdminAuthorization, create);
export default router;
