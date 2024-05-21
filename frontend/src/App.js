import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import EditBlog from './pages/EditBlog.js'
import Article from './pages/Article.js';
import Login from './pages/Login.js';
import PostNew from './pages/PostNew.js';
import Articles from './pages/Articles.js';
import Search from './pages/Search.js';
import CustomNavBar from './sharedComponents/CustomNavBar.js';
import React, { useState } from 'react';
import { useAuthContext } from './hooks/useAuthContext.js';
import Footer from './sharedComponents/Footer.js';

function App() {
  const { admin } = useAuthContext();

  return (
    <Router>
        <div className="d-flex flex-column min-vh-100 justify-content-between">
        <CustomNavBar />
          <Routes> 
            <Route path="/login" element={<Login />} />
            {admin && (
              <>
                <Route path='/postNewBlog' element={<PostNew />} />
                <Route path='/editBlog/:blogTitle' element={<EditBlog />} />
              </>
            )}
            <Route path="/:articleTitle" element={<Article />} /> 
            <Route path="/articles" element={<Articles />} />
            <Route path="/search/:searchText" element={<Search />} />
            <Route path="*" element={<Navigate to="/articles" />} />
          </Routes>
        <Footer />
        </div>
    </Router>
  );
}

export default App;