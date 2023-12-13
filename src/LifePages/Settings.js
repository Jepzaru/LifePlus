import React, { useEffect, useState } from 'react';
import '../LifeCss/Settings.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Sidenavbar from '../Life++/sidenavbar';
import Header from '../Life++/Header';
import { IoMdSettings } from 'react-icons/io';
import { FaUserEdit } from 'react-icons/fa';
import { MdDarkMode } from 'react-icons/md';
import { FaLink } from 'react-icons/fa6';
import { FaUnlock } from 'react-icons/fa';
import HashLoader from 'react-spinners/HashLoader';
import { PiSignOutBold } from 'react-icons/pi';
import { useAuth } from '../Life++/AuthContext';
import axios from 'axios'; // Import Axios library

function Setting() {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(localStorage.getItem('darkMode') === 'true');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (storedUser) {
      login(storedUser);
    }
  }, []); // Include login as a dependency

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleSignOut = () => {
    navigate('/', { replace: true });
    window.history.replaceState(null, '', '/');
  };

  const handleDeleteAccount = async () => {
    const isConfirmed = window.confirm('Are you sure you want to delete your account? This action cannot be undone.');
    if (isConfirmed) {
      const storedUser = JSON.parse(localStorage.getItem('loggedInUser'));
      const userId = storedUser.userid; // Replace with the actual user identifier

      const deleteUrl = `http://localhost:8080/user/delete/${userId}`; // Replace {sid} with the actual identifier
      try {
        setLoading(true);
        // Make the API call to delete the account
        await axios.delete(deleteUrl);

        // After successful deletion, you may want to clear local storage or perform additional actions
        localStorage.removeItem('loggedInUser');

        // Navigate the user to a different page
        navigate('/');
      } catch (error) {
        console.error('Error deleting account:', error);
        // Handle error scenarios, show a message to the user, etc.
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);

  }, []); // Empty dependency array to run only once when the component mounts

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
          <div className="set">
            <h1>Settings</h1>
            <div className={`setitle ${darkMode ? 'dark-mode-title' : ''}`}>
              <h1>
                <IoMdSettings style={{ marginRight: '15px', marginBottom: '-5px', color: '#FF64B4' }} />
                Settings
              </h1>
            </div>
            <div className={`settings-container ${darkMode ? 'dark-mode-container' : ''}`}>
              <Link to="/index/settings-profile" className="setting-button">
                <FaUserEdit style={{ marginRight: '10px', marginBottom: '-2px' }} />
                Customize Profile
              </Link>
              <div className="setting-button" onClick={toggleDarkMode}>
                <MdDarkMode style={{ marginRight: '10px', marginBottom: '-2px' }} />
                {darkMode ? 'Light Mode' : 'Dark Mode'}
              </div>
              <div className="setting-button" onClick={handleDeleteAccount}>
                <FaLink style={{ marginRight: '10px', marginBottom: '-2px' }} />
                Deactivate Account
              </div>
              <Link to="/index/change-pass" className="setting-button">
                <FaUnlock style={{ marginRight: '10px', marginBottom: '-2px' }} />
                Change Password
              </Link>
              <div className="setting-button" onClick={handleSignOut}>
                <PiSignOutBold style={{ marginRight: '10px', marginBottom: '-2px' }} />
                Sign Out
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Setting;
