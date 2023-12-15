
import React from 'react';
import { IoPersonSharp } from "react-icons/io5";

import '../LifeCss/boxStyles.css'; 

const ViewMembersBox = ({ onClose, course }) => {
  return (
    <div className="floating-box-overlay" onClick={onClose}>
      <div className="floating-box">
        <div className="floating-box-header">
          <h2 style={{ marginLeft: '20px' }}><IoPersonSharp style={{marginRight: '10px'}}/>View Members</h2>
          <span className="close-button" onClick={onClose}>
            &times;
          </span>
        </div>
        <div className="view-floating-box-content">
          <ul>
            {course.enrolledUsers && course.enrolledUsers.length > 0 ? (
              course.enrolledUsers.map((user, index) => (
                <li key={index}><IoPersonSharp style={{marginRight: '10px'}}/> {user.fname} {user.lname}</li>
                
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