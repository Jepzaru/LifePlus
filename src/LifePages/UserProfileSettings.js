import React, { useEffect, useState } from 'react';
import '../LifeCss/UserProfile.css';
import Sidenavbar from '../Life++/sidenavbar';
import Header from '../Life++/Header';
import defaultProfileMale from '../LifeImages/defaultprofile.png';
import defaultProfileFemale from '../LifeImages/defaultprofile1.png';
import { IoMdSettings } from 'react-icons/io';
import { useAuth } from '../Life++/AuthContext';
import { MdTipsAndUpdates } from 'react-icons/md';
import axios from 'axios';
import Snowfall from 'react-snowfall';

function UserProfileSettings() {
  const { user, login } = useAuth();

  const savedDarkMode = localStorage.getItem('darkMode') === 'true';
  const [darkMode] = useState(savedDarkMode);

  const [isEditing, setIsEditing] = useState(false);
  const [buttonLabel, setButtonLabel] = useState('Update User Information');

  const [storedUser, setStoredUser] = useState(null);

  // State for edited values
  const [editedUsername, setEditedUsername] = useState(user?.username || '');
  const [editedFname, setEditedFname] = useState(user?.fname || '');
  const [editedLname, setEditedLname] = useState(user?.lname || '');
  const [editedGender, setEditedGender] = useState(user?.gender || '');
  const [editedBirthdate, setEditedBirthdate] = useState(
    user ? new Date(user.birthdate).toLocaleDateString() : ''
  );
  const [editedPnum, setEditedPnum] = useState(user?.pnum || '');
  const [editedEmail, setEditedEmail] = useState(user?.email || '');

  useEffect(() => {
    const userFromStorage = JSON.parse(localStorage.getItem('loggedInUser'));
    if (userFromStorage && !storedUser) {
      login(userFromStorage);
      setStoredUser(userFromStorage);
    }
  }, [login, storedUser]);

  const defaultProfileImage = user && user.gender === 'M' ? defaultProfileMale : defaultProfileFemale;

  const handleUpdateButtonClick = () => {
    if (isEditing) {
      const updatedUser = {
        username: editedUsername,
        fname: editedFname,
        lname: editedLname,
        gender: editedGender,
        birthdate: editedBirthdate,
        pnum: editedPnum,
        email: editedEmail,
      };
  
      axios
        .put(`http://localhost:8080/user/update?sid=${storedUser.userid}`, updatedUser)
        .then((response) => {
          if (response.status === 200) {
            console.log('User information updated successfully');
            window.alert('User information updated successfully'); // Customized alert message
          } else {
            console.error('Failed to update user information');
            window.alert('Failed to update user information'); // Customized alert message
          }
          setButtonLabel('Update User Information');
        })
        .catch((error) => {
          console.error('Error updating user information', error);
          window.alert('Error updating user information'); // Customized alert message
        });
    } else {
      setButtonLabel('Save Changes');
    }
  
    setIsEditing(!isEditing);
  };

  return (
    <div className={`appinduserprof ${darkMode ? 'dark-mode' : ''}`}>
      <Header />
      <Sidenavbar />
      <Snowfall snowflakeCount={100} />
      <div className="set">
        <h1>Settings</h1>
        <div className={`setitle ${darkMode ? 'dark-mode-title' : ''}`}>
          <h1>
            <IoMdSettings style={{ marginRight: '15px', marginBottom: '-5px', color: '#FF64B4' }} />
            Settings / User Profile
          </h1>
        </div>
        <div className="updateuserprof">
          <button className="updateuserprof-btn" onClick={handleUpdateButtonClick}>
            <MdTipsAndUpdates style={{ marginRight: '10px', marginBottom: '-2px' }} />
            {buttonLabel}
          </button>
        </div>
        <div className="user-pro">
          <div className="usadjust">
            {user && (
              <>
                <div className="image-usnam">
                  <img
                    src={defaultProfileImage}
                    alt="User Avatar"
                    style={{ width: '800px', borderRadius: '50%', height: '500px' }}
                  />
                </div>
                <div className="usnam-up">
                  {isEditing ? (
                    <>
                      <input
                        type="text"
                        value={editedUsername}
                        onChange={(e) => setEditedUsername(e.target.value)}
                      />
                      <input
                        type="text"
                        value={editedFname}
                        onChange={(e) => setEditedFname(e.target.value)}
                      />
                      <input
                        type="text"
                        value={editedLname}
                        onChange={(e) => setEditedLname(e.target.value)}
                      />
                      <input
                        type="text"
                        value={editedGender}
                        onChange={(e) => setEditedGender(e.target.value)}
                      />
                      <input
                        type="text"
                        value={editedBirthdate}
                        onChange={(e) => setEditedBirthdate(e.target.value)}
                      />
                      <input
                        type="text"
                        value={editedPnum}
                        onChange={(e) => setEditedPnum(e.target.value)}
                      />
                      <input
                        type="text"
                        value={editedEmail}
                        onChange={(e) => setEditedEmail(e.target.value)}
                      />
                    </>
                  ) : (
                    <>
                      <p style={{ marginTop: '10px' }}>
                        <span style={{ fontWeight: 'bold', color: 'black', marginRight: '60px' }}>
                          Username:
                        </span>
                        {editedUsername}
                      </p>
                      <p style={{ marginTop: '10px' }}>
                        <span style={{ fontWeight: 'bold', color: 'black', marginRight: '55px' }}>
                          First Name:
                        </span>
                        {editedFname}
                      </p>
                      <p style={{ marginTop: '10px' }}>
                        <span style={{ fontWeight: 'bold', color: 'black', marginRight: '55px' }}>
                          Last Name:
                        </span>
                        {editedLname}
                      </p>
                      <p style={{ marginTop: '10px' }}>
                        <span style={{ fontWeight: 'bold', color: 'black', marginRight: '95px' }}>
                          Gender:
                        </span>
                        {editedGender}
                      </p>
                      <p style={{ marginTop: '10px' }}>
                        <span style={{ fontWeight: 'bold', color: 'black', marginRight: '62px' }}>
                          Birth Date:
                        </span>
                        {editedBirthdate}
                      </p>
                      <p style={{ marginTop: '10px' }}>
                        <span style={{ fontWeight: 'bold', color: 'black', marginRight: '80px' }}>
                          Contact:
                        </span>
                        {editedPnum}
                      </p>
                      <p style={{ marginTop: '10px' }}>
                        <span style={{ fontWeight: 'bold', color: 'black', marginRight: '55px' }}>
                          Email:
                        </span>
                        {editedEmail}
                      </p>
                    </>
                  )}
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
