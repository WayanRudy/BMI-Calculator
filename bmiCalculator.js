let bmiChart;

// Fungsi untuk menghitung BMI berdasarkan unit
function calculateBMI() {
  const heightInput = Number(document.getElementById("height").value);
  const weightInput = Number(document.getElementById("weight").value);
  const age = Number(document.getElementById("age").value);
  const resultText = document.getElementById("resultText");
  const currentUnit = document.querySelector("nav .active").textContent.trim();

  // Validasi input
  if (!heightInput || !weightInput || !age || age < 2 || age > 120) {
    resultText.textContent = "Mohon masukkan nilai input yang valid.";
    document.getElementById("resultSection").style.display = "block";
    return;
  }

  // Konversi tinggi dan berat sesuai unit yang dipilih
  const { height, weight } = convertUnits(currentUnit, heightInput, weightInput);

  // Menghitung BMI
  const bmi = weight / (height * height);
  const bmiRounded = bmi.toFixed(1);
  const category = getCategory(bmi);

  // Menampilkan hasil BMI dan kategori
  resultText.textContent = `BMI = ${bmiRounded} (${category})`;
  renderChart(bmiRounded);

  // Menampilkan Rentang BMI Sehat
  displayBMIResults(height, weight, bmi);
}

// Fungsi untuk mengonversi unit tinggi dan berat
function convertUnits(unit, heightInput, weightInput) {
  let height, weight;

  if (unit === "US Units") {
    height = heightInput * 0.0254;
    weight = weightInput * 0.453592;
  } else if (unit === "Metric Units") {
    height = heightInput / 100;
    weight = weightInput;
  } else {
    height = heightInput;
    weight = weightInput;
  }

  return { height, weight };
}

// Fungsi untuk menentukan kategori BMI
function getCategory(bmi) {
  if (bmi < 18.5) return "Kurus";
  if (bmi < 25) return "Normal";
  if (bmi < 30) return "Berlebih";
  return "Obesitas";
}

// Fungsi untuk menampilkan hasil BMI rinci
function displayBMIResults(height, weight, bmi) {
  const minHealthyWeight = (18.5 * height * height).toFixed(1);
  const maxHealthyWeight = (24.9 * height * height).toFixed(1);
  document.getElementById("bmiRange").textContent = "18.5 - 24.9";
  document.getElementById("weightRange").textContent = `${minHealthyWeight} kg - ${maxHealthyWeight} kg`;

  const bmiPrime = (bmi / 24.9).toFixed(2);
  document.getElementById("bmiPrime").textContent = bmiPrime;

  const ponderalIndex = (weight / Math.pow(height, 3)).toFixed(2);
  document.getElementById("ponderalIndex").textContent = ponderalIndex;

  document.getElementById("resultSection").style.display = "block";
}

// Fungsi untuk menampilkan grafik
function renderChart(bmi) {
  const ctx = document.getElementById("bmiChart").getContext("2d");

  if (bmiChart) {
    bmiChart.destroy();
  }

  bmiChart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Kurus", "Normal", "Berlebih", "Obesitas"],
      datasets: [
        {
          data: [18.5, 24.9 - 18.5, 29.9 - 24.9, 40 - 29.9],
          backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#FF5733"],
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: true,
          position: "bottom",
        },
      },
    },
  });
}

// Fungsi untuk mereset semua field input dan hasil
function resetFields() {
  document.getElementById("age").value = "";
  document.getElementById("height").value = "";
  document.getElementById("weight").value = "";
  document.getElementById("resultText").textContent = "";
  document.getElementById("bmiRange").textContent = "";
  document.getElementById("weightRange").textContent = "";
  document.getElementById("bmiPrime").textContent = "";
  document.getElementById("ponderalIndex").textContent = "";
  document.getElementById("resultSection").style.display = "none";
  if (bmiChart) bmiChart.destroy();
}

// Event listener untuk tombol
document.getElementById("calculateBtn").addEventListener("click", calculateBMI);
document.getElementById("resetBtn").addEventListener("click", resetFields);
