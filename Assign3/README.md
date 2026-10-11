# Assign3 - Express Server

## Assignment Name

Assign3 - Express Server

This assignment is a basic Express.js server with static pages and simple routes for text, HTML, JSON, and route parameters.

## Features

- Serves static files from the `public` folder
- Returns a plain text response at `/hello`
- Serves separate HTML pages for About, Courses, and Student Info
- Returns course data as JSON from `/courses`
- Uses a route parameter at `/student/:name`
- Logs each request method and URL to the console

## Project Structure

- `server.js` - Express server and route definitions
- `package.json` - Project metadata and scripts
- `public/index.html` - Home page
- `public/about.html` - About page
- `public/courses.html` - Courses page
- `public/student.html` - Student page
- `public/script.js` - Client-side fetch for course data on the home page
- `public/styles.css` - Shared styling for all pages

## Getting Started with Create React App

This project was not created with Create React App. It is a Node.js and Express assignment. This section is included only to match the requested README format.

## Requirements

- Node.js
- npm

## Installation Dependencies

From the `Assign3` folder, install dependencies:

```bash
npm install
```

Installed dependency:

- `express`

## Available Scripts

In the project directory, you can run:

### `npm start`

Starts the Express server with `server.js`.

Open `http://localhost:3000` to view the application in your browser.

### `npm test`

Currently returns the default placeholder test script from `package.json`.

## Project Directory, You Can Run

From the `Assign3` project directory, you can run:

```bash
npm start
```

The app runs at:

- `http://localhost:3000`

## Available Routes

### Static and HTML Routes

- `/` or `/index.html` - Home page
- `/about` - About page
- `/courses-page` - Courses page route
- `/student-page` - Student page route
- `/about.html` - About page (static file)
- `/courses.html` - Courses page (static file)
- `/student.html` - Student page (static file)

### Data Routes

- `/hello` - Plain text greeting
- `/courses` - JSON list of courses
- `/student/:name` - Personalized welcome message

## Example Route Output

### `/hello`

Returns:

```text
Hello from Express!
```

### `/courses`

Returns a JSON array of course objects such as:

```json
[
  {
    "id": 1,
    "title": {
      "name": "WEBD 172",
      "semester": "Fall",
      "year": 2026
    }
  }
]
```

### `/student/Phyllis`

Returns:

```text
Welcome, Phyllis! This is Fall semester 2026.
```

## Front-End Behavior

- The home page includes a **Load Courses** button that fetches data from `/courses`
- The Courses page loads and displays course cards from the same endpoint
- The Student page accepts a name and requests a custom message from `/student/:name`

## Author

Phyllis Ferguson
