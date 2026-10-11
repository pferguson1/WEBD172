import React, { useState } from "react";
import CourseList from "./components/CourseList";
import Footer from "./components/Footer.js";
import "./App.css";

// Main App component using useState for managing user interactions
function App() {
  // Sample course data
  const coursesData = [
    {
      id: 1,
      title: "Introduction to React",
      instructor: "Kristian Secor",
      description:
        "Learn React, including components, props, and state management.",
      credits: 3,
      level: "Beginner",
    },
    {
      id: 2,
      title: "Advanced JavaScript",
      instructor: "Kristian Secor",
      description:
        "Master advanced JavaScript concepts including async/await, and prototypes.",
      credits: 4,
      level: "Intermediate",
    },
    {
      id: 3,
      title: "Web Design ",
      instructor: "Kristian Secor",
      description:
        "Create beautiful, responsive websites with HTML, CSS, and modern design principles.",
      credits: 3,
      level: "Beginner",
    },
    {
      id: 4,
      title: "Full Stack Development",
      instructor: "Kristian Secor",
      description:
        "Build complete web applications from frontend to backend with databases.",
      credits: 4,
      level: "Advanced",
    },
    
  ];

  // useState hook to manage enrolled courses
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterLevel, setFilterLevel] = useState("All");
  const [showCourses, setShowCourses] = useState(true);

  // Handle enrollment/unenrollment
  const handleEnroll = (courseId) => {
    if (enrolledCourses.includes(courseId)) {
      setEnrolledCourses(enrolledCourses.filter((id) => id !== courseId));
    } else {
      setEnrolledCourses([...enrolledCourses, courseId]);
    }
  };

  // Filter courses based on search and level
  const filteredCourses = coursesData.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = filterLevel === "All" || course.level === filterLevel;
    return matchesSearch && matchesLevel;
  });

  return (
    <div className="app">
      <div className="header-section">
        <header className="app-header">
          <h1>📚 Course Dashboard</h1>
          <p>Enroll in courses and manage your learning journey</p>
        </header>
      </div>

      {/* Controls section for search, filter, and toggle buttons */}

      <div className="controls">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search by course name or instructor..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {/* Filter dropdown for course level selection */}
        <div className="filter-box">
          <label>Filter by Level:</label>
          <select
            value={filterLevel}
            onChange={(e) => setFilterLevel(e.target.value)}
          >
            <option>All</option>
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>
        </div>

        <div className="toggle-box">
          <button
            className="toggle-btn"
            onClick={() => setShowCourses(!showCourses)}
          >
            {showCourses ? "Hide Courses" : "Show Courses"}
          </button>
        </div>
      </div>

      <div className="stats">
        <p>
          📊 Enrolled Courses: <strong>{enrolledCourses.length}</strong> /{" "}
          {coursesData.length}
        </p>
        <p>
          🔍 Showing: <strong>{filteredCourses.length}</strong> courses
        </p>
      </div>

      {showCourses && (
        <CourseList
          courses={filteredCourses}
          onEnroll={handleEnroll}
          enrolledCourses={enrolledCourses}
        />
      )}

      <Footer />
    </div>
  );
}

export default App;
