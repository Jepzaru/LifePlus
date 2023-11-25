import React, { useState } from 'react';
import '../LifeCss/Challenges.css';
import Sidenavbar from '../Life++/sidenavbar';
import Header from '../Life++/Header';
import { useLocation } from 'react-router-dom';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { IoExtensionPuzzle } from 'react-icons/io5';


function Arms() {
  const location = useLocation();

  const initialChallenges = [
    { progress: 0, text: 'Start Challenge', duration: 30 },
    { progress: 0, text: 'Start Challenge', duration: 30 },
    { progress: 0, text: 'Start Challenge', duration: 30 },
    { progress: 0, text: 'Start Challenge', duration: 30 },
    { progress: 0, text: 'Start Challenge', duration: 30 },
    { progress: 0, text: 'Start Challenge', duration: 30 },
    { progress: 0, text: 'Start Challenge', duration: 30 },
    { progress: 0, text: 'Start Challenge', duration: 30 },
    { progress: 0, text: 'Start Challenge', duration: 30 },
  ];

  const [challenge1, setChallenge1] = useState({ ...initialChallenges[0] });
  const [challenge2, setChallenge2] = useState({ ...initialChallenges[1] });
  const [challenge3, setChallenge3] = useState({ ...initialChallenges[2] });
  const [challenge4, setChallenge4] = useState({ ...initialChallenges[3] });
  const [challenge5, setChallenge5] = useState({ ...initialChallenges[4] });
  const [challenge6, setChallenge6] = useState({ ...initialChallenges[5] });
  const [challenge7, setChallenge7] = useState({ ...initialChallenges[6] });
  const [challenge8, setChallenge8] = useState({ ...initialChallenges[7] });
  const [challenge9, setChallenge9] = useState({ ...initialChallenges[8] });

  // Declare the challengeIntervals state
  const [challengeIntervals, setChallengeIntervals] = useState(Array(9).fill(null));

  const setChallenge = (newState, challengeIndex) => {
    switch (challengeIndex) {
      case 0:
        setChallenge1(newState);
        break;
      case 1:
        setChallenge2(newState);
        break;
      case 2:
        setChallenge3(newState);
        break;
      case 3:
        setChallenge4(newState);
        break;
      case 4:
        setChallenge5(newState);
        break;
      case 5:
        setChallenge6(newState);
        break;
      case 6:
        setChallenge7(newState);
        break;
      case 7:
        setChallenge8(newState);
        break;
      case 8:
        setChallenge9(newState);
        break;
      default:
        break;
    }
  };

  const startChallenge = (exerciseIndex, challengeIndex) => {
    // Clear any existing intervals
    clearInterval(challengeIntervals[challengeIndex]);
  
    // Update the text of the specific challenge
    setChallenge((prevChallenge) => ({ ...prevChallenge, text: 'In Progress' }), challengeIndex);
  
    const interval = setInterval(() => {
      setChallenge(
        (prevChallenge) => ({
          ...prevChallenge,
          progress: prevChallenge.progress + (1 / prevChallenge.duration) * 100,
        }),
        challengeIndex
      );
    }, 1000);
  
    // Update challengeIntervals with the new interval ID
    setChallengeIntervals((prevIntervals) => {
      const newIntervals = [...prevIntervals];
      newIntervals[challengeIndex] = interval;
      return newIntervals;
    });
  
    setTimeout(() => {
      clearInterval(interval);
      setChallenge(
        (prevChallenge) => ({ ...prevChallenge, text: 'Completed', progress: 0 }),
        challengeIndex
      );
    }, initialChallenges[exerciseIndex].duration * 1000);
  };

  const resetChallenges = () => {
    // Clear all existing intervals
    challengeIntervals.forEach((interval) => clearInterval(interval));

    // Reset challenges to the initial state
    setChallenge1({ ...initialChallenges[0] });
    setChallenge2({ ...initialChallenges[1] });
    setChallenge3({ ...initialChallenges[2] });
    setChallenge4({ ...initialChallenges[3] });
    setChallenge5({ ...initialChallenges[4] });
    setChallenge6({ ...initialChallenges[5] });
    setChallenge7({ ...initialChallenges[6] });
    setChallenge8({ ...initialChallenges[7] });
    setChallenge9({ ...initialChallenges[8] });

    // Reset challengeIntervals to an array of nulls
    setChallengeIntervals(Array(9).fill(null));
  };
  return (
    <div className="appind">
      <Header />
      <Sidenavbar location={location} />
      <div className='cha'>
        <h1><IoExtensionPuzzle style={{ marginRight: '15px', marginBottom: '-5px', color: '#FF64B4' }} />Challenges</h1>
      </div>
      <div className='chal'>
        <h1><IoExtensionPuzzle style={{ marginRight: '15px', marginBottom: '-5px', color: '#FF64B4' }} />Challenges / Arms</h1>
      </div>
      <div className='resetarm'>
      <button className='reset-arm' onClick={resetChallenges}>Reset Challenges</button>
      </div>
     <div className='arms-con'>
      <div className='arms-chal'>
        <div className='arm'>
          <h1>Bicep Curls</h1>
        </div>
        <div className='arm-ins'>
          <p>
          Hold dumbbells or a barbell in your hands.<br/>
          Keep your elbows close to your body <br/>and curl the weights towards your shoulders.
          </p>
          <button className='arms-button1' onClick={() => startChallenge(0, 0)}>
            {challenge1.text}
          </button>
        </div>
        <div className='arm-image1'>

        </div>
        <div className={`circle-bar`}>
      <CircularProgressbar
          value={challenge1.progress}
          text={`${Math.round(challenge1.progress)}%`}
            strokeWidth={15}
            styles={buildStyles({
              textSize: '16px',
              pathColor: '#705FBE',
              textColor: '#FF64B4',
              pathTransitionDuration: 0.5,
              trailTransitionDuration: 0.5,

            })}
          />
          </div>
      </div>
       
      
      <div className='arms-chal'>
      <div className='arm'>
          <h1>Hammer Curls</h1>
        </div>
        <div className='arm-ins'>
          <p>
          Similar to bicep curls, but hold the weights <br/>
          with a neutral grip (palms facing each other).<br/>
          Face down to have better angle.
          </p>
          <button className='arms-button1' onClick={() => startChallenge(1, 1)}>
            {challenge2.text}
          </button>
        </div>
        <div className='arm-image2'>

        </div>
        <div className={`circle-bar1`}>
      <CircularProgressbar
            value={challenge2.progress}
            text={`${Math.round(challenge2.progress)}%`}
            strokeWidth={15}
            styles={buildStyles({
              textSize: '16px',
              pathColor: '#705FBE',
              textColor: '#FF64B4',
              pathTransitionDuration: 0.5,
              trailTransitionDuration: 0.5,

            })}
          />
          </div>
      </div>
       
     
      <div className='arms-chal' >
      <div className='arm'>
          <h1>Tricep Dips</h1>
        </div>
        <div className='arm-ins'>
          <p>
          Use parallel bars or the edge of a sturdy bench.<br/>
          Lower your body by bending your elbows<br/> and then push yourself back up.
          </p>
          <button className='arms-button1' onClick={() => startChallenge(2, 2)}>
            {challenge3.text}
          </button>
        </div>
        <div className='arm-image3'>

        </div>
        <div className={`circle-bar2`}>
      <CircularProgressbar
             value={challenge3.progress}
             text={`${Math.round(challenge3.progress)}%`}
            strokeWidth={15}
            styles={buildStyles({
              textSize: '16px',
              pathColor: '#705FBE',
              textColor: '#FF64B4',
              pathTransitionDuration: 0.5,
              trailTransitionDuration: 0.5,

            })}
          />
          </div>
      </div>
       
       
      <div className='arms-chal'>
      <div className='arm'>
          <h1>Push Ups</h1>
        </div>
        <div className='arm-ins'>
          <p>
          Works the triceps, chest, and shoulders.<br/>
          Keep your body in a straight line and lower<br/>  your chest
           to the ground by bending your elbows.
          </p>
          <button className='arms-button1' onClick={() => startChallenge(3, 3)}>
            {challenge4.text}
          </button>
        </div>
        <div className='arm-image4'>

        </div>
        <div className={`circle-bar4`}>
      <CircularProgressbar
            value={challenge4.progress}
            text={`${Math.round(challenge4.progress)}%`}
            strokeWidth={15}
            styles={buildStyles({
              textSize: '16px',
              pathColor: '#705FBE',
              textColor: '#FF64B4',
              pathTransitionDuration: 0.5,
              trailTransitionDuration: 0.5,

            })}
          />
          </div>
      </div>
      
      
      <div className='arms-chal'>
      <div className='arm'>
          <h1>Skull Crushers</h1>
        </div>
        <div className='arm-ins'>
          <p>
          Lie on a bench and hold a barbell above your<br/>
          forehead.Bend your elbows, lowering the bar<br/> towards your forehead, and then extend your arms.
          </p>
          <button className='arms-button1' onClick={() => startChallenge(4, 4)}>
            {challenge5.text}
          </button>
        </div>
        <div className='arm-image5'>

        </div>
      <div className='circle-bar4'>
      <CircularProgressbar
            value={challenge5.progress}
            text={`${Math.round(challenge5.progress)}%`}
            strokeWidth={15}
            styles={buildStyles({
              textSize: '16px',
              pathColor: '#705FBE',
              textColor: '#FF64B4',
              pathTransitionDuration: 0.5,
              trailTransitionDuration: 0.5,

            })}
          />
          </div>
        </div>
        
        
        <div className='arms-chal'>
        <div className='arm'>
          <h1>Preacher Curls</h1>
        </div>
        <div className='arm-ins'>
          <p>
          Use a preacher bench to isolate the biceps.<br/>
          Curl the weights while your upper arms<br/> are supported by the bench.
          </p>
          <button className='arms-button1' onClick={() => startChallenge(5, 5)}>
            {challenge6.text}
          </button>
        </div>
        <div className='arm-image6'>

        </div>
        <div className='circle-bar5'>
      <CircularProgressbar
            value={challenge6.progress}
            text={`${Math.round(challenge6.progress)}%`}
            strokeWidth={15}
            styles={buildStyles({
              textSize: '16px',
              pathColor: '#705FBE',
              textColor: '#FF64B4',
              pathTransitionDuration: 0.5,
              trailTransitionDuration: 0.5,

            })}
          />
          </div>
        </div>
      
        
        <div className='arms-chal' >
        <div className='arm1'>
          <h1>Concentration Curls</h1>
        </div>
        <div className='arm-ins'>
          <p>
          Sit on a bench with a dumbbell in one hand.<br/>
          Rest your elbow on the inside <br/>of your thigh and curl the weight.<br/>
          make sure to have a warm up doing this.
          </p>
          <button className='arms-button1' onClick={() => startChallenge(6, 6)}>
            {challenge7.text}
          </button>
        </div>
        <div className='arm-image7'>

        </div>
        <div className='circle-bar6'>
      <CircularProgressbar
            value={challenge7.progress}
            text={`${Math.round(challenge7.progress)}%`}
            strokeWidth={15}
            styles={buildStyles({
              textSize: '16px',
              pathColor: '#705FBE',
              textColor: '#FF64B4',
              pathTransitionDuration: 0.5,
              trailTransitionDuration: 0.5,

            })}
          />
          </div>
        </div>
        
        
        <div className='arms-chal'>
        <div className='arm'>
          <h1>Tricep Kickbacks</h1>
        </div>
        <div className='arm-ins'>
          <p>
          Hold a dumbbell in one hand and hinge at the hips.<br/>
          Extend your arm straight behind you, <br/>squeezing the triceps.
          </p>
          <button className='arms-button1' onClick={() => startChallenge(7, 7)}>
            {challenge8.text}
          </button>
        </div>
        <div className='arm-image8'>

        </div>
        <div className='circle-bar7'>
      <CircularProgressbar
            value={challenge8.progress}
            text={`${Math.round(challenge8.progress)}%`}
            strokeWidth={15}
            styles={buildStyles({
              textSize: '16px',
              pathColor: '#705FBE',
              textColor: '#FF64B4',
              pathTransitionDuration: 0.5,
              trailTransitionDuration: 0.5,

            })}
          />
          </div>
        </div>
        
        <div className='arms-chal'>
        <div className='arm'>
          <h1>Reverse Curls</h1>
        </div>
        <div className='arm-ins'>
          <p>
          Hold a barbell with an overhand grip.<br/>
          Curl the weights toward your shoulders, <br/>
          focusing on the muscles on the back of your arms.
          </p>
          <button className='arms-button1' onClick={() => startChallenge(8, 8)}>
            {challenge9.text}
          </button>
        </div>
        <div className='arm-image9'>

        </div>
        <div className='circle-bar8'>
      <CircularProgressbar
            value={challenge9.progress}
            text={`${Math.round(challenge9.progress)}%`}
            strokeWidth={15}
            styles={buildStyles({
              textSize: '16px',
              pathColor: '#705FBE',
              textColor: '#FF64B4',
              pathTransitionDuration: 0.5,
              trailTransitionDuration: 0.5,

            })}
          />
          </div>
        </div>
        
     </div>
   
    </div>
  );
}

export default Arms;