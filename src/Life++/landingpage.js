import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import HashLoader from 'react-spinners/HashLoader';
import Snowfall from 'react-snowfall';
import '../LifeCss/landing.css';

function LandingPage() {
  const aboutUsRef = useRef(null);
  const servicesRef = useRef(null);
  const homeRef = useRef(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 4000);
  }, []);

  const scrollToAboutUs = () => {
    aboutUsRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToServices = () => {
    servicesRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToHome = () => {
    homeRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className='main'>
      {loading ? (
        <HashLoader
          size={100}
          color={"#FF64B4"}
          loading={loading}
        />
      ) : (
        <>
          <Snowfall
            snowflakeCount={100}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              zIndex: 2,
            }}
          />
          <div ref={homeRef} className="landing">
            <div className="breadcrumbs">
              <div className="lifelogo"></div>
              <div className="lifetitle">LIFE ++</div>
              <ul>
                <li onClick={scrollToHome}>Home</li>
                <li onClick={scrollToAboutUs}>About Us</li>
                <li onClick={scrollToServices}>Services</li>
                <li><Link to="/sign-up" className='make-button'>Create Account</Link></li>
              </ul>
            </div>

            <div className="hd">
              <h1><span style={{ color: '#FF64B4' }}>Discover</span> the <br /> <span style={{ color: '#705FBE' }}>Healthier </span>you</h1>
            </div>

            <div className="des">
              <p>we're dedicated to empowering you on your journey towards <br />
                optimal physical and mental well-being. We believe that <br />
                true wellness encompasses not only the strength and vitality <br />
                of your body but also the peace and resilience of your mind.
              </p>
            </div>

            <div className='getbutton'>
              <Link to="/login-page" className="getstart-button">Get Started</Link>
            </div>

            <div className="watchimage"></div>

            <div ref={servicesRef} className="Serv">
              <h2>Services</h2>
              <p>At Life++, we take pride in being the bridge to your transformative and personalized wellness journey. Our website serves as your <br />
                exclusive gateway to a comprehensive array of physical activities and mental exercises meticulously curated to uplift your <br />
                overall well-being. Experience an immersive and engaging platform that redefines the way you approach a healthier lifestyle. <br />
                We believe in making well-being not only attainable but truly enjoyable, and we're committed to fostering health benefits that <br />
                resonate for a lifetime. Through our diverse selection of wellness resources, we empower you to embark on a holistic journey<br />
                towards a more vibrant, fulfilled, and healthier you. Discover a world of possibilities, uncover your potential, and thrive with Life++ today.
              </p>
            </div>

            <div className="servcon">
              <div className="lifeimg"></div>
              <div className="unlock">
                <h1>Unlock your full Potential</h1>
              </div>
              <div className="potential">
                <p>with Life++ and embark on a transformative wellness journey.<br />
                  Our website provides a wealth of fitness services and resources that cater to your individual needs and preferences.
                  Experience the power of personalized workouts, engaging group fitness sessions, and enriching content that spans a wide spectrum of physical and mental wellness.
                  Whether you're looking to improve your physical health, enhance your mental well-being, or both, we are your dedicated partner on the path to holistic wellness. Elevate your overall
                  well-being and embark on a life-changing journey with us today!
                </p>
              </div>
            </div>

            <div ref={aboutUsRef} className="abtus">
              <h2>About Us</h2>
              <p><span style={{ color: '#FF64B4', fontSize: '25px', fontWeight: 'bold' }}>At Life++</span>, we are dedicated to enhancing the lives of individuals by providing a comprehensive and holistic approach to wellness.
                Our mission is to empower you to unlock your full potential and achieve a balanced and fulfilling life. <br /><br />

                <span style={{ color: '#705FBE', fontSize: '25px', fontWeight: 'bold' }}>We</span> understand that achieving and maintaining well-being is a journey, and we are here to guide you every step of the way. With a team of passionate experts in physical and mental health,
                we have carefully curated a wide range of resources, from personalized workouts to engaging group fitness sessions and enriching content.<br /><br />

                <span style={{ color: '#FF64B4', fontSize: '25px', fontWeight: 'bold' }}>Our vision </span>is to make adopting a healthier lifestyle not just attainable but also enjoyable. We believe that lasting health benefits are achieved through a combination of physical activities and mental exercises that cater to your unique needs and preferences.
                Our immersive and engaging platform is designed to inspire you and help you maintain a life of wellness.<br /><br />

                <span style={{ color: '#705FBE', fontSize: '25px', fontWeight: 'bold' }}>With Life++</span>, you can explore a world of possibilities and uncover your true potential. We invite you to join us on this journey towards a more vibrant, fulfilled, and healthier you.
                Discover the Life++ difference and start your transformative wellness journey today.
              </p>
            </div>

            <div className="teamcon">
              <div className='team'>
                <h2>Meet the Team</h2>
              </div>
              <div className='gallery'>
                <div className='imgbox'><h3>Jeff Francis D. Conson</h3></div>
                <div className='imgbox'><h3>Kimverly B. Bacalso</h3></div>
                <div className='imgbox'><h3>Daniel Gilbert G. Dela Pena</h3></div>
                <div className='imgbox'><h3>Don Querbin Migrino</h3></div>
              </div>
              <div className="peng"></div>
            </div>

            <div className='foot'>
              <h2>Projects for:</h2><br />
              <p>CSIT321 Application Development<br /><br />
                Technopreneurship<br /><br />
                CSIT340 Industry Elective
              </p>

              <div className='allrights'>
                <h2>All rights reserved 2023</h2>
              </div>
              <div className='astro'></div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default LandingPage;
