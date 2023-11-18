import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ForumIndex from './ForumIndex';
import ForumLogin from './ForumLogIn';
import ForumCreateAccount from './ForumCreateAccount';
import About from './about';
import ForumPage from './ForumPage';
import Forum from './Forum';
import Login from '../NotesApp/Login';
import Create from '../NotesApp/Create';

function ForumMain() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ForumIndex />} />
        <Route path="/forumpage/:username" component={ForumPage} />
        <Route path="/about-Me" element={<About />} />
        <Route path="/forum-login" element={<ForumLogin />} />
        <Route path="/forum-createaccount" element={<ForumCreateAccount/>} />
        <Route path="/forum" element={<Forum/>} />
        <Route path="/log-in" element={<Login/>} />
        <Route path="/create" element={<Create/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default ForumMain;
