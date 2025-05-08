import express from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  getUserDetails,
  updateUser,
} from "../../controllers/masters/userController.js";

import { upload } from "../../config/multer.js";

export const router = express.Router();

router.route("/all").get(getAllUsers);
router.route("/new").post(upload.single("profileImage"), createUser);
router.route("/me").get(getUserDetails);
router
  .route("/:id")
  .get(getUserById)
  .put(upload.single("profileImage"), updateUser)
  .delete(deleteUser);

export default router;
