import React, { useEffect, useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import '../LifeCss/Courses.css';
import image1 from '../LifeImages/1.jpg';
import image2 from '../LifeImages/men1.jpg';
import HashLoader from 'react-spinners/HashLoader';
import CoachSidenavbar from "../Life++/coachsidebar";
import CoachHeader from "../Life++/CoachHeader";
import { RiGraduationCapFill } from "react-icons/ri";
import { IoCreateSharp } from "react-icons/io5";
import { FaCheckCircle } from "react-icons/fa";
import CreateCourseBox from './CreateCourseBox';
import { useAuth } from '../Life++/AuthContext';
import { IoPersonSharp } from "react-icons/io5";
import { FaScroll } from "react-icons/fa6";
import ViewMembersBox from './ViewMembersBox';
import { IoMdAddCircle } from "react-icons/io";
import axios from 'axios'; 

function CoachCourses() {
  const { login } = useAuth();

  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
  });
  const [courses, setCourses] = useState([]); // State to store courses
  const [showCreateCourseBox, setShowCreateCourseBox] = useState(false);
  const savedDarkMode = localStorage.getItem('darkMode') === 'true';
  const [darkMode] = useState(savedDarkMode);

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

  const handleRemoveCourse = (courseId) => {
    const headers = {
      // Add other headers if necessary (e.g., authorization token)
    };
  
    axios.delete(`http://localhost:8080/coach/delete/${courseId}`, { headers })
      .then(response => {
        console.log('Course removed successfully:', response.data);
        setSnackbar({
          open: true,
          message: 'Course Successfully Removed',
        });
        setCourses(prevCourses => prevCourses.filter(course => course.id !== courseId));
      })
      .catch(error => {
        console.error('Error removing course:', error);
  
        // Log more details about the error
        if (error.response) {
          console.error('Server responded with status:', error.response.status);
          console.error('Server response data:', error.response.data);
        } else if (error.request) {
          console.error('No response received from the server');
        } else {
          console.error('Error setting up the request:', error.message);
        }
  
        setSnackbar({
          open: true,
          message: 'Error removing course',
        });
      });
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (storedUser) {
      login(storedUser);
    }
  }, []);

  const handleCreateCourseClick = () => {
    // Handle create course click
  };

  const handleCloseCreateCourseBox = () => {
    // Handle close create course box
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
          <div className="cou">
            <h1><RiGraduationCapFill style={{ marginRight: '15px', marginBottom: '-5px', color: '#FF64B4' }} />Courses</h1>
          </div>
          <div className={`cour ${darkMode ? 'dark-mode-title' : ''}`}>
            <h1><RiGraduationCapFill style={{ marginRight: '15px', marginBottom: '-5px', color: '#FF64B4' }} />Courses</h1>
            <div className='createcoursediv'>
              <button className='create-course' onClick={() => {
                setShowCreateCourseBox(true);
              }}>
                <IoCreateSharp style={{ marginRight: '10px', fontSize: '18px' }} />Create New Course
              </button>
            </div>
          </div>
          <div className="cou-con">
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
                  <div className='members'>
                    <button>View Members</button>
                  </div>
                  <div className='delete-cou'><button onClick={() => handleRemoveCourse(course.id)}>Remove Course</button></div>
                </div>
              </div>
            ))}
          </div>
          <div className="up-act">
            <p><FaScroll style={{marginLeft: '20px', marginRight:'15px', fontSize:'36px', marginBottom:'-5px'}}/>Quests Created <IoMdAddCircle style={{color: 'green', marginLeft: '20px', cursor:'pointer'}}/></p>
            <div className='created-quest'>
            
            </div>
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
        </>
      )}
      {showCreateCourseBox && <CreateCourseBox onClose={() => setShowCreateCourseBox(false)} />}
    </div>
  );
}

export default CoachCourses;
