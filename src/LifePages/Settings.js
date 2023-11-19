// Setting.js

import React, { useState } from 'react';
import '../LifeCss/Settings.css';
import Sidenavbar from '../Life++/sidenavbar';
import Header from '../Life++/Header';

function Setting() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // You can save the user's preference in local storage or a state management system
  };

  return (
    <div className={`appind ${darkMode ? 'dark-mode' : ''}`}>
      <Header />
      <Sidenavbar />
      <div className='set'>
        <h1>Settings</h1>
        <div className="settings-container">
          <div className="setting-button">Customize Profile</div>
          <div className="setting-button" onClick={toggleDarkMode}>
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </div>
          <div className="setting-button">Link Social Account</div>
          <div className="setting-button">Change Password</div>
        </div>
      </div>
    </div>
  );
}

export default Setting;
