import React, { useEffect, useState } from 'react';
import '../LifeCss/Courses.css';
import image1 from '../LifeImages/1.jpg';
import image2 from '../LifeImages/men1.jpg';
import { useAuth } from '../Life++/AuthContext';
import ViewAchievementsBox from './ViewAchievementsBox';
import { GrAchievement } from "react-icons/gr";
import { MdStars } from "react-icons/md";


import axios from 'axios';

const UpdateQuestBox = ({ onClose, quest }) => {
  const { user } = useAuth();
  const [isOutro, setIsOutro] = useState(false);
  const [selectedImage, setSelectedImage] = useState(image1);
  const [showAchievementsBox, setShowAchievementsBox] = useState(false);
  const [questData, setQuestData] = useState({
    title: quest.title || '', // Assuming 'name' is a property in the quest object
    description: quest.description || '', // Assuming 'description' is a property in the quest object
    achievement: quest.achievement || null, // Assuming 'achievement' is a property in the quest object
  });

  const [selectedAchievement, setSelectedAchievement] = useState(null);

  const handleAchievementSelect = (achievement) => {
    setSelectedAchievement(achievement);
    console.log('Selected Achievement:', achievement); // Log selected achievement
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const parsedValue = name === 'title' ? value : name === 'max' ? parseInt(value, 10) : value;

    setQuestData((prevData) => ({
      ...prevData,
      [name]: parsedValue,
    }));
  };

  const handleCancelAchievement = () => {
    setSelectedAchievement(null);
    console.log('Cancelled Achievement Selection'); // Log cancelled selection
  };

  const handleSubmit = async () => {
    try {
      if (!questData.description) {
        window.alert('Description cannot be empty');
        return;
      }

      // Ask for confirmation before creating the quest
      const confirmation = window.confirm('Are you sure you want to create this quest?');

      if (!confirmation) {
        return;
      }

      const newQuest = {
        description: questData.description,
        title: questData.title,
        achievement: selectedAchievement,
      };

      const response = await axios.put(`http://localhost:8080/quest/update?sid=${quest.qid}`, newQuest);

      // Handle successful response if needed
      console.log('Quest Updated:', response.data);

      // Show alert for successful quest creation
      window.alert('Quest Updated successfully');

      // Close the create quest box or perform other actions
      onClose();
    } catch (error) {
      // Handle errors if the request fails
      console.error('Error Updating quest:', error);

      // Show alert for quest creation failure
      window.alert('Quest Update failed');
    }
  };

  useEffect(() => {
    setQuestData({
      name: quest.title || '', // Assuming 'name' is a property in the quest object
      description: quest.description || '', // Assuming 'description' is a property in the quest object
      achievement: quest.achievement || null, // Assuming 'achievement' is a property in the quest object
    });
    setSelectedAchievement(quest.achievement || null); // Set existing achievement
  }, [quest]);

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
        <h1>Update Quest</h1>
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
              value={questData.title} /* Use questData.title */
              onChange={(e) => handleInputChange(e)}
              name="title" // Use 'title' as the name attribute
            />
          </div>
          <div className="course-des">
            <h3>Quest Description</h3>
            <textarea
              type="text"
              value={questData.description}
              onChange={(e) => handleInputChange(e)}
              name="description"
            ></textarea>
          </div>
          <div className='add-achieve'>
            <h3>Select Achievements</h3>
            <button
              className='achive-btn'
              onClick={() => {
                setShowAchievementsBox(true);
              }}
            >
              <MdStars style={{ marginRight: '10px', marginBottom: '-2px', color: 'yellow' }} />
              Add Achievement
            </button>
            {selectedAchievement && (
              <div>
                {/* Display the selected achievement */}
                Selected Achievement: {selectedAchievement.name}
                <button onClick={handleCancelAchievement}>Cancel</button>
              </div>
            )}
          </div>
          <div className="create-course-save">
            <button className="create-save" onClick={handleSubmit}>
              Update Quest
            </button>
          </div>

        </div>
      </div>
      {showAchievementsBox && (
        <ViewAchievementsBox
          onClose={() => setShowAchievementsBox(false)}
          onAchievementSelect={handleAchievementSelect} // Pass the handler to receive the selected achievement
        />
      )}
    </div>
  );
};

export default UpdateQuestBox;
