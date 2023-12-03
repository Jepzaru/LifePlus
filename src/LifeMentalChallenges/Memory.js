import React, { useState, useEffect } from 'react';
import '../LifeCss/Memory.css';
import Sidenavbar from '../Life++/sidenavbar';
import Header from '../Life++/Header';
import { useLocation } from 'react-router-dom';
import { IoExtensionPuzzle } from 'react-icons/io5';

function Memory() {
  const location = useLocation();
  const gridSize = 4; // Adjust the grid size as needed
  const totalPairs = gridSize * gridSize / 2;
  const initialTime = 60; // Initial time in seconds
  const savedDarkMode = localStorage.getItem('darkMode') === 'true';
  const [darkMode] = useState(savedDarkMode);

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const generateCards = () => {
    const numbers = Array.from({ length: totalPairs }, (_, index) => index + 1);
    const cards = [...numbers, ...numbers].map((value, index) => ({
      id: index + 1,
      value,
      flipped: false,
      matched: false,
    }));

    // Shuffle the cards
    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]];
    }

    return cards;
  };

  const [cards, setCards] = useState(generateCards());
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [time, setTime] = useState(initialTime);
  const [gameCompleted, setGameCompleted] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Check if the game is completed before decrementing the time
      if (!gameCompleted) {
        setTime((prevTime) => prevTime - 1);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [gameCompleted]);

  useEffect(() => {
    if (time === 0) {
      // Handle game over logic here
      alert('Game Over! Your time is up!');
      resetGame();
    }
  }, [time]);

  useEffect(() => {
    if (flippedCards.length === 2) {
      // Check if the two flipped cards have the same value
      if (flippedCards[0].value === flippedCards[1].value) {
        setMatchedPairs([...matchedPairs, flippedCards[0].id, flippedCards[1].id]);
      }

      // Reset the flipped cards after checking
      setTimeout(() => {
        setFlippedCards([]);
      }, 1000);
    }
  }, [flippedCards, matchedPairs]);

  const handleCardClick = (card) => {
    if (flippedCards.length < 2 && !flippedCards.includes(card) && !matchedPairs.includes(card.id)) {
      setFlippedCards([...flippedCards, card]);
    }
  };

  const resetGame = () => {
    setCards(generateCards());
    setFlippedCards([]);
    setMatchedPairs([]);
    setTime(initialTime);
    setGameCompleted(false);
  };

  useEffect(() => {
    if (matchedPairs.length === totalPairs * 2 && flippedCards.length === cards.length) {
      setGameCompleted(true);
    }
  }, [matchedPairs, totalPairs, flippedCards, cards]);

  return (
    <div className={`appind ${darkMode ? 'dark-mode' : ''}`}>
      <Header />
      <Sidenavbar location={location} />
      <div className='cha'>
        <h1><IoExtensionPuzzle style={{ marginRight: '15px', marginBottom: '-5px', color: '#FF64B4' }} />Challenges</h1>
      </div>
      <div className={`chal ${darkMode ? 'dark-mode-title' : ''}`}>
        <h1><IoExtensionPuzzle style={{ marginRight: '15px', marginBottom: '-5px', color: '#FF64B4' }} />Challenges / Memory</h1>
      </div>
      <div className="memory-game">
        {cards.map((card) => (
          <div
            key={card.id}
            className={`card ${flippedCards.includes(card) || matchedPairs.includes(card.id) ? 'flipped' : ''}`}
            onClick={() => handleCardClick(card)}
          >
            {flippedCards.includes(card) || matchedPairs.includes(card.id) ? card.value : '?'}
          </div>
        ))}
      </div>
       <div className={`timer ${darkMode ? 'dark-mode-title' : ''}`}>
        <p>Time: {time} seconds</p>
      </div>
      {gameCompleted && (
        <div className="congratulations">
          <p>Congratulations! You've completed the game!</p>
        </div>
      )}
      {!gameCompleted && (
        <div className="reset">
          <button className='playagain' onClick={resetGame}>Play Again</button>
        </div>
      )}
    </div>
  );
}

export default Memory;
