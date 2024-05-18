import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home.js';
import Blog from './pages/Blog.js';
import Login from './pages/Login.js';
import PostNew from './pages/PostNew.js';
import Category from './pages/Category.js';
import CustomNavBar from './sharedComponents/CustomNavBar.js';
import React, { useState } from 'react';
import { useAuthContext } from './hooks/useAuthContext.js';

function App() {
  const { admin } = useAuthContext();

  return (
    <Router>
        <CustomNavBar />
        <div className='d-flex justify-content-center align-items-center'>
          <Routes> 
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            {admin && (
              <Route path='/postNewBlog' element={<PostNew />} />
            )}
            <Route path="/:blogTitle" element={<Blog />} /> 
            <Route path="/categories/beginner" element={<Category category={'Beginner'} />} />
            <Route path="/categories/intermediate" element={<Category category={'Intermediate'} />} />
            <Route path="/categories/advanced" element={<Category category={'Advanced'} />} />
            <Route path="*" element={<Navigate to="/home" />} />

          </Routes>
        </div>
    </Router>
  );
}

export default App;