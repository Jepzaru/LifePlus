import React, { useEffect, useState } from 'react';
import '../LifeCss/Courses.css';
import { useAuth } from '../Life++/AuthContext';
import CreateAchievementBox from './CreateAchievementBox';
import axios from 'axios';

const ViewAchievementsBox = ({ onClose, onAchievementSelect }) => {
  const { user } = useAuth();
  const [showCreateAchievementBox, setShowCreateAchievementBox] = useState(false);
  const [isOutro, setIsOutro] = useState(false);
  const [courseData, setCourseData] = useState({
    description: '',
    max: '',
    name: '',
    coach: null,
  });
  const handleAchievementSelect = (selectedAchievement) => {
    onAchievementSelect(selectedAchievement); // Sending selected achievement back to the parent component
    onClose(); // Close the achievements box after selection
  };
  useEffect(() => {
    const fetchCoachData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/coach/get');
        const coaches = response.data;

        const foundCoach = coaches.find((coach) => coach.username === user.username);

        if (foundCoach) {
          setCourseData((prevData) => ({ ...prevData, coach: foundCoach }));
          console.log('Found Coach:', foundCoach);
        } else {
          console.log('Coach not found for the user');
        }
      } catch (error) {
        console.error('Error fetching coach data:', error);
      }
    };

    fetchCoachData();
  }, [user.username]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const parsedValue = name === 'max' ? parseInt(value, 10) : value;

    setCourseData((prevData) => ({
      ...prevData,
      [name]: parsedValue,
    }));
  };

  const handleSubmit = async () => {
    try {
      if (!courseData.description) {
        window.alert('Description cannot be empty');
        return;
      }

      const confirmation = window.confirm('Are you sure you want to create this course?');

      if (!confirmation) {
        return;
      }

      const newCourse = {
        description: courseData.description,
        max: parseInt(courseData.max, 10),
        name: courseData.name,
        coach: courseData.coach,
      };

      const response = await axios.post('http://localhost:8080/course/insert', newCourse);

      // Handle successful response if needed
      console.log('New course created:', response.data);

      // Close the create course box or perform other actions
      onClose();
    } catch (error) {
      // Handle errors if the request fails
      console.error('Error creating course:', error);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      document.getElementById('create-course-box').classList.add('visible');
    }, 50);

    return () => clearTimeout(timeoutId);
  }, []);

  const handleOutro = () => {
    setIsOutro(true);
    setTimeout(() => {
      onClose();
      window.alert('Course creation cancelled.');
    }, 300);
  };

  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const response = await axios.get('http://localhost:8080/achievement/get');
        setAchievements(response.data);
        console.log('Fetched Achievements:', response.data);
      } catch (error) {
        console.error('Error fetching achievements:', error);
      }
    };

    fetchAchievements();
  }, []);

  return (
    <div className='create-course-box-overlay'>
      <div id="create-course-box" className={`create-course-box ${isOutro ? 'outro' : ''}`}>
        <h1>Choose Achievements</h1>

        <div className="closecourse">
          <div className='add-ach'>
            <div className="achievements-course-con">
              {/* Display fetched achievements */}
              {achievements.map((achievement) => (
                <div
                  key={achievement.achievementID}
                  onClick={() => handleAchievementSelect(achievement)} // Call this function on achievement click
                  className="clickable-achievement" // Add a CSS class to style it as clickable (optional)
                >
                  {achievement.name} {/* Display achievement name */}
                </div>
              ))}
            </div>
            <button className="add-ach-btn" onClick={() => {
              setShowCreateAchievementBox(true);
            }}>
              Add Achievements
            </button>
          </div>
          <button className="create-course-close" onClick={handleOutro}>
            Cancel
          </button>
        </div>
        <div className="achievements-course-con">

        </div>
      </div>
      {showCreateAchievementBox && <CreateAchievementBox onClose={() => setShowCreateAchievementBox(false)} />}
    </div>
  );
};

export default ViewAchievementsBox;
