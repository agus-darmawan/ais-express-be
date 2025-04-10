import express from "express";
import {
  getLatestCiiController,
  getAllCiiRatingsController,
} from "../../controllers/fpCiiController.js";

const router = express.Router();

router.get("/latest/:mmsi", getLatestCiiController);
router.get("/ratings/:mmsi", getAllCiiRatingsController);

export default router;
