
import React, { useEffect, useState } from 'react';
import '../LifeCss/Settings.css';
import { Link, useLocation } from 'react-router-dom';
import Sidenavbar from '../Life++/sidenavbar';
import Header from '../Life++/Header';
import { IoMdSettings } from "react-icons/io";
import { FaUserEdit } from "react-icons/fa";
import { MdDarkMode } from "react-icons/md";
import { FaLink } from "react-icons/fa6";
import { FaUnlock } from "react-icons/fa";
import HashLoader from 'react-spinners/HashLoader';
import { PiSignOutBold } from "react-icons/pi";



function Setting() {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  const savedDarkMode = localStorage.getItem('darkMode') === 'true';

  const [darkMode, setDarkMode] = useState(savedDarkMode);

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  const handleSignOut = () => {
    window.location.href = '/';
  };
  
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className={`appind ${darkMode ? 'dark-mode' : ''}`}>
      {loading ? (
        <div className="hash">
          <HashLoader size={100} color={'#FF64B4'} loading={loading} />
        </div>
      ) : (
        <>
      <Header />
      <Sidenavbar location={location} />
      <div className='set'>
        <h1>Settings</h1>
        <div className={`setitle ${darkMode ? 'dark-mode-title' : ''}`}>
        <h1><IoMdSettings style={{ marginRight: '15px', marginBottom: '-5px', color: '#FF64B4' }}/>Settings</h1>
      </div>
      <div className={`settings-container ${darkMode ? 'dark-mode-container' : ''}`}>
      <Link to="/index/settings-profile" className="setting-button" ><FaUserEdit style={{ marginRight:'10px', marginBottom: '-2px'}}/>Customize Profile</Link>
          <div className="setting-button" onClick={toggleDarkMode}><MdDarkMode style={{ marginRight:'10px', marginBottom: '-2px'}} />
            {darkMode ? 'Light Mode' : 'Dark Mode'}</div>
          <div className="setting-button"><FaLink style={{ marginRight:'10px', marginBottom: '-2px'}}/>Link Social Account</div>
          <div className="setting-button"><FaUnlock style={{ marginRight:'10px', marginBottom: '-2px'}}/>Change Password</div>
        <div className="setting-button" onClick={handleSignOut}><PiSignOutBold style={{ marginRight: '10px', marginBottom: '-2px' }} />Sign Out</div>
        </div>
      </div>
      </>
      )}
      </div>
  );
}

export default Setting;