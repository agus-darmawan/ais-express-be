import express from "express";
import {
  getAllAisData,
  getAisDataByMmsi,
} from "../../controllers/aisController.js";

const router = express.Router();

// Get all AIS data (including last position)
router.get("/ais/all", getAllAisData);

// Get AIS data by MMSI
router.get("/ais/mmsi/:mmsi", getAisDataByMmsi);

export default router;
