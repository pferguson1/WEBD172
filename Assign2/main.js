import { getUsers } from "./api.js";

let userArray = [];

async function fetchUsers() {
  userArray = await getUsers();
  displayUsers(userArray);
}

function displayUsers(userArray) {
  const userList = document.getElementById("userList");
  userList.innerHTML = ""; // Clear existing list items

  userArray.forEach((user) => {
    userList.innerHTML += `
      <div class="userlist-card">
        <h2><strong>${user.name}</strong></h2>
        <p>Email: ${user.email}</p>
        <p>City: ${user.address.city}</p>
      </div>
    `;
  });
}

document.getElementById("searchBox").addEventListener("input", (event) => {
  let searchTerm = event.target.value.toLowerCase();
  let filteredUsers = userArray.filter((user) =>
    user.name.toLowerCase().includes(searchTerm),
  );
  displayUsers(filteredUsers);
});

document.getElementById("sortButton").addEventListener("click", function () {
  const sortedUsers = [...userArray];
  sortedUsers.sort(function (a, b) {
    return a.name.localeCompare(b.name);
  });

  displayUsers(sortedUsers);
});

document.getElementById("clearButton").addEventListener("click", function () {
  document.getElementById("searchBox").value = "";
  displayUsers(userArray);
});

fetchUsers();
