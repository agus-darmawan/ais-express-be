// controllers/fuelController.js
import { apiResponse } from "../utils/apiResponse.js"; // Assuming you have an apiResponse utility
import {
  fetchAllFuels,
  fetchFuelById,
  createOrUpdateFuelData,
  deleteFuelData,
} from "../services/fuelService.js";

// Get all fuels
export const getAllFuelsController = async (req, res) => {
  try {
    const fuels = await fetchAllFuels();
    apiResponse(res, 200, "Successfully fetched all fuels", fuels);
  } catch (error) {
    apiResponse(res, 500, "Error fetching fuels", error.message);
  }
};

// Get fuel by ID
export const getFuelByIdController = async (req, res) => {
  const { id } = req.params;
  try {
    const fuel = await fetchFuelById(id);
    if (fuel) {
      apiResponse(res, 200, "Successfully fetched fuel", fuel);
    } else {
      apiResponse(res, 404, "Fuel not found");
    }
  } catch (error) {
    apiResponse(res, 500, "Error fetching fuel by ID", error.message);
  }
};

// Create or update a fuel
export const createOrUpdateFuelController = async (req, res) => {
  const data = req.body;
  try {
    const fuel = await createOrUpdateFuelData(data);
    apiResponse(res, 200, "Successfully created/updated fuel", fuel);
  } catch (error) {
    apiResponse(res, 500, "Error creating/updating fuel", error.message);
  }
};

// Delete a fuel by ID
export const deleteFuelController = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await deleteFuelData(id);
    if (result) {
      apiResponse(res, 200, "Successfully deleted fuel");
    } else {
      apiResponse(res, 404, "Fuel not found");
    }
  } catch (error) {
    apiResponse(res, 500, "Error deleting fuel", error.message);
  }
};
