document.addEventListener("DOMContentLoaded", function () {
  const map = L.map("map").setView([-8.452174, 115.843191], 10);

  const osmLayer = L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  );
  const satelliteLayer = L.tileLayer(
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
  );
  const stadiaLayer = L.tileLayer(
    "https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png?api_key=f840f83b-f59c-4328-8719-25724810c112"
  );
  osmLayer.addTo(map);

  const baseLayers = {
    Base: osmLayer,
    Satellite: satelliteLayer,
    Stadia: stadiaLayer,
  };

  L.control
    .layers(baseLayers)
    .setPosition("bottomleft")
    .addTo(map)
    .getContainer();

  map.zoomControl.setPosition("bottomleft");

  fetch("/api/v1/ais/all")
    .then((response) => response.json())
    .then((data) => {
      data.data.forEach((ship) => {
        const heading =
          ship.positions[0].hdg >= 360
            ? ship.positions[0].hdg % 360
            : ship.positions[0].hdg;

        const icon = L.divIcon({
          className: "ship-icon",
          html: `<img src="/assets/img/icons/ships/tanker.png" style="width: 10px; height: 30px; transform: rotate(${heading}deg);" />`,
          iconAnchor: [10, 10],
          popupAnchor: [0, -16],
        });

        const marker = L.marker(
          [ship.positions[0].lat, ship.positions[0].lon],
          {
            icon: icon,
          }
        ).addTo(map);
        marker.bindPopup(`
          <b>IMMSI:</b> ${ship.immsi}<br>
          <b>MMSI:</b> ${ship.mmsi}<br>
          <b>Heading:</b> ${heading}°<br>
          <b>Latitude:</b> ${ship.positions[0].lat}<br>
          <b>Longitude:</b> ${ship.positions[0].lon}<br>
          <b>SOG:</b> ${ship.positions[0].sog} knots<br>
          <b>COG:</b> ${ship.positions[0].cog}°<br>
        `);
      });
    })
    .catch((error) => {
      console.error("Error fetching AIS data:", error);
    });
});
