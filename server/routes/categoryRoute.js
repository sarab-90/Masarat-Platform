import express from "express";

import { addCategory, getAllCategories, getCategory, deleteCategory, updateCategory } from "../controllers/category.Controller.js";

import {protect} from "../middleware/authMiddleware.js";
import {adminOnly} from "../middleware/adminMiddleware.js";
import {checkRole} from "../middleware/checkRoleMiddleware.js"

const router = express.Router();

router.post("/add/category",protect, checkRole("admin", "provider"), addCategory); // ✔️

router.get("/get/categories", protect, getAllCategories); // ✔️

router.get("/get/category/:id", protect, getCategory); // ✔️

router.delete("/delete/category/:id", protect, adminOnly, deleteCategory); // ✔️

router.put("/update/category/:id", protect, checkRole("admin", "provider"), updateCategory); // ✔️

export default router;