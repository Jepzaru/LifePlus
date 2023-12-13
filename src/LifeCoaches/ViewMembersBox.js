
import React from 'react';
import '../LifeCss/boxStyles.css'; 

const ViewMembersBox = ({ onClose }) => {
  return (
    <div className="floating-box-overlay" onClick={onClose}>
      <div className="floating-box">
        <div className="floating-box-header">
          <h2>View Members</h2>
          <span className="close-button" onClick={onClose}>
            &times;
          </span>
        </div>
        <div className="floating-box-content">
        </div>
      </div>
    </div>
  );
};

export default ViewMembersBox;
