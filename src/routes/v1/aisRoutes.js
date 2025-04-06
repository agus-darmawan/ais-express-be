import express from "express";
import {
  getAllAisData,
  getAisDataByImmsi,
} from "../../controllers/aisController.js";

const router = express.Router();

router.get("/ais/all", getAllAisData);
router.get("/ais/immsi/:immsi", getAisDataByImmsi);

export default router;
