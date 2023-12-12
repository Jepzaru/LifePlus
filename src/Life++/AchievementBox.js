// AchievementBox.js

import React from 'react';
import Achievement from '../LifeImages/achivement.png';
import '../LifeCss/boxStyles.css';

const AchievementBox = ({ onClose }) => {
  return (
    <div className="floating-box-overlay">
      <div className="floating-box">
        <div className="floating-box-header">
        <img src={Achievement} alt="Achievement" style={{ width: '80px', height: '50px' }} /> <h2>Achievements</h2>
          <span className="close-button" onClick={onClose}>
            &times;
          </span>
        </div>
        <div className="floating-box-content achievement-box-content">
        </div>
      </div>
    </div>
  );
};

export default AchievementBox;
