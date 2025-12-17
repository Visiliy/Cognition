import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [accessToken, setAccessToken] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUserName = localStorage.getItem('user_name');
        const storedAccessToken = localStorage.getItem('access_token');
        const storedTimestamp = localStorage.getItem('token_timestamp');

        if (storedUserName && storedAccessToken && storedTimestamp) {
            const twentyFourHours = 30 * 24 * 60 * 60 * 1000; // 30 дней в миллисекундах
            if (Date.now() - parseInt(storedTimestamp) < twentyFourHours) {
                setCurrentUser(storedUserName);
                setAccessToken(storedAccessToken);
            } else {
                // Если токен просрочен, очищаем данные
                logout();
            }
        }
    }, []);

    const login = (userName, token) => {
        localStorage.setItem('user_name', userName);
        localStorage.setItem('access_token', token);
        localStorage.setItem('token_timestamp', Date.now().toString()); // Сохраняем метку времени
        setCurrentUser(userName);
        setAccessToken(token);
    };

    const logout = () => {
        localStorage.removeItem('user_name');
        localStorage.removeItem('access_token');
        setCurrentUser(null);
        setAccessToken(null);
        navigate('/'); // Redirect to home or login page after logout
    };

    const handleUserButtonClick = () => {
        navigate('/user');
    };

    return (
        <AuthContext.Provider value={{ currentUser, accessToken, login, logout, handleUserButtonClick }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
