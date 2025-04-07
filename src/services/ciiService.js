import Ais from "../models/aisModel.js";

const degToRad = (deg) => {
  return deg * (Math.PI / 180);
};

const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 3438;

  const lat1Rad = degToRad(lat1);
  const lat2Rad = degToRad(lat2);
  const lon1Rad = degToRad(lon1);
  const lon2Rad = degToRad(lon2);

  // Haversine formula
  const deltaLat = lat2Rad - lat1Rad;
  const deltaLon = lon2Rad - lon1Rad;

  const a =
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(lat1Rad) *
      Math.cos(lat2Rad) *
      Math.sin(deltaLon / 2) *
      Math.sin(deltaLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  // Distance in nautical miles
  return R * c;
};

// Function to calculate speed in nautical miles per hour
const calculateSpeed = (distance, timeDiff) => {
  return distance / timeDiff; // Speed = Distance / Time
};

// Function to calculate fuel consumption estimate based on speed and time difference
const getFuelConsumption = (speed, timeDiff) => {
  const fuelEstimateME = -0.0382 * speed ** 2 + 0.8658 * speed - 0.0197;
  const fuelEstimateAE = 1.5103 * Math.exp(-0.064 * speed);

  // Total fuel consumption estimate
  return (fuelEstimateME + fuelEstimateAE) * timeDiff * 60;
};

// Function to calculate CII (Carbon Intensity Indicator)
export const getFirstCii = async (mmsi) => {
  try {
    const vessel = await Ais.findOne({ mmsi });
    if (!vessel) {
      throw new Error("Vessel not found");
    }

    const positions = vessel.positions;
    if (positions.length < 2) {
      throw new Error("Not enough data to calculate CII");
    }

    const lastPosition = positions[positions.length - 1];
    const secondLastPosition = positions[positions.length - 2];

    const distance = calculateDistance(
      lastPosition.lat,
      lastPosition.lon,
      secondLastPosition.lat,
      secondLastPosition.lon
    );

    const timeDiff =
      (lastPosition.timestamp - secondLastPosition.timestamp) / 3600; // Convert milliseconds to hours

    const speed = calculateSpeed(distance, timeDiff);

    const fuelEstimate = getFuelConsumption(speed, timeDiff);

    return {
      cii: fuelEstimate,
      distance,
      timeDiff,
      speed,
      fuelEstimate,
    };
  } catch (error) {
    console.error("Error calculating CII:", error.message);
  }
};
