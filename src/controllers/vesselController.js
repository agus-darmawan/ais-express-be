// controllers/vesselController.js
import { apiResponse } from "../utils/apiResponse.js"; // Assuming you have an apiResponse utility
import {
  fetchAllVessels,
  fetchVesselByMmsi,
  createOrUpdateVesselData,
  deleteVesselData,
} from "../services/vesselService.js";

// Get all vessels
export const getAllVesselsController = async (req, res) => {
  try {
    const vessels = await fetchAllVessels();
    apiResponse(res, 200, "Successfully fetched all vessels", vessels);
  } catch (error) {
    apiResponse(res, 500, "Error fetching vessels", error.message);
  }
};

// Get vessel by MMSI
export const getVesselByMmsiController = async (req, res) => {
  const { mmsi } = req.params;
  try {
    const vessel = await fetchVesselByMmsi(mmsi);
    if (vessel) {
      apiResponse(res, 200, "Successfully fetched vessel", vessel);
    } else {
      apiResponse(res, 404, "Vessel not found");
    }
  } catch (error) {
    apiResponse(res, 500, "Error fetching vessel by MMSI", error.message);
  }
};

// Create or update a vessel
export const createOrUpdateVesselController = async (req, res) => {
  const data = req.body;
  try {
    const vessel = await createOrUpdateVesselData(data);
    apiResponse(res, 200, "Successfully created/updated vessel", vessel);
  } catch (error) {
    apiResponse(res, 500, "Error creating/updating vessel", error.message);
  }
};

// Delete vessel by MMSI
export const deleteVesselController = async (req, res) => {
  const { mmsi } = req.params;
  try {
    const result = await deleteVesselData(mmsi);
    if (result) {
      apiResponse(res, 200, "Successfully deleted vessel");
    } else {
      apiResponse(res, 404, "Vessel not found");
    }
  } catch (error) {
    apiResponse(res, 500, "Error deleting vessel", error.message);
  }
};
