import express from "express";
import { loginUser, signupUser } from "../controllers/authController.js";

export const router = express.Router();

router.route("/login").post(loginUser);
router.route("/signup").post(signupUser);

export default router;
