import React, { useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import logo from './assets/logo.jpg';
import './App.css'
import SearchBar from './components/SearchBar'
import SearchPage from './components/SearchPage';
import Authorization from './components/Authorization';
import AboutPage from './components/AboutPage';
import ProPage from './components/ProPage';
import SearchPagePro from './components/SearchPagePro';
import UserPage from './components/UserPage';

function App() {

  const [openAuthorizationWindow, setOpenAuthorizationWindow] = useState(false);
  const navigate = useNavigate();
  const { currentUser, login } = useAuth();

  const openAuthorization = () => {
    setOpenAuthorizationWindow(!openAuthorizationWindow);
  }

  const handleLoginSuccess = (userName, token) => {
    login(userName, token);
    setOpenAuthorizationWindow(false);
  };

  return (
    <Routes>
      <Route path="/" element={
    <div className='main-container'>
        <div className='header-container'>
            <div className='logo-section'>
                <img src={logo} className='logo' alt='Cognition logo' />
                <span className='app-title'>Cognition</span>
            </div>
            {currentUser ? (
                <button className='enter-button' onClick={() => navigate('/user')}>
                  {currentUser}
                </button>
            ) : (
              <button className='enter-button' onClick={openAuthorization}>Enter</button>
            )}
        </div>
        {
          openAuthorizationWindow ? <Authorization className='authorization-active-on-main' onClose={() => setOpenAuthorizationWindow(false)} onLoginSuccess={handleLoginSuccess}/> : <>
          <div className='search-slogan'>
                Once upon a time, it all started with a search...
            </div>
            <SearchBar />
          </>
        }
        
    </div>
      } />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/pro" element={<ProPage />} />
      <Route path="/search-pro" element={<SearchPagePro />} />
      <Route path="/user" element={<UserPage />} />
    </Routes>
  )
}

export default App
