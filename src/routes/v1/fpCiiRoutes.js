// routes/fpCiiRoutes.js
import express from "express";
import { calculateFpCiiController } from "../../controllers/fpCiiController.js";

const router = express.Router();

// Route to calculate fpCii (First Formula CII)
router.get("/fpcii/:mmsi", calculateFpCiiController);

export default router;
