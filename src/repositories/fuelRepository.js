// repositories/fuelRepository.js
import Fuel from "../models/fuel.model.js";

// Get all fuels
export const getAllFuels = async () => {
  try {
    return await Fuel.find();
  } catch (error) {
    throw new Error("Error fetching fuels: " + error.message);
  }
};

// Get fuel by ID
export const getFuelById = async (id) => {
  try {
    return await Fuel.findById(id);
  } catch (error) {
    throw new Error("Error fetching fuel by ID: " + error.message);
  }
};

// Create or update fuel
export const createOrUpdateFuel = async (data) => {
  try {
    const existingFuel = await getFuelById(data._id);

    if (existingFuel) {
      // Update existing fuel
      return await Fuel.findByIdAndUpdate(data._id, { ...data }, { new: true });
    } else {
      // Create new fuel record
      const newFuel = new Fuel(data);
      return await newFuel.save();
    }
  } catch (error) {
    throw new Error("Error creating/updating fuel: " + error.message);
  }
};

// Delete fuel by ID
export const deleteFuelById = async (id) => {
  try {
    return await Fuel.findByIdAndDelete(id);
  } catch (error) {
    throw new Error("Error deleting fuel: " + error.message);
  }
};
