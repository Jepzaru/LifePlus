import React, { useState } from 'react';
import { FaSearch, FaCrown } from 'react-icons/fa';
import { useAuth } from './AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import defaultProfileMale from '../LifeImages/defaultprofile.png';
import defaultProfileFemale from '../LifeImages/defaultprofile1.png';
import Achievement from '../LifeImages/achivement.png';
import Quests from '../LifeImages/quest.png';
import Shop from '../LifeImages/pshop.png';
import AchievementBox from './AchievementBox';
import QuestBox from './QuestBox';
import ItemShopBox from './ItemShopBox';
import '../LifeCss/header.css';

const Header = () => {
  const { users } = useAuth();
  const storedUser = JSON.parse(localStorage.getItem('loggedInUser'));
  const defaultProfileImage = storedUser?.gender === 'M' ? defaultProfileMale : defaultProfileFemale;

  const [showAchievementsBox, setShowAchievementsBox] = useState(false);
  const [showQuestsBox, setShowQuestsBox] = useState(false);
  const [showItemShopBox, setShowItemShopBox] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchPredictions, setSearchPredictions] = useState([]);
  const navigate = useNavigate();

  const handleSearch = () => {
    const lowerCaseQuery = searchQuery.toLowerCase();
      navigate(`/index/${lowerCaseQuery}`);
  };

  const handleInputChange = (value) => {
    setSearchQuery(value);

    // Implement your logic to suggest predictions based on the input value
    // For simplicity, a predefined list is used here.
    const predictions = ['achievements', 'quests', 'points shop'];
    setSearchPredictions(predictions.filter((prediction) => prediction.includes(value.toLowerCase())));
  };

  const handlePredictionClick = (prediction) => {
    setSearchQuery(prediction);
    setSearchPredictions([]);
  };

  return (
    <div className='header'>
      <div className="logo"></div>
      <div className='headlife'>
        <h1>LIFE ++</h1>
        {storedUser && (
  <div style={{ marginLeft: '200px', marginTop: '-24px' }}>
    <div
      title="Achievements"
      onClick={() => {
        setShowAchievementsBox(true);
        setShowQuestsBox(false);
        setShowItemShopBox(false);
      }}
    >
      <img
        src={Achievement}
        alt="Life Plus Logo"
        style={{
          width: '80px',
          height: '50px',
          marginTop: '-50px',
          marginBottom: '-10px',
          marginLeft: '10px',
          borderRadius: '50%',
          transition: 'transform 0.2s',
          cursor: 'pointer'
        }}
        className="life-plus-logo"
      />
    </div>
  </div>
)}
{storedUser && (
  <div style={{ marginLeft: '280px', marginTop: '-24px' }}>
    <div
      title="Quests"
      onClick={() => {
        setShowAchievementsBox(false);
      setShowQuestsBox(true);
      setShowItemShopBox(false);
      }}
    >
      <img
        src={Quests}
        alt="Life Plus Logo"
        style={{
          width: '80px',
          height: '50px',
          marginTop: '-50px',
          marginBottom: '-10px',
          marginLeft: '10px',
          borderRadius: '50%',
          transition: 'transform 0.2s',
          cursor: 'pointer'
        }}
        className="life-plus-logo"
      />
    </div>
  </div>
)}
{storedUser && (
  <div style={{ marginLeft: '370px', marginTop: '-24px' }}>
    <div
      title="Points Shop"
      onClick={() => {
        setShowAchievementsBox(false);
        setShowQuestsBox(false);
        setShowItemShopBox(true);
      }}
    >
      <img
        src={Shop}
        alt="Life Plus Logo"
        style={{
          width: '80px',
          height: '50px',
          marginTop: '-50px',
          marginBottom: '-10px',
          marginLeft: '10px',
          borderRadius: '50%',
          transition: 'transform 0.2s',
          cursor: 'pointer'
        }}
        className="life-plus-logo"
      />
    </div>
  </div>
)}
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
        <Link to="/index/pricing" className="prem-but">
          <FaCrown style={{ color: 'yellow', marginRight: '10px', marginLeft: '-10px', marginBottom: '-2px' }} />
          Premium
        </Link>
        {storedUser && (
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
                marginBottom: '5px',
              }}
            />
            <div className='usernem'>
              <span>Welcome, {storedUser.username}</span>
            </div>
          </div>
        )}
      </div>
      {showAchievementsBox && <AchievementBox onClose={() => setShowAchievementsBox(false)} />}
      {showQuestsBox && <QuestBox onClose={() => setShowQuestsBox(false)} />}
      {showItemShopBox && <ItemShopBox onClose={() => setShowItemShopBox(false)} />}
    </div>
  );
};

export default Header;




























