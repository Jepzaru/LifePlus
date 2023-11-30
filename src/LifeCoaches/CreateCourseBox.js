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
      <h1>Create New Course</h1>
      <div className='closecourse'>
      <button className='create-course-close' onClick={handleOutro}>Cancel</button>
      </div>
      <div className='create-course-con'>
          <h3>Course Title</h3>
      </div>
    </div>
  );
};

export default CreateCourseBox;
