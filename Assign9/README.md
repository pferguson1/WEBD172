# WEBD 172 - Movie Portal (React + Express + REST API)

This project is a full-stack movie manager built with:

- React (client)
- Express (server)
- MongoDB (database)
- REST API (CRUD operations)

## Project Features

- View movie list loaded from API
- Mark movies as watched/unwatched
- Filter movies by:
  - All
  - Unwatched
  - Watched
- Add new movies
- Delete movies
- About page with featured movie posters
- API tab/page showing available endpoints
- MongoDB-backed movie data with JSON responses

## App Views

- Movies
- About
- API

## MongoDB Build + Connection Notes

This app now uses a local MongoDB instance instead of in-memory movie data.

**MongoDB connection statement:** The backend connects to MongoDB using `mongodb://127.0.0.1:27017` and reads/writes movie records in the `web172.movies` collection.

- Connection URI: `mongodb://127.0.0.1:27017`
- Database: `web172`
- Collection: `movies`
- Backend connection file: `server/server.js`

In `server/server.js`, the app creates one shared Mongo client and reuses it:

- `connectToMongodb()` connects and returns `db("web172")`
- `getMoviesCollection()` returns `db.collection("movies")`

When `GET /api/movies` runs:

1. It reads from `web172.movies`
2. If empty, it checks fallback database `webd172.movies`
3. If still empty, it seeds starter movies into `web172.movies`

This allows the API to keep working even on a fresh local database.

### Optional data update script

- `server/update-movie-images.js` updates `image` and `imageTag` fields for movie IDs 1-8.

### Verify MongoDB is running (Windows)

- Start the MongoDB service in Services, or run from PowerShell:
  - `Get-Service MongoDB`
  - `Start-Service MongoDB`

### Test DB connection quickly

- Open shell: `mongosh`
- Switch DB: `use web172`
- Verify docs: `db.movies.find().pretty()`

---

## Run the Project

### 1) Start the backend (Express)

From the server folder:

- `npm install`
- `npm start`

Server runs at:

- `http://localhost:3000`

### 2) Start the frontend (React + Vite)

From the client folder:

- `npm install`
- `npm run dev`

Client runs at:

- `http://localhost:5173` (or next available Vite port)

The frontend fetches movie data from:

- `http://localhost:3000/api/movies`

## Assignment Instructions

Complete the Movie Portal application with a React client and Express server.

### Requirements

- Start both apps:
- Backend command: `npm start` in `server`
- Frontend command: `npm run dev` in `client`
- Confirm the Movies view loads data from the API.
- Implement and verify CRUD operations:
- Create movie (`POST /api/movies`)
- Read movies (`GET /api/movies`, `GET /api/movies/:id`)
- Update movie (`PUT /api/movies/:id`)
- Delete movie (`DELETE /api/movies/:id`)
- Ensure UI views work (Movies, About, API).
- Verify filtering works (All, Unwatched, Watched).
- Confirm button styling and layout updates are applied.
- Make sure there are no compile/lint errors before submission.

### What to Submit

- Updated project source code (`client` + `server`)
- Updated documentation files (`README.md`, `notes.md`)
- Final working demo state with both servers running

## Project Structure

```text
Assign9/
├── README.md
├── notes.md
├── index.html
├── client/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── src/
│       ├── App.jsx
│       ├── main.jsx
│       ├── styles.css
│       └── components/
│           ├── About.jsx
│           ├── ApiDocs.jsx
│           ├── Header.jsx
│           ├── Movie.jsx
│           ├── MovieFilter.jsx
│           ├── MovieForm.jsx
│           ├── MovieList.jsx
│           ├── MovieSummary.jsx
│           └── images/
└── server/
    ├── package.json
    ├── server.js
    └── update-movie-images.js
```

## API Endpoints

- `GET /api` - API index/route summary
- `GET /api/movies` - Read all movies
- `GET /api/movies/:id` - Read one movie (`ObjectId` or numeric `id`)
- `POST /api/movies` - Create a movie
- `PUT /api/movies/:id` - Update a movie (`ObjectId` required)
- `DELETE /api/movies/:id` - Delete a movie (`ObjectId` required)

## CORS Explanation

CORS (Cross-Origin Resource Sharing) allows the frontend and backend to communicate when they run on different origins (different ports in development).

- Frontend origin: `http://localhost:5173`
- Backend origin: `http://localhost:3000`

Because these are different origins, the browser applies same-origin rules. The backend enables CORS so browser requests from the React app are allowed.

In this project, CORS is enabled in Express with middleware in `server/server.js`:

- `app.use(cors())`

Without CORS, browser calls like `fetch("http://localhost:3000/api/movies")` can be blocked even if the server is running.

## Tech Concepts Used

- Node.js + npm
- Express middleware and routing
- Static file serving
- JSON APIs + status codes
- Route parameters
- MongoDB Node.js Driver (`MongoClient`, `ObjectId`)
- React state (`useState`)
- React effects (`useEffect`)
- Fetch API with `async/await`
- Conditional rendering and list rendering
