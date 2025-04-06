import mongoose from "mongoose";

const vesselSchema = new mongoose.Schema({
  mmsi: {
    type: String,
    unique: true,
    required: true,
    ref: "Ais",
  },
  name: String,
  routeStart: String,
  routeEnd: String,
  status: String,
});

const Vessel = mongoose.model("Vessel", vesselSchema);

export default Vessel;
