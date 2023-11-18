import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


function mainRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ForumIndex />} />
        <Route path="/forum-page" element={<ForumPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default mainRoutes;
