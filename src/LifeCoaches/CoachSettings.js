import React, { useEffect, useState } from 'react';
import '../LifeCss/Settings.css';
import { Link, useLocation, useNavigate } from 'react-router-dom'; 
import CoachSidenavbar from '../Life++/coachsidebar';
import CoachHeader from '../Life++/CoachHeader';
import { IoMdSettings } from "react-icons/io";
import { FaUserEdit } from "react-icons/fa";
import { MdDarkMode } from "react-icons/md";
import { FaLink } from "react-icons/fa6";
import { FaUnlock } from "react-icons/fa";
import HashLoader from 'react-spinners/HashLoader';
import { PiSignOutBold } from "react-icons/pi";
import { useAuth } from '../Life++/AuthContext'; 
import Snowfall from 'react-snowfall';

function Setting() {
  const { login } = useAuth(); 

  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();  

  const savedDarkMode = localStorage.getItem('darkMode') === 'true';

  const [darkMode, setDarkMode] = useState(savedDarkMode);

  useEffect(() => {
    // Load user from localStorage on component mount
    const storedUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (storedUser) {
      login(storedUser);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleSignOut = () => {
    // Use navigate to replace the current entry in the history stack
    navigate('/', { replace: true });
    window.history.replaceState(null, '', '/');
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
          <CoachHeader />
          <CoachSidenavbar location={location} />
          <Snowfall snowflakeCount={100} />
          <div className='set'>
            <h1>Settings</h1>
            <div className={`setitle ${darkMode ? 'dark-mode-title' : ''}`}>
              <h1><IoMdSettings style={{ marginRight: '15px', marginBottom: '-5px', color: '#FF64B4' }} />Settings</h1>
            </div>
            <div className={`settings-container ${darkMode ? 'dark-mode-container' : ''}`}>
              <Link to="/coach-index/profile" className="setting-button" ><FaUserEdit style={{ marginRight: '10px', marginBottom: '-2px' }} />Customize Profile</Link>
              <div className="setting-button" onClick={toggleDarkMode}><MdDarkMode style={{ marginRight: '10px', marginBottom: '-2px' }} />
                {darkMode ? 'Light Mode' : 'Dark Mode'}</div>
              <div className="setting-button"><FaLink style={{ marginRight: '10px', marginBottom: '-2px' }} />Deactivate Account</div>
              <Link to="/index/change-pass" className="setting-button" ><FaUnlock style={{ marginRight: '10px', marginBottom: '-2px' }} />Change Password</Link>
              <div className="setting-button" onClick={handleSignOut}><PiSignOutBold style={{ marginRight: '10px', marginBottom: '-2px' }} />Sign Out</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Setting;
