// models/zvalue.model.js
import mongoose from "mongoose";

// Define the ZValue Schema
const zValueSchema = new mongoose.Schema({
  year: { type: Number, required: true },
  zValue: { type: Number, required: true }, // The Z Value (float)
});

// Model for ZValue
const ZValue = mongoose.model("ZValue", zValueSchema);

export default ZValue;
