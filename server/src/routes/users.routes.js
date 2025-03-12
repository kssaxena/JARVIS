import { Router } from "express";
import {
  RegisterUser,
  LoginUser,
  regenerateRefreshToken,
} from "../controllers/users.controllers.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

//no auth required
router.route("/register-user").post(upload.single("image"), RegisterUser);
router.route("/login-user").get(LoginUser);

export default router;
