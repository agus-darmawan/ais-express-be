document.addEventListener("DOMContentLoaded", function () {
  const mmsiInput = document.getElementById("mmsi-input");
  const mmsiList = document.getElementById("mmsi-list");
  const shipDetails = document.getElementById("ship-details");
  const shipImage = document.getElementById("ship-image");
  const buttonCalculate = document.getElementById("calculate-cii");
  const ciiModal = document.getElementById("cii-modal");
  const ciiCloseModal = document.getElementById("cii-close-modal");
  const ciiEstimation1 = document.getElementById("cii-estimation1");
  const ciiEstimation2 = document.getElementById("cii-estimation2");

  // Fetch MMSI list based on query
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

  // Fetch ship details by MMSI
  async function fetchShipDetails(mmsi) {
    try {
      const res = await fetch(`/api/v1/vessel/mmsi/${mmsi}`);
      const data = await res.json();
      return data.data || null;
    } catch (err) {
      console.error("Error fetching ship data:", err);
      return null;
    }
  }

  // Fetch the latest CII data by MMSI
  async function fetchLatestCii(mmsi) {
    try {
      const res = await fetch(`/api/v1/fcii/latest/${mmsi}`);
      const data = await res.json();
      return data.data;
    } catch (err) {
      console.error("Error fetching latest CII data:", err);
      return null;
    }
  }

  // Fetch all CII ratings by MMSI
  async function fetchCiiRatings(mmsi) {
    try {
      const res = await fetch(`/api/v1/fcii/ratings/${mmsi}`);
      const data = await res.json();
      return data.data;
    } catch (err) {
      console.error("Error fetching CII ratings:", err);
      return [];
    }
  }

  // Update the ship details section
  function updateShipInfo(ship) {
    shipDetails.innerHTML = `
      <h3 class="text-lg font-bold mb-2">Ship Data</h3>
      <div class="text-left text-xs">
        <p><b>Ship Name:</b> ${ship.name || "N/A"}</p>
        <p><b>IMO:</b> ${ship.imo || "N/A"}</p>
        <p><b>Type:</b> ${ship.type || "N/A"}</p>
        <p><b>Speed (SOG):</b> ${ship.speed || "N/A"} kn</p>
        <p><b>Course (COG):</b> ${ship.course || "N/A"} °</p>
        <p><b>Latitude:</b> ${ship.latitude || "N/A"}</p>
        <p><b>Longitude:</b> ${ship.longitude || "N/A"}</p>
        <p><b>LWL:</b> ${ship.Lwl || "N/A"} m</p>
        <p><b>Breadth:</b> ${ship.breadth || "N/A"} m</p>
        <p><b>Draft:</b> ${ship.draft || "N/A"} m</p>
        <p><b>Port:</b> ${ship.port || "N/A"}</p>
      </div>
    `;
    shipImage.src = ship.picture || "/assets/img/ships/525005223.jpg";
    shipImage.style.display = "block";
    buttonCalculate.style.display = "block";
  }

  // Render the CII value section and chart
  async function renderCiiData(mmsi) {
    const latestCii = await fetchLatestCii(mmsi);
    const ciiRatings = await fetchCiiRatings(mmsi);

    if (latestCii) {
      // Display the latest CII data
      const ciiValueDiv = document.getElementById("cii-value");
      ciiValueDiv.innerHTML = `
        <h3 class="text-lg font-bold mb-2">CII Value</h3>
        <div class="text-left text-xs space-y-0.5">
          <p><b>ME Fuel Consumption :</b> ${latestCii.fuelEstimateME} Liter</p>
          <p><b>AE Fuel Consumption :</b> ${latestCii.fuelEstimateAE} Liter</p>
          <p><b>Total Fuel Consumption :</b> ${latestCii.fuelEstimateTotal} Liter</p>
          <p><b>CII Required :</b> ${latestCii.ciiRequired} Liter</p>
          <p><b>CII Attained :</b> ${latestCii.ciiAttained} Liter</p>
          <p><b>Score :</b> ${latestCii.ciiRating.number}</p>
          <p><b>Grade :</b> ${latestCii.ciiRating.grade}</p>
        </div>
      `;
    }

    if (ciiRatings.length > 0) {
      // Render the CII ratings chart
      const ctx = document.getElementById("ciiLineChart").getContext("2d");
      new Chart(ctx, {
        type: "line",
        data: {
          labels: ciiRatings.map((_, index) => `CII ${index + 1}`),
          datasets: [
            {
              label: "CII Ratings",
              data: ciiRatings,
              borderColor: "#1F2937",
              backgroundColor: "rgba(31, 41, 55, 0.1)",
              fill: true,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            x: {
              title: { display: true, text: "CII Entries" },
            },
            y: {
              title: { display: true, text: "CII Rating" },
              min: 0,
              max: 1,
            },
          },
        },
      });
    }
  }

  // Handle MMSI input and search
  mmsiInput.addEventListener("input", async () => {
    const query = mmsiInput.value.trim();
    if (query.length >= 2) {
      const mmsis = await fetchMmsiList(query);
      mmsiList.innerHTML = "";
      mmsis.slice(0, 10).forEach((mmsi) => {
        const item = document.createElement("div");
        item.className =
          "bg-white p-2 rounded-md shadow hover:bg-blue-100 cursor-pointer transition duration-150 text-xs";
        item.textContent = mmsi;
        item.addEventListener("click", async () => {
          mmsiInput.value = mmsi;
          mmsiList.innerHTML = "";
          updateUrlParams(mmsi);

          const ship = await fetchShipDetails(mmsi);
          if (ship) {
            updateShipInfo(ship);
            await renderCiiData(mmsi);
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

  // Calculate CII button functionality
  buttonCalculate.addEventListener("click", () => {
    ciiModal.classList.remove("hidden");
  });

  ciiCloseModal.addEventListener("click", () => {
    ciiModal.classList.add("hidden");
  });

  ciiEstimation1.addEventListener("click", () => {
    // Show CII data when estimation 1 is selected
    ciiModal.classList.add("hidden");
    alert("Displaying CII data...");
    renderCiiData(mmsiInput.value); // Fetch CII data
  });

  ciiEstimation2.addEventListener("click", () => {
    // Show 'Coming Soon' message when estimation 2 is selected
    ciiModal.classList.add("hidden");
    alert("Coming Soon...");
    // You can add any relevant logic here for Estimation 2
  });
});
