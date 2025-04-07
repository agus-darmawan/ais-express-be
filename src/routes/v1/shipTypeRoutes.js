// routes/shipTypeRoutes.js
import express from "express";
import {
  getAllShipTypesController,
  getShipTypeByIdController,
  createOrUpdateShipTypeController,
  deleteShipTypeController,
} from "../../controllers/shipTypeController.js";

const router = express.Router();

router.get("/ship-types", getAllShipTypesController);
router.get("/ship-types/:id", getShipTypeByIdController);
router.post("/ship-types", createOrUpdateShipTypeController);
router.delete("/ship-types/:id", deleteShipTypeController);

export default router;
