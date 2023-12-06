import React, { useEffect, useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import '../LifeCss/Courses.css';
import HashLoader from 'react-spinners/HashLoader';
import CoachSidenavbar from "../Life++/coachsidebar";
import CoachHeader from "../Life++/CoachHeader";
import { RiGraduationCapFill } from "react-icons/ri";
import { IoCreateSharp } from "react-icons/io5";
import { FaCheckCircle } from "react-icons/fa";
import CreateCourseBox from './CreateCourseBox';

function CoachCourses() {
  const [loading, setLoading] = useState(false);
  const [showCreateCourseBox, setShowCreateCourseBox] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
  });

  const savedDarkMode = localStorage.getItem('darkMode') === 'true';
  const [darkMode, setDarkMode] = useState(savedDarkMode);

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
    // Show snackbar with the success message
    setSnackbar({
      open: true,
      message: 'Course Successfully Created',
    });
  };

  return (
    <div className={`appindcourse ${darkMode ? 'dark-mode' : ''}`}>
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
          </div>
          <div className={`up-act ${showCreateCourseBox ? 'dimmed' : ''}`}>
            <p>Students List</p>
          </div>

          <Snackbar
            open={snackbar.open}
            autoHideDuration={6000}
            onClose={() => setSnackbar({ open: false, message: '' })}
          >
            <MuiAlert onClose={() => setSnackbar({ open: false, message: '' })} severity="success" 
            sx={{ 
              width: '100%',
              backgroundColor: 'green',
              color: '#fff'
          }}
          icon={<FaCheckCircle style={{ color: '#fff' }} />}
          >
              {snackbar.message}
            </MuiAlert>
          </Snackbar>

          {showCreateCourseBox && <CreateCourseBox onClose={handleCloseCreateCourseBox} />}
          {showCreateCourseBox && <div className="overlay" onClick={handleCloseCreateCourseBox}></div>}
        </>
      )}
    </div>
  );
}

export default CoachCourses;
