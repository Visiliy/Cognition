import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo.jpg';

const UserPage = () => {
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    if (!currentUser) {
        navigate('/');
        return null;
    }

    const handleBackClick = () => {
        navigate('/');
    };

    // Если currentUser существует, мы можем отобразить данные из него
    // Предполагаем, что currentUser имеет структуру { name, email, balance, search_history }
    // Или используем заглушки, если эти данные недоступны напрямую из currentUser

    const userName = currentUser; // currentUser теперь просто строка с именем пользователя
    const userEmail = localStorage.getItem('user_email') || '';
    const userBalance = localStorage.getItem('user_balance') ? parseFloat(localStorage.getItem('user_balance')) : 0.00;
    const userSearchHistory = localStorage.getItem('search_history') ? JSON.parse(localStorage.getItem('search_history')) : [];

    return (
        <div style={{ backgroundColor: 'black', color: 'white', minHeight: '100vh', padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img src={logo} alt="Cognition Logo" style={{ width: '40px', marginRight: '10px' }} />
                    <h1 style={{ margin: 0, fontSize: '24px' }}>Cognition</h1>
                </div>
                <button
                    onClick={handleBackClick}
                    style={{
                        backgroundColor: 'transparent',
                        color: 'white',
                        border: '1px solid white',
                        padding: '8px 15px',
                        borderRadius: '15px',
                        cursor: 'pointer',
                        fontSize: '16px'
                    }}
                >
                    Back
                </button>
            </div>
            <div style={{ textAlign: 'center' }}>
                <h2 style={{ marginBottom: '20px' }}>Welcome, {userName || userEmail}!</h2>
                <p>Balance: ${userBalance.toFixed(2)}</p>
                <h3 style={{ marginTop: '30px', marginBottom: '10px' }}>Search History:</h3>
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                    {userSearchHistory.length > 0 ? (
                        userSearchHistory.map((query, index) => (
                            <li key={index} style={{ marginBottom: '5px' }}>{query}</li>
                        ))
                    ) : (
                        <li>No search history available.</li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default UserPage;
