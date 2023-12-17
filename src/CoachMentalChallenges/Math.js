import React, { useState, useRef, useEffect } from 'react';
import '../LifeCss/Math.css';
import CoachSidenavbar from "../Life++/coachsidebar";
import CoachHeader from "../Life++/CoachHeader";
import { useLocation } from 'react-router-dom';
import { IoExtensionPuzzle } from 'react-icons/io5';
import Snowfall from 'react-snowfall';


const MathGame = () => {
  const [num1, setNum1] = useState(Math.floor(Math.random() * 10) + 1);
  const [num2, setNum2] = useState(Math.floor(Math.random() * 10) + 1);
  const [answer, setAnswer] = useState('');
  const [score, setScore] = useState(0);
  const inputRef = useRef(null);
  const savedDarkMode = localStorage.getItem('darkMode') === 'true';
  const [darkMode] = useState(savedDarkMode);

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const generateNewQuestion = () => {
    setNum1(Math.floor(Math.random() * 10) + 1);
    setNum2(Math.floor(Math.random() * 10) + 1);
    setAnswer('');
    inputRef.current.focus();
  };

  const checkAnswer = () => {
    if (parseInt(answer) === num1 + num2) {
      setScore(score + 1);
    }
    generateNewQuestion();
  };

  return (
    <div className={`appind ${darkMode ? 'dark-mode' : ''}`}>
      <CoachHeader />
          <CoachSidenavbar location={useLocation()} />
          <Snowfall snowflakeCount={100} />
      <div className='cha'>
        <h1><IoExtensionPuzzle style={{ marginRight: '15px', marginBottom: '-5px', color: '#FF64B4' }} />Challenges</h1>
      </div>
      <div className={`chal ${darkMode ? 'dark-mode-title' : ''}`}>
        <h1><IoExtensionPuzzle style={{ marginRight: '15px', marginBottom: '-5px', color: '#FF64B4' }} />Challenges / Math</h1>
      </div>
      <div className={`math-game ${darkMode ? 'dark-mode-title' : ''}`}>
        <h2>Math Game</h2>
        <p>
          Score: {score}
        </p>
        <div className="question">
          <p>
            {num1} + {num2} =
          </p>
          <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            ref={inputRef}
          />
          <button className='check-math-button' onClick={checkAnswer}>Check</button>
        </div>
      </div>
    </div>
  );
};

export default MathGame;