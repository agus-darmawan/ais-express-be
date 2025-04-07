import mongoose from "mongoose";

const fuelSchema = new mongoose.Schema({
  typeOfFuel: { type: String, required: true },
  carbonContent: { type: Number, required: true },
  cf: { type: Number, required: true },
  fuelDensity: { type: Number, required: true },
});

const Fuel = mongoose.model("Fuel", fuelSchema);

export default Fuel;
