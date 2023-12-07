import React, { useEffect, useState } from 'react';
import '../LifeCss/UserProfile.css';
import Sidenavbar from '../Life++/sidenavbar';
import Header from '../Life++/Header';
import { IoMdSettings } from 'react-icons/io';
import { useAuth } from '../Life++/AuthContext'; // Import useAuth

function UserProfileSettings() {
  const { user } = useAuth(); // Get user from useAuth
  const savedDarkMode = localStorage.getItem('darkMode') === 'true';
  const [darkMode] = useState(savedDarkMode);

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  return (
    <div className={`appinduserprof ${darkMode ? 'dark-mode' : ''}`}>
      <Header />
      <Sidenavbar />
      <div className="set">
        <h1>Settings</h1>
        <div className={`setitle ${darkMode ? 'dark-mode-title' : ''}`}>
          <h1>
            <IoMdSettings style={{ marginRight: '15px', marginBottom: '-5px', color: '#FF64B4' }} />
            Settings / User Profile
          </h1>
        </div>
        <div className="user-pro">
          {user && (
            <>
            <div className ="usnam">
             <p>Username: {user.username}</p> 
             </div>
              <p>First Name: {user.fname}</p>
              <p>Last Name: {user.lname}</p>
              <p>Gender: {user.gender}</p>
              <p>Birth Date: {user.birthdate}</p>
              <p>Email: {user.email}</p>
            </>
          )}
          </div>
          </div>
        </div>

  );
}

export default UserProfileSettings;
