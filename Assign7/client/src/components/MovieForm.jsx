import { useState } from "react";

// Form for adding a new movie title to the list
function MovieForm({ onAddTask }) {
  // Controlled input state
  const [title, setTitle] = useState("");

  // Update input state as user types
  function handleTitleChange(event) {
    setTitle(event.target.value);
  }

  // Validate and submit movie title to parent component
  function handleSubmit(event) {
    event.preventDefault();

    const trimmedTitle = title.trim();

    if (trimmedTitle === "") {
      return;
    }

    onAddTask(trimmedTitle);

    // Clear input after successful submit
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
