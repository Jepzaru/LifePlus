import React, { useEffect, useState } from 'react';
import '../LifeCss/Coaches.css';
import axios from 'axios';
import HashLoader from 'react-spinners/HashLoader';
import Sidenavbar from "../Life++/sidenavbar";
import Header from "../Life++/Header";
import SportsIcon from '@mui/icons-material/Sports';
import defaultProfileMale from '../LifeImages/defaultprofile.png';
import defaultProfileFemale from '../LifeImages/defaultprofile1.png';
import { useAuth } from '../Life++/AuthContext'; 
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { MdPerson } from "react-icons/md";
import { FaCakeCandles } from "react-icons/fa6";


function Coaches(){
  const { login } = useAuth(); 
  const [loading, setLoading] = useState(false);
  const [coaches, setCoaches] = useState([]);
  const savedDarkMode = localStorage.getItem('darkMode') === 'true';
  const [darkMode] = useState(savedDarkMode);

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
    setLoading(true);
    axios.get('http://localhost:8080/user/get')
      .then(response => {
        const filteredCoaches = response.data.filter(coach => coach.type === 1);
        setCoaches(filteredCoaches);
      })
      .catch(error => {
        console.error('Error fetching coaches:', error);
      })
      .finally(() => {
        setLoading(false);
      });
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
          {coaches.map(coach => (
            <div className='contain'>
        
               <div key={coach.id} className="coach-container">
               <div className='cimage'>
                    {coach.gender === 'M' ? (
                      <img src={defaultProfileMale} alt="Default Male Profile" style={{ width: '200px', height: '120px'  }}/>
                    ) : (
                      <img src={defaultProfileFemale} alt="Default Female Profile" style={{ width: '200px', height: '120px' }}/>
                    )}
                  </div>
               <div className='name'>{coach.fname}&nbsp;{coach.lname}</div> 
               <div className='cemail'><MdEmail /> &nbsp;&nbsp;&nbsp;{coach.email}</div>
               <div className='cnum'><FaPhoneAlt />&nbsp;&nbsp;&nbsp;{coach.pnum}</div>
               <div className='cnum'><MdPerson />&nbsp;&nbsp;&nbsp;{coach.gender}</div>
               <div className='cnum'><FaCakeCandles />&nbsp;&nbsp;&nbsp;{coach.birthdate ? new Date(coach.birthdate).toLocaleDateString() : ''}</div>
             </div>
             </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Coaches;
