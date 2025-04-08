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
  });
  
  // 2. Web Worker
  let worker;
  function startWorker() {
    if (typeof(Worker) !== "undefined") {
      if (!worker) {
        worker = new Worker("../js/worker.js");
        worker.onmessage = function(e) {
          document.getElementById("workerOutput").textContent = "Számolás: " + e.data;
        };
      }
    } else {
      document.getElementById("workerOutput").textContent = "A böngésződ nem támogatja a Web Workert!";
    }
  }
  
  // 3. Server-Sent Events (szimulált)
  if (typeof(EventSource) === "undefined") {
    console.log("Ez a böngésző nem támogatja az SSE-t");
  }
  
  // 4. Geolocation
  function getLocation() {
    const output = document.getElementById("geoOutput");
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          output.textContent = `Szélesség: ${latitude}, Hosszúság: ${longitude}`;
        },
        () => output.textContent = "Nem sikerült a helymeghatározás."
      );
    } else {
      output.textContent = "A böngésződ nem támogatja a Geolocation API-t!";
    }
  }
  
  // 5. Drag and Drop
  const dragBox = document.getElementById("dragBox");
  const dropZone = document.getElementById("dropZone");
  
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
  
  // 6. Canvas
  const canvas = document.getElementById("myCanvas");
  const ctx = canvas.getContext("2d");
  
  ctx.fillStyle = "blue";
  ctx.fillRect(10, 10, 100, 50);
  
  ctx.fillStyle = "white";
  ctx.font = "16px Arial";
  ctx.fillText("Canvas példaszöveg", 10, 80);
  
  // 7. SVG - nincs JS, csak megjelenik
  