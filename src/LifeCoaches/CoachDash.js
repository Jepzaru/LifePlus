import React, { useEffect, useState } from 'react';
import '../LifeCss/Dashboard.css';
import CoachSidenavbar from '../Life++/coachsidebar';
import HashLoader from 'react-spinners/HashLoader';
import CoachHeader from '../Life++/CoachHeader';
import { MdDashboard } from 'react-icons/md';
import { Link } from 'react-router-dom';
import 'react-slideshow-image/dist/styles.css';
import { Slide } from 'react-slideshow-image';
import slide1 from '../LifeImages/slide4.png';
import slide2 from '../LifeImages/sliide2.png';
import slide3 from '../LifeImages/slide3.png';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { useAuth } from '../Life++/AuthContext';
import Snowfall from 'react-snowfall';
import pengu1 from '../LifeImages/pengwe.png';
import axios from 'axios';

function CoachDash() {
  const { user, login } = useAuth();
  const [foundCoach, setFoundCoach] = useState(null);

  useEffect(() => {
    const fetchCoachData = async () => {
      try {
        if (!user) {
          console.error('User not available');
          return;
        }

        const response = await axios.get('http://localhost:8080/coach/get');
        const coaches = response.data;

        const coach = coaches.find((coach) => coach.username === user.username);

        if (coach) {
          setFoundCoach(coach); // Storing coach in state
        } else {
          console.log('Coach not found for the user');
        }
      } catch (error) {
        console.error('Error fetching coach data:', error);
      }
    };

    fetchCoachData();
  }, [user]);

  const [loading, setLoading] = useState(false);
  const savedDarkMode = localStorage.getItem('darkMode') === 'true';
  const [darkMode, setDarkMode] = useState(savedDarkMode);

  const slideImages = [
    { url: slide1 },
    { url: slide2 },
    { url: slide3 },
  ];

  const containerStyle = {
    width: '890px',
    height: '400px',
    overflow: 'hidden',
    borderRadius: '15px',
    marginLeft: '250px',
    marginBottom: '50px',
  };

  const spanStyle = {
    fontSize: '20px',
    background: '#efefef',
    color: '#000000',
  };

  const divStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '400px',
    width: '850px',
    backgroundSize: 'cover',
    marginBottom: '50px',
    borderRadius: '15px',
  };

  const CustomPrevArrow = (props) => (
    <button
      className="custom-arrow-button"
      onClick={props.onClick}
      style={{
        position: 'absolute',
        top: '50%',
        left: '10px',
        zIndex: 1,
        cursor: 'pointer',
        marginLeft: '-200px',
        background: 'transparent',
        border: 'none',
        outline: 'none',
        color: 'black',
      }}
      onMouseOver={(e) => (e.target.style.color = '#ff0000')}
      onMouseOut={(e) => (e.target.style.color = '#fff')}
    >
      &lt;
    </button>
  );

  const CustomNextArrow = (props) => (
    <button
      className="custom-arrow-button"
      onClick={props.onClick}
      style={{
        position: 'absolute',
        top: '50%',
        right: '10px',
        zIndex: 1,
        cursor: 'pointer',
        background: 'transparent',
        border: 'none',
        outline: 'none',
        color: 'black',
      }}
      onMouseOver={(e) => (e.target.style.color = '#ff0000')}
      onMouseOut={(e) => (e.target.style.color = '#fff')}
    >
      &gt;
    </button>
  );

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (storedUser) {
      login(storedUser);
    }
  }, [login]);

  return (
    <div className={`appindash ${darkMode ? 'dark-mode' : ''}`}>
      {loading ? (
        <div className="hash">
          <HashLoader size={100} color={'#FF64B4'} loading={loading} />
        </div>
      ) : (
        <>
          <CoachHeader />
          <CoachSidenavbar />
          <Snowfall snowflakeCount={100} />
          <div className="dash">
            <h1>
              <MdDashboard style={{ marginBottom: '-8px', color: '#FF64B4' }} /> Dashboard
            </h1>
          </div>
          <div className="imageslide">
            <div style={containerStyle}>
              <Slide prevArrow={<CustomPrevArrow />} nextArrow={<CustomNextArrow />}>
                {slideImages.map((image, index) => (
                  <div key={index}>
                    <div
                      style={{
                        ...divStyle,
                        backgroundImage: `url(${image.url})`,
                        backgroundSize: 'cover',
                        alignContent: 'center',
                      }}
                    >
                      <span style={spanStyle}>{image.caption}</span>
                    </div>
                  </div>
                ))}
              </Slide>
            </div>
          </div>
          <div className={`choose ${darkMode ? 'dark-mode-title' : ''}`}>
            <h1>Choose Content</h1>
          </div>
          <Link to="/coach-index/physical" className="phy-con">
            <div className="phy">
              <p>Physical Content</p>
            </div>
          </Link>
          <Link to="/coach-index/mental" className="ment-con">
            <div className="men">
              <p>Mental Content</p>
            </div>
          </Link>
          <div className={`recen-cha ${darkMode ? 'dark-mode-title' : ''}`}>
            <h1>Recent Courses Created</h1>

            <div className="recen-con">
              {foundCoach ? (
                foundCoach.courses
                  .slice(0, 3)
                  .reverse()
                  .map((course, index) => (
                    <div key={index} className="course-item">
                      <h3 style={{ color: 'black' }}>🎓 {course.name}</h3>
                      <div className='route-cou'>
                        <button className='route-cou-btn'>View Course</button>
                      </div>
                    </div>
                  ))
              ) : (
                <p>No courses found</p>
              )}
            </div>

            <div className="calendar">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar style={{ color: 'white' }} />
              </LocalizationProvider>
            </div>
            <div className="rec-com">
              <div className='pengwe1'>
                <img
                  src={pengu1}
                  style={{ width: '540px', height: '400px', borderRadius: '15px' }}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default CoachDash;
