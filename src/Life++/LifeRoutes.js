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
import { AuthProvider } from './AuthContext';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'



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
        <Route path="/forgot-password" element={<Forgot/>}/>
        <Route path="/index/change-pass" element={<Change/>}/>
      </Routes>
    </BrowserRouter>
    </AuthProvider>
    </LocalizationProvider>
  );
}

export default LifeRoutes;
