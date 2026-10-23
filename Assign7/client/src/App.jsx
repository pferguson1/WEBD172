import { useEffect, useState } from "react";
import Header from "./components/Header.jsx";
import MovieForm from "./components/MovieForm.jsx";
import MovieSummary from "./components/MovieSummary.jsx";
import MovieFilter from "./components/MovieFilter.jsx";
import MovieList from "./components/MovieList.jsx";
import About from "./components/About.jsx";

function App() {
  // App state
  const [movies, setMovies] = useState([]);
  const [filter, setFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [currentView, setCurrentView] = useState("movies");

  // Load movie data from the Express API on first render
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

        setMovies(normalizedMovies);
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    loadMovies();
  }, []);

  // Keep browser tab title in sync with current view and movie count
  useEffect(() => {
    if (currentView === "about") {
      document.title = "About";
      return;
    }

    document.title = `${movies.length} Movies`;
  }, [movies, currentView]);

  // Add a new movie to local state
  function addMovie(title) {
    const newMovie = {
      id: Date.now(),
      title: title,
      completed: false,
    };

    const updatedMovies = [...movies, newMovie];
    setMovies(updatedMovies);
  }

  // Toggle watched/unwatched state for a movie
  function toggleMovie(id) {
    const updatedMovies = movies.map((movie) => {
      if (movie.id === id) {
        return {
          ...movie,
          completed: !movie.completed,
        };
      }

      return movie;
    });

    setMovies(updatedMovies);
  }

  // Remove a movie from local state
  function deleteMovie(id) {
    const updatedMovies = movies.filter((movie) => {
      return movie.id !== id;
    });

    setMovies(updatedMovies);
  }

  // Derived collections and counts for summary + filtering
  const watchedMovies = movies.filter((movie) => {
    return movie.completed;
  });

  const unwatchedMovies = movies.filter((movie) => {
    return !movie.completed;
  });

  const completedCount = watchedMovies.length;
  const totalCount = movies.length;

  // Choose which movies to show based on active filter
  let displayedMovies = movies;

  if (filter === "active") {
    displayedMovies = unwatchedMovies;
  }

  if (filter === "completed") {
    displayedMovies = watchedMovies;
  }

  // Build the main movies view content based on loading/error/data state
  let movieContent = null;

  if (isLoading) {
    movieContent = <p className="status-message">Loading movies...</p>;
  } else if (errorMessage !== "") {
    movieContent = (
      <>
        <p className="error-message">{errorMessage}</p>
        <p className="help-message">
          Make sure the Express server is running on port 3000.
        </p>
      </>
    );
  } else {
    movieContent = (
      <>
        <MovieForm onAddTask={addMovie} />

        <MovieSummary completedCount={completedCount} totalCount={totalCount} />

        <MovieFilter currentFilter={filter} onFilterChange={setFilter} />

        <MovieList
          movies={displayedMovies}
          onToggleMovie={toggleMovie}
          onDeleteMovie={deleteMovie}
        />
      </>
    );
  }

  return (
    <main className="app">
      <Header />

      {/* View switcher: movies list or about page */}
      <div className="view-switcher" aria-label="App views">
        <button
          type="button"
          className={currentView === "movies" ? "active-view" : ""}
          onClick={() => setCurrentView("movies")}
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

      {/* Render About page or movie dashboard */}
      {currentView === "about" ? <About /> : movieContent}
    </main>
  );
}

export default App;
