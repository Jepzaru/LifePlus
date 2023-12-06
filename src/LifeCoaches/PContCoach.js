import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../LifeCss/PhysicalContentPage.css';
import HashLoader from 'react-spinners/HashLoader';
import yogaImage from '../LifeImages/yoga.jpg';
import runningImage from '../LifeImages/running.jpg';
import zumbaImage from '../LifeImages/zumba.jpeg';
import crossFitImage from '../LifeImages/crossfit.jpg';
import cyclingImage from '../LifeImages/cycling.jpg';
import hiitImage from '../LifeImages/hiit.jpg';
import pilatesImage from '../LifeImages/pilates.jpg';
import strengthTrainingImage from '../LifeImages/strength_training.jpg';
import stretchingImage from '../LifeImages/stretching.jpg';
import kickboxingImage from '../LifeImages/kickboxing.jpg';
import tabataImage from '../LifeImages/tabata.jpg';
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { CgGym } from "react-icons/cg";
import danceCardioImage from '../LifeImages/dance_cardio.jpg';


const PContCoach = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const savedDarkMode = localStorage.getItem('darkMode') === 'true';
  const [darkMode] = useState(savedDarkMode);

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const onBackButtonClick = () => {
    navigate('/coach-index/dashboard');
  };

  const onActivityClick = (youtubeLink) => {
    window.open(youtubeLink, '_blank');
  };

  const filteredActivities = [
      {
        title: 'Yoga Session',
        description: 'Join us for a relaxing yoga session.',
        image: yogaImage,
        link: 'https://www.youtube.com/watch?v=QfByAGcfjLU&t=10s',
      },
      {
        title: 'Running Club',
        description: 'Get ready to hit the trails with our running club.',
        image: runningImage,
        link: 'https://www.youtube.com/watch?v=Hv5UvqcsIfY',
      },
      {
        title: 'Zumba Dance Party',
        description: 'Shake and groove with our Zumba dance party.',
        image: zumbaImage,
        link: 'https://www.youtube.com/watch?v=Xv-ffRVhC6A',
      },
      {
        title: 'CrossFit Challenge',
        description: 'Test your strength and endurance in our CrossFit challenge.',
        image: crossFitImage,
        link: 'https://www.youtube.com/watch?v=VFWrXJ_fOao',
      },
      {
        title: 'Cycling Expedition',
        description: 'Explore scenic routes with our cycling expedition.',
        image: cyclingImage,
        link: 'https://www.youtube.com/watch?v=9VkEa34PsNg',
      },
      {
        title: 'High-Intensity Interval Training (HIIT)',
        description: 'Burn calories and boost your fitness with a HIIT workout.',
        image: hiitImage,
        link: 'https://www.youtube.com/watch?v=J212vz33gU4',
      },
      {
        title: 'Pilates for Core Strength',
        description: 'Build core strength and improve flexibility with Pilates.',
        image: pilatesImage,
        link: 'https://www.youtube.com/watch?v=3sMtWb-k9cE',
      },
      {
        title: 'Strength Training Basics',
        description: 'Learn the fundamentals of strength training for all levels.',
        image: strengthTrainingImage,
        link: 'https://www.youtube.com/watch?v=H1F-UfC8Mb8',
      },
      {
        title: 'Full Body Stretching Routine',
        description: 'Relax and improve flexibility with this full-body stretching routine.',
        image: stretchingImage,
        link: 'https://www.youtube.com/watch?v=sTxC3J3gQEU',
      },
      {
        title: 'Cardio Kickboxing Workout',
        description: 'Kick and punch your way to fitness with this cardio kickboxing workout.',
        image: kickboxingImage,
        link: 'https://www.youtube.com/watch?v=Hri2rYgOLKI',
      },
      {
        title: 'Tabata Training for Beginners',
        description: 'Get started with Tabata training, a high-intensity interval workout.',
        image: tabataImage,
        link: 'https://www.youtube.com/watch?v=pynd3FZlR2M',
      },
      {
        title: 'Dance Cardio Workout',
        description: 'Have fun while getting fit with this dance cardio workout.',
        image: danceCardioImage,
        link: 'https://www.youtube.com/watch?v=QegSjK9Itbs',
      },
  ].filter((activity) =>
    activity.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className={`physical-content-container ${darkMode ? 'dark-mode' : ''}`}>
      {loading ? (
        <div className="hash">
          <HashLoader size={100} color={'#FF64B4'} loading={loading} />
        </div>
      ) : (
        <>
      <header className="page-header">
        <button className="phyback" onClick={onBackButtonClick}>
        <IoArrowBackCircleSharp style={{fontSize: '3rem'}} />
        </button>
        <h1><CgGym style={{fontSize: '5rem', marginBottom: '-20px', marginRight: '10px'}} />
        Physical Content
        </h1>
      </header>
      <section className="physical-search-bar">
        <input
          type="text"
          placeholder="Search for contents..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </section>
      <section className="activities-container">
        {filteredActivities.map((activity, index) => (
          <div
            key={index}
            className="content-container"
            onClick={() => onActivityClick(activity.link)}
          >
            <img
              src={activity.image}
              alt={activity.title}
              className="activity-image"
            />
            <div className="activity-details">
              <h3>{activity.title}</h3>
              <p className="content-text">{activity.description}</p>
            </div>
          </div>
        ))}
      </section>
      </>
      )}
    </div>
  );
};

export default PContCoach;
