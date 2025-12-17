import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.jpg';
import Authorization from './Authorization';
import { useAuth } from '../context/AuthContext';
import './ProPage.css';

const ProPage = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { currentUser, login, handleUserButtonClick } = useAuth();

  useEffect(() => {
    const userName = localStorage.getItem('user_name');
    const userEmail = localStorage.getItem('user_email');
    const accessToken = localStorage.getItem('access_token');
    if ((userName || userEmail) && accessToken) {
      login(userName || userEmail, accessToken);
    }
  }, []);

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

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = () => {
    console.log("Searching for:", searchQuery);
    navigate('/search-pro', { state: { searchQuery } });
  };

  const textareaRef = useRef(null);
  const [textareaHeight, setTextareaHeight] = useState('auto');
  const maxHeight = window.innerHeight * 0.20;

  useEffect(() => {
    if (textareaRef.current) {
      const initialHeight = Math.min(textareaRef.current.scrollHeight, maxHeight);
      setTextareaHeight(`${initialHeight}px`);
    }
  }, [maxHeight]);

  const handleInput = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const newHeight = Math.min(textareaRef.current.scrollHeight, maxHeight);
      textareaRef.current.style.height = `${newHeight}px`;
      setTextareaHeight(`${newHeight}px`);
    }
  };

  return (
    <div className="pro-page">
      <div className="pro-header">
        <div className='logo-section'>
          <img src={logo} className='logo' alt='Cognition logo' />
          <span className='app-title'>Cognition PRO</span>
        </div>
        {currentUser ? (
          <button className="enter-button-pro" onClick={handleUserButtonClick}>{currentUser}</button>
        ) : (
          <button className="enter-button-pro" onClick={handleAuthButtonClick}>Enter</button>
        )}
      </div>

      {!showAuthModal && (
        <div className="pro-search-bar-container">
          <div className="pro-search-input-wrapper">
            <textarea
              rows="1"
              className="pro-search-input"
              placeholder="Find whatever you want"
              value={searchQuery}
              onChange={handleSearchInputChange}
              onInput={handleInput}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSearchSubmit();
                } else if (e.key === 'Enter' && e.shiftKey) {

                }
              }}
              ref={textareaRef}
              style={{ height: textareaHeight, maxHeight: `${maxHeight}px` }}
            ></textarea>
            <button className="pro-search-button" onClick={handleSearchSubmit}>➤</button>
          </div>
        </div>
      )}

      {showAuthModal && <Authorization onClose={handleCloseAuthModal} onLoginSuccess={handleLoginSuccess} />}
    </div>
  );
};

export default ProPage;
