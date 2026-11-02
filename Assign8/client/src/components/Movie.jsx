function Movie({ movie, onToggleMovie, onDeleteMovie }) {
  function handleToggle() {
    onToggleMovie(movie.id);
  }

  function handleDelete() {
    onDeleteMovie(movie.id);
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

        <span>{movie.title}</span>
      </label>

      <button className="delete-button" type="button" onClick={handleDelete}>
        Delete
      </button>
    </li>
  );
}

export default Movie;
