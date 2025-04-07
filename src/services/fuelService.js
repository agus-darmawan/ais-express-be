// services/fuelService.js
import {
  getAllFuels,
  getFuelById,
  createOrUpdateFuel,
  deleteFuelById,
} from "../repositories/fuelRepository.js";

// Fetch all fuels
export const fetchAllFuels = async () => {
  return await getAllFuels();
};

// Fetch fuel by ID
export const fetchFuelById = async (id) => {
  return await getFuelById(id);
};

// Create or update a fuel record
export const createOrUpdateFuelData = async (data) => {
  return await createOrUpdateFuel(data);
};

// Delete a fuel record by ID
export const deleteFuelData = async (id) => {
  return await deleteFuelById(id);
};
