import FCii from "../models/fcii.model.js";
// repositories/fpCiiRepository.js
import Ais from "../models/ais.model.js";
import Vessel from "../models/vessel.model.js";
import ZValue from "../models/zvalue.model.js";

// Get vessel by MMSI
export const getVesselByMmsi = async (mmsi) => {
  try {
    const vessel = await Vessel.findOne({ mmsi }).populate("fuelType type"); // Populating Fuel and ShipType data
    if (!vessel) {
      throw new Error("Vessel not found");
    }
    return vessel;
  } catch (error) {
    throw new Error("Error fetching vessel by MMSI: " + error.message);
  }
};

// Get positions by MMSI from Ais model
export const getPositionsByMmsi = async (mmsi) => {
  try {
    console.log("Fetching positions for MMSI:", mmsi);
    const aisData = await Ais.findOne({ mmsi });
    // console.log("Ais data:", aisData);
    if (!aisData || !aisData.positions || aisData.positions.length < 2) {
      throw new Error("Not enough position data available");
    }
    return aisData.positions;
  } catch (error) {
    throw new Error(
      "Error fetching positions from Ais model: " + error.message
    );
  }
};

export const saveCiiData = async (data) => {
  try {
    if (!data || !data.mmsi || !data.ciiData) {
      throw new Error("Invalid CII data. Cannot save.");
    }

    const existingCii = await FCii.findOne({ mmsi: data.mmsi });

    if (existingCii) {
      existingCii.ciiData.push(data.ciiData);
      existingCii.timestamp = data.timestamp;
      await existingCii.save();
      return existingCii;
    } else {
      const newCii = new FCii({
        mmsi: data.mmsi,
        ciiData: [data.ciiData],
        timestamp: data.timestamp,
      });
      await newCii.save();
      return newCii;
    }
  } catch (error) {
    throw new Error("Error saving CII data: " + error.message);
  }
};

export const getLatestCiiByMmsi = async (mmsi) => {
  try {
    const latestCii = await FCii.findOne({ mmsi });

    if (!latestCii || latestCii.ciiData.length === 0) {
      throw new Error("No CII data found for this MMSI");
    }

    const latestCiiEntry = latestCii.ciiData[latestCii.ciiData.length - 1];

    return latestCiiEntry;
  } catch (error) {
    throw new Error("Error fetching the latest CII: " + error.message);
  }
};

export const getCiiRatingsByMmsi = async (mmsi) => {
  try {
    const ciiData = await FCii.findOne({ mmsi });

    if (!ciiData || ciiData.ciiData.length === 0) {
      throw new Error("No CII data found for this MMSI");
    }

    const ciiRatings = ciiData.ciiData.map((item) => item.ciiRating.number);

    return ciiRatings;
  } catch (error) {
    throw new Error("Error fetching CII ratings for MMSI: " + error.message);
  }
};

export const getZValueByYear = async (year) => {
  try {
    return await ZValue.findOne({ year });
  } catch (error) {
    throw new Error("Error fetching ZValue by year: " + error.message);
  }
};
