import React, { useEffect, useState } from 'react';
import HashLoader from 'react-spinners/HashLoader'; 
import SportsIcon from '@mui/icons-material/Sports'; 
import CoachSidenavbar from '../Life++/coachsidebar';
import CoachHeader from '../Life++/CoachHeader';
import { useAuth } from '../Life++/AuthContext';

function CoachQuest() {
  const { login } = useAuth(); 
  const [loading, setLoading] = useState(false);
  const savedDarkMode = localStorage.getItem('darkMode') === 'true';
  const [darkMode] = useState(savedDarkMode)

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (storedUser) {
      login(storedUser);
    }
  }, [login]);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  return (
    <div className={`appincoach ${darkMode ? 'dark-mode' : ''}`}>
  {loading ? (
    <div className="hash">
      <HashLoader size={100} color={'#FF64B4'} loading={loading} />
    </div>
  ) : (
    <>
      <div className="appindex">
        <CoachHeader />
        <CoachSidenavbar />
        <div className='coa'>
          <h1>Quest</h1>
        </div>
        <div className={`coa-title${darkMode ? ' dark-mode-title' : ''}`}>
          <h1><SportsIcon style={{ fontSize: '4rem',marginRight: '15px', marginBottom: '-15px', color: '#FF64B4' }}/>Quest</h1>
        </div> 
        <div className='coa-container'>
          {/* ... rest of the code ... */}
        </div>
      </div>
    </>
  )}
</div>
);
}

export default CoachQuest;
