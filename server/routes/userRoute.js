import express from "express";

import {
  getAllUsers,
  getUserById,
  searchUser,
  deleteUser,
  updateUser,
  changePassword,
  updateUserRole,
} from "../controllers/user.Controllers.js";

import { adminOnly } from "../middleware/adminMiddleware.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/get/all/users", protect, adminOnly, getAllUsers);//✔️

router.get("/get/user/:id", protect, getUserById);

router.post("/search/users", searchUser); //✔️

router.delete("/delete/user/:id", protect, adminOnly, deleteUser); //✔️

router.put("/update/user/:id", protect, updateUser); //✔️

router.put("/change/password/:id", protect, changePassword);

router.put("/update/role/:id", protect, adminOnly, updateUserRole); //✔️

export default router;
