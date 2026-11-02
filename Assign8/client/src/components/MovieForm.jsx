import { useState } from "react";

function MovieForm({ onAddMovie }) {
  const [title, setTitle] = useState("");

  function handleTitleChange(event) {
    setTitle(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    const trimmedTitle = title.trim();

    if (trimmedTitle === "") {
      return;
    }

    onAddMovie(trimmedTitle);
    setTitle("");
  }

  return (
    <form className="movie-form" onSubmit={handleSubmit}>
      <label htmlFor="movieTitle">New Movie</label>

      <div className="movie-form-row">
        <input
          id="movieTitle"
          type="text"
          value={title}
          onChange={handleTitleChange}
          placeholder="Enter a movie"
        />

        <button type="submit">Add Movie</button>
      </div>
    </form>
  );
}

export default MovieForm;
