import User from "./User.jsx";

function UserList({ users = [], onToggleUser, onDeleteUser }) {
  const userItems = users;

  if (userItems.length === 0) {
    return (
      <section className="user-list">
        <p className="empty-message">No users available.</p>
      </section>
    );
  }

  return (
    <section className="user-list">
      <h2>User Directory</h2>

      <ul>
        {userItems.map((user) => (
          <User
            key={user.id}
            user={user}
            onToggleUser={onToggleUser}
            onDeleteUser={onDeleteUser}
          />
        ))}
      </ul>
    </section>
  );
}

export default UserList;
