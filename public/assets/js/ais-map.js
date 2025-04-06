document.addEventListener("DOMContentLoaded", function () {
  const map = L.map("map").setView([-6.949775, 110.422796666667], 6);

  const osmLayer = L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  );
  const satelliteLayer = L.tileLayer(
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
  );
  osmLayer.addTo(map);

  const baseLayers = {
    Base: osmLayer,
    Satellite: satelliteLayer,
  };
  L.control.layers(baseLayers).addTo(map);
  map.zoomControl.setPosition("topright");

  fetch("http://localhost:5001/api/v1/ais/all")
    .then((response) => response.json())
    .then((data) => {
      data.data.forEach((ship) => {
        const heading = ship.hdg >= 360 ? ship.hdg % 360 : ship.hdg;

        const icon = L.divIcon({
          className: "ship-icon",
          html: `<img src="http://localhost:5001/assets/img/icons/ships/tanker.png" style="width: 20px; height: 20px; transform: rotate(${heading}deg);" />`,
          iconSize: [20, 20],
          iconAnchor: [10, 10],
          popupAnchor: [0, -16],
        });

        const marker = L.marker([ship.lat, ship.lon], { icon: icon }).addTo(
          map
        );
        marker.bindPopup(`
          <b>IMMSI:</b> ${ship.immsi}<br>
          <b>Heading:</b> ${heading}°<br>
          <b>Latitude:</b> ${ship.lat}<br>
          <b>Longitude:</b> ${ship.lon}
        `);
      });
    })
    .catch((error) => {
      console.error("Error fetching AIS data:", error);
    });
});
