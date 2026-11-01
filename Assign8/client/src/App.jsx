import { useEffect, useState } from "react";
import Header from "./components/Header.jsx";
import MovieForm from "./components/MovieForm.jsx";
import MovieSummary from "./components/MovieSummary.jsx";
import MovieFilter from "./components/MovieFilter.jsx";
import MovieList from "./components/MovieList.jsx";
import About from "./components/About.jsx";
import ApiDocs from "./components/ApiDocs.jsx";

// Base endpoint for movie CRUD requests.
const API_URL = "http://localhost:3000/api/movies";
const API_BASE_URL = "http://localhost:3000";

function App() {
  // App state for movies, filter mode, loading/errors, and current view tab.
  const [movies, setMovies] = useState([]);
  const [filter, setFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [currentView, setCurrentView] = useState("movies");

  // Load movie data from the API when the component first mounts.
  useEffect(() => {
    async function loadMovies() {
      try {
        setIsLoading(true);
        setErrorMessage("");

        // Fetch movie data from the API. Method GET is used to retrieve the list of movies from the server.
        const response = await fetch(API_URL, {
          method: "GET",
        });

        // Check if the response is successful (status code 200-299).
        if (!response.ok) {
          throw new Error("Could not load movies.");
        }

        // Parse the JSON response from the server. Method GET is used to retrieve the list of movies from the server.
        const serverMovies = await response.json();

        // Normalize server data to include fields used by the UI.
        const normalizedMovies = serverMovies.reduce((list, movie) => {
          list.push({
            ...movie,
            title: `${movie.name} (${movie.year})`,
            completed: false,
          });
          return list;
        }, []);
        // Update the local state with the normalized movie data.
        setMovies(normalizedMovies);
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    // Call the loadMovies function to fetch and set movie data.
    loadMovies();
  }, []);

  // Keep the browser tab title synced with the selected view.
  useEffect(() => {
    if (currentView === "about") {
      document.title = "About";
      return;
    }
    // Update the document title to reflect the number of movies in the list.
    document.title = `${movies.length} Movies`;
  }, [movies, currentView]);

  // Add a new movie item to local state.
  async function addMovie(title) {
    try {
      setErrorMessage("");

      const response = await fetch(API_URL, {
        // Create a movie on the server. Method POST is used to send the new movie data to the server.
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title }),
      });

      if (!response.ok) {
        throw new Error("Could not add movie.");
      }

      const createdMovie = await response.json();
      const normalizedMovie = {
        ...createdMovie,
        title: `${createdMovie.name} (${createdMovie.year})`,
        completed: false,
      };

      // Create a new array of movies with the new movie added.
      setMovies((prevMovies) => [...prevMovies, normalizedMovie]);
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  // Toggle watched/unwatched status for a movie. Method PUT is used to update the movie on the server, and local state is updated optimistically.
  async function updateMovie(id, payload) {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("Could not update movie.");
    }

    return response.json();
  }

  // Toggle watched/unwatched status for a movie.
  async function toggleMovie(id) {
    let toggledMovie = null;

    setMovies((prevMovies) => {
      const updatedMovies = prevMovies.reduce((list, movie) => {
        if (movie.id === id) {
          toggledMovie = {
            ...movie,
            completed: !movie.completed,
          };
          list.push(toggledMovie);
          return list;
        }

        // Return the movie unchanged if it doesn't match the specified ID.
        list.push(movie);
        return list;
      }, []);

      // Update the local state with the modified movie list.
      return updatedMovies;
    });

    try {
      setErrorMessage("");

      // Only sync updates for movies that exist on the server schema.
      const isServerMovie = Boolean(toggledMovie && toggledMovie.name);

      if (isServerMovie) {
        await updateMovie(id, {
          name: toggledMovie.name,
          year: toggledMovie.year,
          description: toggledMovie.description,
        });
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  // Remove a movie from local state. Method DELETE is used to remove the movie from the server, and local state is updated optimistically.
  async function deleteMovie(id) {
    try {
      setErrorMessage("");

      const movieToDelete = movies.find((movie) => movie.id === id);

      // Local movies added in the UI don't exist on the server yet.
      const isServerMovie = Boolean(movieToDelete && movieToDelete.name);

      if (isServerMovie) {
        const response = await fetch(`${API_URL}/${id}`, {
          // Delete a movie from the server collection.
          method: "DELETE",
        });

        // 404 can happen if the movie was already removed on the server.
        if (!response.ok && response.status !== 404) {
          throw new Error("Could not delete movie.");
        }
      }

      // Update the local state with the filtered movie list.
      setMovies((prevMovies) => {
        return prevMovies.filter((movie) => movie.id !== id);
      });
    } catch (error) {
      setErrorMessage(error.message);
    }
  }
  // Calculate counts of completed and active movies for summary display.
  const completedMovies = movies.filter((movie) => {
    return movie.completed;
  });
  // Calculate counts of completed and active movies for summary display.
  const activeMovies = movies.filter((movie) => {
    return !movie.completed;
  });

  const completedCount = completedMovies.length;
  const totalCount = movies.length;

  // Determine which movies should be displayed based on filter selection.
  let displayedMovies = movies;

  if (filter === "active") {
    displayedMovies = activeMovies;
  }

  if (filter === "completed") {
    displayedMovies = completedMovies;
  }

  // Build main content area based on loading, error, and data states.
  let movieContent = null;

  // Show loading state while movie data is being fetched.
  if (isLoading) {
    movieContent = <p className="status-message">Loading movies...</p>;
    // Show API/network errors when requests fail.
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
    // Normal app view when data is loaded successfully.
    movieContent = (
      <>
        <MovieForm onAddMovie={addMovie} />

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

      {/* Simple view switcher between movie list and about page. */}
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

        <button
          type="button"
          className={`api-button ${currentView === "api" ? "active-view" : ""}`}
          onClick={() => setCurrentView("api")}
        >
          API
        </button>
      </div>

      {currentView === "about" ? (
        <About />
      ) : currentView === "api" ? (
        <ApiDocs apiBaseUrl={API_BASE_URL} />
      ) : (
        movieContent
      )}
    </main>
  );
}

export default App;
