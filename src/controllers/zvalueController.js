// controllers/zvalueController.js
import { apiResponse } from "../utils/apiResponse.js"; // Assuming you have an apiResponse utility
import {
  fetchAllZValues,
  fetchZValueByYear,
  createOrUpdateZValueData,
  deleteZValueData,
} from "../services/zvalueService.js";

// Get all ZValues
export const getAllZValuesController = async (req, res) => {
  try {
    const zValues = await fetchAllZValues();
    apiResponse(res, 200, "Successfully fetched all ZValues", zValues);
  } catch (error) {
    apiResponse(res, 500, "Error fetching ZValues", error.message);
  }
};

// Get ZValue by year
export const getZValueByYearController = async (req, res) => {
  const { year } = req.params;
  try {
    const zValue = await fetchZValueByYear(year);
    if (zValue) {
      apiResponse(res, 200, "Successfully fetched ZValue", zValue);
    } else {
      apiResponse(res, 404, "ZValue not found");
    }
  } catch (error) {
    apiResponse(res, 500, "Error fetching ZValue by year", error.message);
  }
};

// Create or update a ZValue
export const createOrUpdateZValueController = async (req, res) => {
  const data = req.body;
  try {
    const zValue = await createOrUpdateZValueData(data);
    apiResponse(res, 200, "Successfully created/updated ZValue", zValue);
  } catch (error) {
    apiResponse(res, 500, "Error creating/updating ZValue", error.message);
  }
};

// Delete ZValue by year
export const deleteZValueController = async (req, res) => {
  const { year } = req.params;
  try {
    const result = await deleteZValueData(year);
    if (result) {
      apiResponse(res, 200, "Successfully deleted ZValue");
    } else {
      apiResponse(res, 404, "ZValue not found");
    }
  } catch (error) {
    apiResponse(res, 500, "Error deleting ZValue", error.message);
  }
};
