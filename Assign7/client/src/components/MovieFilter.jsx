function MovieFilter({ currentFilter, onFilterChange }) {
  function showAllMovies() {
    onFilterChange("all");
  }

  function showUnwatchedMovies() {
    onFilterChange("active");
  }

  function showWatchedMovies() {
    onFilterChange("completed");
  }

  return (
    <div className="task-filters" aria-label="Movie filters">
      <button
        type="button"
        className={currentFilter === "all" ? "active-filter" : ""}
        onClick={showAllMovies}
      >
        All
      </button>

      <button
        type="button"
        className={currentFilter === "active" ? "active-filter" : ""}
        onClick={showUnwatchedMovies}
      >
        Unwatched
      </button>

      <button
        type="button"
        className={currentFilter === "completed" ? "active-filter" : ""}
        onClick={showWatchedMovies}
      >
        Watched
      </button>
    </div>
  );
}

export default MovieFilter;
