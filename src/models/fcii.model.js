import mongoose from "mongoose";

const fciiSchema = new mongoose.Schema(
  {
    mmsi: { type: String, required: true },
    ciiData: [
      {
        fuelEstimateME: { type: Number, required: true },
        fuelEstimateAE: { type: Number, required: true },
        fuelEstimateTotal: { type: Number, required: true },
        ciiRequired: { type: Number, required: true },
        ciiAttained: { type: Number, required: true },
        ciiRating: {
          number: { type: Number, required: true },
          grade: { type: String, required: true },
        },
      },
    ],
    timestamp: { type: Date, required: true },
  },
  { timestamps: true }
);

const FCii = mongoose.model("FCii", fciiSchema);

export default FCii;
