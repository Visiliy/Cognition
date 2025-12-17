import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Authorization from './Authorization';
import { useAuth } from '../context/AuthContext';
import './SearchPagePro.css';

const SearchPagePro = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState(location.state?.searchQuery || '');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { currentUser, login, handleUserButtonClick } = useAuth();

  useEffect(() => {
    const userName = localStorage.getItem('user_name');
    const userEmail = localStorage.getItem('user_email');
    const accessToken = localStorage.getItem('access_token');
    if ((userName || userEmail) && accessToken) {
      login(userName || userEmail, accessToken);
    }
  }, []);

  const textareaRef = useRef(null);
  const maxHeight = window.innerHeight * 0.20;

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, maxHeight) + 'px';
    }
  }, [searchQuery, maxHeight]);

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = () => {
    console.log("Searching for:", searchQuery);

  };

  const handleAuthButtonClick = () => {
    setShowAuthModal(prev => !prev);
  };

  const handleCloseAuthModal = () => {
    setShowAuthModal(false);
  };

  const handleLoginSuccess = (userName, token) => {
    login(userName, token);
    setShowAuthModal(false);
  };

  return (
    <div className="search-page-pro">
      <div className="search-page-pro-header">
        {currentUser ? (
          <button className="enter-button-pro" onClick={handleUserButtonClick}>{currentUser}</button>
        ) : (
          <button className="enter-button-pro" onClick={handleAuthButtonClick}>Enter</button>
        )}
      </div>

      <div className="search-bar-pro-container-top-left">
        <div className="search-input-pro-wrapper">
          <textarea
            rows="1"
            className="search-input-pro"
            placeholder="Find whatever you want"
            value={searchQuery}
            onChange={handleSearchInputChange}
            onKeyPress={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSearchSubmit();
              } else if (e.key === 'Enter' && e.shiftKey) {

              }
            }}
            ref={textareaRef}
          ></textarea>
          <button className="search-button-pro" onClick={handleSearchSubmit}>➤</button>
        </div>
      </div>

      {showAuthModal && <Authorization onClose={handleCloseAuthModal} onLoginSuccess={handleLoginSuccess} />}
    </div>
  );
};

export default SearchPagePro;
