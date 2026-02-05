import express from "express";

import {
  addActivity,
  getAllActivity,
  getActivity,
  deleteActivity,
  updateActivity,
  updateActivityStatus,
} from "../controllers/activity.Controller.js";

import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";
import { checkRole } from "../middleware/checkRoleMiddleware.js";

const router = express.Router();

router.post("/add/Activity", protect, checkRole("provider"), addActivity); // ✔️

router.get("/get/Activity", protect, getAllActivity);  //✔️

router.get("/get/Activity/:id", protect,getActivity); //✔️

router.delete("/delete/Activity/:id", protect, checkRole("provider"),deleteActivity); // ✔️

router.put("/update/Activity/:id", protect, checkRole("provider"),updateActivity); //✔️
// patch = لتعديل فقط على status
router.patch("/update/status/:id", protect, adminOnly, updateActivityStatus); //✔️

export default router;
