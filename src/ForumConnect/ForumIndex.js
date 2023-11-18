import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../ForumStyle/Loader.css';
import '../ForumStyle/ForumIndex.css';

function ForumIndex() {
  const [currentText, setCurrentText] = useState('ForumConnect');
  const [isLoading, setIsLoading] = useState(false);
  const delayBetweenWords = 1000; 

  useEffect(() => {
    const words = ['Connect', 'Read', 'Care']; 
    let currentWordIndex = 1;
    const interval = setInterval(() => {
      setCurrentText(words[currentWordIndex]);
      currentWordIndex = (currentWordIndex + 1) % words.length;
    }, delayBetweenWords);

    return () => clearInterval(interval);
  }, [delayBetweenWords]);

  const handleJoinNowClick = () => {
    setIsLoading(true);
  
  setTimeout(() => {
    setIsLoading(false);
  }, 3000); 
};

useEffect(() => {
  animateOnLoad(); 
}, []);

function animateOnLoad() {
  const title = document.querySelector('.title');
  const descrip = document.querySelector('.descrip');
  const breadcrumbs = document.querySelector('.breadcrumbs');
  const buttons = document.querySelectorAll('.join-now-button');

  if (title && descrip && breadcrumbs) {
    title.style.transform = 'translateY(0)';
    title.style.opacity = 1;
    descrip.style.transform = 'translateY(0)';
    descrip.style.opacity = 1;
    breadcrumbs.style.transform = 'translateY(0)';
    breadcrumbs.style.opacity = 1;
  }

  if (buttons) {
    buttons.forEach((button) => {
      button.style.transform = 'translateY(0)';
      button.style.opacity = 1;
    });
  }
}
  return (
    <div className="index">
      <main>
        <div className="header">
          <div className="breadcrumbs">
            <ul>
              <li><a href="/">Home</a></li>
              <li><Link to="/about-Me">About me</Link></li>
              <li><a href="">Forum</a></li>
              <div className="signups">
                <Link to="/forum-createaccount" className="sign-up-button">Create Account</Link>
              </div>
            </ul>
          </div>
          <div className="label">
            <h1>ForumConnect</h1>
          </div>
        </div>
        <div className="title">
          <h1>Welcome to <br />Forum<span style={{ color: 'yellow' }}>{currentText}</span></h1>
        </div>
        <div className="descrip">
          <p>
            Where Ideas Unite and Conversations Thrive! <br />
            Join the hub of engaging discussions and connect <br />
            with like-minded individuals from all walks of life. <br />
            Your digital rendezvous for thought-sharing<br /> and community building.
          </p>
        </div>
        <div className="getstarted">
            {isLoading ? (
              <div className="loader"></div>
            ) : (
              <Link to="/forum-login" className="join-now-button" onClick={handleJoinNowClick}>
                Join now!
              </Link>
            )}
          </div>
      </main>
    </div>
  );
}

export default ForumIndex;
