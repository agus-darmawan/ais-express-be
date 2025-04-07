// services/zvalueService.js
import {
  getAllZValues,
  getZValueByYear,
  createOrUpdateZValue,
  deleteZValueByYear,
} from "../repositories/zvalueRepository.js";

// Fetch all ZValues
export const fetchAllZValues = async () => {
  return await getAllZValues();
};

// Fetch ZValue by year
export const fetchZValueByYear = async (year) => {
  return await getZValueByYear(year);
};

// Create or update a ZValue
export const createOrUpdateZValueData = async (data) => {
  return await createOrUpdateZValue(data);
};

// Delete ZValue by year
export const deleteZValueData = async (year) => {
  return await deleteZValueByYear(year);
};
