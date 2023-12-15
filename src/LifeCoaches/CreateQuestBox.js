import React, { useEffect, useState } from 'react';
import '../LifeCss/Courses.css';
import image1 from '../LifeImages/1.jpg';
import image2 from '../LifeImages/men1.jpg';
import { useAuth } from '../Life++/AuthContext';
import ViewAchievementsBox from './ViewAchievementsBox';
import { GrAchievement } from "react-icons/gr";
import { MdStars } from "react-icons/md";


import axios from 'axios';

const CreateQuestBox = ({ onClose, courseId }) => {
  const { user } = useAuth();
  const [isOutro, setIsOutro] = useState(false);
  const [selectedImage, setSelectedImage] = useState(image1);
  const [showAchievementsBox, setShowAchievementsBox] = useState(false);
  const [courseData, setCourseData] = useState({
    description: '',
    name: '',
  });

  useEffect(() => {
    const fetchCoachData = async () => {
      console.log(courseId)
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

      // Ask for confirmation before creating the quest
      const confirmation = window.confirm('Are you sure you want to create this quest?');

      if (!confirmation) {
        return;
      }

      const newQuest = {
        description: courseData.description,
        title: courseData.name,
      };

      const response = await axios.post(`http://localhost:8080/course/${courseId}/addquest`, newQuest);

      // Handle successful response if needed
      console.log('New quest created:', response.data);

      // Show alert for successful quest creation
      window.alert('Quest created successfully');

      // Close the create quest box or perform other actions
      onClose();
    } catch (error) {
      // Handle errors if the request fails
      console.error('Error creating quest:', error);

      // Show alert for quest creation failure
      window.alert('Quest creation failed');
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      document.getElementById('create-quest-box').classList.add('visible');
    }, 50);

    return () => clearTimeout(timeoutId);
  }, []);

  const handleOutro = () => {
    setIsOutro(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const handleImageClick = (imagePath) => {
    setSelectedImage(imagePath);
  };

  return (
    <div className='create-course-box-overlay'>
      <div id="create-quest-box" className={`create-course-box ${isOutro ? 'outro' : ''}`}>
        <h1>Create New Quest</h1>
        <div className="closecourse">
          <button className="create-course-close" onClick={handleOutro}>
            Cancel
          </button>
        </div>
        <div className="create-course-con">
          <div className="image-selector">
            <h3>Select Quest Image</h3>
            <div className="image-options">
              <img
                src={image1}
                alt="1"
                onClick={() => handleImageClick(image1)}
                className={selectedImage === image1 ? 'selected' : ''}
              />
              <img
                src={image2}
                alt="2"
                onClick={() => handleImageClick(image2)}
                className={selectedImage === image2 ? 'selected' : ''}
              />
            </div>
            {selectedImage && <img src={selectedImage} alt="Selected Quest Image" />}
          </div>
          <div className="course-name-tit">
            <h3>Quest Title</h3>
            <input
              type="text"
              value={courseData.name}
              onChange={(e) => handleInputChange(e)}
              name="name"
            />
          </div>
          <div className="course-des">
            <h3>Quest Description</h3>
            <textarea
              type="text"
              value={courseData.description}
              onChange={(e) => handleInputChange(e)}
              name="description"
            ></textarea>
          </div>
          <div className='add-achieve'>
            <h3>Select Achievements</h3>
            <button className='achive-btn' onClick={() => {
                setShowAchievementsBox(true);
              }}><MdStars style={{marginRight: '10px', marginBottom: '-2px', color: 'yellow'}}/>
              Add Achievement</button>
          </div>

          <div className="create-course-save">
            <button className="create-save" onClick={handleSubmit}>
              Create Quest
            </button>
          </div>
        </div>
      </div>
      {showAchievementsBox && <ViewAchievementsBox onClose={() => setShowAchievementsBox(false)} />}
    </div>
  );
};

export default CreateQuestBox;
