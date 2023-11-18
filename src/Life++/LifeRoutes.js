import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landingpage from './landingpage';
import LoginPage from './loginpage';
import SignUp from './signuppage';
import Dash from '../LifePages/Dashboard';
import Course from '../LifePages/Courses';
import Challenges from '../LifePages/Challenges';
import Pricing from '../LifePages/Pricing';
import Coaches from '../LifePages/Coaches';
import Settings from '../LifePages/Settings';
import PhysicalContentPage from '../LifePages/PhysicalContentPage';
import MentalContentPage from '../LifePages/MentalContentPage';



function LifeRoutes() {
  return (
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
      </Routes>
    </BrowserRouter>
  );
}

export default LifeRoutes;
