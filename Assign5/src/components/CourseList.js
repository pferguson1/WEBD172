import React from 'react';
import CourseCard from './CourseCard';
import '../styles/CourseList.css';

// Parent component that uses map() to render multiple CourseCard components
const CourseList = ({ courses, onEnroll, enrolledCourses }) => {
  return (
    <div className="course-list">
      <h2>Available Courses</h2>
      <div className="courses-grid">
        {/* Each rendered CourseCard needs a unique key so React can track list updates efficiently */}
        {courses.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            onEnroll={onEnroll}
            enrolled={enrolledCourses.includes(course.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default CourseList;
