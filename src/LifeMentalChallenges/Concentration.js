import React, { useState, useEffect } from 'react';
import '../LifeCss/Concentration.css';
import Sidenavbar from '../Life++/sidenavbar';
import Header from '../Life++/Header';
import { useLocation } from 'react-router-dom';
import { IoExtensionPuzzle } from 'react-icons/io5';

const GuessTheSongGame = () => {
  const location = useLocation();

  const [songList, setSongList] = useState([]);
  const [currentSong, setCurrentSong] = useState('');
  const [userGuess, setUserGuess] = useState('');
  const [feedback, setFeedback] = useState('');
  const [attempts, setAttempts] = useState(0);
  const savedDarkMode = localStorage.getItem('darkMode') === 'true';
  const [darkMode] = useState(savedDarkMode);

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  useEffect(() => {
  
  const generateSongList = () => {
    const songs = [
      { title: 'Shape of You', emojis: '🔺of 🫵🏻' },
  { title: 'Happy', emojis: '😊' },
  { title: 'Bad Romance', emojis: '😈💑' },
  { title: 'Waka Waka', emojis: '🌍⚽🎶' },
  { title: 'Havana', emojis: '🌴🏙️🎶' },
  { title: 'Someone Like You', emojis: '👤👍🏻🫵🏻' },
  { title: 'Let It Go', emojis: '❄️👸🎶' },
    ];
    setSongList(songs);
    generateRandomSong(songs);
  };
  generateSongList();
}, []);

  const generateRandomSong = (songs) => {
    const randomIndex = Math.floor(Math.random() * songs.length);
    setCurrentSong(songs[randomIndex]);
    setUserGuess('');
    setFeedback('');
    setAttempts(0);
  };

  const handleInputChange = (e) => {
    setUserGuess(e.target.value.toLowerCase());
  };

  const handleGuess = () => {
    if (!userGuess) {
      setFeedback('Please enter a guess.');
      return;
    }

    setAttempts(attempts + 1);

    if (userGuess === currentSong.title.toLowerCase()) {
      setFeedback(`Congratulations! You guessed the song "${currentSong.title}" in ${attempts} attempts.`);
      generateRandomSong(songList);
    } else {
      setFeedback('Incorrect guess. Try again!');
    }
  };

  return (
    <div className={`appind ${darkMode ? 'dark-mode' : ''}`}>
      <Header />
      <Sidenavbar location={location} />
      <div className='cha'>
        <h1><IoExtensionPuzzle style={{ marginRight: '15px', marginBottom: '-5px', color: '#FF64B4' }} />Challenges</h1>
      </div>
      <div className={`chal ${darkMode ? 'dark-mode-title' : ''}`}>
        <h1><IoExtensionPuzzle style={{ marginRight: '15px', marginBottom: '-5px', color: '#FF64B4' }} />Challenges / Guess the Song</h1>
      </div>
      <div className="guess-the-song-game">
        <p>Guess the song:</p>
        <p className="emoji-sequence">{currentSong.emojis}</p>
        <input type="text" value={userGuess} onChange={handleInputChange} />
        <button className='guess-button' onClick={handleGuess}>Submit Guess</button>
        <p>{feedback}</p>
      </div>
    </div>
  );
};

export default GuessTheSongGame;