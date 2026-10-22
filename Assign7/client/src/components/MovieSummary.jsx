function MovieSummary({ completedCount, totalCount }) {
  return (
    <p className="task-summary">
      {completedCount} of {totalCount} movies watched
    </p>
  );
}

export default MovieSummary;
