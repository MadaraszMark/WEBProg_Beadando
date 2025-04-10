const code = "JGCH8Qxyz123";
const serverUrl = "http://gamf.nhely.hu/ajax2/";

function showMessage(msg, isError = false) {
  const feedback = document.getElementById("feedback");
  feedback.textContent = msg;
  feedback.style.color = isError ? "red" : "green";
}

document.getElementById("createForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const height = document.getElementById("height").value.trim();
  const weight = document.getElementById("weight").value.trim();

  if (!name || !height || !weight || name.length > 100 || height.length > 100 || weight.length > 100) {
    showMessage("Hibás adatok – üres vagy túl hosszú mező.", true);
    return;
  }

  const params = new URLSearchParams({
    op: "create",
    name,
    height,
    weight,
    code,
  });

  fetch(serverUrl, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params,
  })
    .then(res => res.text())
    .then(data => {
      showMessage(`Hozzáadás: ${data} rekord érintett.`);
    })
    .catch(() => showMessage("Hiba történt CREATE közben.", true));
});

document.getElementById("loadData").addEventListener("click", () => {
  const params = new URLSearchParams({
    op: "read",
    code,
  });

  fetch(serverUrl, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params,
  })
    .then(res => res.json())
    .then(data => {
      const output = document.getElementById("output");
      const summary = document.getElementById("summary");

      let html = "";
      let heights = [];

      data.list.forEach(item => {
        html += `<p>ID: ${item.id}, Név: ${item.name}, Magasság: ${item.height}, Súly: ${item.weight}</p>`;
        heights.push(parseFloat(item.height));
      });

      output.innerHTML = html;

      const sum = heights.reduce((a, b) => a + b, 0);
      const avg = (sum / heights.length).toFixed(2);
      const max = Math.max(...heights);

      summary.textContent = `Összeg: ${sum}, Átlag: ${avg}, Max: ${max}`;
      showMessage("Adatok betöltve.");
    })
    .catch(() => showMessage("Hiba történt az adatok lekérésekor.", true));
});

document.getElementById("deleteForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const id = document.getElementById("deleteId").value.trim();
  if (!id) {
    showMessage("Törléshez add meg az ID-t!", true);
    return;
  }

  const params = new URLSearchParams({
    op: "delete",
    id,
    code,
  });

  fetch(serverUrl, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params,
  })
    .then(res => res.text())
    .then(data => showMessage(`Törlés: ${data} rekord érintett.`))
    .catch(() => showMessage("Hiba történt DELETE közben.", true));
});

document.getElementById("getDataForId").addEventListener("click", () => {
  const id = document.getElementById("updateId").value.trim();
  if (!id) {
    showMessage("Adj meg egy ID-t!", true);
    return;
  }

  const params = new URLSearchParams({
    op: "read",
    code,
  });

  fetch(serverUrl, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params,
  })
    .then(res => res.json())
    .then(data => {
      const found = data.list.find(item => item.id === id);
      if (found) {
        document.getElementById("updateName").value = found.name;
        document.getElementById("updateHeight").value = found.height;
        document.getElementById("updateWeight").value = found.weight;
        showMessage("Adatok betöltve.");
      } else {
        showMessage("Nincs ilyen ID!", true);
      }
    })
    .catch(() => showMessage("Hiba történt ID lekérdezés közben.", true));
});

document.getElementById("updateForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const id = document.getElementById("updateId").value.trim();
  const name = document.getElementById("updateName").value.trim();
  const height = document.getElementById("updateHeight").value.trim();
  const weight = document.getElementById("updateWeight").value.trim();

  if (!id || !name || !height || !weight || name.length > 100 || height.length > 100 || weight.length > 100) {
    showMessage("Hibás adatok – üres vagy túl hosszú mező.", true);
    return;
  }

  const params = new URLSearchParams({
    op: "update",
    id,
    name,
    height,
    weight,
    code,
  });

  fetch(serverUrl, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params,
  })
    .then(res => res.text())
    .then(data => showMessage(`Frissítés: ${data} rekord érintett.`))
    .catch(() => showMessage("Hiba történt UPDATE közben.", true));
});

