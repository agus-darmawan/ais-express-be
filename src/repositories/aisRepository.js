import Ais from "../models/ais.model.js";

export const getVesselByMmsi = async (mmsi) => {
  return await Ais.findOne({ mmsi });
};

export const createOrUpdateVessel = async (data) => {
  const existingVessel = await getVesselByMmsi(data.mmsi);

  if (existingVessel) {
    return await Ais.findOneAndUpdate(
      { mmsi: data.mmsi },
      { ...data, timestamp: Date.now() },
      { new: true }
    );
  } else {
    const newVessel = new Ais(data);
    return await newVessel.save();
  }
};

export const getAisFields = async () => {
  try {
    const aisData = await Ais.find({}, "hdg lat lon cog sog immsi mmsi");
    return aisData;
  } catch (error) {
    throw new Error("Error fetching AIS data: " + error.message);
  }
};
