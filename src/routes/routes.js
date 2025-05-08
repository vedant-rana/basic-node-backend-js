import express from "express";
import authRoutes from "./authRoutes.js";
import masterRoutes from "./masters/routes.js";
import { authorize, authorizeRoles } from "../middlewares/authMiddleware.js";
import { RolesEnum } from "../utils/enums/commonEnums.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use(
  "/masters",
  authorize,
  authorizeRoles(RolesEnum.ADMIN),
  masterRoutes
);

export default router;
