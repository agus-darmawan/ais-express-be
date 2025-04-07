// controllers/shipTypeController.js
import { apiResponse } from "../utils/apiResponse.js"; // Assuming you have a utility function for response
import {
  fetchAllShipTypes,
  fetchShipTypeById,
  createOrUpdateShipTypeData,
  deleteShipTypeData,
} from "../services/shipTypeService.js";

// Get all ship types
export const getAllShipTypesController = async (req, res) => {
  try {
    const shipTypes = await fetchAllShipTypes();
    apiResponse(res, 200, "Successfully fetched all ship types", shipTypes);
  } catch (error) {
    apiResponse(res, 500, "Error fetching ship types", error.message);
  }
};

// Get a ship type by id
export const getShipTypeByIdController = async (req, res) => {
  const { id } = req.params;
  try {
    const shipType = await fetchShipTypeById(id);
    if (shipType) {
      apiResponse(res, 200, "Successfully fetched ship type", shipType);
    } else {
      apiResponse(res, 404, "Ship type not found");
    }
  } catch (error) {
    apiResponse(res, 500, "Error fetching ship type by id", error.message);
  }
};

// Create or update a ship type
export const createOrUpdateShipTypeController = async (req, res) => {
  const data = req.body;
  try {
    const shipType = await createOrUpdateShipTypeData(data);
    apiResponse(res, 200, "Successfully created/updated ship type", shipType);
  } catch (error) {
    apiResponse(res, 500, "Error creating/updating ship type", error.message);
  }
};

// Delete a ship type
export const deleteShipTypeController = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await deleteShipTypeData(id);
    if (result) {
      apiResponse(res, 200, "Successfully deleted ship type");
    } else {
      apiResponse(res, 404, "Ship type not found");
    }
  } catch (error) {
    apiResponse(res, 500, "Error deleting ship type", error.message);
  }
};
