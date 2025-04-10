import { apiResponse } from "../utils/apiResponse.js";
import {
  getLatestCiiByMmsi,
  getCiiRatingsByMmsi,
} from "../repositories/fpCiiRepository.js";

export const getLatestCiiController = async (req, res) => {
  const { mmsi } = req.params;
  try {
    const latestCii = await getLatestCiiByMmsi(mmsi);
    apiResponse(res, 200, "Successfully fetched latest CII", latestCii);
  } catch (error) {
    apiResponse(res, 500, "Error fetching latest CII", error.message);
  }
};

export const getAllCiiRatingsController = async (req, res) => {
  const { mmsi } = req.params;
  try {
    const ciiRatings = await getCiiRatingsByMmsi(mmsi);
    apiResponse(res, 200, "Successfully fetched CII ratings", ciiRatings);
  } catch (error) {
    apiResponse(res, 500, "Error fetching CII ratings", error.message);
  }
};
