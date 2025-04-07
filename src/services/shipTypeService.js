// services/shipTypeService.js
import {
  getAllShipTypes,
  getShipTypeById,
  createOrUpdateShipType,
  deleteShipType,
} from "../repositories/shipTypeRepository.js";

// Fetch all ship types
export const fetchAllShipTypes = async () => {
  return await getAllShipTypes();
};

// Fetch ship type by id
export const fetchShipTypeById = async (id) => {
  return await getShipTypeById(id);
};

// Create or update a ship type
export const createOrUpdateShipTypeData = async (data) => {
  return await createOrUpdateShipType(data);
};

// Delete a ship type
export const deleteShipTypeData = async (id) => {
  return await deleteShipType(id);
};
