import mongoose from "mongoose";

const aisSchema = new mongoose.Schema({
  mmsi: { type: String, unique: true, required: true },
  channel: String,
  aistype: Number,
  repeat: Number,
  immsi: Number,
  class: String,
  navstatus: Number,
  lon: Number,
  lat: Number,
  rot: Number,
  sog: Number,
  cog: Number,
  hdg: Number,
  utc: Number,
  smi: Number,
  timestamp: { type: Date, default: Date.now },
});

const Ais = mongoose.model("Ais", aisSchema);

export default Ais;
