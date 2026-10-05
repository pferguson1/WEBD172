const loadMoviesButton = document.getElementById("loadMovies");
const moviesOutput = document.getElementById("movies");
const movieForm = document.getElementById("movieForm");
const movieIdInput = document.getElementById("movieId");
const movieResult = document.getElementById("movieResult");

const displayMovie = ({ id, name, description }) => `
<article class="movie">
  <h3>${name}</h3>
  <p><strong>ID:</strong> ${id}</p>
  <p>${description}</p>
</article>
`;

loadMoviesButton.addEventListener("click", async () => {
  const response = await fetch("/api/movies");
  const movies = await response.json();

  // Display the list of movies in the moviesOutput div
  moviesOutput.innerHTML = movies.map(displayMovie).join("");
  
  // Hide the Load Movies button
  loadMoviesButton.classList.add("hidden");
});

// Handle the form submission to find a movie by ID
movieForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const movieId = movieIdInput.value;
  const response = await fetch(`/api/movies/${movieId}`);
  if (response.ok) {
    const movie = await response.json();
    movieResult.innerHTML = displayMovie(movie);
  } else {
    movieResult.innerHTML = "<p>Movie not found</p>";
  }
});
