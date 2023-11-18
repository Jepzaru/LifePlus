import React, { useState, useRef, useEffect } from 'react';
import { useLyricsContext } from '../LyricsContext';

function FirstSinger() {
  const { lyrics, updateLyrics } = useLyricsContext();
  const [currentLine, setCurrentLine] = useState('');
  const singerColor = 'rgb(21, 255, 0)'; 
  const lyricsContainerRef = useRef(null);

  const ChangeInput = (event) => {
    setCurrentLine(event.target.value);
  };

  const BlurInput = () => {
    if (currentLine.trim() !== '') {
      const newLyric = { text: currentLine, color: singerColor };
      updateLyrics([...lyrics, newLyric]);
      setCurrentLine(''); 
    }
  };

  useEffect(() => {
    lyricsContainerRef.current.scrollTop = lyricsContainerRef.current.scrollHeight;
  }, [lyrics]);

  return (
    <div>
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter lyrics here"
          style={{ width: '80%', padding: '10px', borderRadius: '10px', border: '1px solid #ccc',
          }}
          value={currentLine}
          onChange={ChangeInput}
          onBlur={BlurInput} 
        />
      </div>
      <div
        ref={lyricsContainerRef}
        className="lyrics-container"
        style={{ backgroundColor: '#f0f0f0', borderRadius: '10px', marginBottom: '15px', marginTop: '15px', maxHeight: '400px', overflowY: 'auto' }}
      >
        {lyrics.map((lyric, lyricIndex) => (
          <div key={lyricIndex} style={{ padding: '10px', borderRadius: '10px', backgroundColor: lyric.color, marginTop: '15px' }}>
            <div style={{ textAlign: 'left' }}>
              {lyric.text}
            </div>
          </div>
        ))}
        <div style={{ padding: '10px', borderRadius: '10px', backgroundColor: singerColor, marginTop: '15px' }}>
          <div style={{ textAlign: 'left' }}>
            {currentLine}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FirstSinger;
