import { useEffect, useState } from "react";
import Header from "./components/Header.jsx";
import UserForm from "./components/UserForm.jsx";
import UserCard from "./components/UserCard.jsx";
import UserFilter from "./components/UserFilter.jsx";
import UserList from "./components/UserList.jsx";
import UserSummary from "./components/UserSummary.jsx";

function App() {
  const [users, setUsers] = useState([
    { id: 1, name: "Leanne Graham", completed: false },
    { id: 2, name: "Ervin Howell", completed: false},
    { id: 3, name: "Clementine Bauch", completed: false },
    { id: 4, name: "Patricia Lebsack", completed: false },
    { id: 5, name: "Chelsey Dietrich", completed: false },
    { id: 6, name: "Mrs. Dennis Schulist", completed: false },
    { id: 7, name: "Kurtis Weissnat", completed: false },
    { id: 8, name: "Nicholas Runolfsdottir V", completed: false },
    { id: 9, name: "Glenna Reichert", completed: false },
    { id: 10, name: "Clementina DuBuque", completed: false },
  ]);

  const [filter, setFilter] = useState("all");

  useEffect(() => {
    document.title = `${users.length} Users`;
  }, [users]);

  function createFictionalEmail(name) {
    const emailHandle = name
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, "")
      .trim()
      .replace(/\s+/g, ".");

    return `${emailHandle}@webd172.example`;
  }

  function createFictionalCompany(name) {
    const firstName = name.split(" ")[0] || "User";

    return {
      name: `${firstName} Creative Studio`,
    };
  }

  function addUser(name) {
    const newUser = {
      id: Date.now(),
      name,
      email: createFictionalEmail(name),
      company: createFictionalCompany(name),
      completed: false,
    };

    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
  }

  function toggleUser(id) {
    const updatedUsers = users.map((user) => {
      if (user.id === id) {
        return {
          ...user,
          completed: !user.completed,
        };
      }

      return user;
    });

    setUsers(updatedUsers);
  }

  function deleteUser(id) {
    const updatedUsers = users.filter((user) => {
      return user.id !== id;
    });

    setUsers(updatedUsers);
  }

  function markUserAsCompletedByName(name) {
    const normalizedName = name.toLowerCase();

    const updatedUsers = users.map((user) => {
      if (user.name.toLowerCase() === normalizedName) {
        return {
          ...user,
          completed: true,
        };
      }

      return user;
    });

    setUsers(updatedUsers);
  }

  const completedUsers = users.filter((user) => {
    return user.completed;
  });

  const activeUsers = users.filter((user) => {
    return !user.completed;
  });

  const completedCount = completedUsers.length;
  const totalCount = users.length;

  let displayedUsers = users;

  if (filter === "active") {
    displayedUsers = activeUsers;
  }

  if (filter === "completed") {
    displayedUsers = completedUsers;
  }

  return (
    <main className="app">
      <Header />

      <UserForm onAddUser={addUser} />

      <UserSummary completedCount={completedCount} totalCount={totalCount} />

      <UserFilter currentFilter={filter} onFilterChange={setFilter} />

      <UserList
        users={displayedUsers}
        onToggleUser={toggleUser}
        onDeleteUser={deleteUser}
      />

      <UserCard users={users} onUserPicked={markUserAsCompletedByName} />
    </main>
  );
}

export default App;
