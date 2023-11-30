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
      onClose(); 
    }, 300); 
  };

  return (
    <div id="create-course-box" className={`create-course-box ${isOutro ? 'outro' : ''}`}>
      <h2>Create New Course</h2>
      
      <button className='create-course-close' onClick={handleOutro}>Cancel</button>
    </div>
  );
};

export default CreateCourseBox;
