import React, { useEffect, useState } from 'react';
import '../LifeCss/UserProfile.css';
import Sidenavbar from '../Life++/sidenavbar';
import Header from '../Life++/Header';
import defaultProfileMale from '../LifeImages/defaultprofile.png';
import defaultProfileFemale from '../LifeImages/defaultprofile1.png';
import { IoMdSettings } from 'react-icons/io';
import { useAuth } from '../Life++/AuthContext';
import { MdTipsAndUpdates } from 'react-icons/md';

function UserProfileSettings() {
  const { user } = useAuth();
  const { login } = useAuth(); 

  const savedDarkMode = localStorage.getItem('darkMode') === 'true';
  const [darkMode] = useState(savedDarkMode);

  const [isEditing, setIsEditing] = useState(false);
  const [buttonLabel, setButtonLabel] = useState('Update User Information');
  
  const [storedUser, setStoredUser] = useState(null);

  useEffect(() => {
    const userFromStorage = JSON.parse(localStorage.getItem('loggedInUser'));
    if (userFromStorage && !storedUser) { // Check if storedUser is null before updating
      login(userFromStorage);
      setStoredUser(userFromStorage); // Set stored user to the state variable
    }
  }, [login, storedUser]); // Update storedUser when login or storedUser changes
  const defaultProfileImage = user && user.gender === 'M' ? defaultProfileMale : defaultProfileFemale;
  console.log('Stored User:', storedUser); // Logging stored user
  const handleUpdateButtonClick = () => {
    if (isEditing) {
      // Save changes logic goes here
      // You can update the user information in the backend or perform any other necessary actions

      setButtonLabel('Update User Information'); // Reset button label
    } else {
      setButtonLabel('Save Changes'); // Change button label to "Save Changes"
    }

    setIsEditing(!isEditing); // Toggle editing mode
  };

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
                  <img src={defaultProfileImage} alt="User Avatar" style={{ width: '800px', borderRadius: '50%', height: '500px' }} />
                </div>
                <div className="usnam-up">
                 
                  {isEditing ? (
                    <>
                      <input type="text" value={user.username} onChange={(e) => console.log(e.target.value)} />
                      <input type="text" value={user.fname} onChange={(e) => console.log(e.target.value)} />
                      <input type="text" value={user.lname} onChange={(e) => console.log(e.target.value)} />
                      <input type="text" value={user.gender} onChange={(e) => console.log(e.target.value)} />
                      <input type="text" value={new Date(user.birthdate).toLocaleDateString()} onChange={(e) => console.log(e.target.value)} />
                      <input type="text" value={user.pnum} onChange={(e) => console.log(e.target.value)} />
                      <input type="text" value={user.email} onChange={(e) => console.log(e.target.value)} />
                
                    </>
                  ) : (
                    <>
                      <p style={{marginTop: '10px'}}>
                        <span style={{ fontWeight: 'bold', color: 'black', marginRight:'55px' }}>Username: </span>{user.username}
                      </p>
                      <br/>
                      <p style={{marginTop: '10px'}}>
                        <span style={{ fontWeight: 'bold', color: 'black', marginRight:'50px' }}>First Name: </span> {user.fname}
                      </p>
                      <p style={{marginTop: '10px'}}>
                        <span style={{ fontWeight: 'bold', color: 'black', marginRight:'52px' }}>Last Name: </span> {user.lname}
                      </p>
                      <p style={{marginTop: '10px'}}>
                        <span style={{ fontWeight: 'bold', color: 'black', marginRight:'90px' }}>Gender: </span> {user.gender}
                      </p>
                      <p style={{marginTop: '10px'}}>
                        <span style={{ fontWeight: 'bold', color: 'black', marginRight:'57px' }}>Birth Date: </span>{new Date(user.birthdate).toLocaleDateString()}
                      </p>
                      <p style={{marginTop: '10px'}}>
                        <span style={{ fontWeight: 'bold', color: 'black', marginRight:'77px' }}>Contact: </span> {user.pnum}
                      </p>
                      <p style={{marginTop: '30px', marginBottom:'10px'}}>
                        <span style={{ fontWeight: 'bold', color: 'black', marginRight:'10px' }}>Email: </span>{user.email}
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
