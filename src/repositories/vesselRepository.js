// repositories/vesselRepository.js
import Vessel from "../models/vessel.model.js";
import Ais from "../models/ais.model.js";

export const getVesselDataByMmsi = async (mmsi) => {
  try {
    const vessel = await Vessel.findOne({ mmsi }).populate("type fuelType");
    const aisData = await Ais.findOne({ mmsi });

    if (!vessel || !aisData) {
      return null;
    }

    const lastPosition = aisData.positions[aisData.positions.length - 1];
    const combinedData = {
      name: vessel.name,
      flag: vessel.flag,
      imo: vessel.imo,
      type: vessel.type.name,
      speed: lastPosition?.sog || "N/A",
      course: lastPosition?.cog || "N/A",
      latitude: lastPosition?.lat || "N/A",
      longitude: lastPosition?.lon || "N/A",
      Lwl: vessel.Lwl,
      breadth: vessel.B,
      draft: vessel.T,
      port: vessel.routeStart + " - " + vessel.routeEnd,
      mmsi: vessel.mmsi,
      picture: vessel.foto,
    };
    return combinedData;
  } catch (error) {
    console.error("Error getting vessel data:", error.message);
    throw new Error("Error fetching vessel data");
  }
};

// Get all vessels
export const getAllVessels = async () => {
  try {
    return await Vessel.find().populate("type fuelType"); // Populate ShipType and Fuel data
  } catch (error) {
    throw new Error("Error fetching vessels: " + error.message);
  }
};

// Get vessel by MMSI
export const getVesselByMmsi = async (mmsi) => {
  try {
    return await Vessel.findOne({ mmsi }).populate("type fuelType"); // Populate ShipType and Fuel data
  } catch (error) {
    throw new Error("Error fetching vessel by MMSI: " + error.message);
  }
};

// Create or update vessel
export const createOrUpdateVessel = async (data) => {
  try {
    const existingVessel = await getVesselByMmsi(data.mmsi);

    if (existingVessel) {
      return await Vessel.findOneAndUpdate(
        { mmsi: data.mmsi },
        { ...data },
        { new: true }
      );
    } else {
      const newVessel = new Vessel(data);
      return await newVessel.save();
    }
  } catch (error) {
    throw new Error("Error creating/updating vessel: " + error.message);
  }
};

// Delete vessel by MMSI
export const deleteVesselByMmsi = async (mmsi) => {
  try {
    return await Vessel.findOneAndDelete({ mmsi });
  } catch (error) {
    throw new Error("Error deleting vessel: " + error.message);
  }
};
