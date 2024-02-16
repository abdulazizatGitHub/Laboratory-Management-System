import React from "react"
import '../CSS/Login.css';
import loginImage from '../../Assessts/Images/login.jpeg';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Login = () => {
    const navigation = useNavigate();

    const handleLogin = () => {
        // navigation('/receptionist');
        // navigation('/admin');
        navigation('/phelobotny');
    }
    return (
        <div className="login-main-container">
            <div className="login-image-container">
                <img className="login-image" src={loginImage} />
            </div>
            <div className="login-form-container">
                <div className="login-form">
                    <div className="login-form-text-container">
                        <p className="welcome-text">Welcome Back!</p>
                        <p>Login to continue to Laboratory Management System</p>
                    </div>
                    <div className="login-form-details">
                        <label className="login-form-label">Username</label>
                        <input type="text" name="username" id="username" placeholder="Enter your username" />
                        <label className="login-form-label">Password</label>
                        <input type="text" name="password" id="password" placeholder="Enter your password" />
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