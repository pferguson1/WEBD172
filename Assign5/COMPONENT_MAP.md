# Component Map Structure

## Overview

This document outlines the component hierarchy and relationships for the Course Dashboard application.

---

## Component Tree

App (Root Component)
|
+-- Header
|
+-- CourseList
|
+-- CourseCard
+-- CourseCard
+-- CourseCard

---

---

## Component Details

### 1. **App.js** (Root/Container Component)

- **Type:** Container Component
- **Purpose:** Main application entry point, manages global state
- **State Managed:**
  - `enrolledCourses`: Array tracking which courses user has enrolled in
  - `coursesData`: Static array of available courses
  - `searchTerm`: Search input value
  - `filterLevel`: Selected course level filter
  - `showCourses`: Boolean for showing/hiding the course list
- **Children:** Header section, controls section, stats section, CourseList, Footer
- **Styling:** App.css
- **Dependencies:** React (useState hook)

### 2. **Header Section** (Inline JSX in App.js)

- **Type:** Presentational Component
- **Purpose:** Displays the application title and supporting text
- **Props Received:** None
- **Children:** None (Leaf component)
- **Styling:** App.css
- **Renders:**
  - Application title/logo
  - Introductory description text

### 3. **CourseList.js** (Parent/Presentational Component)

- **Type:** Container Component (Parent)
- **Purpose:** Renders grid of course cards, maps course data to individual cards
- **Props Received:**
  - `courses` (Array of course objects): List of all available courses
  - `onEnroll` (Function): Callback to handle enrollment action
  - `enrolledCourses` (Array of numbers): IDs of enrolled courses
- **Children:** CourseCard (multiple instances)
- **Styling:** CourseList.css
- **Key Logic:** Uses `.map()` to iterate over courses array and render CourseCard for each

- **Component Tree Role:**

  ```text
  App
   |
   +-- Header
   |
   +-- CourseList
         |
         +-- CourseCard
         +-- CourseCard
         +-- CourseCard
  ```

### 4. **CourseCard.js** (Child/Presentational Component)

- **Type:** Presentational Component (Pure Component)
- **Purpose:** Displays individual course information and enrollment button
- **Props Received:**
  - `course` (Object): Single course object containing:
    - `id` (Number): Unique course identifier
    - `title` (String): Course name
    - `instructor` (String): Instructor name
    - `description` (String): Course description
    - `credits` (Number): Credit hours
    - `level` (String): Difficulty level (Beginner/Intermediate/Advanced)
  - `onEnroll` (Function): Called when enroll button clicked
  - `enrolled` (Boolean): Whether user is enrolled in this course
- **Children:** None (Leaf component)
- **Styling:** CourseCard.css
- **Event Handling:** Click handler on enroll button

### 5. **Footer.js** (Presentational Component)

- **Type:** Presentational Component
- **Purpose:** Displays footer content and navigation links at the bottom of the page
- **Props Received:** None
- **Children:** None (Leaf component)
- **Styling:** Footer.css
- **Renders:**
  - Copyright text with current year
  - Footer navigation links (`Privacy`, `Terms`, `Contact`)

---

## Data Flow

### Props Flow (Top → Down)

```text
App (coursesData, enrolledCourses, searchTerm, filterLevel, showCourses, onEnroll)
  ├─ Header Section
  ├─ Controls Section
  ├─ Stats Section
  ├─ CourseList (courses, enrolledCourses, onEnroll)
  │   ↓
  │   CourseCard (course, enrolled, onEnroll)
  └─ Footer
```

### Event Flow (Bottom → Up)

```text
CourseCard (user clicks "Enroll Now")
  ↓
onEnroll(courseId) callback triggered
  ↓
App.js (enrolledCourses state updated)
  ↓
CourseList re-renders with updated props
  ↓
CourseCard receives updated enrolled Boolean
```

---

## Course Data Structure

```JavaScript
{
  id: Number,              // Unique identifier (1, 2, 3, ...)
  title: String,           // Course name
  instructor: String,      // Instructor name
  description: String,     // Course description
  credits: Number,         // Credit hours (2, 3, 4, etc.)
  level: String            // "Beginner" | "Intermediate" | "Advanced"
}
```

---

## File Organization

```text
src/
├── App.js                    (Root container)
├── App.css
├── components/
│   ├── CourseList.js         (Parent component)
│   ├── CourseCard.js         (Child component)
│   └── Footer.js             (Presentational component)
└── styles/
  ├── CourseList.css
  ├── CourseCard.css
  └── Footer.css
```

---

## Component Relationships Summary

| Component      | Type           | Parent     | Children           | Reusable                  |
| -------------- | -------------- | ---------- | ------------------ | ------------------------- |
| App            | Container      | None       | CourseList, Footer | No                        |
| Header Section | Presentational | App        | None               | No                        |
| CourseList     | Container      | App        | CourseCard         | Yes (with different data) |
| CourseCard     | Presentational | CourseList | None               | Yes                       |
| Footer         | Presentational | App        | None               | Yes                       |

---

## Future Expansion Notes

Potential components that could be added:

- **Filter Component** - Extract filter dropdown from `App.js`
- **Search Component** - Extract search input from `App.js`
- **Dashboard Component** - User's enrolled courses overview
- **EnrollmentStats Component** - Statistics about enrollments
- **Modal Component** - Detailed course view in modal
