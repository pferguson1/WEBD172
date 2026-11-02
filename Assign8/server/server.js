const express = require("express");
const path = require("path");
const cors = require("cors");
//Create an instance of the Express application
const app = express();
const PORT = 3000;

//Get the list of movies from the server
const movies = [
  {
    id: 1,
    name: "The House of Wax",
    year: 1953,
    description:
      "In New York City during the early 1900s, talented sculptor Professor Henry Jarrod runs a wax museum that features historical figures who have met grisly ends.",
  },
  {
    id: 2,
    name: "Tales of Terror",
    year: 1962,
    description:
      "A horror movie star returns Three short sequences, based on the following Poe tales, are presented: 'Morella', 'The Black Cat', and 'The Facts in the Case of M. Valdemar.",
  },
  {
    id: 3,
    name: "The Raven",
    year: 1963,
    description:
      "A magician, who has been turned into a raven, turns to a former sorcerer for help.",
  },
  {
    id: 4,
    name: "The Tingler",
    year: 1959,
    description:
      "An obsessed pathologist discovers and captures a parasitic creature that grows when fear grips its host.",
  },
  {
    id: 5,
    name: "The Fly",
    year: 1958,
    description:
      "A scientist's experiment to teleport a fly goes horribly wrong, merging the fly with his own DNA.",
  },
  {
    id: 6,
    name: "The Bat",
    year: 1958,
    description:
      "Cornelia Van Gorder goes on a hunting trip with her physician, Dr. Malcolm Wells. Fleming confesses to stealing over $1 million in negotiable securities from the bank. Wells shoots Fleming and covers up the murder.",
  },
  {
    id: 7,
    name: "Theatre of Blood",
    year: 1958,
    description:
      "After being humiliated by members of the London Theatre Critics Guild, Vincent Price, Shakespearean actor is seen apparently committing suicide by diving into the Thames from a great height. He actually survives, however, and is rescued by a group of vagrants.",
  },
  {
    id: 8,
    name: "MadHouse",
    year: 1958,
    description:
      "Paul Toombes is a successful horror actor whose trademark role is Dr. Death, a skull-faced serial killer. When Toombes' wife is murdered, he is accused of the crime and sent to an asylum. The real killer, however, is still at large.",
  },
];

//Middleware to parse JSON request bodies and serve static files from the "public" directory
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

// Serve the images folder located OUTSIDE of public
// This tells Express: When someone requests '/images/something.jpg', look inside the root 'images' folder.
app.use("/images", express.static(path.join(__dirname, "public", "images")));

app.use((req, res, next) => {
  // Log each incoming request method and path.
  console.log(`${req.method} ${req.url}`);
  next();
});

// Serve the server-side home page.
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Serve a simple server-rendered About page with featured movies.
app.get("/about", (req, res) => {
  res.send(`
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>About - Movie Portal</title>
        <link rel="stylesheet" href="style.css" />
      </head>
      <body>
        <main>
          <section>
            <header>
              <h1>About Page</h1>
            </header>
          </section>
          <section>
            <h2>About Our Movie Portal</h2>
            <p>This is the about page of our movies.</p>
            <p>Welcome to the Movie Portal! This application was created as part of the WEBD 172 course to showcase web development skills using Node.js and Express.</p>
            <p>Our movie collection features a carefully curated selection of classic films. You can browse all available movies or search for a specific movie by its ID.</p>
            <p>We hope you enjoy exploring our collection. Feel free to navigate through the site and discover some great cinema!</p>
          </section>
          <section>
            <h2>Featured Movies</h2>
            <div className="movie-gallery">
              <a href="/api/movies/1">
                <img src="/images/house_of_wax.jpg" alt="The House of Wax" />
              </a>
              <a href="/api/movies/2">
                <img src="/images/tales_of_terror.jpg" alt="Tales of Terror" />
              </a>
              <a href="/api/movies/3">
                <img src="/images/the_raven.jpg" alt="The Raven" />
              </a>
              <a href="/api/movies/4">
                <img src="/images/the_tingler.jpg" alt="The Tingler" />
              </a>
              <a href="/api/movies/5">
                <img src="/images/the_fly.jpg" alt="The Fly" />
              </a>
              <a href="/api/movies/6">
                <img src="/images/the_bat.jpg" alt="The Bat" />
              </a>
              <a href="/api/movies/7">
                <img src="/images/theatre_of_blood.jpg" alt="Theatre of Blood" />
              </a>
              <a href="/api/movies/8">
                <img src="/images/madhouse.jpg" alt="MadHouse" />
              </a>
             
            </div>
          </section>
          <section>
            <form action="/" method="get">
              <button type="submit">Return Home</button>
            </form>
          </section>
        </main>
      </body>
    </html>
  `);
});

// API index route showing available endpoints.
app.get("/api", (req, res) => {
  res.json({
    message: "Movie Portal API",
    routes: {
      allMovies: "/api/movies",
      createMovie: "/api/movies",
      movieById: "/api/movies/:id",
      updateMovieById: "/api/movies/:id",
      deleteMovieById: "/api/movies/:id",
    },
  });
});

// Return the full movie collection.
app.get("/api/movies", (req, res) => {
  res.json(movies);
});

// Create one movie and add it to the in-memory collection.
app.post("/api/movies", (req, res) => {
  const rawTitle =
    typeof req.body?.title === "string" ? req.body.title.trim() : "";
  const rawName =
    typeof req.body?.name === "string" ? req.body.name.trim() : "";

  const name = rawName || rawTitle;

  if (!name) {
    return res.status(400).json({ message: "Movie title is required" });
  }

  const maxId = movies.reduce((highestId, movie) => {
    return movie.id > highestId ? movie.id : highestId;
  }, 0);
  const nextId = maxId + 1;
  const year = Number(req.body?.year) || new Date().getFullYear();
  const description =
    typeof req.body?.description === "string" ? req.body.description : "";

  const newMovie = {
    id: nextId,
    name,
    year,
    description,
  };

  movies.push(newMovie);
  return res.status(201).json(newMovie);
});

// Return one movie by numeric ID.
app.get("/api/movies/:id", (req, res) => {
  const id = Number(req.params.id);
  const movie = movies.find((movie) => movie.id === id);

  if (!movie) {
    return res.status(404).json({ message: "Movie not found" });
  }
  res.json(movie);
});

// Update one movie by ID in the in-memory collection.
app.put("/api/movies/:id", (req, res) => {
  const id = Number(req.params.id);
  const movieIndex = movies.findIndex((movie) => movie.id === id);

  if (movieIndex === -1) {
    return res.status(404).json({ message: "Movie not found" });
  }

  const rawTitle =
    typeof req.body?.title === "string" ? req.body.title.trim() : "";
  const rawName =
    typeof req.body?.name === "string" ? req.body.name.trim() : "";
  const name = rawName || rawTitle;

  if (!name) {
    return res.status(400).json({ message: "Movie title is required" });
  }

  const currentMovie = movies[movieIndex];
  const parsedYear = Number(req.body?.year);
  const year =
    Number.isFinite(parsedYear) && parsedYear > 0
      ? parsedYear
      : currentMovie.year;
  const description =
    typeof req.body?.description === "string"
      ? req.body.description
      : currentMovie.description;

  const updatedMovie = {
    ...currentMovie,
    name,
    year,
    description,
  };

  movies[movieIndex] = updatedMovie;
  return res.json(updatedMovie);
});

// Delete one movie by ID from the in-memory collection.
app.delete("/api/movies/:id", (req, res) => {
  const id = Number(req.params.id);
  const movieIndex = movies.findIndex((movie) => movie.id === id);

  if (movieIndex === -1) {
    return res.status(404).json({ message: "Movie not found" });
  }

  movies.splice(movieIndex, 1);
  res.status(204).send();
});

// Start the Express server.
app.listen(PORT, () => {
  console.log(`Movie Portal running on http://localhost:${PORT}`);
});
