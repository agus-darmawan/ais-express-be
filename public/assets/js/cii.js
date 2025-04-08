document.addEventListener("DOMContentLoaded", function () {
  const mmsiInput = document.getElementById("mmsi-input");
  const mmsiList = document.getElementById("mmsi-list");
  const shipDetails = document.getElementById("ship-details");
  const shipImage = document.getElementById("ship-image"); // Mendapatkan elemen gambar kapal

  async function fetchMmsiList(query) {
    try {
      const res = await fetch(`/api/v1/list-mmsi?query=${query}`);
      const data = await res.json();
      return data.mmsiList || [];
    } catch (err) {
      console.error("Error fetching MMSI list:", err);
      return [];
    }
  }

  async function fetchShipDetails(mmsi) {
    try {
      const res = await fetch(`/api/v1/ship/${mmsi}`);
      const data = await res.json();
      return data.ship || null;
    } catch (err) {
      console.error("Error fetching ship data:", err);
      return null;
    }
  }

  mmsiInput.addEventListener("input", async () => {
    const query = mmsiInput.value.trim();
    mmsiList.innerHTML = "";
    shipDetails.innerHTML =
      "<p class='text-gray-500 text-lg italic'>Ship not found</p>";
    shipImage.style.display = "none";

    if (query.length >= 5) {
      const mmsis = await fetchMmsiList(query);

      mmsis.forEach((mmsi) => {
        const item = document.createElement("div");
        item.className =
          "bg-white p-2 rounded-md shadow hover:bg-blue-100 cursor-pointer transition duration-150";
        item.textContent = mmsi;

        item.addEventListener("click", async () => {
          const ship = await fetchShipDetails(mmsi);
          if (ship) {
            shipDetails.innerHTML = `
                <h3 class="text-lg font-bold mb-2">Ship Data</h3>
                <div class="text-left">
                  <p><b>Ship Name:</b> ${ship.name || "N/A"}</p>
                  <p><b>IMO:</b> ${ship.imo || "N/A"}</p>
                  <p><b>Type:</b> ${ship.type || "N/A"}</p>
                  <p><b>Owner:</b> ${ship.owner || "N/A"}</p>
                  <p><b>Speed (SOG):</b> ${ship.sog || "N/A"}</p>
                  <p><b>Course (COG):</b> ${ship.cog || "N/A"}</p>
                  <p><b>Latitude:</b> ${ship.latitude || "N/A"}</p>
                  <p><b>Longitude:</b> ${ship.longitude || "N/A"}</p>
                  <p><b>LWL:</b> ${ship.lwl || "N/A"}</p>
                  <p><b>Breadth:</b> ${ship.breadth || "N/A"}</p>
                  <p><b>Draft:</b> ${ship.draft || "N/A"}</p>
                  <p><b>Port:</b> ${ship.port || "N/A"}</p>
                </div>
              `;
            shipImage.style.display = "block";
            shipImage.src =
              ship.imageUrl ||
              "http://localhost:5001/assets/img/ships/525005223.jpg";
          } else {
            shipDetails.innerHTML =
              "<p class='text-gray-500 text-lg italic'>Ship not found</p>";
            shipImage.style.display = "none";
          }
        });

        mmsiList.appendChild(item);
      });
    }
  });
});
