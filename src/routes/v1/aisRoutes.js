import express from "express";
import {
  getAllAisData,
  getAisDataByMmsi,
  getMmsiListByQuery,
} from "../../controllers/aisController.js";

const router = express.Router();

router.get("/ais/all", getAllAisData);

router.get("/ais/mmsi/:mmsi", getAisDataByMmsi);
router.get("/ais/list-mmsi", getMmsiListByQuery);

export default router;
