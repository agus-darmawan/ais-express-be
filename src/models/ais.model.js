import mongoose from "mongoose";

const aisSchema = new mongoose.Schema({
  mmsi: { type: String, unique: true, required: true },
  channel: String,
  aistype: Number,
  immsi: Number,
  class: String,
  navstatus: Number,
  smi: Number,
  timestamp: { type: Date, default: Date.now },
  positions: [
    {
      lat: Number,
      lon: Number,
      rot: Number,
      sog: Number,
      cog: Number,
      hdg: Number,
      utc: Number,
      timestamp: { type: Date, default: Date.now },
    },
  ],
});

const Ais = mongoose.model("Ais", aisSchema);

export default Ais;
