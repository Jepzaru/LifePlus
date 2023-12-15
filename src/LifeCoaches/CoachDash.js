import React, { useEffect, useState } from 'react';
import '../LifeCss/Dashboard.css';
import CoachSidenavbar from '../Life++/coachsidebar';
import HashLoader from 'react-spinners/HashLoader';
import CoachHeader from '../Life++/CoachHeader';
import { MdDashboard } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { FaClipboardCheck } from 'react-icons/fa';
import 'react-slideshow-image/dist/styles.css';
import { Slide } from 'react-slideshow-image';
import slide1 from '../LifeImages/slide4.png';
import slide2 from '../LifeImages/sliide2.png';
import slide3 from '../LifeImages/slide3.png';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { useAuth } from '../Life++/AuthContext';
import axios from 'axios';

function CoachDash() {
  const { user, login } = useAuth();
  const [foundCoach, setFoundCoach] = useState(null);

  useEffect(() => {
    const fetchCoachData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/coach/get');
        const coaches = response.data;

        const coach = coaches.find((coach) => coach.username === user.username);

        if (coach) {
          console.log('Found Coach:', coach);
          console.log('Courses by Coach:', coach.courses);
          setFoundCoach(coach); // Storing coach in state
        } else {
          console.log('Coach not found for the user');
        }
      } catch (error) {
        console.error('Error fetching coach data:', error);
      }
    };

    fetchCoachData();
  }, [user.username]);

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
  }, [login]); // Removed the empty dependency array

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
                .slice(0, 3) // Get the latest 3 courses
                .reverse() // Reverse to get the latest at the top
                .map((course, index) => (
                  <div key={index} className="course-item">
                    {/* Render course details */}
                    <h3>{course.name}</h3>
                    <br />
                    {/* ... (other details) */}
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
              <div className="recbg">
                <p>
                  <FaClipboardCheck
                    style={{ fontSize: '50px', marginLeft: '-30px', marginBottom: '-30px' }}
                  />
                  &nbsp;&nbsp;Recent &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Challenges
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default CoachDash;
