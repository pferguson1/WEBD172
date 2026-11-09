import Movie from "./Movie.jsx";

function MovieList({ movies, onToggleMovie, onDeleteMovie, hasAnyMovies, currentFilter }) {
  if (movies.length === 0) {
    const isFilteredEmpty = hasAnyMovies && currentFilter !== "all";

    return (
      <section className="movie-list">
        <p className="empty-message">
          {isFilteredEmpty
            ? "No movies match this filter. Switch to All to view your MongoDB movies."
            : "No movies available."}
        </p>
      </section>
    );
  }

  return (
    <section className="movie-list">
      <h2>Your Movies</h2>

      <ul>
        {movies.map((movie) => (
          <Movie
            key={movie._id ?? movie.id}
            movie={movie}
            onToggleMovie={onToggleMovie}
            onDeleteMovie={onDeleteMovie}
          />
        ))}
      </ul>
    </section>
  );
}

export default MovieList;
