import { createOrUpdateVessel } from "../repositories/aisRepository.js";

export const saveVesselData = async (data) => {
  try {
    const result = await createOrUpdateVessel(data);
    return result;
  } catch (error) {
    throw new Error("Error saving vessel data: " + error.message);
  }
};
