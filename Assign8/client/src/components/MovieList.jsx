import Movie from "./Movie.jsx";

function MovieList({ movies, onToggleMovie, onDeleteMovie }) {
  if (movies.length === 0) {
    return (
      <section className="movie-list">
        <p className="empty-message">No movies available.</p>
      </section>
    );
  }

  return (
    <section className="movie-list">
      <h2>Your Movies</h2>

      <ul>
        {movies.map((movie) => (
          <Movie
            key={movie.id}
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
