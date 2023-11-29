import React from 'react';
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { GiBilledCap } from "react-icons/gi";
import { useAuth } from './AuthContext';
import '../LifeCss/header.css';

const CoachHeader = () => {
  const { user } = useAuth();

  return (
    <div className='header'>
      <div className="logo"></div>
      <div className='headlife'>
        <h1>LIFE ++</h1>
      </div>
      <div className="search">
        <input type="text" placeholder="&nbsp;&nbsp;&nbsp;Search..." />
        <FaSearch style={{ fontSize: '30px', marginLeft: '10px', marginBottom: '-10px' }} />
      </div>
      <div className="prembutton">
          <Link to="/index/pricing" className="coach-but">
            <GiBilledCap style={{ color: 'yellow', marginRight: '10px', marginLeft: '-10px', marginBottom: '-2px' }} />
            Coach
          </Link>
        {user && <span style={{ marginLeft: '30px', color: 'white' }}>{user.username}</span>}
      </div>
    </div>
  );
};

export default CoachHeader;
