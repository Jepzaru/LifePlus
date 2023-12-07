import React, { useEffect, useState } from 'react';
import '../LifeCss/Coaches.css';
import HashLoader from 'react-spinners/HashLoader';
import Sidenavbar from "../Life++/sidenavbar";
import Header from "../Life++/Header";
import SportsIcon from '@mui/icons-material/Sports';
import { useAuth } from '../Life++/AuthContext'; // Import useAuth

function Coaches(){
  const { login } = useAuth(); // Get login function from useAuth
  const [loading, setLoading] = useState(false);
  const savedDarkMode = localStorage.getItem('darkMode') === 'true';
  const [darkMode] = useState(savedDarkMode);

  useEffect(() => {
    // Load user from localStorage on component mount
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
          <Header />
          <Sidenavbar />
          <div className='coa'>
            <h1>Coaches</h1>
          </div>
          <div className={`coa-title ${darkMode ? 'dark-mode-title' : ''}`}>
            <h1><SportsIcon style={{ fontSize: '4rem',marginRight: '15px', marginBottom: '-15px', color: '#FF64B4' }}/>Coaches</h1>
          </div> 
          <div className='coa-container'>
            {/* ... rest of the code ... */}
          </div>
        </>
      )}
    </div>
  );
}

export default Coaches;
