import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { GiBilledCap } from "react-icons/gi";
import { useAuth } from './AuthContext';
import defaultProfileMale from '../LifeImages/coachprofile.png';
import defaultProfileFemale from '../LifeImages/coachprofile1.png';
import '../LifeCss/header.css';

const CoachHeader = () => {
    const { user, login } = useAuth();

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('loggedInUser'));
        if (storedUser) {
            login(storedUser);
        }
    }, []);

    const defaultProfileImage = user?.gender === 'M' ? defaultProfileMale : defaultProfileFemale;

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
