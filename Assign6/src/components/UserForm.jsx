import { useState } from "react";

function UserForm({ onAddUser }) {
  const [userName, setUserName] = useState("");

  function handleUserNameChange(event) {
    setUserName(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    const trimmedUserName = userName.trim();

    if (trimmedUserName === "") {
      return;
    }

    onAddUser(trimmedUserName);
    setUserName("");
  }

  return (
    <form className="user-form" onSubmit={handleSubmit}>
      <label htmlFor="userName">New User</label>

      <div className="user-form-row">
        <input
          id="userName"
          type="text"
          value={userName}
          onChange={handleUserNameChange}
          placeholder="Enter a user name"
        />

        <button type="submit">Add User</button>
      </div>
    </form>
  );
}

export default UserForm;
