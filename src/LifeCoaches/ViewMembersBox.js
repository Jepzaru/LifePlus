
import React from 'react';
import '../LifeCss/boxStyles.css'; 

const ViewMembersBox = ({ onClose, course }) => {
  return (
    <div className="floating-box-overlay" onClick={onClose}>
      <div className="floating-box">
        <div className="floating-box-header">
          <h2 style={{ marginLeft: '20px' }}>View Members</h2>
          <span className="close-button" onClick={onClose}>
            &times;
          </span>
        </div>
        <div className="view-floating-box-content">
          <ul>
            {course.enrolledUsers && course.enrolledUsers.length > 0 ? (
              course.enrolledUsers.map((user, index) => (
                <li key={index}>{user.username}</li>
                // You can display any other information you have about the user here
              ))
            ) : (
              <p>No enrolled users for this course</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ViewMembersBox;