import React from "react";
import "../styles/CourseCard.css";

// Child component that receives course data via props and they are being destructured directly in the function parameter.

const CourseCard = ({ course, onEnroll, enrolled }) => {
  return (
    <div className="course-card">
      <h3>{course.title}</h3>
      <p className="instructor">Instructor: {course.instructor}</p>
      <p className="description">{course.description}</p>
      <div className="course-info">
        <span className="credits">Credits: {course.credits}</span>
        <span className="level">{course.level}</span>
      </div>

            {/* Button changes text and styling based on whether the user is enrolled */}
      <button
        className={`enroll-btn ${enrolled ? "enrolled" : ""}`}
        onClick={() => onEnroll(course.id)}
      >
        {enrolled ? "✓ Enrolled" : "Enroll Now"}
      </button>
    </div>
  );
};

export default CourseCard;
