
import React, { useEffect, useState } from 'react';
import '../LifeCss/UserProfile.css';
import Sidenavbar from '../Life++/sidenavbar';
import Header from '../Life++/Header';
import { IoMdSettings } from "react-icons/io";


function UserProfileSettings() {
  const savedDarkMode = localStorage.getItem('darkMode') === 'true';
  const [darkMode] = useState(savedDarkMode);

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);


  return (
    <div className={`appinduserprof ${darkMode ? 'dark-mode' : ''}`}>
      <Header />
      <Sidenavbar />
      <div className='set'>
        <h1>Settings</h1>
        <div className={`setitle ${darkMode ? 'dark-mode-title' : ''}`}>
        <h1><IoMdSettings style={{ marginRight: '15px', marginBottom: '-5px', color: '#FF64B4' }}/>Settings / User Profile</h1>
      </div>
      <div className='user-pro'>

      </div>
      </div>
      </div>
  );
}

export default UserProfileSettings;