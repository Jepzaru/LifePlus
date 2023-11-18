import React, { createContext, useContext, useState } from 'react';

const LyricsContext = createContext();

export const useLyricsContext = () => {
  return useContext(LyricsContext);
};

export const LyricsProvider = ({ children }) => {
  const [lyrics, setLyrics] = useState([]);
  const [currentLine, setCurrentLine] = useState('');

  const updateLyrics = (newLyrics, color) => {
    setLyrics(newLyrics);
  };

  const updateCurrentLine = (newLine) => {
    setCurrentLine(newLine);
  };

  return (
    <LyricsContext.Provider value={{ lyrics, updateLyrics, currentLine, updateCurrentLine }}>
      {children}
    </LyricsContext.Provider>
  );
};
