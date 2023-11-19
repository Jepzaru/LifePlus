import React from 'react';
import Slider from 'react-slick';
import '../LifeCss/Challenges.css';
import Sidenavbar from '../Life++/sidenavbar';
import Header from '../Life++/Header';
import { IoExtensionPuzzle } from 'react-icons/io5';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function Challenges() {
  // Configure the settings for the slider
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="appind">
      <Header />
      <Sidenavbar />
      <div className='cha'>
        <h1><IoExtensionPuzzle style={{ marginRight: '15px', marginBottom: '-5px', color: '#FF64B4' }} />Challenges</h1>
      </div>
      <div className='chal'>
        <h1><IoExtensionPuzzle style={{ marginRight: '15px', marginBottom: '-5px', color: '#FF64B4' }} />Challenge</h1>
      </div>
      <div className='phy-cha'>
        <h2>Physical Challenge</h2>
        <Slider {...sliderSettings}>
            {/* Card 1 */}
            <div>
                <div className="card-content">
                <h3>Card 1 Content</h3>
                </div>
            </div>
            {/* Card 2 */}
            <div>
                <div className="card-content">
                <h3>Card 2 Content</h3>
                </div>
            </div>
            {/* Card 3 */}
            <div>
                <div className="card-content">
                <h3>Card 3 Content</h3>
                </div>
            </div>
            <div>
                <div className="card-content">
                <h3>Card 4 Content</h3>
                </div>
            </div>
            </Slider>
            
      </div>
      <div className='ment-cha'>
        <h2>Mental Challenge</h2>
        <Slider {...sliderSettings}>
        {/* Card 1 */}
        <div>
            <div className="card-content">
            <h3>Card 1 Content</h3>
            </div>
        </div>
        {/* Card 2 */}
        <div>
            <div className="card-content">
            <h3>Card 2 Content</h3>
            </div>
        </div>
        {/* Card 3 */}
        <div>
            <div className="card-content">
            <h3>Card 3 Content</h3>
            </div>
        </div>
        <div>
                <div className="card-content">
                <h3>Card 4 Content</h3>
                </div>
            </div>
        </Slider>
      </div>
    </div>
  );
}

export default Challenges;
