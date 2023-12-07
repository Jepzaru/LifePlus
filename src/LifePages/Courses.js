import React, { useEffect, useState } from 'react';
import '../LifeCss/Courses.css';
import HashLoader from 'react-spinners/HashLoader';
import Sidenavbar from "../Life++/sidenavbar";
import Header from "../Life++/Header";
import { RiGraduationCapFill } from "react-icons/ri";
import { useAuth } from '../Life++/AuthContext'; // Import useAuth

function Courses() {
  const { login } = useAuth(); // Get login function from useAuth
  const savedDarkMode = localStorage.getItem('darkMode') === 'true';
  const [darkMode] = useState(savedDarkMode);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Load user from localStorage on component mount
    const storedUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (storedUser) {
      login(storedUser);
    }
  }, [login]);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  return (
    <div className={`appindcourse ${darkMode ? 'dark-mode' : ''}`}>
      {loading ? (
        <div className="hash">
          <HashLoader size={100} color={'#FF64B4'} loading={loading} />
        </div>
      ) : (
        <>
          <Header />
          <Sidenavbar />
          <div className='cou'>
            <h1><RiGraduationCapFill style={{ marginRight: '15px', marginBottom: '-5px', color: '#FF64B4' }} />Courses</h1>
          </div>
          <div className={`cour ${darkMode ? 'dark-mode-title' : ''}`}>
            <h1><RiGraduationCapFill style={{ marginRight: '15px', marginBottom: '-5px', color: '#FF64B4' }} />Courses</h1>
          </div>
          <div className='cou-con'>
          </div>
          <div className='up-act'>
            <p>Upcoming Activities</p>
          </div>
        </>
      )}
    </div>
  );
}

export default Courses;
