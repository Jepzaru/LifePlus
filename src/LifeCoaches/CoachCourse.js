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
import CreateQuestBox from './CreateQuestBox';
import ViewMembersBox from './ViewMembersBox';
import ViewAchievementsBox from './ViewAchievementsBox';
import { useAuth } from '../Life++/AuthContext';
import { IoPersonSharp } from "react-icons/io5";
import { FaScroll } from "react-icons/fa6";
import { IoMdAddCircle } from "react-icons/io";
import axios from 'axios';
import { MdStars } from "react-icons/md";




function CoachCourses() {
  const { login } = useAuth();
  const [storedUser, setStoredUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
  });
  const [courses, setCourses] = useState([]); // State to store courses
  const [showCreateCourseBox, setShowCreateCourseBox] = useState(false);
  const [showCreateQuestBox, setShowQuestCourseBox] = useState(false);
  const [showViewMembersBox, setShowViewMembersBox] = useState(false);
  const [showAchievementsBox, setShowAchievementsBox] = useState(false);
  const savedDarkMode = localStorage.getItem('darkMode') === 'true';
  const [darkMode] = useState(savedDarkMode);
  const [coachData, setCoachData] = useState(null);

  useEffect(() => {
    if (storedUser && storedUser.username) {
      const fetchCoachData = async () => {
        try {
          const response = await axios.get('http://localhost:8080/coach/get');
          const coaches = response.data;

          const foundCoach = coaches.find((coach) => coach.username === storedUser.username);

          if (foundCoach) {
            console.log('Found Coach:', foundCoach);
            setCoachData(foundCoach); // Set the coach data to state
          } else {
            console.log('Coach not found for the user');
          }
        } catch (error) {
          console.error('Error fetching coach data:', error);
        }
      };

      fetchCoachData();
    }
  }, [storedUser]);

  useEffect(() => {
    const userFromStorage = JSON.parse(localStorage.getItem('loggedInUser'));
    if (userFromStorage && !storedUser) {
      login(userFromStorage);
      setStoredUser(userFromStorage);
    }
  }, [login, storedUser]);



  useEffect(() => {
    setLoading(true);
    if (coachData && coachData.coachid) {
      axios.get(`http://localhost:8080/coach/getcourses/${coachData.coachid}`)
        .then(async response => {
          const fetchedCourses = response.data.filter(course => !course.deleted); // Filtering courses where deleted is false
          const coursesWithQuests = await Promise.all(fetchedCourses.map(async course => {
            const quests = await fetchQuestsForCourse(course.courseID);
            return { ...course, quests };
          }));
          setCourses(coursesWithQuests);
        })
        .catch(error => {
          console.error('Error fetching courses:', error);
          // Handle errors as needed
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [coachData]);


  const fetchQuestsForCourse = async (courseId) => {
    try {
      const response = await axios.get(`http://localhost:8080/course/${courseId}/getquests`);
      console.log(response.data.filter(quest => !quest.deleted));
      return response.data.filter(quest => !quest.deleted);
    } catch (error) {
      console.error(`Error fetching quests for course ${courseId}:`, error);
      return [];
    }
  };

  const handleRemoveCourse = (courseId) => {
    const headers = {
      // Add other headers if necessary (e.g., authorization token)
    };

    axios.delete(`http://localhost:8080/course/delete/${courseId}`, { headers })
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
                  <div className='Cname'>{course.name}  <IoMdAddCircle
                    style={{ color: 'green', marginLeft: '20px', cursor: 'pointer' }}
                    onClick={() => setShowQuestCourseBox(course.courseID)}
                  /></div>
                  <div className='Cdes'>{course.description}</div>
                  <div className='Ccapacity'><IoPersonSharp /> Capacity <span style={{ fontWeight: 'bold' }}>{course.max}</span></div>
                  <div className='members'>
                    <button>View Members</button>
                  </div>
                  <div className='delete-cou'><button onClick={() => handleRemoveCourse(course.courseID)}>Remove Course</button>
                  </div>
                </div>

                </div>

              ))}
          </div>
          <div className="up-act">
            <p><FaScroll style={{ marginLeft: '20px', marginRight: '15px', fontSize: '36px', marginBottom: '-5px' }} />Quests Created</p>
            <div className='created-quest'>
              {courses.map(course => (
                <div key={course.id}>
                  {course.quests && course.quests.length == 0 ? (
                    console.log("None")
                  ):(
                  <h3>{course.name}</h3>
                  )}
                  {course.quests && course.quests.length > 0 ? (
                    <ul>
                      {course.quests.map(quest => (
                        <li key={quest.id}>{quest.name}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>No quests available for this course</p>
                  )}
                </div>
              ))}
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
      {showAchievementsBox && <ViewAchievementsBox onClose={() => setShowAchievementsBox(false)} />}
      {showCreateCourseBox && <CreateCourseBox onClose={() => setShowCreateCourseBox(false)} />}
      {showCreateQuestBox && (
        <CreateQuestBox
          onClose={() => setShowQuestCourseBox(false)}
          courseId={showCreateQuestBox} // Pass courseId here
        />
      )}
      {showViewMembersBox && (
        <ViewMembersBox
          onClose={() => setShowViewMembersBox(false)}
          courseId={showViewMembersBox} // Pass courseId here
        />
      )}

    </div>
  );
}

export default CoachCourses;
