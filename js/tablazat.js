let users = [];
let editingIndex = null;

const form = document.getElementById("userForm");
const tableBody = document.querySelector("#userTable tbody");
const searchInput = document.getElementById("search");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const age = parseInt(document.getElementById("age").value);
  const email = document.getElementById("email").value.trim();
  const city = document.getElementById("city").value.trim();

  if (!name || !email || !city || isNaN(age)) {
    alert("Minden mezőt helyesen kell kitölteni!");
    return;
  }

  const user = { name, age, email, city };

  if (editingIndex === null) {
    users.push(user);
  } else {
    users[editingIndex] = user;
    editingIndex = null;
    form.querySelector("button").textContent = "Hozzáadás";
  }

  form.reset();
  renderTable();
});

function renderTable(filteredUsers = users) {
  tableBody.innerHTML = "";

  filteredUsers.forEach((user, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${user.name}</td>
      <td>${user.age}</td>
      <td>${user.email}</td>
      <td>${user.city}</td>
      <td>
        <button onclick="editUser(${index})">✏️</button>
        <button onclick="deleteUser(${index})">🗑️</button>
      </td>
    `;

    tableBody.appendChild(row);
  });
}

function editUser(index) {
  const user = users[index];
  document.getElementById("name").value = user.name;
  document.getElementById("age").value = user.age;
  document.getElementById("email").value = user.email;
  document.getElementById("city").value = user.city;
  editingIndex = index;
  form.querySelector("button").textContent = "Mentés";
}

function deleteUser(index) {
  if (confirm("Biztosan törlöd ezt a sort?")) {
    users.splice(index, 1);
    renderTable();
  }
}

searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();

  const filtered = users.filter(user =>
    Object.values(user).some(val =>
      val.toString().toLowerCase().includes(query)
    )
  );

  renderTable(filtered);
});

const headers = document.querySelectorAll("#userTable th[data-column]");
headers.forEach(header => {
  header.addEventListener("click", () => {
    const column = header.getAttribute("data-column");

    users.sort((a, b) => {
      if (typeof a[column] === "string") {
        return a[column].localeCompare(b[column]);
      }
      return a[column] - b[column];
    });

    renderTable();
  });
});
