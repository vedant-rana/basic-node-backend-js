import express from "express";
import {
  loginUser,
  logoutUser,
  signupUser,
} from "../controllers/authController.js";
import { upload } from "../config/multer.js";

export const router = express.Router();

router.route("/login").post(loginUser);
router.route("/signup").post(upload.single("profileImage"), signupUser);
router.route("/logout").get(logoutUser);

export default router;
