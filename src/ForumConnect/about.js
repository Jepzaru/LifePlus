
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import forumConnectImage from '../ForumImages/meh.png';
import '../ForumStyle/about.css'; 

function About() {
  const [currentText, setCurrentText] = useState('ForumConnect');
  const delayBetweenWords = 1000; 

  useEffect(() => {
    const words = ['Student', 'Gamer', 'Designer']; 
    let currentWordIndex = 1;
    const interval = setInterval(() => {
      setCurrentText(words[currentWordIndex]);
      currentWordIndex = (currentWordIndex + 1) % words.length;
    }, delayBetweenWords);

    return () => clearInterval(interval);
  }, [delayBetweenWords]);

  return (
    <div className="about-container">
        <div className="breadcrumbsd">
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/about">About me</a></li>
              <li><a href="/forum">Forum</a></li>
              <div className="signupsed">
                <Link to="/forum-createaccount" className="sign-up-button">Create Account</Link>
              </div>
              </ul>
            </div>
            <div className="labels">
            <h1>ForumConnect</h1>
          </div>
          <div className="hello">
        <h1>Hello! <br />I'm Jeff Francis D. Conson<br />A <span style={{ color: 'yellow' }}>{currentText}</span></h1>
      </div>
      <div className="descript">
          <p>
            I'm a 3rd Year Student taking upss  <br />Bachelor of Science of Information Technology, <br /> 21 years old.
             living in Buenahills Guadalupe Cebu City and  <br /><span style={{ color: 'yellow' }}>I love Kimverly Bacalso UWU. She's my everything. My honeybunch sugar plum humpy dumpy umpkin. She's my sweetie pie. She's my cuppy cake gum drop snokums snokums. She's the apple of my eye.</span>
          </p>
          </div>
          <div className="images-container">
        <img src={forumConnectImage} alt="Forum Connect Logo" className="forum-connect-images" />
      </div>
    </div>
  );
}

export default About;
