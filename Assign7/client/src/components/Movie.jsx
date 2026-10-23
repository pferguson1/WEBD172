// Renders one movie row with watched toggle and delete action
function Movie({ movie, onToggleMovie, onDeleteMovie }) {
  // Toggle watched status for this movie
  function handleToggle() {
    onToggleMovie(movie.id);
  }

  // Remove this movie from the list
  function handleDelete() {
    onDeleteMovie(movie.id);
  }

  // Add completed styling when movie is marked watched
  const movieClassName = movie.completed ? "movie completed" : "movie";

  return (
    <li className={movieClassName}>
      <label className="movie-content">
        <input
          type="checkbox"
          checked={movie.completed}
          onChange={handleToggle}
        />

        <span>{movie.title}</span>
      </label>

      <button className="delete-button" type="button" onClick={handleDelete}>
        Delete
      </button>
    </li>
  );
}

export default Movie;
