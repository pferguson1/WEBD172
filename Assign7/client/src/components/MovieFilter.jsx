// Filter controls for movie list view
function MovieFilter({ currentFilter, onFilterChange }) {
  // Show every movie
  function showAllMovies() {
    onFilterChange("all");
  }

  // Show only movies not marked watched
  function showUnwatchedMovies() {
    onFilterChange("active");
  }

  // Show only watched movies
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
