const table = document.getElementById("numberTable");
const canvas = document.getElementById("myChart");
let chart; // globális változó a diagramhoz

// Hozz létre eseménykezelőt minden sorra
Array.from(table.querySelectorAll("tbody tr")).forEach((row, index) => {
  row.addEventListener("click", () => {
    const values = Array.from(row.children).map(td => parseFloat(td.textContent));
    drawChart(values, index + 1);
  });
});

function drawChart(data, rowIndex) {
  const labels = data.map((_, i) => `Érték ${i + 1}`);

  const config = {
    type: "line",
    data: {
      labels: labels,
      datasets: [{
        label: `Kiválasztott sor: ${rowIndex}`,
        data: data,
        borderWidth: 2,
        fill: false,
        tension: 0.3
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: true
        },
        title: {
          display: true,
          text: 'Chart.js Vonaldiagram'
        }
      },
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  };

  // Ha már van diagram, töröljük
  if (chart) {
    chart.destroy();
  }

  chart = new Chart(canvas, config);
}
