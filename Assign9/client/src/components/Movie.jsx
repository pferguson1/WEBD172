function Movie({ movie, onToggleMovie, onDeleteMovie }) {
  const movieId = movie._id ?? movie.id;

  function handleToggle() {
    onToggleMovie(movieId);
  }

  function handleDelete() {
    onDeleteMovie(movieId);
  }

  const movieClassName = movie.completed ? "movie completed" : "movie";

  return (
    <li className={movieClassName}>
      <label className="movie-content">
        <input
          type="checkbox"
          checked={movie.completed}
          onChange={handleToggle}
        />

        <span>{movie.name}</span>
      </label>

      <button className="delete-button" type="button" onClick={handleDelete}>
        Delete
      </button>
    </li>
  );
}

export default Movie;
