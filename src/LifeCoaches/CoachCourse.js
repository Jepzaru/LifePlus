// CoachCourses.js
import React, { useEffect, useState } from 'react';
import '../LifeCss/Courses.css';
import HashLoader from 'react-spinners/HashLoader';
import CoachSidenavbar from "../Life++/coachsidebar";
import CoachHeader from "../Life++/CoachHeader";
import { RiGraduationCapFill } from "react-icons/ri";
import { IoCreateSharp } from "react-icons/io5";
import CreateCourseBox from './CreateCourseBox';

function CoachCourses() {
  const [loading, setLoading] = useState(false);
  const [showCreateCourseBox, setShowCreateCourseBox] = useState(false);

  const savedDarkMode = localStorage.getItem('darkMode') === 'true';

  const [darkMode] = useState(savedDarkMode);

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const handleCreateCourseClick = () => {
    setShowCreateCourseBox(true);
  };

  const handleCloseCreateCourseBox = () => {
    setShowCreateCourseBox(false);
  };

  return (
    <div className={`appind ${darkMode ? 'dark-mode' : ''}`}>
      {loading ? (
        <div className="hash">
          <HashLoader size={100} color={'#FF64B4'} loading={loading} />
        </div>
      ) : (
        <>
          <CoachHeader />
          <CoachSidenavbar />
          <div className={`cou ${showCreateCourseBox ? 'dimmed' : ''}`}>
            <h1><RiGraduationCapFill style={{ marginRight: '15px', marginBottom: '-5px', color: '#FF64B4' }} />Courses</h1>
          </div>
          <div className={`cour ${showCreateCourseBox ? 'dimmed' : ''} ${darkMode ? 'dark-mode-title' : ''}`}>
            <h1><RiGraduationCapFill style={{ marginRight: '15px', marginBottom: '-5px', color: '#FF64B4' }} />Courses</h1>
            <div className='createcoursediv'>
              <button className='create-course' onClick={handleCreateCourseClick}>
                <IoCreateSharp style={{ marginRight: '10px', fontSize: '18px' }} />Create New Course
              </button>
            </div>
          </div>
          <div className={`cou-con ${showCreateCourseBox ? 'dimmed' : ''}`}>
            {/* Your course content goes here */}
          </div>
          <div className={`up-act ${showCreateCourseBox ? 'dimmed' : ''}`}>
            <p>Students List</p>
          </div>

          {showCreateCourseBox && <CreateCourseBox onClose={handleCloseCreateCourseBox} />}
          {showCreateCourseBox && <div className="overlay" onClick={handleCloseCreateCourseBox}></div>}
        </>
      )}
    </div>
  );
}

export default CoachCourses;
