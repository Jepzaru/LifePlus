import React from 'react';
import { TbBrandNeteaseMusic } from 'react-icons/tb';
import { PiMicrophoneStageFill } from 'react-icons/pi';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';

import './Singer.css';

import FirstSinger from './singers/FirstSinger';
import SecondSinger from './singers/SecondSinger';
import ThirdSinger from './singers/ThirdSinger';
import FourthSinger from './singers/FourthSinger';
import { LyricsProvider } from './LyricsContext';

function Singer() {
 
  return (
    <LyricsProvider>
    <Router>
      <div className="App">
        <header style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <TbBrandNeteaseMusic style={{ fontSize: '3rem', marginRight: '15px' }} />
          <h1>Complete the Lyrics</h1>
        </header>
        <nav>
          <ul className="breadcrumbs">
            <li>
              <div className='first'>
                <PiMicrophoneStageFill style={{ fontSize: '1rem', marginRight: '5px', color: 'black' }} />
                <Link to="/singer/first" className="breadcrumb-link">
                  First Singer
                </Link>
              </div>
            </li>
            <li>
              <div className='second'>
                <PiMicrophoneStageFill style={{ fontSize: '1rem', marginRight: '5px', color: 'black' }} />
                <Link to="/singer/second" className="breadcrumb-link">
                  Second Singer
                </Link>
              </div>
            </li>
            <li>
              <div className='third'>
                <PiMicrophoneStageFill style={{ fontSize: '1rem', marginRight: '5px', color: 'black' }} />
                <Link to="/singer/third" className="breadcrumb-link">
                  Third Singer
                </Link>
              </div>
            </li>
            <li>
              <div className='fourth'>
                <PiMicrophoneStageFill style={{ fontSize: '1rem', marginRight: '5px', color: 'black' }} />
                <Link to="/singer/fourth" className="breadcrumb-link">
                  Fourth Singer
                </Link>
              </div>
            </li>
          </ul>
        </nav>
        <div className="container">
          <Routes>
            <Route path="/singer/first" element={<FirstSinger />} />
            <Route path="/singer/second" element={<SecondSinger />} />
            <Route path="/singer/third" element={<ThirdSinger />} />
            <Route path="/singer/fourth" element={<FourthSinger />} />
          </Routes>
        </div>
      </div>
    </Router>
    </LyricsProvider>
  );
}

export default Singer;
