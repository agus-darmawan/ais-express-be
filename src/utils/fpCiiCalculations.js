// utils/fpCiiCalculations.js

// Convert degrees to radians
export const degToRad = (deg) => {
  return deg * (Math.PI / 180);
};

// Calculate distance between two coordinates (Haversine formula)
export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  console.log(lat1, lon1, lat2, lon2);
  const R = 3438;
  const lat1Rad = degToRad(lat1);
  const lat2Rad = degToRad(lat2);
  const lon1Rad = degToRad(lon1);
  const lon2Rad = degToRad(lon2);

  const deltaLat = lat2Rad - lat1Rad;
  const deltaLon = lon2Rad - lon1Rad;

  const a =
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(lat1Rad) *
      Math.cos(lat2Rad) *
      Math.sin(deltaLon / 2) *
      Math.sin(deltaLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in nautical miles
};

// Calculate speed in nautical miles per hour
export const calculateSpeed = (distance, timeDiff) => {
  return distance / timeDiff; // Speed = Distance / Time
};

// Calculate fuel consumption for Main Engine (ME) or Auxiliary Engine (AE)
export const getFuelConsumption = (speed, timeDiff, engineType) => {
  let fuelEstimate;

  if (engineType === "ME") {
    fuelEstimate = (-0.0382 * speed) ** 2 + 0.8658 * speed - 0.0197; // ME formula
  } else {
    fuelEstimate = 1.5103 * Math.exp(-0.064 * speed); // AE formula
  }
  if (fuelEstimate < 0.5) {
    fuelEstimate = 0.5;
  }
  return fuelEstimate;
};
