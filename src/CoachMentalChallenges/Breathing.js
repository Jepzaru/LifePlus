import React, { useState, useEffect } from 'react';
import '../LifeCss/Breathing.css';
import CoachSidenavbar from "../Life++/coachsidebar";
import CoachHeader from "../Life++/CoachHeader";
import { useLocation } from 'react-router-dom';
import { IoExtensionPuzzle } from 'react-icons/io5';
import breathGif from '../LifeImages/breath.gif';
import Snowfall from 'react-snowfall';


function BreathingExercise() {
  const location = useLocation();
  const [timer, setTimer] = useState(5);
  const [breathingPhase, setBreathingPhase] = useState('inhale');
  const [inhaleCount, setInhaleCount] = useState(0);
  const [exhaleCount, setExhaleCount] = useState(0);
  const [completed, setCompleted] = useState(false);
  const maxBreathCount = 3; 
  const savedDarkMode = localStorage.getItem('darkMode') === 'true';
  const [darkMode] = useState(savedDarkMode);

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    if (timer === 0) {
      switch (breathingPhase) {
        case 'inhale':
          setInhaleCount((prevCount) => prevCount + 1);
          setBreathingPhase('hold');
          setTimer(10); // Set the hold time (in seconds)
          break;
        case 'hold':
          setBreathingPhase('exhale');
          setTimer(10); // Set the exhale time (in seconds)
          break;
        case 'exhale':
          setExhaleCount((prevCount) => prevCount + 1);
          setBreathingPhase('inhale');
          setTimer(10); // Set the inhale time (in seconds)

          if (inhaleCount === maxBreathCount && exhaleCount === maxBreathCount) {
            clearInterval(interval); // Stop the breathing exercise
            setCompleted(true); // Set completion status
            showCongratulations(); // Show congratulations prompt
          }
          break;
        default:
          break;
      }
    }

    return () => clearInterval(interval);
  }, [timer, breathingPhase, inhaleCount, exhaleCount]);

  const progress = (5 - timer) / (breathingPhase === 'hold' ? 3 : 5);
  const circleStyle = {
    strokeDashoffset: 100 - progress * 100,
  };

  const showCongratulations = () => {
    alert('Congratulations! Breathing exercise completed.');
    // You can replace this with your preferred modal or notification library
  };

  return (
    <div className={`appind ${darkMode ? 'dark-mode' : ''}`}>
       <CoachHeader />
          <CoachSidenavbar location={location} />
          <Snowfall snowflakeCount={100} />
      <div className='cha'>
        <h1><IoExtensionPuzzle style={{ marginRight: '15px', marginBottom: '-5px', color: '#FF64B4' }} />Challenges</h1>
      </div>
      <div className={`chal ${darkMode ? 'dark-mode-title' : ''}`}>
        <h1><IoExtensionPuzzle style={{ marginRight: '15px', marginBottom: '-5px', color: '#FF64B4' }} />Challenges / Breathing Exercise</h1>
      </div>
      <div className={`breathing-container ${darkMode ? 'dark-mode-title' : ''}`}>
        <h2>{breathingPhase === 'inhale' ? 'Inhale' : breathingPhase === 'hold' ? 'Hold' : 'Exhale'}</h2>
        <p>Time left: {timer} seconds</p>

        {/* Circle progress bar */}
        <div className="circle-container">
          <svg className="circle-svg">
            <circle
              className="circle-progress"
              style={circleStyle}
              cx="50"
              cy="50"
              r="20"
            />
          </svg>
          <div className="timer-text">
            {timer}
          </div>
          <img
          className="breath-gif"
          src={breathGif}
          />
        </div>

        {completed && <p>Great job! Breathing exercise completed.</p>}
      </div>
    </div>
  );
}

export default BreathingExercise;