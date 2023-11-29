// CreateCourseBox.js
import React, { useEffect, useState } from 'react';
import '../LifeCss/Courses.css';

const CreateCourseBox = ({ onClose }) => {
  const [isOutro, setIsOutro] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      document.getElementById('create-course-box').classList.add('visible');
    }, 50);

    return () => clearTimeout(timeoutId);
  }, []);

  const handleOutro = () => {
    setIsOutro(true);
    setTimeout(() => {
      onClose(); // Close the box after the outro effect
    }, 300); // Adjust the duration to match the transition duration in CSS
  };

  return (
    <div id="create-course-box" className={`create-course-box ${isOutro ? 'outro' : ''}`}>
      {/* Your content for the create course box */}
      <h2>Create New Course</h2>
      {/* Add more content as needed */}
      <button onClick={handleOutro}>Close</button>
    </div>
  );
};

export default CreateCourseBox;
