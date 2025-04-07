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

// Get ZValue by year
export const getZValueByYear = async (year) => {
  try {
    return await ZValue.findOne({ year });
  } catch (error) {
    throw new Error("Error fetching ZValue by year: " + error.message);
  }
};
