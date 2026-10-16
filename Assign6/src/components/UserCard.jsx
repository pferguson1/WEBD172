import { useEffect, useState } from "react";
import { getUsers } from "../api.js";

function UserCard({ semester = "Fall 2026", users = [], onUserPicked }) {
  const [userName, setUserName] = useState("");
  const [apiUsers, setApiUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadUsers() {
      try {
        const loadedUsers = await getUsers();
        setApiUsers(loadedUsers);
      } catch (loadError) {
        setError("Unable to load user data.");
        console.error("Error loading users:", loadError);
      }
    }

    loadUsers();
  }, []);

  function handleSearch() {
    const trimmedName = userName.trim();

    if (!trimmedName) {
      setSelectedUser(null);
      setError("Please enter your name.");
      return;
    }

    const matchedLocalUser = users.find((user) => {
      return (
        user.name?.toLowerCase() === trimmedName.toLowerCase() &&
        user.email &&
        user.company?.name
      );
    });

    const matchedApiUser = apiUsers.find((user) => {
      return user.name.toLowerCase() === trimmedName.toLowerCase();
    });

    const matchedUser = matchedLocalUser ?? matchedApiUser;

    if (!matchedUser) {
      setSelectedUser(null);
      setError("User not found. Enter a name from the list.");
      return;
    }

    setError("");
    setSelectedUser(matchedUser);

    if (onUserPicked) {
      onUserPicked(matchedUser.name);
    }
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      handleSearch();
    }
  }

  return (
    <section className="user-card-panel">
      <div className="user-card-header">
        <h1>User Information</h1>
        <h3>{semester} Semester</h3>
        <p>Welcome to WEBD 172 - User Directory Homework 6</p>
      </div>

      <div className="user-card-search">
        <input
          type="text"
          value={userName}
          placeholder="Enter user name"
          className="user-card-input"
          onChange={(event) => setUserName(event.target.value)}
          onKeyDown={handleKeyDown}
        />

        <button type="button" onClick={handleSearch}>
          Get User Info
        </button>
      </div>

      {error ? <p className="user-card-error">{error}</p> : null}

      {selectedUser ? (
        <div className="user-card-message">
          <h2>{selectedUser.name}</h2>
          <p>
            <strong>Email:</strong> {selectedUser.email}
          </p>
          <p>
            <strong>Company:</strong> {selectedUser.company.name}
          </p>
          <p className="semester-info">{semester}</p>
        </div>
      ) : null}
    </section>
  );
}

export default UserCard;
