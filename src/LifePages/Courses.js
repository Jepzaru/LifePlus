import React, { useEffect, useState } from 'react';
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
  const savedDarkMode = localStorage.getItem('darkMode') === 'true';
  const [darkMode] = useState(savedDarkMode);
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState([]);
  const [storedUser, setStoredUser] = useState(null);
  useEffect(() => {
    const userFromStorage = JSON.parse(localStorage.getItem('loggedInUser'));
    if (userFromStorage && !storedUser) { // Check if storedUser is null before updating
      login(userFromStorage);
      setStoredUser(userFromStorage); // Set stored user to the state variable
      console.log('Stored User:', userFromStorage); // Logging stored user
    }
  }, [login, storedUser]); // Update storedUser when login or storedUser changes

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
      // Handle successful join course response here if needed
      console.log('Joined Course:', response.data);
    } catch (error) {
      // Handle error if the join course request fails
      console.error('Error joining course:', error);
    }
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
                      style={{height:'300px', width: '300px', marginLeft: '20px', borderRadius: '15px'}}
                      
                      />
                      </div>
                      <div className='Cname'>{course.name}</div>
                      <div className='Cdes'>{course.description}</div>
                      <div className='Ccapacity'><IoPersonSharp /> Capacity <span style={{fontWeight: 'bold'}}>{course.max}</span></div>
                      <div className='join-c'> <button onClick={() => handleJoinCourse(storedUser.userid, course.courseID)}><BsPersonFillAdd style={{marginRight:'10px', marginBottom:'-2px' }} />Join Course</button></div>
                    </div>
                  </div>
                ))}
              
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
