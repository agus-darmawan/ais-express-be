import mongoose from "mongoose";

const shipTypeSchema = new mongoose.Schema({
  id: { type: Number, unique: true, required: true },
  name: { type: String, required: true },
  capacityUnit: { type: String, required: true },
  a: { type: Number, required: true },
  c: { type: Number, required: true },
  ddVector: [
    {
      d1: { type: Number },
      d2: { type: Number },
      d3: { type: Number },
      d4: { type: Number },
    },
  ],
});

const ShipType = mongoose.model("ShipType", shipTypeSchema);

export default ShipType;
