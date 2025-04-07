const degToRad = (deg) => {
  return deg * (Math.PI / 180);
};

const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 3438; // Radius in nautical miles

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
  const distance = R * c;

  return distance;
};

export const getVesselSpeed = async (mmsi) => {
  try {
    const vessel = await Ais.findOne({ mmsi });
    if (!vessel) {
      throw new Error("Vessel not found");
    }

    const positions = vessel.positions;
    if (positions.length < 2) {
      throw new Error("Not enough data to calculate speed");
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
      (lastPosition.timestamp - secondLastPosition.timestamp) / 3600;

    const speed = distance / timeDiff;

    return speed;
  } catch (error) {
    console.error("Error calculating vessel speed:", error.message);
  }
};
