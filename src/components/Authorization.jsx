import "./UX/Authorization.css"
import authorization from '../assets/authorization.jpeg';
import { useState, useEffect, useContext } from 'react';
import { useAuth } from '../context/AuthContext';

const Authorization = ({ className, onClose, onLoginSuccess }) => {
    const welcomeText = "Благодарим вас за то, что выбрали Cognition, поиск, основанный на доверии. Здесь у каждой найденной информации есть свой источник, и каждый ответ можно проверить. Мы боремся с искажениями и предвзятостью, чтобы вы получали не просто ссылки, а четкую и достоверную картину.";
    const [displayedText, setDisplayedText] = useState('');
    const [showButtons, setShowButtons] = useState(false);
    const [showLoginForm, setShowLoginForm] = useState(false);
    const [showRegistrationForm, setShowRegistrationForm] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const { login } = useAuth();

    useEffect(() => {
        let i = 0;
        const typingInterval = setInterval(() => {
            if (i < welcomeText.length) {
                setDisplayedText(prev => prev + welcomeText.charAt(i));
                i++;
            } else {
                clearInterval(typingInterval);
                setTimeout(() => setShowButtons(true), 500);
            }
        }, 50);

        return () => clearInterval(typingInterval);
    }, []);

    const handleRegistrationClick = () => {
        setShowButtons(false);
        setShowRegistrationForm(true);
        setMessage('');
        setName('');
        setEmail('');
        setPassword('');
    };

    const handleLoginClick = () => {
        setShowButtons(false);
        setShowLoginForm(true);
        setMessage('');
        setName('');
        setEmail('');
        setPassword('');
    };

    const switchToRegistration = () => {
        setShowLoginForm(false);
        setShowRegistrationForm(true);
        setMessage('');
        setName('');
        setEmail('');
        setPassword('');
    };

    const switchToLogin = () => {
        setShowRegistrationForm(false);
        setShowLoginForm(true);
        setMessage('');
        setName('');
        setEmail('');
        setPassword('');
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setMessage('');
        try {
            const response = await fetch('http://127.0.0.1:5070/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            });
            const data = await response.json();
            if (response.ok) {
                // После успешной регистрации автоматически логиним пользователя
                try {
                    const loginResponse = await fetch('http://127.0.0.1:5070/login', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ email, password }),
                    });
                    const loginData = await loginResponse.json();
                    if (loginResponse.ok) {
                        localStorage.setItem('access_token', loginData.access_token);
                        localStorage.setItem('user_email', loginData.user_email);
                        localStorage.setItem('user_name', loginData.user_name || name);
                            // Используем функцию login из AuthContext
                            login(loginData.user_name || name, loginData.access_token);
                            // Очищаем поля формы
                            setName('');
                            setEmail('');
                            setPassword('');
                            setMessage('');
                            // Закрываем форму и обновляем состояние
                            onLoginSuccess(loginData.user_name || name, loginData.access_token);
                            onClose();
                    } else {
                        setMessage(loginData.message || 'Registration successful, but login failed. Please log in.');
                        setShowRegistrationForm(false);
                        setShowLoginForm(true);
                        setName('');
                        setEmail('');
                        setPassword('');
                    }
                } catch (loginError) {
                    setMessage('Registration successful, but login failed. Please log in.');
                    setShowRegistrationForm(false);
                    setShowLoginForm(true);
                    setName('');
                    setEmail('');
                    setPassword('');
                }
            } else {
                setMessage(data.message || 'Registration failed. Please try again.');
            }
        } catch (error) {
            setMessage('Network error. Please try again.');
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setMessage('');
        try {
            const response = await fetch('http://127.0.0.1:5070/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('access_token', data.access_token);
                localStorage.setItem('user_email', data.user_email);
                localStorage.setItem('user_name', data.user_name || data.user_email);
                // Используем функцию login из AuthContext
                login(data.user_name || data.user_email, data.access_token);
                // Очищаем поля формы
                setEmail('');
                setPassword('');
                setMessage('');
                // Закрываем форму и обновляем состояние
                onLoginSuccess(data.user_name || data.user_email, data.access_token);
                onClose();
            } else {
                setMessage(data.message || 'Invalid email or password. Please try again.');
            }
        } catch (error) {
            setMessage('Network error. Please try again.');
        }
    };

    return (
        <div className={`authorization ${className || ''}`}>
            <img src={authorization} className="authorization-img"/>
            {!showLoginForm && !showRegistrationForm && (
                <div className="welcome-message">
                    {displayedText}
                </div>
            )}

            {showButtons && (
                <div className="auth-buttons">
                    <button onClick={handleRegistrationClick}>Registration</button>
                    <button onClick={handleLoginClick}>Login</button>
                </div>
            )}

            {(showRegistrationForm || showLoginForm) && message && (
                <div className="auth-message">{message}</div>
            )}

            {showRegistrationForm && (
                <div className="auth-form">
                    <h2>Registration</h2>
                    <form onSubmit={handleRegister}>
                        <input 
                            type="text" 
                            placeholder="Имя" 
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
                            required 
                        />
                        <input 
                            type="email" 
                            placeholder="Email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                        />
                        <input 
                            type="password" 
                            placeholder="Password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                        />
                        <button type="submit">Register</button>
                    </form>
                    <p>Already have an account? <span className="switch-form-link" onClick={switchToLogin}>Login</span></p>
                </div>
            )}

            {showLoginForm && (
                <div className="auth-form">
                    <h2>Login</h2>
                    <form onSubmit={handleLogin}>
                        <input 
                            type="email" 
                            placeholder="Email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                        />
                        <input 
                            type="password" 
                            placeholder="Password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                        />
                        <button type="submit">Log In</button>
                    </form>
                    <p>Don't have an account? <span className="switch-form-link" onClick={switchToRegistration}>Register</span></p>
                </div>
            )}
        </div>
    );
}

export default Authorization;