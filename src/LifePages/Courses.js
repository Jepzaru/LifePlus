import React, { useEffect, useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import '../LifeCss/Courses.css';
import HashLoader from 'react-spinners/HashLoader';
import Sidenavbar from "../Life++/sidenavbar";
import Header from "../Life++/Header";
import image1 from '../LifeImages/1.jpg';
import image2 from '../LifeImages/men1.jpg';
import { RiGraduationCapFill } from "react-icons/ri";
import axios from 'axios';
import { IoPersonSharp } from "react-icons/io5";
import { BsPersonFillAdd } from "react-icons/bs";

import { useAuth } from '../Life++/AuthContext'; // Import useAuth

function Courses() {
  const { login } = useAuth();
  const [darkMode] = useState(localStorage.getItem('darkMode') === 'true');
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState([]);
  const [storedUser, setStoredUser] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    const userFromStorage = JSON.parse(localStorage.getItem('loggedInUser'));
    if (userFromStorage && !storedUser) {
      login(userFromStorage);
      setStoredUser(userFromStorage);
      console.log('Stored User:', userFromStorage);
    }
  }, [login, storedUser]);

  useEffect(() => {
    setLoading(true);

    axios.get('http://localhost:8080/course/get')
      .then(response => {
        setCourses(response.data);
      })
      .catch(error => {
        console.error('Error fetching courses:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const handleJoinCourse = async (userId, courseId) => {
    try {
      const response = await axios.post(`http://localhost:8080/user/join/${userId}/${courseId}`);
      console.log('Joined Course:', response.data);
      setSnackbarMessage('Course successfully joined');
      setSnackbarOpen(true);
      // Add logic to switch buttons to 'View Course' and 'Leave Course'
    } catch (error) {
      console.error('Error joining course:', error);
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

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
            {courses.map((course, index) => (
              <div className='contain' key={course.id}>
                <div className='course-container'>
                  <div className='c-img'>
                    <img src={index % 2 === 0 ? image1 : image2} alt={`Course ${course.name}`} className='course-image'
                      style={{ height: '300px', width: '300px', marginLeft: '20px', borderRadius: '15px' }}
                    />
                  </div>
                  <div className='Cname'>{course.name}</div>
                  <div className='Cdes'>{course.description}</div>
                  <div className='Ccapacity'><IoPersonSharp /> Capacity <span style={{ fontWeight: 'bold' }}>{course.max}</span></div>
                  <div className='join-c'> <button onClick={() => handleJoinCourse(storedUser.userid, course.courseID)}><BsPersonFillAdd style={{ marginRight: '10px', marginBottom: '-2px' }} />Join Course</button></div>
                </div>
              </div>
            ))}
          </div>
          <div className='up-act'>
            <p>Upcoming Activities</p>
          </div>
        </>
      )}
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <MuiAlert elevation={6} variant="filled" onClose={handleSnackbarClose} severity="success">
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </div>
  );
}

export default Courses;
