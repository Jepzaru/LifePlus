import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landingpage from './landingpage';
import LoginPage from './loginpage';
import SignUp from './signuppage';
import Forgot from './Forgotpass';
import Change from '../LifePages/ChangePass';
import Dash from '../LifePages/Dashboard';
import Course from '../LifePages/Courses';
import Challenges from '../LifePages/Challenges';
import Pricing from '../LifePages/Pricing';
import Coaches from '../LifePages/Coaches';
import Settings from '../LifePages/Settings';
import PhysicalContentPage from '../LifePages/PhysicalContentPage';
import MentalContentPage from '../LifePages/MentalContentPage';
import CDash from "../LifeCoaches/CoachDash";
import CCOurse from "../LifeCoaches/CoachCourse";
import UserProfile from "../LifePages/UserProfileSettings"
import Strength from '../LifePhysicalChallenges/Strength';
import Arms from '../LifePhysicalChallenges/Arms';
import Abs from '../LifePhysicalChallenges/Abs';
import Cardio from '../LifePhysicalChallenges/Cardio';
import Concentration from '../LifeMentalChallenges/Concentration';
import Breathing from '../LifeMentalChallenges/Breathing';
import Math from '../LifeMentalChallenges/Math';
import Memory from '../LifeMentalChallenges/Memory';
import CStrength from '../CoachPhysicalChallenges/Strength';
import CArms from '../CoachPhysicalChallenges/Arms';
import CAbs from '../CoachPhysicalChallenges/Abs';
import CCardio from '../CoachPhysicalChallenges/Cardio';
import CConcentration from '../CoachMentalChallenges/Concentration';
import CBreathing from '../CoachMentalChallenges/Breathing';
import CMath from '../CoachMentalChallenges/Math';
import CMemory from '../CoachMentalChallenges/Memory';
import CoachSettings from '../LifeCoaches/CoachSettings';
import PContCoach from '../LifeCoaches/PContCoach';
import MContCoach from '../LifeCoaches/MContCoach';
import CoachPShop from '../LifeCoaches/CoachPShop';
import { AuthProvider } from './AuthContext';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import CoachChallenges from '../LifeCoaches/CoachChallenges';



function LifeRoutes({ children }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landingpage/>} />
        <Route path="/login-page" element={<LoginPage/>} />
        <Route path="/sign-up" element={<SignUp/>}/>
        <Route path="/index/dashboard" element={<Dash/>}/>
        <Route path="/index/courses" element={<Course/>}/>
        <Route path="/index/challenges" element={<Challenges/>}/>
        <Route path="/index/pricing" element={<Pricing/>}/>
        <Route path="/index/coaches" element={<Coaches/>}/>
        <Route path="/index/settings" element={<Settings/>}/>
        <Route path="/index/physical" element={<PhysicalContentPage/>}/>
        <Route path="/index/mental" element={<MentalContentPage/>}/>
        <Route path="/coach-index/dashboard" element={<CDash/>}/>
        <Route path="/coach-index/courses" element={<CCOurse/>}/>
        <Route path="/index/settings-profile" element={<UserProfile/>}/>
        <Route path="/index/challenges/strength" element={<Strength/>}/>
        <Route path="/index/challenges/arms" element={<Arms/>}/>
        <Route path="/index/challenges/abs" element={<Abs/>}/>
        <Route path="/index/challenges/cardio" element={<Cardio/>}/>
        <Route path="/index/challenges/concentration" element={<Concentration/>}/>
        <Route path="/index/challenges/breathing" element={<Breathing/>}/>
        <Route path="/index/challenges/math" element={<Math/>}/>
        <Route path="/index/challenges/memory" element={<Memory/>}/>
        <Route path="/coach-index/challenges/strength" element={<CStrength/>}/>
        <Route path="/coach-index/challenges/arms" element={<CArms/>}/>
        <Route path="/coach-index/challenges/abs" element={<CAbs/>}/>
        <Route path="/coach-index/challenges/cardio" element={<CCardio/>}/>
        <Route path="/coach-index/challenges/concentration" element={<CConcentration/>}/>
        <Route path="/coach-index/challenges/breathing" element={<CBreathing/>}/>
        <Route path="/coach-index/challenges/math" element={<CMath/>}/>
        <Route path="/coach-index/challenges/memory" element={<CMemory/>}/>
        <Route path="/forgot-password" element={<Forgot/>}/>
        <Route path="/index/change-pass" element={<Change/>}/>
        <Route path="/coach-index/settings" element={<CoachSettings/>}/>
        <Route path="/coach-index/physical" element={<PContCoach/>}/>
        <Route path="/coach-index/mental" element={<MContCoach/>}/>
        <Route path="/coach-index/pointsshop" element={<CoachPShop/>}/>
        <Route path="/coach-index/challenges" element={<CoachChallenges/>}/>
        
      </Routes>
    </BrowserRouter>
    </AuthProvider>
    </LocalizationProvider>
  );
}

export default LifeRoutes;
