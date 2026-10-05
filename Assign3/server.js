const express = require("express");
const path = require("path");
//Create an instance of the Express application
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
// Serve static files from the "public" directory
app.use(express.static("public"));
// Custom middleware to log requests method and URL was added to the application. This middleware will log the HTTP method and URL of each incoming request to the console. After logging, it calls the next middleware or route handler in the stack using the next() function.
app.use((req, res, next) => {
  // Log the request method and URL of the incoming request from fetch request in public/script.js to the console. This will help in debugging and monitoring incoming requests to the server.
  console.log(`${req.method} ${req.url}`);
  // Call the next middleware or route handler
  next();
});

// Plain text route locahost:3000/hello
app.get("/hello", (req, res) => {
  // Send a plain text response from Url path /hello
  res.send("Hello from Express!");
});

// HTML response
// Route handler for the "/about" path that sends an HTML response. When a GET request is made to "/about", it responds with an HTML page containing a heading and a paragraph.
app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "about.html"));
});

// Courses page route
app.get("/courses-page", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "courses.html"));
});

// Student page route
app.get("/student-page", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "student.html"));
});

// JSON response
// Route handler for the "/courses" path that sends a JSON response. When a GET request is made to "/courses", it responds with a JSON array of course objects.
app.get("/courses", (req, res) => {
  res.json([
    {
      id: 1,
      title: { name: "WEBD 172", semester: "Fall", year: 2026 },
    },
    {
      id: 2,
      title: { name: "WEBD 191", semester: "Fall", year: 2026 },
    },
    {
      id: 3,
      title: { name: "WEBD 171", semester: "Fall", year: 2026 },
    },
  ]);
});

// Route parameter
// Route handler for the "/student/:name" path that uses a route parameter. When a GET request is made to "/student/:name", it extracts the "name" parameter from the URL and responds with a personalized welcome message.
app.get("/student/:name", (req, res) => {
  const name = req.params.name.trim();

  if (!name) {
    return res.status(400).send("Student name is required.");
  }

  // Send a personalized Fall semester welcome message using the extracted name parameter
  res.send(`Welcome, ${name}! This is Fall semester 2026.`);
});

// Start server
// The app.listen() method starts the server and listens for incoming requests on the specified port (PORT). When the server is successfully running, it logs a message to the console indicating the URL where the server can be accessed.
app.listen(PORT, () => {
  // Log a message to the console indicating that the server is running and the URL where it can be accessed and the port number on which the server is listening for incoming requests.
  console.log(`Server running at http://localhost:${PORT}`);
});
