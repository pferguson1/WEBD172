import { useEffect, useState } from "react";
import houseOfWaxImage from "./images/house_of_wax.jpg";
import talesOfTerrorImage from "./images/tales_of_terror.jpg";
import theRavenImage from "./images/the_raven.jpg";
import theTinglerImage from "./images/the_tingler.jpg";
import theFlyImage from "./images/the_fly.jpg";
import theBatImage from "./images/the_bat.jpg";
import theatreOfBloodImage from "./images/theatre_of_blood.jpg";
import madhouseImage from "./images/madhouse.jpg";
import movieData from "./movie.json";

const API_URL = "http://localhost:3000/api/movies";

const imageById = {
  1: houseOfWaxImage,
  2: talesOfTerrorImage,
  3: theRavenImage,
  4: theTinglerImage,
  5: theFlyImage,
  6: theBatImage,
  7: theatreOfBloodImage,
  8: madhouseImage,
};

const movieDetailsById = new Map(movieData.map((movie) => [movie.id, movie]));

function About() {
  const [featuredMovies, setFeaturedMovies] = useState([]);
  const [embeddedMovieDetails, setEmbeddedMovieDetails] = useState(null);
  const [activeMovieBadgeId, setActiveMovieBadgeId] = useState(null);

  useEffect(() => {
    async function loadFeaturedMovies() {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          return;
        }

        const movies = await response.json();
        const normalized = [...movies]
          .sort((a, b) => (a.id ?? 999) - (b.id ?? 999))
          .slice(0, 8)
          .map((movie, index) => {
            const imageFromApi =
              typeof movie.image === "string" &&
              movie.image.startsWith("/images/")
                ? `http://localhost:3000${movie.image}`
                : movie.image;

            return {
              ...movie,
              idBadge: movie.id ?? index + 1,
              image:
                imageById[movie.id] ?? imageFromApi ?? imageById[index + 1],
              hrefId: movie._id ?? movie.id,
            };
          });

        setFeaturedMovies(normalized);
      } catch {
        // Keep About page usable even if the API is unavailable.
      }
    }

    loadFeaturedMovies();
  }, []);

  function handlePosterClick(event, movie) {
    event.preventDefault();
    const selectedId = movie.idBadge ?? movie.id ?? null;
    setActiveMovieBadgeId(selectedId);

    const details = movieDetailsById.get(selectedId) ?? null;
    setEmbeddedMovieDetails(details);
  }

  return (
    <section className="about-page">
      {/* Intro text for the About page. */}
      <h2>About Our Movie Portal</h2>
      <p>
        Welcome to the Movie Portal! This application was created as part of the
        WEBD 172 course to showcase React and Express.
      </p>

      <h3>Featured Movies</h3>
      <div className="movie-gallery">
        {/* Render one linked movie poster per featured movie. */}
        {featuredMovies.map((movie) => (
          <a
            key={movie._id ?? movie.id}
            className="movie-poster-link"
            href={`http://localhost:3000/api/movies/${movie.hrefId}`}
            title={`ID ${movie.idBadge}: ${movie.name}`}
            onClick={(event) => handlePosterClick(event, movie)}
          >
            <img src={movie.image} alt={movie.name} />
            {activeMovieBadgeId === (movie.idBadge ?? movie.id) && (
              <span className="movie-id-badge">ID: {movie.idBadge}</span>
            )}
          </a>
        ))}
      </div>

      {embeddedMovieDetails && (
        <section>
          <h4>Embedded Movie Details (ID {embeddedMovieDetails.id})</h4>
          <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
            {JSON.stringify(embeddedMovieDetails, null, 2)}
          </pre>
        </section>
      )}

      <section>
        <form action="/" method="get">
          <button type="submit" className="return-button">
            Return Home
          </button>
        </form>
      </section>
    </section>
  );
}

export default About;
