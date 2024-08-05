import React, { useEffect, useState } from "react";
import '../CSS/Login.css';
import loginImage from '../../Assessts/Images/login.jpeg';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ReactLoading from 'react-loading'; // Import ReactLoading
import { getPatientDetails, getStaffDetails, login } from '../../Services/API';

const Login = () => {
    const navigation = useNavigate();
    const [usernamePrefix, setUsernamePrefix] = useState("Select");
    const [usernameSuffix, setUsernameSuffix] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false); // State variable for loader

    const handleLogin = async () => {
        setLoading(true); // Activate loader
        try {
            const response = await login(userName, password);
            const { token, user } = response;
            console.log("user and token is ", JSON.stringify(user), " and ", token, user.role);
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('role', user.role);

            switch (user.role) {
                case 'Receptionist':
                    navigation('/receptionist');
                    break;
                case 'Phlebotomy':
                    navigation('/phelobotny');
                    break;
                default:
                    setError('Unknown role');
                    break;
            }
        } catch (error) {
            console.error('Login failed:', error);
            setError('Invalid username or password');
        } finally {
            setLoading(false); // Deactivate loader
        }
    }

    useEffect(() => {
        console.log("data is ", getAllPatient());
    }, [])
    const getAllPatient = async () => {
        return await getStaffDetails();
    }

    return (
        <div className="login-main-container">
            {loading && ( // Display loader if loading state is true
                <div className="loader-container">
                    <ReactLoading type={"bars"} color={"#03fc4e"} height={100} width={100} />
                </div>
            )}
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
                        <input
                                type="text"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                placeholder="Enter your username"
                            />
                        <label className="login-form-label">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                        />
                        {error && <p style={{color: 'red'}} className="error-message">{error}</p>}
                        <Link to='/Forgotpassword' className="forgot-pass">Forgot password?</Link>
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
