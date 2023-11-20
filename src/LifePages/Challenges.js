import React from 'react';
import Slider from 'react-slick';
import '../LifeCss/Challenges.css';
import Sidenavbar from '../Life++/sidenavbar';
import Header from '../Life++/Header';
import { IoExtensionPuzzle } from 'react-icons/io5';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import armsImage from '../LifeImages/arms.png';
import absImage from '../LifeImages/abs.png';
import cardioImage from '../LifeImages/cardio.png';
import strengthImage from '../LifeImages/strength.png';

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
        <h1><IoExtensionPuzzle style={{ marginRight: '15px', marginBottom: '-5px', color: '#FF64B4' }} />Challenges</h1>
      </div>
      <div className='phy-cha'>
    <h2>Physical Challenges</h2>
    <Slider {...sliderSettings}>
        {/* Card 1 */}
        <div>
            <div className="card-content">
                <h3>Arms Challenge</h3>
                <img src={armsImage} alt="Arms Challenge" />
                <div className='viewcha'>
                    <button className='phy-viewcha-button'>View Challenge</button>
                </div>
            </div>
        </div>
        {/* Card 2 */}
        <div>
            <div className="card-content">
                <h3>Abs Challenge</h3>
                <img src={absImage} alt="Abs Challenge" /> {/* Image for Leg Challenge */}
                <div className='viewcha'>
                    <button className='phy-viewcha-button'>View Challenge</button>
                </div>
            </div>
        </div>
        {/* Card 3 */}
        <div>
            <div className="card-content">
                <h3>Cardio Challenge</h3>
                <img src={cardioImage} alt="Cardio Challenge" /> {/* Image for Cardio Challenge */}
                <div className='viewcha'>
                    <button className='phy-viewcha-button'>View Challenge</button>
                </div>
            </div>
        </div>
        {/* Card 4 */}
        <div>
            <div className="card-content">
                <h3>Strength Challenge</h3>
                <img src={strengthImage} alt="Strength Challenge" /> {/* Image for Strength Challenge */}
                <div className='viewcha'>
                    <button className='phy-viewcha-button'>View Challenge</button>
                </div>
                </div>
            </div>
          </Slider>
      </div>
      <div className='ment-cha'>
        <h2>Mental Challenges</h2>
        <Slider {...sliderSettings}>
        {/* Card 1 */}
        <div>
            <div className="card-content">
            <h3>Card 1 Content</h3>
            <div className='viewcha'>
              <button className='men-viewcha-button'>View Challenge</button>
            </div>
            </div>
        </div>
        {/* Card 2 */}
        <div>
            <div className="card-content">
            <h3>Card 2 Content</h3>
            <div className='viewcha'>
              <button className='men-viewcha-button'>View Challenge</button>
            </div>
            </div>
        </div>
        {/* Card 3 */}
        <div>
            <div className="card-content">
            <h3>Card 3 Content</h3>
            <div className='viewcha'>
              <button className='men-viewcha-button'>View Challenge</button>
            </div>
            </div>
        </div>
        <div>
                <div className="card-content">
                <h3>Card 4 Content</h3>
                <div className='viewcha'>
              <button className='men-viewcha-button'>View Challenge</button>
            </div>
                </div>
            </div>
        </Slider>
      </div>
    </div>
  );
}

export default Challenges;
