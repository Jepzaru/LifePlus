import React, { useState } from 'react';
import { Button } from '@mui/material';
import axios from 'axios';
import './ReactBingo.css';

const BASE_URL = 'http://www.hyeumine.com';

const ReactBingo = () => {
  const [bingoCards, setBingoCards] = useState(null);
  const [bingoGameCode, setBingoGameCode] = useState('');

  return (
    <div className="App">
      <div className="container">
        {bingoCards === null ? (
          <BingoCodeInput callback={setBingoCards} codeCallback={setBingoGameCode} />
        ) : (
          <div className="bingo-container">
            <div className="game-code-container">
              <h1 className="game-code-label">Game Code: {bingoGameCode}</h1>
            </div>
            <div className="get-new-code">
              <a href="http://www.hyeumine.com/bingodashboard.php?bcode=HEelhJos" target="_blank" rel="noopener noreferrer">
                Get New Code
              </a>
            </div>
            <BingoCard data={bingoCards} callback={setBingoCards} code={bingoGameCode} />
          </div>
        )}
      </div>
    </div>
  );
};

const BingoCard = ({ data, callback, code }) => {
  const { playcard_token: token, card } = data;
  const [reload, setReload] = useState(0);

  const handleNewCardClick = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(`${BASE_URL}/getcard.php?bcode=${code}`);
      if (response.data) {
        callback(response.data);
        setReload(reload + 1);
      }
    } catch (error) {
      alert("Invalid game code!");
    }
  };

  const handleCheckCardClick = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(`${BASE_URL}/checkwin.php?playcard_token=${token}`);
      if (response.data) {
        alert("Congratulations, it's Bingo!");
      } else {
        alert("Complete the pattern, No bingo :<");
      }
    } catch (error) {
      alert("Invalid game code!");
    }
  };

  return (
    <div key={reload} className="container-vertical">
      <div className="container bg-container">
        {['B', 'I', 'N', 'G', 'O'].map((letter, index) => (
          <div className="container-vertical" key={index}>
            <h1>{letter}</h1>
            {card?.[letter].map((num, idx) => (
              <BingoNumber key={idx} number={num} />
            ))}
          </div>
        ))}

      </div>
      <div className="container btn-container">
        <Button className="game-card-btn" variant="outlined"
          style={{ backgroundColor: '#69140E', color: '#D58936'}}
          onClick={handleCheckCardClick}
        >
          Check Card
        </Button>
        &nbsp;
        &nbsp;
        &nbsp;
        &nbsp;
        &nbsp;
        <Button style={{ backgroundColor: '#69140E', color: '#D58936'}}
          className="game-card-btn" 
          variant="contained"
          onClick={handleNewCardClick}
        >
          New Card
        </Button>
      </div>
    </div>
  );
};

const BingoNumber = ({ number }) => {
  const [clicked, setClicked] = useState(false);

  return (
    <div
      className={`container game-number${clicked ? " clicked" : ""}`}
      onClick={() => {
        setClicked(!clicked);
      }}
    >
      {number}
    </div>
  );
};

const BingoCodeInput = ({ callback, codeCallback }) => {
  const [value, setValue] = useState('');
  const [disabled, setDisabled] = useState(true);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
    setDisabled(newValue === '');
  };

  const handleClick = async (e) => {
    e.preventDefault();

    if (value === '') return;

    try {
      const response = await axios.get(`${BASE_URL}/getcard.php?bcode=${value}`);
      if (response.data) {
        callback(response.data);
        codeCallback(value);
      } else {
        alert("Sorry, but your code is invalid");
      }
    } catch (error) {
      alert("Error fetching game data. Please try again later.");
    }
  };

  const buttonStyle = {
    backgroundColor: value !== '' ? '#69140E' : '', 
    color: value !== '' ? '#D58936' : '', 
  };
  
  useState(() => {
    setDisabled(value === '');
  }, [value]);

  return (
    <div className="container-vertical">
      <label className="code-label" htmlFor="game-code">
        Enter Code
      </label>
      <input className="textfield" type="text" label="Enter code:" onChange={handleChange}
        id="game-code"
        value={value}
      />
      <Button className="game-button" color="success" size="medium" style={buttonStyle}
        variant="contained" onClick={handleClick}
        disabled={disabled}
      >
        Get Card
      </Button>
    </div>
  );
};

export default ReactBingo;
