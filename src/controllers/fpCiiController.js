// controllers/fpCiiController.js
import { apiResponse } from "../utils/apiResponse.js";
import { calculateFpCii } from "../services/fpCiiService.js";

// Controller to calculate First Formula CII (fpCii)
export const calculateFpCiiController = async (req, res) => {
  const { mmsi } = req.params;
  try {
    const result = await calculateFpCii(mmsi);
    apiResponse(res, 200, "Successfully calculated fpCii", result);
  } catch (error) {
    apiResponse(res, 500, "Error calculating fpCii", error.message);
  }
};
