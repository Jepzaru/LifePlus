import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import '../LifeCss/Challenges.css';
import Sidenavbar from '../Life++/sidenavbar';
import Header from '../Life++/Header';
import HashLoader from 'react-spinners/HashLoader';
import { Link, useLocation } from 'react-router-dom';
import { IoExtensionPuzzle } from 'react-icons/io5';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import armsImage from '../LifeImages/arms.png';
import absImage from '../LifeImages/abs.png';
import cardioImage from '../LifeImages/cardio.png';
import strengthImage from '../LifeImages/strength.png';
import memoryImage from '../LifeImages/memory.png';
import mathImage from '../LifeImages/math.png';
import logicImage from '../LifeImages/logic.png';
import concentrationImage from '../LifeImages/concentration.png';
import { useAuth } from '../Life++/AuthContext'; // Import useAuth
import Snowfall from 'react-snowfall';
function Challenges() {
  const { login } = useAuth(); // Get login function from useAuth

  const savedDarkMode = localStorage.getItem('darkMode') === 'true';
  const [darkMode] = useState(savedDarkMode);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    // Load user from localStorage on component mount
    const storedUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (storedUser) {
      login(storedUser);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className={`appindcha ${darkMode ? 'dark-mode' : ''}`}>
      {loading ? (
        <div className="hash">
          <HashLoader size={100} color={'#FF64B4'} loading={loading} />
        </div>
      ) : (
        <>
          <Header />
          <Sidenavbar location={location} />
          <Snowfall snowflakeCount={100} />
          <div className='cha'>
            <h1><IoExtensionPuzzle style={{ marginRight: '15px', marginBottom: '-5px', color: '#FF64B4' }} />Challenges</h1>
          </div>
          <div className={`chal ${darkMode ? 'dark-mode-title' : ''}`}>
            <h1><IoExtensionPuzzle style={{ marginRight: '15px', marginBottom: '-5px', color: '#FF64B4' }} />Challenges</h1>
          </div>
          <div className='phy-cha'>
            <h2>Physical Challenges</h2>
            <Slider {...sliderSettings}>
            <div>
            <div className="card-content">
                <h3>Arms Challenge</h3>
                <img src={armsImage} alt="Arms Challenge" />
                <div className='viewcha'>
                    <Link to = '/index/challenges/arms' className='phy-viewcha-button'>View Challenge</Link>
                </div>
            </div>
        </div>
        <div>
            <div className="card-content">
                <h3>Abs Challenge</h3>
                <img src={absImage} alt="Abs Challenge" /> 
                <div className='viewcha'>
                    <Link to = '/index/challenges/abs' className='phy-viewcha-button'>View Challenge</Link>
                </div>
            </div>
        </div>
        <div>
            <div className="card-content">
                <h3>Cardio Challenge</h3>
                <img src={cardioImage} alt="Cardio Challenge" /> 
                <div className='viewcha'>
                    <Link to = '/index/challenges/cardio' className='phy-viewcha-button'>View Challenge</Link>
                </div>
            </div>
        </div>
        <div>
            <div className="card-content">
                <h3>Strength Challenge</h3>
                <img src={strengthImage} alt="Strength Challenge" /> 
                <div className='viewcha'>
                    <Link to = "/index/challenges/strength" className='phy-viewcha-button'>View Challenge</Link>
                </div>
                </div>
            </div>

            </Slider>
          </div>
          <div className='ment-cha'>
            <h2>Mental Challenges</h2>
            <Slider {...sliderSettings}>
            <div>
            <div className="card-content">
              <h3>Memory Challenge</h3>
              <img src={memoryImage} alt="Memory Challenge" />
              <div className='viewcha'>
                <Link to = '/index/challenges/memory'className='men-viewcha-button'>View Challenge</Link>
              </div>
            </div>
            </div>
            <div>
            <div className="card-content">
              <h3>Math Challenge</h3>
              <img src={mathImage} alt="Math Challenge" />
              <div className='viewcha'>
                <Link to = '/index/challenges/math' className='men-viewcha-button'>View Challenge</Link>
              </div>
            </div>
            </div>
            <div>
            <div className="card-content">
              <h3>Breathing Challenge</h3>
              <img src={logicImage} alt="Breathing Challenge" />
              <div className='viewcha'>
                <Link to = '/index/challenges/breathing' className='men-viewcha-button'>View Challenge</Link>
              </div>
            </div>
            </div>
            <div>
            <div className="card-content">
              <h3>Concentration Challenge</h3>
              <img src={concentrationImage} alt="Concentration Challenge" />
              <div className='viewcha'>
                <Link to = '/index/challenges/concentration' className='men-viewcha-button'>View Challenge</Link>
              </div>
            </div>
            </div>
            </Slider>
          </div>
        </>
      )}
    </div>
  );
}

export default Challenges;
