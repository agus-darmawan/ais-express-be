// routes/fuelRoutes.js
import express from "express";
import {
  getAllFuelsController,
  getFuelByIdController,
  createOrUpdateFuelController,
  deleteFuelController,
} from "../../controllers/fuelController.js";

const router = express.Router();

// Get all fuels
router.get("/fuels", getAllFuelsController);

// Get fuel by ID
router.get("/fuels/:id", getFuelByIdController);

// Create or update a fuel
router.post("/fuels", createOrUpdateFuelController);

// Delete a fuel by ID
router.delete("/fuels/:id", deleteFuelController);

export default router;
