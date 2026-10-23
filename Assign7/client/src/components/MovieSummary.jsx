// Displays watched vs total movie count
function MovieSummary({ completedCount, totalCount }) {
  return (
    <p className="movie-summary">
      {completedCount} of {totalCount} movies watched
    </p>
  );
}

export default MovieSummary;
