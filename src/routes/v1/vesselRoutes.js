// routes/vesselRoutes.js
import express from "express";
import {
  getAllVesselsController,
  getVesselByMmsiController,
  createOrUpdateVesselController,
  deleteVesselController,
  getVesselData,
} from "../../controllers/vesselController.js";

const router = express.Router();

// Get all vessels
router.get("/vessels", getAllVesselsController);

// Get vessel by MMSI
router.get("/vessels/:mmsi", getVesselByMmsiController);

// Create or update a vessel
router.post("/vessels", createOrUpdateVesselController);

// Delete vessel by MMSI
router.delete("/vessels/:mmsi", deleteVesselController);

// Get vessel data by MMSI
router.get("/vessel/mmsi/:mmsi", getVesselData);

export default router;
