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
          <div className='usadjust'>
          {user && (
            <>
            <div className ="usnam">
             <p >
              <span style={{ fontWeight: 'bold', color: '#FF64B4' }}>Username: </span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{user.username}
              </p> 
             </div>
             <div className ="usnam">
              <p>
              <span style={{ fontWeight: 'bold', color: '#FF64B4' }}>First Name: </span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {user.fname}
                </p>
              </div>
              <div className ="usnam">
              <p>
              <span style={{ fontWeight: 'bold', color: '#FF64B4' }}>Last Name: </span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{user.lname}
                </p>
              </div>
              <div className ="usnam">
              <p>
              <span style={{ fontWeight: 'bold', color: '#FF64B4' }}>Gender: </span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{user.gender}
                </p>
              </div>
              <div className ="usnam">
              <p>
              <span style={{ fontWeight: 'bold', color: '#FF64B4' }}>Birth Date: </span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {new Date(user.birthdate).toLocaleDateString()}
                </p>
              </div>
              <div className ="usnam">
              <p>
              <span style={{ fontWeight: 'bold', color: '#FF64B4' }}>Email: </span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {user.email}
                </p>
              </div>
            </>
          )}
          </div>
          </div>
          </div>
        </div>

  );
}

export default UserProfileSettings;
