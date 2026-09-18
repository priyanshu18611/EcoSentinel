import express from "express";
import { ingestTrackingData, getTrackingHistory } from "../controllers/trackingController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// IoT collars post here directly (device-level, not user-authenticated)
router.post("/", ingestTrackingData);
router.get("/:animalId", protect, getTrackingHistory);

export default router;
