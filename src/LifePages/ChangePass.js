import React, { useEffect, useState } from 'react';
import '../LifeCss/ChangePass.css';
import Sidenavbar from '../Life++/sidenavbar';
import Header from '../Life++/Header';
import { IoMdSettings } from "react-icons/io";
import Snowfall from 'react-snowfall';

function ChangePass() {
  const savedDarkMode = localStorage.getItem('darkMode') === 'true';
  const [darkMode] = useState(savedDarkMode);

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const handlePasswordChange = () => {
    console.log('Password changed!');
  };

  return (
    <div className={`appind ${darkMode ? 'dark-mode' : ''}`}>
      <Header />
      <Sidenavbar />
      <Snowfall snowflakeCount={100} />
      <div className='set'>
        <h1>Settings</h1>
        <div className={`setitle ${darkMode ? 'dark-mode-title' : ''}`}>
          <h1><IoMdSettings style={{ marginRight: '15px', marginBottom: '-5px', color: '#FF64B4' }}/>Settings / Change Password</h1>
        </div>
        <div className="change-password-form">
          <label htmlFor="currentPassword">Current Password</label>
          <input type="password" id="currentPassword" name="currentPassword" />

          <label htmlFor="newPassword">New Password</label>
          <input type="password" id="newPassword" name="newPassword" />

          <label htmlFor="confirmPassword">Confirm Password</label>
          <input type="password" id="confirmPassword" name="confirmPassword" />

          <button onClick={handlePasswordChange}>Change Password</button>
        </div>
      </div>
    </div>
  );
}

export default ChangePass;
