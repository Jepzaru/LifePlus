import React, { useEffect, useState } from 'react';
import '../LifeCss/UserProfile.css';
import CoachSidenavbar from '../Life++/coachsidebar';
import CoachHeader from '../Life++/CoachHeader';
import defaultProfileMale from '../LifeImages/defaultprofile.png';
import defaultProfileFemale from '../LifeImages/defaultprofile1.png';
import { IoMdSettings } from 'react-icons/io';
import { useAuth } from '../Life++/AuthContext';
import { MdTipsAndUpdates } from 'react-icons/md';
import axios from 'axios';

function CoachProfileSettings() {
  const { user } = useAuth();
  const savedDarkMode = localStorage.getItem('darkMode') === 'true';
  const [darkMode] = useState(savedDarkMode);

  const [isEditing, setIsEditing] = useState(false);
  const [buttonLabel, setButtonLabel] = useState('Update User Information');

  const [editedUser, setEditedUser] = useState({
    username: user?.username || '',
    fname: user?.fname || '',
    lname: user?.lname || '',
    gender: user?.gender || '',
    birthdate: user ? new Date(user.birthdate).toLocaleDateString() : '',
    pnum: user?.pnum || '',
    email: user?.email || '',
  });

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const defaultProfileImage = user && user.gender === 'M' ? defaultProfileMale : defaultProfileFemale;

  const handleUpdateButtonClick = () => {
    if (isEditing) {
      axios
        .put(`http://localhost:8080/user/update?sid=${user.userid}`, editedUser)
        .then((response) => {
          if (response.status === 200) {
            // Handle success - Maybe show a success message or update local state
            console.log('User information updated successfully');
            setButtonLabel('Update User Information');
          } else {
            // Handle error response from API
            console.error('Failed to update user information');
          }
        })
        .catch((error) => {
          console.error('Error updating user information', error);
          // Handle error appropriately
        });
    } else {
      setButtonLabel('Save Changes');
    }

    setIsEditing(!isEditing);
  };

  const handleInputChange = (e, field) => {
    setEditedUser({
      ...editedUser,
      [field]: e.target.value,
    });
  };

  return (
    <div className={`appinduserprof ${darkMode ? 'dark-mode' : ''}`}>
      <CoachHeader />
      <CoachSidenavbar />
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
                      <input type="text" value={editedUser.username} onChange={(e) => handleInputChange(e, 'username')} />
                      <input type="text" value={editedUser.fname} onChange={(e) => handleInputChange(e, 'fname')} />
                      <input type="text" value={editedUser.lname} onChange={(e) => handleInputChange(e, 'lname')} />
                      <input type="text" value={editedUser.gender} onChange={(e) => handleInputChange(e, 'gender')} />
                      <input type="text" value={editedUser.birthdate} onChange={(e) => handleInputChange(e, 'birthdate')} />
                      <input type="text" value={editedUser.pnum} onChange={(e) => handleInputChange(e, 'pnum')} />
                      <input type="text" value={editedUser.email} onChange={(e) => handleInputChange(e, 'email')} />
                    </>
                  ) : (
                    <>
                      <p style={{marginTop: '10px'}}>
                        <span style={{ fontWeight: 'bold', color: 'black', marginRight:'55px' }}>Username: </span>{editedUser.username}
                      </p>
                      <br/>
                      <p style={{marginTop: '10px'}}>
                        <span style={{ fontWeight: 'bold', color: 'black', marginRight:'50px' }}>First Name: </span> {editedUser.fname}
                      </p>
                      <p style={{marginTop: '10px'}}>
                        <span style={{ fontWeight: 'bold', color: 'black', marginRight:'52px' }}>Last Name: </span> {editedUser.lname}
                      </p>
                      <p style={{marginTop: '10px'}}>
                        <span style={{ fontWeight: 'bold', color: 'black', marginRight:'90px' }}>Gender: </span> {editedUser.gender}
                      </p>
                      <p style={{marginTop: '10px'}}>
                        <span style={{ fontWeight: 'bold', color: 'black', marginRight:'57px' }}>Birth Date: </span>{editedUser.birthdate}
                      </p>
                      <p style={{marginTop: '10px'}}>
                        <span style={{ fontWeight: 'bold', color: 'black', marginRight:'77px' }}>Contact: </span> {editedUser.pnum}
                      </p>
                      <p style={{marginTop: '30px', marginBottom:'10px'}}>
                        <span style={{ fontWeight: 'bold', color: 'black', marginRight:'10px' }}>Email: </span>{editedUser.email}
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

export default CoachProfileSettings;
