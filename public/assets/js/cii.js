document.addEventListener("DOMContentLoaded", function () {
  const mmsiInput = document.getElementById("mmsi-input");
  const mmsiList = document.getElementById("mmsi-list");
  const shipDetails = document.getElementById("ship-details");
  const shipImage = document.getElementById("ship-image");
  const buttonCalculate = document.getElementById("calculate-cii");

  // Fungsi untuk mengambil daftar MMSI yang sesuai dengan query
  async function fetchMmsiList(query) {
    try {
      const res = await fetch(`/api/v1/ais/list-mmsi?query=${query}`);
      const data = await res.json();
      return data.data.mmsiList || [];
    } catch (err) {
      console.error("Error fetching MMSI list:", err);
      return [];
    }
  }

  // Fungsi untuk mengambil detail kapal berdasarkan MMSI
  async function fetchShipDetails(mmsi) {
    try {
      const res = await fetch(`/api/v1/vessel/mmsi/${mmsi}`);
      console.log("Response status:", res);
      const data = await res.json();
      return data.data || null;
    } catch (err) {
      console.error("Error fetching ship data:", err);
      return null;
    }
  }

  // Event listener untuk input MMSI
  mmsiInput.addEventListener("input", async () => {
    const query = mmsiInput.value.trim();
    mmsiList.innerHTML = "";
    shipDetails.innerHTML =
      "<p class='text-gray-500 text-lg italic'>Ship not found</p>";
    shipImage.style.display = "none";
    buttonCalculate.style.display = "none";
    if (query.length >= 2) {
      const mmsis = await fetchMmsiList(query);

      mmsis.slice(0, 10).forEach((mmsi) => {
        const item = document.createElement("div");
        item.className =
          "bg-white p-2 rounded-md shadow hover:bg-blue-100 cursor-pointer transition duration-150 text-xs";
        item.textContent = mmsi;
        item.addEventListener("click", async () => {
          mmsiInput.value = mmsi;

          mmsiList.innerHTML = "";

          console.log("Fetching ship data for MMSI:", mmsiInput.value);
          const ship = await fetchShipDetails(mmsi);
          console.log("Ship data:", ship);
          if (ship) {
            shipDetails.innerHTML = `
                    <div id="ship-details" class="w-full text-gray-700 text-sm">
                    <h3 class="text-m font-bold mb-2 text-center">Ship Data</h3>
                     <div class="text-left text-xs">
                    <p><b>Ship Name:</b>  ${ship.name || "N/A"}</p>
                    <p><b>Flag:</b> ${ship.flag || "N/A"}</p>
                    <p><b>IMO Number:</b> ${ship.imo || "N/A"}</p>
                    <p><b>Type:</b> ${ship.type || "N/A"}</p>
                    <p><b>Speed (SOG):</b> ${ship.speed || "N/A"} knoot</p>
                    <p><b>Course (COG):</b> ${ship.course || "N/A"} °</p>
                    <p><b>Latitude:</b> ${ship.latitude || "N/A"}</p>
                    <p><b>Longitude:</b> ${ship.longitude || "N/A"}</p>
                    <p><b>LWL:</b>${ship.Lwl || "N/A"}  m</p>
                    <p><b>Breadth:</b> ${ship.breadth || "N/A"} m</p>
                    <p><b>Draft:</b> ${ship.draft || "N/A"} m</p>
                    <p><b>Port:</b> ${ship.port || "N/A"}i</p>
                    </div>
                      </div>
                  `;
            shipImage.style.display = "block";
            buttonCalculate.style.display = "block";
            shipImage.src = ship.picture || "/assets/img/ships/no-image.jpg";
            if (ship.picture == "https://example.com/image.jpg") {
              shipImage.src = "/assets/img/ships/no-image.jpg";
            }
          } else {
            shipDetails.innerHTML =
              "<p class='text-gray-500 text-lg italic'>Ship not found</p>";
            shipImage.style.display = "none";
            buttonCalculate.style.display = "none";
          }
        });
        mmsiList.appendChild(item);
      });
    }
  });
});
