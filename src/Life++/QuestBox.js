

import React from 'react';
import Quests from '../LifeImages/quest.png';
import '../LifeCss/boxStyles.css';

const QuestBox = ({ onClose }) => {
  return (
    <div className="floating-box-overlay">
      <div className="floating-box">
        <div className="floating-box-header-quest">
        <img src={Quests} alt="Quest" style={{width: '80px', height: '50px' }} /> <h2>Quests</h2>
          <span className="close-button" onClick={onClose}>
            &times;
          </span>
        </div>
        <div className="floating-box-content quest-box-content">
          
        </div>
      </div>
    </div>
  );
};

export default QuestBox;
