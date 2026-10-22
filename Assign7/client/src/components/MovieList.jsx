import Movie from "./Movie.jsx";

function MovieList({ movies, onToggleMovie, onDeleteMovie }) {
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
        {movies.map((movie) => (
          <Movie
            key={movie.id}
            task={movie}
            onToggleTask={onToggleMovie}
            onDeleteTask={onDeleteMovie}
          />
        ))}
      </ul>
    </section>
  );
}

export default MovieList;
