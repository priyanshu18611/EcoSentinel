import express from "express";
import {
  getAnimals,
  getAnimalById,
  createAnimal,
  updateAnimal,
  deleteAnimal,
  getSummaryStats,
} from "../controllers/animalController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/stats/summary", protect, getSummaryStats);
router.get("/", protect, getAnimals);
router.get("/:id", protect, getAnimalById);
router.post("/", protect, authorize("admin", "ranger"), createAnimal);
router.put("/:id", protect, authorize("admin", "ranger"), updateAnimal);
router.delete("/:id", protect, authorize("admin"), deleteAnimal);

export default router;
