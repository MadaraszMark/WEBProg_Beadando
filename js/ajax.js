const code = "JGCH8Qxyz123"; // <- Neptun + saját kódod

const output = document.getElementById("output");
const summary = document.getElementById("summary");
const feedback = document.getElementById("feedback");

// Segédfüggvény: üzenet
function showMessage(msg, isError = false) {
  feedback.textContent = msg;
  feedback.style.color = isError ? "red" : "green";
}

// CREATE
document.getElementById("createForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const height = document.getElementById("height").value.trim();
  const weight = document.getElementById("weight").value.trim();

  if (!name || !height || !weight || name.length > 30 || height.length > 30 || weight.length > 30) {
    showMessage("Hibás adatok! Üres vagy túl hosszú mező.", true);
    return;
  }

  fetch("http://localhost:8080", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `op=create&name=${name}&height=${height}&weight=${weight}&code=${code}`
  })
    .then(res => res.text())
    .then(data => showMessage("Sikeres hozzáadás!"))
    .catch(() => showMessage("Hiba történt CREATE közben.", true));
});

// READ – hibakeresős verzió
document.getElementById("loadData").addEventListener("click", () => {
  fetch(`http://localhost:8080/?op=read&code=${code}`)
    .then(res => res.text()) // ideiglenesen text
    .then(text => {
      try {
        const data = JSON.parse(text); // JSON-né próbáljuk konvertálni
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

        summary.textContent = `Összeg: ${sum}, Átlag: ${avg}, Legnagyobb: ${max}`;
        showMessage("Adatok betöltve.");
      } catch (e) {
        console.error("Nem sikerült JSON-né alakítani:", text);
        showMessage("Nem érvényes JSON válasz!", true);
      }
    })
    .catch((err) => {
      console.error("Hálózati hiba:", err);
      showMessage("Hiba történt az adatok lekérésekor.", true);
    });
});

// DELETE
document.getElementById("deleteForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const id = document.getElementById("deleteId").value.trim();

  if (!id) {
    showMessage("Törléshez adj meg egy ID-t!", true);
    return;
  }

  fetch("http://localhost:8080", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `op=delete&id=${id}&code=${code}`
  })
    .then(res => res.text())
    .then(data => showMessage("Törlés sikeres."))
    .catch(() => showMessage("Hiba történt DELETE közben.", true));
});

// UPDATE – lekér adatokat az ID alapján
document.getElementById("getDataForId").addEventListener("click", () => {
  const id = document.getElementById("updateId").value.trim();

  fetch(`http://localhost:8080/?op=read&code=${code}`)
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
    .catch(() => showMessage("Hiba történt az ID lekérdezés közben.", true));
});

// UPDATE – adatok frissítése
document.getElementById("updateForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const id = document.getElementById("updateId").value.trim();
  const name = document.getElementById("updateName").value.trim();
  const height = document.getElementById("updateHeight").value.trim();
  const weight = document.getElementById("updateWeight").value.trim();

  if (!id || !name || !height || !weight || name.length > 30 || height.length > 30 || weight.length > 30) {
    showMessage("Hibás adatok! Üres vagy túl hosszú mező.", true);
    return;
  }

  fetch("http://localhost:8080", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `op=update&id=${id}&name=${name}&height=${height}&weight=${weight}&code=${code}`
  })
    .then(res => res.text())
    .then(data => showMessage("Frissítés sikeres!"))
    .catch(() => showMessage("Hiba történt UPDATE közben.", true));
});

