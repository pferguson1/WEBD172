# Assign5 - Course Dashboard React App

## Assignment Name

Assign5 - Course Dashboard React App

This assignment is a React application that displays a course dashboard with search, filtering, enrollment tracking, and reusable components.

## Features of the Project

- Built with React and Create React App
- Displays a list of courses using reusable components
- Lets users enroll and unenroll in courses
- Supports searching by course title or instructor
- Filters courses by level: `All`, `Beginner`, `Intermediate`, and `Advanced`
- Shows enrollment statistics and visible course count
- Allows the course list to be shown or hidden
- Uses separate components for the course list, course card, and footer

## Project Structure

```text
Assign5/
├── package.json
├── package-lock.json
├── README.md
├── COMPONENT_MAP.md
├── public/
└── src/
    ├── App.js
    ├── App.css
    ├── App.test.js
    ├── index.js
    ├── index.css
    ├── logo.svg
    ├── reportWebVitals.js
    ├── setupTests.js
    ├── components/
    │   ├── CourseCard.js
    │   ├── CourseList.js
    │   └── Footer.js
    └── styles/
        ├── CourseCard.css
        ├── CourseList.css
        └── Footer.css
```

## Getting Started with Create React App

This project was bootstrapped with Create React App and uses `react-scripts` for development, testing, and production builds.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in development mode.

Open `http://localhost:3000` to view it in your browser.

### `npm test`

Launches the test runner in interactive watch mode.

### `npm run build`

Builds the app for production into the `build` folder.

### `npm run eject`

Copies Create React App configuration files into the project for full control of the build setup.

## Project Directory, You Can Run

From the `Assign5` project directory, you can run:

```bash
npm install
npm start
```

## Installation Dependencies

Install dependencies with:

```bash
npm install
```

Main dependencies used in this project:

- `react`
- `react-dom`
- `react-scripts`
- `web-vitals`
- `@testing-library/react`
- `@testing-library/jest-dom`
- `@testing-library/user-event`
- `@testing-library/dom`

## Available Routes

This project is a front-end React application and does not define Express or API routes.

Available browser path during development:

- `/` - Loads the Course Dashboard home page

## Data Routes

There are no backend data routes in this assignment.

All course data is stored locally in [src/App.js](src/App.js) inside the `coursesData` array.

## Example Route Output

### `/`

Displays the Course Dashboard interface with:

- page header
- search box
- level filter dropdown
- show/hide courses button
- enrollment statistics
- list of course cards
- footer links

## Front-End Behavior

- `App` manages the main state with `useState`
- The course list is rendered through the `CourseList` component
- Each course is displayed in a reusable `CourseCard`
- Clicking the enroll button toggles between `Enroll Now` and `✓ Enrolled`
- Search updates the visible course list in real time
- Filter selection narrows courses by difficulty level
- The stats section updates automatically based on enrollment and filtering
- The footer displays the current year and navigation links

## Author

Phyllis Ferguson
