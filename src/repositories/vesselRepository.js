// repositories/vesselRepository.js
import Vessel from "../models/vessel.model.js";

// Get all vessels
export const getAllVessels = async () => {
  try {
    return await Vessel.find().populate("type"); // Populate ShipType data
  } catch (error) {
    throw new Error("Error fetching vessels: " + error.message);
  }
};

// Get vessel by MMSI
export const getVesselByMmsi = async (mmsi) => {
  try {
    return await Vessel.findOne({ mmsi }).populate("type"); // Populate ShipType data
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
