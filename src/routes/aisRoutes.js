import express from "express";
import {
  getAllAisData,
  getAisDataByImmsi,
} from "../controllers/aisController.js";

const router = express.Router();

router.get("/all", getAllAisData);
router.get("/immsi/:immsi", getAisDataByImmsi);

export default router;
