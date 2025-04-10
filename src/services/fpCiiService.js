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

export const calculateFpCii = async (mmsi) => {
  if (mmsi !== "525005223") {
    throw new Error(`Bukan kapal kami ${mmsi}`);
  }
  try {
    const vessel = await getVesselByMmsi(mmsi);
    const positions = await getPositionsByMmsi(mmsi);

    const lastPosition = positions[positions.length - 1];
    const secondLastPosition = positions[positions.length - 2];

    const distance = calculateDistance(
      lastPosition.lat,
      lastPosition.lon,
      secondLastPosition.lat,
      secondLastPosition.lon
    );

    const timeDiff =
      (lastPosition.timestamp - secondLastPosition.timestamp) / 3600000;

    if (timeDiff <= 0) {
      throw new Error("Invalid time difference between positions");
    }

    const speed = calculateSpeed(distance, timeDiff);

    const fuelEstimateME = getFuelConsumption(speed, timeDiff, "ME");
    const fuelEstimateAE = getFuelConsumption(speed, timeDiff, "AE");
    const fuelEstimateTotal = (fuelEstimateME + fuelEstimateAE) * timeDiff * 60;

    const fuelType = vessel.fuelType;
    const fuelDensity = fuelType.fuelDensity;
    const cf = fuelType.cf;

    const totalFuelConsumption = (fuelEstimateTotal * fuelDensity) / 1000;
    const currentYear = new Date().getFullYear();
    const zValue = await ZValue.findOne({ year: currentYear });

    if (!zValue) {
      throw new Error("ZValue not found for current year");
    }

    const shipType = vessel.type;
    const a = shipType.a;
    const c = shipType.c;

    const CIref = a * vessel.capacity ** -c;
    const ciiRequired = (1 - zValue.zValue / 100) * CIref;

    const ciiAttained =
      ((totalFuelConsumption * cf) / (distance * vessel.capacity)) * 10 ** 6;

    const ciiRating = ciiAttained / ciiRequired;
    const ciiGrade = assignGradeBasedOnDdVector(shipType.ddVector, ciiRating);

    return {
      fuelEstimateME,
      fuelEstimateAE,
      fuelEstimateTotal,
      ciiRequired,
      ciiAttained,
      ciiRating: {
        number: ciiRating,
        grade: ciiGrade,
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
