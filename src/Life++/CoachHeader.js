import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { GiBilledCap } from "react-icons/gi";
import { useAuth } from './AuthContext';
import defaultProfileMale from '../LifeImages/coachprofile.png';
import defaultProfileFemale from '../LifeImages/coachprofile1.png';
import '../LifeCss/header.css';

const CoachHeader = () => {
    const { user, login } = useAuth();
    const [searchQuery, setSearchQuery] = useState('');
    const [searchPredictions, setSearchPredictions] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('loggedInUser'));
        if (storedUser) {
            login(storedUser);
        }
    }, []);

    const defaultProfileImage = user?.gender === 'M' ? defaultProfileMale : defaultProfileFemale;

    const handleSearch = () => {
        const lowerCaseQuery = searchQuery.toLowerCase();
          navigate(`/coach-index/${lowerCaseQuery}`);
      };

      const handleInputChange = (value) => {
        setSearchQuery(value);
    
        
        if (value.trim() === '') {
            setSearchPredictions([]);
            return;
        }

        
        
    };

    const handlePredictionClick = (prediction) => {
        setSearchQuery(prediction);
        setSearchPredictions([]);
        // Redirect or perform other actions based on the prediction
        if (prediction === 'coaches') {
            navigate(`/coach-index/dashboard`);
        } else if (prediction === 'pricing') {
            navigate('/index/pricing');
        }
        // Add more conditions based on your requirements
    };

    return (
        <div className='header'>
            <div className="logo"></div>
            <div className='headlife'>
                <h1>LIFE ++</h1>
            </div>
            <div className="search">
                <input
                    type="text"
                    placeholder="&nbsp;&nbsp;&nbsp;Search..."
                    value={searchQuery}
                    onChange={(e) => handleInputChange(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
                <FaSearch style={{ fontSize: '30px', marginLeft: '10px', marginBottom: '-10px' }} />
                {searchPredictions.length > 0 && (
                    <ul className="search-predictions">
                        {searchPredictions.map((prediction) => (
                            <li key={prediction} onClick={() => handlePredictionClick(prediction)}>
                                {prediction}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <div className="prembutton">
                <Link to="/index/pricing" className="coach-but">
                    <GiBilledCap style={{ color: 'yellow', marginRight: '10px', marginLeft: '-10px', marginBottom: '-2px' }} />
                    Coach
                </Link>
                {user && (
                    <div style={{ marginLeft: '1370px' }}>
                        <img
                            src={defaultProfileImage}
                            alt="User Profile"
                            style={{
                                width: '100px',
                                height: '60px',
                                borderRadius: '50%',
                                marginRight: '10px',
                                marginTop: '-90px',
                                marginBottom: '5px'
                            }}
                        />
                        <div className='usernem'>
                            <span>Welcome, {user.username}</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CoachHeader;
