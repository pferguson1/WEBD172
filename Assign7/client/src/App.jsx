import { useEffect, useState } from "react";
import Header from "./components/Header.jsx";
import MovieForm from "./components/MovieForm.jsx";
import MovieSummary from "./components/MovieSummary.jsx";
import MovieFilter from "./components/MovieFilter.jsx";
import MovieList from "./components/MovieList.jsx";
import About from "./components/About.jsx";

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [currentView, setCurrentView] = useState("tasks");

  useEffect(() => {
    async function loadMovies() {
      try {
        setIsLoading(true);
        setErrorMessage("");

        const response = await fetch("http://localhost:3000/api/movies");

        if (!response.ok) {
          throw new Error("Could not load movies.");
        }

        const serverMovies = await response.json();
        const normalizedMovies = serverMovies.map((movie) => {
          return {
            ...movie,
            title: `${movie.name} (${movie.year})`,
            completed: false,
          };
        });

        setTasks(normalizedMovies);
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    loadMovies();
  }, []);

  useEffect(() => {
    if (currentView === "about") {
      document.title = "About";
      return;
    }

    document.title = `${tasks.length} Movies`;
  }, [tasks, currentView]);

  function addTask(title) {
    const newTask = {
      id: Date.now(),
      title: title,
      completed: false,
    };

    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
  }

  function toggleTask(id) {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return {
          ...task,
          completed: !task.completed,
        };
      }

      return task;
    });

    setTasks(updatedTasks);
  }

  function deleteTask(id) {
    const updatedTasks = tasks.filter((task) => {
      return task.id !== id;
    });

    setTasks(updatedTasks);
  }

  const completedTasks = tasks.filter((task) => {
    return task.completed;
  });

  const activeTasks = tasks.filter((task) => {
    return !task.completed;
  });

  const completedCount = completedTasks.length;
  const totalCount = tasks.length;

  let displayedTasks = tasks;

  if (filter === "active") {
    displayedTasks = activeTasks;
  }

  if (filter === "completed") {
    displayedTasks = completedTasks;
  }

  let taskContent = null;

  if (isLoading) {
    taskContent = <p className="status-message">Loading movies...</p>;
  } else if (errorMessage !== "") {
    taskContent = (
      <>
        <p className="error-message">{errorMessage}</p>
        <p className="help-message">
          Make sure the Express server is running on port 3000.
        </p>
      </>
    );
  } else {
    taskContent = (
      <>
        <MovieForm onAddTask={addTask} />

        <MovieSummary completedCount={completedCount} totalCount={totalCount} />

        <MovieFilter currentFilter={filter} onFilterChange={setFilter} />

        <MovieList
          movies={displayedTasks}
          onToggleMovie={toggleTask}
          onDeleteMovie={deleteTask}
        />
      </>
    );
  }

  return (
    <main className="app">
      <Header />

      <div className="view-switcher" aria-label="App views">
        <button
          type="button"
          className={currentView === "tasks" ? "active-view" : ""}
          onClick={() => setCurrentView("tasks")}
        >
          Movies
        </button>

        <button
          type="button"
          className={currentView === "about" ? "active-view" : ""}
          onClick={() => setCurrentView("about")}
        >
          About
        </button>
      </div>

      {currentView === "about" ? <About /> : taskContent}
    </main>
  );
}

export default App;
