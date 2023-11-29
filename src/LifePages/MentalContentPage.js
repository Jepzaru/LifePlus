import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../LifeCss/MentalContentPage.css';
import HashLoader from 'react-spinners/HashLoader';
import mindfulnessImage from '../LifeImages/mindfulness.jpg';
import stressManagementImage from '../LifeImages/stress_management.jpg';
import creativeWritingImage from '../LifeImages/creative_writing.png';
import positiveAffirmationImage from '../LifeImages/positive_affirmation.jpg';
import yogaForMentalWellnessImage from '../LifeImages/yoga_mental_wellness.png';
import guidedRelaxationImage from '../LifeImages/guided_relaxation.jpg';
import artTherapyImage from '../LifeImages/art_therapy.jpg';
import walkingMeditationImage from '../LifeImages/walking_meditation.jpg';
import journalingImage from '../LifeImages/journaling.jpg';
import laughterYogaImage from '../LifeImages/laughter_yoga.jpg';
import deepBreathingImage from '../LifeImages/deep_breathing.jpg';
import natureSoundMeditationImage from '../LifeImages/nature_sound_meditation.jpg';
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { GiBrain } from "react-icons/gi";


const MentalContentPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const savedDarkMode = localStorage.getItem('darkMode') === 'true';
  const [darkMode] = useState(savedDarkMode);

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const onBackButtonClick = () => {
    navigate('/index/dashboard');
  };

  const onActivityClick = (youtubeLink) => {
    window.open(youtubeLink, '_blank');
  };


  const mentalActivities = [
    {
      title: 'Mindfulness Meditation',
      description: 'Join our mindfulness meditation session for relaxation.',
      image: mindfulnessImage,
      link: 'https://www.youtube.com/watch?v=ssss7V1_eyA',
    },
    {
      title: 'Stress Management Workshop',
      description: 'Learn effective techniques to manage stress and anxiety.',
      image: stressManagementImage,
      link: 'https://www.youtube.com/watch?v=grfXR6FAsI8',
    },
    {
      title: 'Creative Writing Class',
      description: 'Unleash your creativity with our creative writing class.',
      image: creativeWritingImage,
      link: 'https://www.youtube.com/watch?v=gdticvTteXg',
    },
    {
      title: 'Positive Affirmation Session',
      description: 'Boost your mood with positive affirmations and discussions.',
      image: positiveAffirmationImage,
      link: 'https://www.youtube.com/watch?v=2l8WD4U4KMk',
    },
    {
      title: 'Yoga for Mental Wellness',
      description: 'Explore yoga practices specifically designed for mental well-being.',
      image: yogaForMentalWellnessImage,
      link: 'https://www.youtube.com/watch?v=COp7BR_Dvps&t=297s',
    },
    {
      title: 'Guided Relaxation Session',
      description: 'Relax and unwind with a guided relaxation session.',
      image: guidedRelaxationImage,
      link: 'https://www.youtube.com/watch?v=vj0JDwQLof4',
    },
    {
      title: 'Art Therapy Workshop',
      description: 'Express yourself through art in our therapeutic workshop.',
      image: artTherapyImage,
      link: 'https://www.youtube.com/watch?v=tr6Tf2Ass0M',
    },
    {
      title: 'Mindful Walking Meditation',
      description: 'Practice mindfulness while taking a calming walk in nature.',
      image: walkingMeditationImage,
      link: 'https://www.youtube.com/watch?v=aCwEwz1xU2M',
    },
    {
      title: 'Journaling for Self-Reflection',
      description: 'Discover the benefits of journaling for self-reflection and growth.',
      image: journalingImage,
      link: 'https://www.youtube.com/watch?v=bMMJweqVfFM',
    },
    {
      title: 'Laughter Yoga Session',
      description: 'Experience the joy of laughter yoga for stress relief.',
      image: laughterYogaImage,
      link: 'https://www.youtube.com/watch?v=59KAzaNkctg',
    },
    {
      title: 'Deep Breathing Exercises',
      description: 'Learn deep breathing techniques to calm the mind and body.',
      image: deepBreathingImage,
      link: 'https://www.example.com/event11',
    },
    {
      title: 'Nature Sound Meditation',
      description: 'Immerse yourself in the soothing sounds of nature for meditation.',
      image: natureSoundMeditationImage,
      link: 'https://www.youtube.com/watch?v=eKFTSSKCzWA',
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
    <div className={`mental-content-page ${darkMode ? 'dark-mode' : ''}`}>
      {loading ? (
      <div className="hash">
          <HashLoader size={100} color={'#3FB24F'} loading={loading} />
        </div>
      ) : (
        <>
      <header className="header-men">
        <button className="menback-button" onClick={onBackButtonClick}>
        <IoArrowBackCircleSharp style={{fontSize: '3rem'}} />
        </button>
        <h1> <GiBrain style={{fontSize: '5rem', marginBottom: '-20px', marginRight: '10px'}}/>Mental Content</h1>
      </header>
      <section className="mental-content-container">
        <input
          type="text"
          placeholder="Search for contents..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </section>
      <section className="activities-con">
        {mentalActivities.map((activity, index) => (
          <div
            key={index}
            className="mental-container"
            onClick={() => onActivityClick(activity.link)}
          >
            <img
              src={activity.image}
              alt={activity.title}
              className="image"
            />
            <div className="details">
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

export default MentalContentPage;