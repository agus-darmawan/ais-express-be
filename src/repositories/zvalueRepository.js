// repositories/zvalueRepository.js
import ZValue from "../models/zvalue.model.js";

// Get all ZValues
export const getAllZValues = async () => {
  try {
    return await ZValue.find();
  } catch (error) {
    throw new Error("Error fetching ZValues: " + error.message);
  }
};

// Get ZValue by year
export const getZValueByYear = async (year) => {
  try {
    return await ZValue.findOne({ year });
  } catch (error) {
    throw new Error("Error fetching ZValue by year: " + error.message);
  }
};

// Create or update ZValue
export const createOrUpdateZValue = async (data) => {
  try {
    const existingZValue = await getZValueByYear(data.year);

    if (existingZValue) {
      return await ZValue.findOneAndUpdate(
        { year: data.year },
        { ...data },
        { new: true }
      );
    } else {
      const newZValue = new ZValue(data);
      return await newZValue.save();
    }
  } catch (error) {
    throw new Error("Error creating/updating ZValue: " + error.message);
  }
};

// Delete ZValue by year
export const deleteZValueByYear = async (year) => {
  try {
    return await ZValue.findOneAndDelete({ year });
  } catch (error) {
    throw new Error("Error deleting ZValue: " + error.message);
  }
};
