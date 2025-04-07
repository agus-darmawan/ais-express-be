// routes/vesselRoutes.js
import express from "express";
import {
  getAllVesselsController,
  getVesselByMmsiController,
  createOrUpdateVesselController,
  deleteVesselController,
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

export default router;
