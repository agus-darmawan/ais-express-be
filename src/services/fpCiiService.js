// services/fpCiiService.js
import {
  getVesselByMmsi,
  getPositionsByMmsi,
} from "../repositories/fpCiiRepository.js";
import {
  degToRad,
  calculateDistance,
  calculateSpeed,
  getFuelConsumption,
} from "../utils/fpCiiCalculations.js";
import ZValue from "../models/zvalue.model.js";

// Function to calculate First Formula CII (fpCii)
export const calculateFpCii = async (mmsi) => {
  try {
    // Get vessel data from the database
    const vessel = await getVesselByMmsi(mmsi);

    // Get positions data from the Ais model
    const positions = await getPositionsByMmsi(mmsi);

    // Get the last two positions
    const lastPosition = positions[positions.length - 1];
    const secondLastPosition = positions[positions.length - 2];

    // Calculate the distance between the two positions
    const distance = calculateDistance(
      lastPosition.lat,
      lastPosition.lon,
      secondLastPosition.lat,
      secondLastPosition.lon
    );

    // Calculate the time difference in hours
    const timeDiff =
      (lastPosition.timestamp - secondLastPosition.timestamp) / 3600000;

    console.log("Time Difference:", timeDiff);

    // Check if timeDiff is valid (it should be a positive number)
    if (timeDiff <= 0) {
      throw new Error("Invalid time difference between positions");
    }

    // Calculate the speed of the vessel
    const speed = calculateSpeed(distance, timeDiff);

    // Estimate fuel consumption for ME and AE
    const fuelEstimateME = getFuelConsumption(speed, timeDiff, "ME");
    const fuelEstimateAE = getFuelConsumption(speed, timeDiff, "AE");
    const fuelEstimateTotal = (fuelEstimateME + fuelEstimateAE) * timeDiff * 60;

    // Get fuel data
    const fuelType = vessel.fuelType;
    const fuelDensity = fuelType.fuelDensity;
    const cf = fuelType.cf;

    // Calculate total fuel consumption in tons
    const totalFuelConsumption = (fuelEstimateTotal * fuelDensity) / 1000;
    // Get the current year Z value
    const currentYear = new Date().getFullYear();
    const zValue = await ZValue.findOne({ year: currentYear });

    if (!zValue) {
      throw new Error("ZValue not found for current year");
    }

    // CII Required Formula: 1 - (zValue / 100) * (a * c)
    const shipType = vessel.type;
    const a = shipType.a;
    const c = shipType.c;

    const CIref = a * vessel.capacity ** -c;
    const ciiRequired = (1 - zValue.zValue / 100) * CIref;
    console.log("CII Required:", ciiRequired);

    // CII Attained Formula
    const ciiAttained =
      ((totalFuelConsumption * cf) / (distance * vessel.capacity)) * 10 ** 6;

    // Calculate CII Rating and Assign Grades based on ddVector
    const ciiRating = ciiAttained / ciiRequired;
    const ciiGrade = assignGradeBasedOnDdVector(shipType.ddVector, ciiRating);

    // Return the results
    return {
      fuelEstimateME,
      fuelEstimateAE,
      fuelEstimateTotal,
      ciiRequired,
      ciiAttained,
      ciiRating: {
        number: ciiRating,
        grade: ciiGrade, // Return the grade based on ddVector
      },
    };
  } catch (error) {
    console.error("Error calculating fpCii:", error.message);
    throw error;
  }
};

const assignGradeBasedOnDdVector = (ddVector, ciiRating) => {
  for (let i = 0; i < ddVector.length; i++) {
    const { d1, d2, d3, d4 } = ddVector[i];
    if (ciiRating < d1) {
      return "A";
    } else if (ciiRating >= d1 && ciiRating < d2) {
      return "B";
    } else if (ciiRating >= d2 && ciiRating < d3) {
      return "C";
    } else if (ciiRating >= d3 && ciiRating < d4) {
      return "D";
    } else if (ciiRating >= d4) {
      return "E";
    }
  }
  return "Unknown";
};
