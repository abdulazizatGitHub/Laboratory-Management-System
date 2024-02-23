import React, { useState } from "react";
import '../CSS/Login.css';
import loginImage from '../../Assessts/Images/login.jpeg';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { login }  from '../../Services/API';

const Login = () => {
    const navigation = useNavigate();
    const [usernamePrefix, setUsernamePrefix] = useState("RE");
    const [usernameSuffix, setUsernameSuffix] = useState("");
    const [registrationNumber, setRegistrationNumber] = useState("001");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async () => {
        const username = `${usernamePrefix}-${usernameSuffix}-${registrationNumber}`;
        try {
            const response = await login(username, password);
            const { token, role } = response; // Extract token from response
    
            // Store token in local storage
            localStorage.setItem('token', token);
    
            switch (role) {
                case 'Receptionist':
                    navigation('/receptionist');
                    break;
                case 'Admin':
                    navigation('/admin');
                    break;
                case 'Phlebotomy':
                    navigation('/phlebotomy');
                    break;
                default:
                    setError('Unknown role');
                    break;
            }
        } catch (error) {
            console.error('Login failed:', error);
            setError('Invalid username or password');
        }
    }
    
    return (
        <div className="login-main-container">
            <div className="login-image-container">
                <img className="login-image" src={loginImage} alt="Login" />
            </div>
            <div className="login-form-container">
                <div className="login-form">
                    <div className="login-form-text-container">
                        <p className="welcome-text">Welcome Back!</p>
                        <p>Login to continue to Laboratory Management System</p>
                    </div>
                    <div className="login-form-details">
                        <label className="login-form-label">Username</label>
                        <div style={{ display: 'flex' }}>
                            <select
                                value={usernamePrefix}
                                onChange={(e) => setUsernamePrefix(e.target.value)}
                            >
                                <option value="RE">RE</option>
                                <option value="PH">PH</option>
                                <option value="AD">AD</option>
                            </select>
                            <input
                                type="text"
                                value={usernameSuffix}
                                onChange={(e) => setUsernameSuffix(e.target.value)}
                                placeholder="Enter your username"
                            />
                        </div>
                        <label className="login-form-label">Registration Number</label>
                        <select
                            value={registrationNumber}
                            onChange={(e) => setRegistrationNumber(e.target.value)}
                        >
                            {[...Array(100).keys()].map((number) => (
                                <option key={number} value={String(number + 1).padStart(3, '0')}>
                                    {String(number + 1).padStart(3, '0')}
                                </option>
                            ))}
                        </select>
                        <label className="login-form-label">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                        />
                        {error && <p className="error-message">{error}</p>}
                        <Link className="forgot-pass">Forgot password?</Link>
                    </div>
                    <div className="login-form-btn-container">
                        <button className="login-form-btn" onClick={handleLogin}>Login</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
