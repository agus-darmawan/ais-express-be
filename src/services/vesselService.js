// services/vesselService.js
import {
  getAllVessels,
  getVesselByMmsi,
  createOrUpdateVessel,
  deleteVesselByMmsi,
} from "../repositories/vesselRepository.js";

// Fetch all vessels
export const fetchAllVessels = async () => {
  return await getAllVessels();
};

// Fetch vessel by MMSI
export const fetchVesselByMmsi = async (mmsi) => {
  return await getVesselByMmsi(mmsi);
};

// Create or update a vessel
export const createOrUpdateVesselData = async (data) => {
  return await createOrUpdateVessel(data);
};

// Delete a vessel by MMSI
export const deleteVesselData = async (mmsi) => {
  return await deleteVesselByMmsi(mmsi);
};
