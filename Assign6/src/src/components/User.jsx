function User({ user, onToggleUser, onDeleteUser }) {
  function handleToggle() {
    onToggleUser(user.id);
  }

  function handleDelete() {
    onDeleteUser(user.id);
  }

  const userClassName = user.completed ? "user-item completed" : "user-item";
  const displayName = user.name ?? user.title;

  return (
    <li className={userClassName}>
      <label className="user-item-content">
        <input
          type="checkbox"
          checked={user.completed}
          onChange={handleToggle}
        />

        <span>{displayName}</span>
      </label>

      <button
        className="user-delete-button"
        type="button"
        onClick={handleDelete}
      >
        Delete
      </button>
    </li>
  );
}

export default User;
