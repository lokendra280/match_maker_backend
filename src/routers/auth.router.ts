import {
  register,
  login,
  getUser,
  updateUser,
  forgetPassword,
  resetPassword,
  getAllUsers,
} from "../controllers/auth.controller";
import * as express from "express";
import { AdminAuthorization, tokenValidation } from "../helper/jwt";
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
router.post("/register", register);

router.post("/login", login);

router.post("/forget-password", forgetPassword);

router.post("/reset-password", resetPassword);


router.get("/users/me", tokenValidation, getUser);


router.patch("/users/me", tokenValidation, upload.single("avatar"), updateUser);

router.get("/allusers", tokenValidation, AdminAuthorization, getAllUsers);

export default router;
