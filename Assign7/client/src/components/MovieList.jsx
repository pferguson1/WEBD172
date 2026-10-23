import Movie from "./Movie.jsx";

// Renders movie collection and delegates each row to Movie component
function MovieList({ movies, onToggleMovie, onDeleteMovie }) {
  // Empty-state message when there are no movies to display
  if (movies.length === 0) {
    return (
      <section className="task-list">
        <p className="empty-message">No movies available.</p>
      </section>
    );
  }

  return (
    <section className="task-list">
      <h2>Your Movies</h2>

      <ul>
        {/* Render one Movie component for each movie item */}
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
