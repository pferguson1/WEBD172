import { useState } from "react";

function MovieForm({ onAddTask }) {
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

    onAddTask(trimmedTitle);
    setTitle("");
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <label htmlFor="taskTitle">New Movie</label>

      <div className="task-form-row">
        <input
          id="taskTitle"
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
