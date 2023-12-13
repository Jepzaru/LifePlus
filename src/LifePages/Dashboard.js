  import React, { useEffect, useState } from 'react';
  import '../LifeCss/Dashboard.css';
  import Sidenavbar from '../Life++/sidenavbar';
  import HashLoader from 'react-spinners/HashLoader';
  import Header from '../Life++/Header';
  import { MdDashboard } from 'react-icons/md';
  import { Link } from 'react-router-dom';
  import { FaClipboardCheck} from 'react-icons/fa';
  import 'react-slideshow-image/dist/styles.css';
  import { Slide } from 'react-slideshow-image';
  import slide1 from '../LifeImages/slide1.png';
  import slide2 from '../LifeImages/sliide2.png';
  import slide3 from '../LifeImages/slide3.png';
  import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
  import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
  import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
  import { useAuth } from '../Life++/AuthContext';
  import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
  import 'react-circular-progressbar/dist/styles.css';




  function Dash() {
    const { login, user } = useAuth();
    const [loading, setLoading] = useState(false);
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    const [darkMode] = useState(savedDarkMode);

    const slideImages = [
      { url: slide1 },
      { url: slide2 },
      { url: slide3 },
    ];

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

    const spanStyle = {
      fontSize: '20px',
      background: '#efefef',
      color: '#000000',
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
    const containerStyle = {
      width: '890px', 
      height: '400px', 
      overflow: 'hidden', 
      borderRadius: '15px',
      marginLeft: '250px',
      marginBottom: '50px'   
    };

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
      // Load user from localStorage on component mount
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
            <Header />
            <Sidenavbar />
            <div className="dash">
              <h1>
                <MdDashboard style={{ marginBottom: '-8px', color: '#FF64B4' }} /> Dashboard
              </h1>
            </div>
            <div className="imageslide">
            <div style={containerStyle}>
              <Slide 
              prevArrow={<CustomPrevArrow />} 
              nextArrow={<CustomNextArrow />}
              
              >
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
            <Link to="/index/physical"
            className='phy-con'>
              <div className='phy'> <p>Physical Content</p></div>
            </Link>
            <Link to="/index/mental"
            className='ment-con'>
              <div className='men'><p>Mental Content</p></div>
              </Link>
              <div className={`recen-cha ${darkMode ? 'dark-mode-title' : ''}`}>
              <h1>Recent Courses Enrolled</h1>
              <div className='recen-con'>
                
              </div>
              <div className='calendar'>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar style={{color: 'white'}} />
              </LocalizationProvider>
              </div>
              <div className='rec-com'>
                <div className='recbg'>
                  <p><FaClipboardCheck style={{ fontSize: '50px', marginLeft: '-30px', marginBottom: '-30px' }} />
                    &nbsp;&nbsp;Recent &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Challenges</p>
                </div>
                
            
              </div>
            </div>
          </>
        )}
      </div>
    );
  }

  export default Dash;
