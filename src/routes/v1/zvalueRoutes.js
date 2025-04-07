// routes/zvalueRoutes.js
import express from "express";
import {
  getAllZValuesController,
  getZValueByYearController,
  createOrUpdateZValueController,
  deleteZValueController,
} from "../../controllers/zvalueController.js";

const router = express.Router();

// Get all ZValues
router.get("/zvalues", getAllZValuesController);

// Get ZValue by year
router.get("/zvalues/:year", getZValueByYearController);

// Create or update a ZValue
router.post("/zvalues", createOrUpdateZValueController);

// Delete ZValue by year
router.delete("/zvalues/:year", deleteZValueController);

export default router;
