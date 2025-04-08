// models/vessel.model.js
import mongoose from "mongoose";

// Define the Vessel Schema
const vesselSchema = new mongoose.Schema({
  mmsi: {
    type: String,
    unique: true,
    required: true,
    ref: "Ais", // Assuming Ais is another model you have
  },

  // Ship General Data
  name: { type: String, required: true },
  flag: { type: String, required: true },
  imo: { type: String, required: true },
  routeStart: { type: String, required: true },
  routeEnd: { type: String, required: true },
  status: { type: String, required: true },
  foto: { type: String }, // Assuming you store image URL or file path
  type: { type: mongoose.Schema.Types.ObjectId, ref: "ShipType" }, // Referencing ShipType
  fuelType: { type: mongoose.Schema.Types.ObjectId, ref: "Fuel" }, // Referencing Fuel model

  // Ship Size Data
  capacity: { type: Number, required: true },
  cb: { type: Number, required: true },
  Lwl: { type: Number, required: true },
  B: { type: Number, required: true },
  T: { type: Number, required: true },
  Cwp: { type: Number, required: true },
  LOA: { type: Number, required: true },
  LPP: { type: Number, required: true },
  Cp: { type: Number, required: true },
  Cm: { type: Number, required: true },
  CbNSP: { type: Number, required: true },
  Vs: { type: Number, required: true }, // Replaced 'Veins' with 'Vdinas'
  Bulbosbow: { type: Boolean, required: true },
  Cstern: { type: Number, required: true },
  C1: { type: Number, required: true },
  C2: { type: Number, required: true },
  C3: { type: Number, required: true },
  C5: { type: Number, required: true },

  // Ship Main Engine Data
  mainEngine: {
    engine: { type: String, required: true }, // Added engine name (brand/model)
    RPM: { type: Number, required: true },
    POWER: { type: Number, required: true },
    SFOC: { type: Number, required: true },
  },

  // Ship Auxiliary Data
  auxiliaryEngine: {
    generators: { type: String, required: true }, // Added generators name and brand
    RPM: { type: Number, required: true },
    POWER: { type: Number, required: true },
    SFOC: { type: Number, required: true },
  },
});

// Model for Vessel
const Vessel = mongoose.model("Vessel", vesselSchema);

export default Vessel;
