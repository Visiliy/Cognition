
import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Authorization from './Authorization'; // Import Authorization component
import { useAuth } from '../context/AuthContext';
import './SearchPage.css';


function SearchPage() {
  const [showAuthModal, setShowAuthModal] = useState(false); // State for auth modal
  const textareaRef = useRef(null);
  const [textareaHeight, setTextareaHeight] = useState('auto');
  const [openOptions, setOpenOptions] = useState(false);
  const navigate = useNavigate();
  const { currentUser, login, handleUserButtonClick } = useAuth();

    const openOptionsFunction = () => {
        setOpenOptions(!openOptions);
    }

  const handleAuthButtonClick = () => { // Handler to toggle auth modal
    setShowAuthModal(prev => !prev);
  };

  const handleCloseAuthModal = () => { // Handler to close auth modal
    setShowAuthModal(false);
  };

  const handleLoginSuccess = (userName, token) => {
    login(userName, token);
    setShowAuthModal(false);
  };

  useEffect(() => {
      if (textareaRef.current) {
          const viewportMaxHeight = window.innerHeight * 0.20;
          const initialHeight = Math.min(textareaRef.current.scrollHeight, viewportMaxHeight);
          setTextareaHeight(`${initialHeight}px`);
      }
  }, []);

  const handleInput = () => {
      if (textareaRef.current) {
          textareaRef.current.style.height = 'auto';
          const viewportMaxHeight = window.innerHeight * 0.20; // 20vh
          const newHeight = Math.min(textareaRef.current.scrollHeight, viewportMaxHeight);
          textareaRef.current.style.height = `${newHeight}px`;
          setTextareaHeight(`${newHeight}px`);
      }
  };

  return (
    <div className="search-page">
        <div className='search-bar search-options1'>
            <div className="search-input-area" style={{ height: textareaHeight, maxHeight: `${window.innerHeight * 0.20}px` }}>
                <textarea
                    ref={textareaRef}
                    placeholder='Find anything you want'
                    className="input-with-search"
                    onInput={handleInput}
                    style={{ height: textareaHeight }}
                />
                <button className='search-button btn1'>➤</button>
            </div>
            <div className='search-control-panel'>
                <button className='search-options new-color' onClick={openOptionsFunction}>{openOptions ? "x" : "+"}</button>
                <button className="search-options-rules new-color">settings</button>
            </div>
            {
                openOptions && (
                    <div
                        className='open-options-block-in-serach'
                    >
                        <div className='open-options-window'>
                            <li className='li-options'><div className='option'>Upload a file</div></li>
                            <li className='li-options'><div className='option'>Deep thinking</div></li>
                            <li className='li-options'><div className='option'>Multi-agent mode</div></li>
                        </div>
                    </div>
                )
            }
        </div>
        {currentUser ? (
          <button className='enter-button-page' onClick={handleUserButtonClick}>{currentUser}</button>
        ) : (
          <button className='enter-button-page' onClick={handleAuthButtonClick}>Enter</button>
        )}
        {showAuthModal && <Authorization onClose={handleCloseAuthModal} onLoginSuccess={handleLoginSuccess} className='authorization-active-on-main' />} {/* Render Authorization modal with class */}
    </div>
  );
}


export default SearchPage;
