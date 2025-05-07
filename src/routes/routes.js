import express from "express";
import authRoutes from "./authRoutes.js";
import masterRoutes from "./masters/routes.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/masters", masterRoutes);

export default router;
