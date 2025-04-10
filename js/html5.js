// 1. Web Storage
function saveToStorage() {
  const input = document.getElementById("storageInput").value;
  localStorage.setItem("myData", input);
  document.getElementById("storageOutput").textContent = "Elmentve: " + input;
}

// Betöltéskor jelenjen meg az elmentett adat
window.addEventListener("DOMContentLoaded", () => {
  const saved = localStorage.getItem("myData");
  if (saved) {
      document.getElementById("storageOutput").textContent = "Korábban mentve: " + saved;
  }

  // 6. Canvas újra-inicializálás DOM betöltéskor
  const canvas = document.getElementById("myCanvas");
  if (canvas && canvas.getContext) {
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "blue";
      ctx.fillRect(10, 10, 100, 50);
      ctx.fillStyle = "white";
      ctx.font = "16px Arial";
      ctx.fillText("Canvas példaszöveg", 10, 80);
  }
});

// 2. Web Worker
let worker;
function startWorker() {
  if (typeof(Worker) !== "undefined") {
      if (!worker) {
          worker = new Worker("js/worker.js");
          worker.onmessage = function(e) {
              document.getElementById("workerOutput").textContent = "Számolás: " + e.data;
          };
      }
  } else {
      document.getElementById("workerOutput").textContent = "A böngésződ nem támogatja a Web Workert!";
  }
}

// 3. Server-Sent Events (szimulált példa időzítéssel)
const sseOutput = document.getElementById("sseOutput");

if (sseOutput) {
  let counter = 0;
  setInterval(() => {
    counter++;
    const time = new Date().toLocaleTimeString();
    sseOutput.textContent = `Érkezett új adat (${counter}): ${time}`;
  }, 5000); // 5 másodpercenként új "üzenet"
}

// 4. Geolocation
function getLocation() {
  const output = document.getElementById("geoOutput");
  if (!navigator.geolocation) {
    output.textContent = "A böngésződ nem támogatja a Geolocation API-t!";
    return;
  }

  output.textContent = "Helyzet lekérése folyamatban...";

  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const { latitude, longitude } = pos.coords;
      output.textContent = `Szélesség: ${latitude.toFixed(4)}, Hosszúság: ${longitude.toFixed(4)}`;
    },
    (err) => {
      console.error("Geolocation hiba:", err);
      switch (err.code) {
        case err.PERMISSION_DENIED:
          output.textContent = "Hozzáférés megtagadva a helymeghatározáshoz.";
          break;
        case err.POSITION_UNAVAILABLE:
          output.textContent = "A helyzet nem elérhető.";
          break;
        case err.TIMEOUT:
          output.textContent = "A helymeghatározás túl sokáig tartott.";
          break;
        default:
          output.textContent = "Ismeretlen hiba történt.";
      }
    }
  );
}


// 5. Drag and Drop
const dragBox = document.getElementById("dragBox");
const dropZone = document.getElementById("dropZone");

if (dragBox && dropZone) {
  dragBox.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text", "dragBox");
  });

  dropZone.addEventListener("dragover", (e) => {
      e.preventDefault();
  });

  dropZone.addEventListener("drop", (e) => {
      e.preventDefault();
      const data = e.dataTransfer.getData("text");
      if (data === "dragBox") {
          dropZone.appendChild(dragBox);
      }
  });
}

// 8. SVG interakció
const svgCircle = document.getElementById("svgCircle");

svgCircle.addEventListener("click", () => {
  const circle = svgCircle.querySelector("circle");
  const currentColor = circle.getAttribute("fill");
  const newColor = currentColor === "yellow" ? "orange" : "yellow";
  circle.setAttribute("fill", newColor);
});

  