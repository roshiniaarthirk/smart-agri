function updateDateTime() {
  document.getElementById("dateTime").innerText =
    new Date().toLocaleString();
}
setInterval(updateDateTime, 1000);

// Chart
const ctx = document.getElementById("moistureChart").getContext("2d");

const moistureChart = new Chart(ctx, {
  type: "line",
  data: {
    labels: [],
    datasets: [{
      label: "Soil Moisture %",
      data: [],
      borderColor: "#2e7d32",
      fill: false,
      tension: 0.3
    }]
  }
});

function updateSensorData() {

  let moisture = Math.floor(Math.random() * 100);
  let temp = Math.floor(Math.random() * 40);
  let humidity = Math.floor(Math.random() * 100);
  let water = Math.floor(Math.random() * 100);
  let rain = Math.random() > 0.75 ? "Detected" : "Not Detected";

  document.getElementById("moisture").innerText = moisture + "%";
  document.getElementById("temperature").innerText = temp + "°C";
  document.getElementById("humidity").innerText = humidity + "%";
  document.getElementById("waterLevel").innerText = water + "%";
  document.getElementById("rainStatus").innerText = rain;

  // Motor Logic
  if (moisture < 30) {
    document.getElementById("motorStatus").innerText = "ON";
    document.getElementById("alertBox").innerText =
      "Low Soil Moisture - Motor Activated";
  } else if (rain === "Detected") {
    document.getElementById("motorStatus").innerText = "OFF";
    document.getElementById("alertBox").innerText =
      "Rain Detected - Motor Stopped";
  } else {
    document.getElementById("motorStatus").innerText = "OFF";
    document.getElementById("alertBox").innerText = "System Normal";
  }

  // ML Simulation
  if (moisture > 45 && temp < 35) {
    document.getElementById("plantHealth").innerText =
      "Plant Health: Healthy 🌿";
    document.getElementById("yieldPrediction").innerText =
      "Predicted Yield: 88%";
    document.getElementById("fertilizerAdvice").innerText =
      "Fertilizer: Balanced NPK Recommended";
  } else {
    document.getElementById("plantHealth").innerText =
      "Plant Health: Moderate ⚠";
    document.getElementById("yieldPrediction").innerText =
      "Predicted Yield: 65%";
    document.getElementById("fertilizerAdvice").innerText =
      "Fertilizer: Nitrogen-rich Fertilizer Required";
  }

  // Update Chart
  moistureChart.data.labels.push(new Date().toLocaleTimeString());
  moistureChart.data.datasets[0].data.push(moisture);

  if (moistureChart.data.labels.length > 8) {
    moistureChart.data.labels.shift();
    moistureChart.data.datasets[0].data.shift();
  }

  moistureChart.update();
}
