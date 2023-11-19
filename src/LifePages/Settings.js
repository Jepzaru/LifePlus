import React, { useEffect, useState } from 'react';
import '../LifeCss/Settings.css';
import Sidenavbar from '../Life++/sidenavbar';
import Header from '../Life++/Header';
import { IoMdSettings } from "react-icons/io";
import { FaUserEdit } from "react-icons/fa";
import { MdDarkMode } from "react-icons/md";
import { FaLink } from "react-icons/fa6";
import { FaUnlock } from "react-icons/fa";


function Setting() {
  // Check if dark mode preference is stored in localStorage
  const savedDarkMode = localStorage.getItem('darkMode') === 'true';

  const [darkMode, setDarkMode] = useState(savedDarkMode);

  useEffect(() => {
    // Update the localStorage value when dark mode changes
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`appind ${darkMode ? 'dark-mode' : ''}`}>
      <Header />
      <Sidenavbar />
      <div className='set'>
        <h1>Settings</h1>
        <div className={`setitle ${darkMode ? 'dark-mode-title' : ''}`}>
        <h1><IoMdSettings style={{ marginRight: '15px', marginBottom: '-5px', color: '#FF64B4' }}/>Settings</h1>
      </div>
      <div className={`settings-container ${darkMode ? 'dark-mode-container' : ''}`}>
          <div className="setting-button"><FaUserEdit style={{ marginRight:'10px', marginBottom: '-2px'}}/>Customize Profile</div>
          <div className="setting-button" onClick={toggleDarkMode}><MdDarkMode style={{ marginRight:'10px', marginBottom: '-2px'}} />
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </div>
          <div className="setting-button"><FaLink style={{ marginRight:'10px', marginBottom: '-2px'}}/>Link Social Account</div>
          <div className="setting-button"><FaUnlock style={{ marginRight:'10px', marginBottom: '-2px'}}/>Change Password</div>
        </div>
      </div>
    </div>
  );
}

export default Setting;