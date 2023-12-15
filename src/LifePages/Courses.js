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
import { FiLogOut } from "react-icons/fi";

import { useAuth } from '../Life++/AuthContext';

function Courses() {
  const { login } = useAuth();
  const [darkMode] = useState(localStorage.getItem('darkMode') === 'true');
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState([]);
  const [storedUser, setStoredUser] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    // Fetch user from local storage and log in
    const userFromStorage = JSON.parse(localStorage.getItem('loggedInUser'));
    if (userFromStorage && !storedUser) {
      login(userFromStorage);
      setStoredUser(userFromStorage);
    }
  }, [login, storedUser]);

  useEffect(() => {
    // Simulate loading with a timeout
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    // Fetch courses and update state
    const enrolledCourseIDs = storedUser?.joinedCourses.map(course => course.courseID) || [];
    const isEnrolled = courseId => enrolledCourseIDs.includes(courseId);

    setLoading(true);

    const fetchCourses = async () => {
      try {
        setLoading(true);
  
        const response = await axios.get('http://localhost:8080/course/get');
        
        // Update courses and mark them as enrolled based on local storage
        const updatedCourses = response.data.map(course => ({
          ...course,
          isEnrolled: isEnrolled(course.courseID),
        }));
  
        setCourses(updatedCourses);
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setLoading(false);
      }
    };
  
    if (storedUser) {
      fetchCourses();
    }
  }, [storedUser]);

  useEffect(() => {
    // Save enrolled course IDs to local storage
    const enrolledCourseIDs = courses.filter(course => course.isEnrolled).map(course => course.courseID);
    localStorage.setItem('enrolledCourseIDs', JSON.stringify(enrolledCourseIDs));
  }, [courses]);

  useEffect(() => {
    // Save dark mode preference to local storage
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);
  const handleLeaveCourse = async (userId, courseId) => {
    try {
      const response = await axios.delete(`http://localhost:8080/user/leave/${userId}/${courseId}`);
      console.log('Left Course:', response.data);
      setSnackbarMessage('Course successfully left');
  
      // Update the course to indicate it's not enrolled
      setCourses(prevCourses =>
        prevCourses.map(course =>
          course.courseID === courseId ? { ...course, isEnrolled: false } : course
        )
      );
    } catch (error) {
      console.error('Error leaving course:', error);
    }
  };
  const handleJoinCourse = async (userId, courseId) => {
    // Check if the course is enrolled, then either join or leave
    const isEnrolled = courses.find(course => course.courseID === courseId)?.isEnrolled || false;
  
    if (isEnrolled) {
      handleLeaveCourse(userId, courseId);
    } else {
      try {
        const response = await axios.post(`http://localhost:8080/user/join/${userId}/${courseId}`);
        console.log('Joined Course:', response.data);
        setSnackbarMessage('Course successfully joined');
  
        // Update the course to indicate it's enrolled
        setCourses(prevCourses =>
          prevCourses.map(course =>
            course.courseID === courseId ? { ...course, isEnrolled: true } : course
          )
        );
      } catch (error) {
        console.error('Error joining course:', error);
      }
    }
  };

  const handleSnackbarClose = (event, reason) => {
    // Handle Snackbar close
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };
  useEffect(() => {
    setLoading(true);
  
    const fetchEnrollmentStatus = async (userId, courseId, index) => {
      try {
        const response = await axios.get(`http://localhost:8080/user/isenrolled/${userId}/${courseId}`);
        const isEnrolled = response.data; // Assuming the response is a boolean indicating enrollment status
  
        setCourses(prevCourses =>
          prevCourses.map((course, idx) =>
            idx === index ? { ...course, isEnrolled: isEnrolled } : course
          )
        );
      } catch (error) {
        console.error(`Error fetching enrollment status for course ID ${courseId}:`, error);
      }
    };
  
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:8080/course/get');
        const fetchedCourses = response.data;
  
        const enrolledCourseIDs = storedUser?.joinedCourses.map(course => course.courseID) || [];
        const updatedCourses = fetchedCourses.map((course, index) => ({
          ...course,
          isEnrolled: enrolledCourseIDs.includes(course.courseID),
        }));
  
        setCourses(updatedCourses);
  
        // Fetch enrollment status for each course
        if (storedUser) {
          updatedCourses.forEach((course, index) => {
            fetchEnrollmentStatus(storedUser.userid, course.courseID, index);
          });
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setLoading(false);
      }
    };
  
    if (storedUser) {
      fetchCourses();
    }
  }, [storedUser]);

  return (
    <div className={`appindcourse ${darkMode ? 'dark-mode' : ''}`}>
      {loading ? (
        // Loading spinner
        <div className="hash">
          <HashLoader size={100} color={'#FF64B4'} loading={loading} />
        </div>
      ) : (
        // Main content
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
            {/* Courses list */}
            {courses
              .filter(course => !course.deleted) // Filter out courses where isdeleted is false
              .map((course, index) => (
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
                  <div className='join-c'>
                    {/* Join Course button */}
                    <button
                      onClick={() => handleJoinCourse(storedUser.userid, course.courseID)}
                      style={{ border: 'none', borderRadius: '50px', backgroundColor: course.isEnrolled ? 'red' : 'initial' }}
                    >
                      {course.isEnrolled ? (
                        <div className='leave'>
                          <FiLogOut style={{ marginRight: '10px', marginBottom: '-2px' }} />
                          Leave Course
                        </div>
                      ) : (
                        <div className='join'>
                          <BsPersonFillAdd style={{ marginRight: '10px', marginBottom: '-2px' }} />
                          Join Course
                        </div>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className='up-act'>
            <p>Upcoming Activities</p>
          </div>
        </>
      )}
      {/* Snackbar for notifications */}
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <MuiAlert elevation={6} variant="filled" onClose={handleSnackbarClose} severity="success">
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </div>
  );
}

export default Courses;
