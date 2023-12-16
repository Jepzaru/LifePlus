
import React, { useEffect, useState } from 'react';

import Quests from '../LifeImages/quest.png';
import '../LifeCss/boxStyles.css';
import { useAuth } from '../Life++/AuthContext';
import axios from 'axios';

const QuestBox = ({ onClose }) => {
  const { login } = useAuth();
  const [storedUser, setStoredUser] = useState(null);
  const [userJoinedCourses, setUserJoinedCourses] = useState([]); // Added state for joined courses

  useEffect(() => {
    const userFromStorage = JSON.parse(localStorage.getItem('loggedInUser'));
    if (userFromStorage && !storedUser) {
      login(userFromStorage);
      setStoredUser(userFromStorage);

      // Fetch enrolled courses for the logged-in user
      axios.get(`http://localhost:8080/user/enrolledcourses/${userFromStorage.userid}`)
        .then(response => {
          console.log(response.data);
          setUserJoinedCourses(response.data); // Store enrolled courses in state
        })
        .catch(error => {
          console.error('Error fetching enrolled courses:', error);
        });
    }
  }, [login, storedUser]);


  return (
    <div className="floating-box-overlay">
      <div className="floating-box">
        <div className="floating-box-header-quest">
          <img src={Quests} alt="Quest" style={{ width: '80px', height: '50px' }} /> <h2>Quests</h2>
          <span className="close-button" onClick={onClose}>
            &times;
          </span>
        </div>
        <div className="floating-box-content quest-box-content">
          {/* Access userJoinedCourses state to display the joined courses */}
          {userJoinedCourses.map(course => (
            <div key={course.courseid}>
              <h3>🎓 {course.name}</h3>
              {course.quests && course.quests.length > 0 ? (
                <div className='quest-des'>
                  {course.quests.map(quest => (
                    <p key={quest.qid}>📜 {quest.title}</p>
                  ))}
                </div>
              ) : (
                <p>No quests available for this course</p>
              )}
            </div>
          ))}
          {/* If no courses are joined, display a message */}
          {userJoinedCourses.length === 0 && <p>No courses joined</p>}
        </div>
      </div>
    </div>
  );
};


export default QuestBox;
