import ShipType from "../models/shiptype.model.js";

// Get all ship types
export const getAllShipTypes = async () => {
  try {
    return await ShipType.find();
  } catch (error) {
    throw new Error("Error fetching ship types: " + error.message);
  }
};

// Get a ship type by id
export const getShipTypeById = async (id) => {
  try {
    return await ShipType.findOne({ id });
  } catch (error) {
    throw new Error("Error fetching ship type by id: " + error.message);
  }
};

// Create or update a ship type
export const createOrUpdateShipType = async (data) => {
  try {
    const existingShipType = await getShipTypeById(data.id);

    if (existingShipType) {
      // Update existing ship type
      return await ShipType.findOneAndUpdate(
        { id: data.id },
        { ...data },
        { new: true }
      );
    } else {
      // Create new ship type
      const newShipType = new ShipType(data);
      return await newShipType.save();
    }
  } catch (error) {
    throw new Error("Error creating/updating ship type: " + error.message);
  }
};

// Delete a ship type
export const deleteShipType = async (id) => {
  try {
    return await ShipType.findOneAndDelete({ id });
  } catch (error) {
    throw new Error("Error deleting ship type: " + error.message);
  }
};
