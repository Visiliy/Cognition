import React, { useRef, useEffect, useState } from 'react';
import "./UX/SearchBar.css"

const SearchBar = () => {
    const textareaRef = useRef(null);
    const [textareaHeight, setTextareaHeight] = useState('auto');
    const [openOptions, setOpenOptions] = useState(false);

    const openOptionsFunction = () => {
        setOpenOptions(!openOptions);
    }

    useEffect(() => {
        if (textareaRef.current) {
            const viewportMaxHeight = window.innerHeight * 0.25;
            const initialHeight = Math.min(textareaRef.current.scrollHeight, viewportMaxHeight);
            setTextareaHeight(`${initialHeight}px`);
        }
    }, []);

    const handleInput = () => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            const viewportMaxHeight = window.innerHeight * 0.25; // 25vh
            const newHeight = Math.min(textareaRef.current.scrollHeight, viewportMaxHeight);
            textareaRef.current.style.height = `${newHeight}px`;
            setTextareaHeight(`${newHeight}px`);
        }
    };

    return (
        <>
            <div className='search-bar'>
                <div className="search-input-area" style={{ height: textareaHeight, maxHeight: `${window.innerHeight * 0.25}px` }}>
                    <textarea
                        ref={textareaRef}
                        placeholder='Find anything you want'
                        className="search-bar-textarea"
                        onInput={handleInput}
                    />
                    <button className='search-button'>➤</button>
                </div>
                <div className='search-control-panel'>
                    <button className='search-options' onClick={openOptionsFunction}>{openOptions ? "x" : "+"}</button>
                    <button className="search-options-rules">settings</button>
                </div>
                {
                    openOptions && (
                        <div
                            className='open-options-block'
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
        </>
        
    )
}

export default SearchBar;