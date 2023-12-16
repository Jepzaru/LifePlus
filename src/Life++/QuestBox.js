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

  const isQuestOngoing = (quest) => {
    return ongoingQuests.some(ongoingQuest => ongoingQuest.qid === quest.qid);
  };

  const isQuestCompleted = (quest) => {
    return completedQuests.some(completedQuest => completedQuest.qid === quest.qid);
  };

  const completeQuest = (userId, questId) => {
    axios
    .post(`http://localhost:8080/user/${userId}/quests/${questId}/attempt?isCompleted=true`, {
      isCompleted: true, // Assuming it's an attempt and not completion
    })
    .then(response => {
      // Handle success, if needed
      console.log('Quest Completed:', response.data);
    })
    .catch(error => {
      // Handle error, if needed
      console.error('Error completing quest:', error);
    });
  };

  const handleButton = (courseId, quest) => {
    if (isQuestCompleted(quest)) {
      return (
        <button className='cmplt' disabled>
          Quest Completed
        </button>
      );
    } else if (isQuestOngoing(quest)) {
      return (
        <button className='attempt' onClick={() => handleCompleteQuest(courseId, quest.qid)}>
          Complete Quest
        </button>
      );
    } else {
      return (
        <button className='attempt' onClick={() => handleAttemptQuest(courseId, quest.qid)}>
          Attempt Quest
        </button>
      );
    }
  };

  const [ongoingQuests, setOngoingQuests] = useState([]);
  const [completedQuests, setCompletedQuests] = useState([]);

  useEffect(() => {
    const fetchOngoingQuests = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/user/ongoingQuests/${storedUser.userid}`);
        setOngoingQuests(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching ongoing quests:', error);
      }
    };

    const fetchCompletedQuests = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/user/completedQuests/${storedUser.userid}`);
        setCompletedQuests(response.data);
        console.log(response.data);

      } catch (error) {
        console.error('Error fetching completed quests:', error);
      }
    };

    if (storedUser) {
      fetchOngoingQuests();
      fetchCompletedQuests();
    }
  }, [storedUser]);

  const handleCompleteQuest = (courseId, questId) => {
    // For simplicity, I'm assuming you have access to the userId here
    const userId = storedUser.userid; // Replace this with your actual user ID retrieval logic
    completeQuest(userId, questId);
    setQuestStatus(prevStatus => ({
      ...prevStatus,
      [`${courseId}_${questId}`]: 'Completed',
    }));
  };

  useEffect(() => {
    const userFromStorage = JSON.parse(localStorage.getItem('loggedInUser'));
    if (userFromStorage && !storedUser) {
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

  const attemptQuest = (userId, questId) => {
    axios
      .post(`http://localhost:8080/user/${userId}/quests/${questId}/attempt`, {
        isCompleted: false, // Assuming it's an attempt and not completion
      })
      .then(response => {
        // Handle success, if needed
        console.log('Quest attempted:', response.data);
      })
      .catch(error => {
        // Handle error, if needed
        console.error('Error attempting quest:', error);
      });
  };

  const handleAttemptQuest = (courseId, questId) => {
    const userId = storedUser.userid; // Replace this with your actual user ID retrieval logic
    attemptQuest(userId, questId);
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
                      <div className='que-title' key={quest.qid}>
                        <h3>📜 {quest.title}</h3>
                        <div className='descrip'>
                          <p>Description:</p>
                          <p style={{ marginLeft: '50px' }}>{quest.description}</p>
                          {handleButton(course.courseID, quest)}
                        </div>
                      </div>
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
