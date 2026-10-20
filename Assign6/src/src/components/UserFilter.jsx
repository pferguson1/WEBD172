function UserFilter({ currentFilter, onFilterChange }) {
  function showAllUsers() {
    onFilterChange("all");
  }

  function showActiveUsers() {
    onFilterChange("active");
  }

  function showCompletedUsers() {
    onFilterChange("completed");
  }

  return (
    <div className="user-filters" aria-label="User filters">
      <button
        type="button"
        className={currentFilter === "all" ? "active-filter" : ""}
        onClick={showAllUsers}
      >
        All
      </button>

      <button
        type="button"
        className={currentFilter === "active" ? "active-filter" : ""}
        onClick={showActiveUsers}
      >
        Active
      </button>

      <button
        type="button"
        className={currentFilter === "completed" ? "active-filter" : ""}
        onClick={showCompletedUsers}
      >
        Completed
      </button>
    </div>
  );
}

export default UserFilter;
