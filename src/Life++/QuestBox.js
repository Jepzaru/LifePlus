import React, { useEffect, useState } from 'react';

import Quests from '../LifeImages/quest.png';
import '../LifeCss/boxStyles.css';
import { useAuth } from '../Life++/AuthContext';
import axios from 'axios';

const QuestBox = ({ onClose }) => {
  const { login } = useAuth();
  const [storedUser, setStoredUser] = useState(null);
  const [userJoinedCourses, setUserJoinedCourses] = useState([]);
  const [questStatus, setQuestStatus] = useState({});

  useEffect(() => {
    const userFromStorage = JSON.parse(localStorage.getItem('loggedInUser'));
    if (userFromStorage && !storedUser) {
      login(userFromStorage);
      setStoredUser(userFromStorage);

      axios
        .get(`http://localhost:8080/user/enrolledcourses/${userFromStorage.userid}`)
        .then(response => {
          console.log(response.data);
          setUserJoinedCourses(response.data);
        })
        .catch(error => {
          console.error('Error fetching enrolled courses:', error);
        });
    }
  }, [login, storedUser]);

  const handleAttemptQuest = (courseId, questId) => {
    // Implement your quest attempt logic here
    // For simplicity, I'll just set the quest status to 'Ongoing'
    setQuestStatus(prevStatus => ({
      ...prevStatus,
      [`${courseId}_${questId}`]: 'Ongoing',
    }));
  };

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
          {userJoinedCourses.map(course => (
            <div className="qst-con" key={course.courseid}>
              <h2>🎓 {course.name}</h2>
              {course.quests && course.quests.length > 0 ? (
                <div className='quest-des'>
                  {course.quests.map(quest => (
                    <div className='que-title' key={quest.qid}>
                      <h3>📜 {quest.title}</h3>
                      <div className='descrip'>
                        <p>Description:</p>
                        <p style={{ marginLeft: '50px' }}>{quest.description}</p>
                      </div>
                      <button
                        className='attempt'
                        onClick={() => handleAttemptQuest(course.courseid, quest.qid)}
                      >
                        {questStatus[`${course.courseid}_${quest.qid}`] === 'Ongoing'
                          ? '⌛ Ongoing...'
                          : '🏹 Attempt Quest'}
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No quests available for this course</p>
              )}
            </div>
          ))}
          {userJoinedCourses.length === 0 && <p>No courses joined</p>}
        </div>
      </div>
    </div>
  );
};

export default QuestBox;
