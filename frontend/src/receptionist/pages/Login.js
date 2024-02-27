import React, { useEffect, useState } from "react";
import '../CSS/Login.css';
import loginImage from '../../Assessts/Images/login.jpeg';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getPatientDetails, getStaffDetails, login }  from '../../Services/API';

const Login = () => {
    const navigation = useNavigate();
    const [usernamePrefix, setUsernamePrefix] = useState("Select");
    const [usernameSuffix, setUsernameSuffix] = useState("");
    const [registrationNumber, setRegistrationNumber] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async () => {
        const username = `${usernamePrefix}-${usernameSuffix}-${registrationNumber}`;
        console.log("username s ",username);
        try {
            const response = await login(username, password, localStorage.getItem('token'));
            const { token, user } = response; // Extract token and user data from response
            console.log("user and token is ", JSON.stringify(user), " and ",token , user.role)  
            // Store token and user data in local storage
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('role', user.role);
    
            switch (user.role) {
                case 'Receptionist':
                    navigation('/receptionist');
                    break;
                case 'Admin':
                    navigation('/admin');
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
        }
    }

    useEffect(()=>{
        console.log("data is ",getAllPatient());
    },[])
    const getAllPatient=async()=>{
        return await getStaffDetails();
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
                        <div className="login-form-username-container">
                            <select
                                value={usernamePrefix}
                                onChange={(e) => setUsernamePrefix(e.target.value)}
                            >
                                <option value="Select">Select</option>
                                <option value="RE">RE</option>
                                <option value="PH">PH</option>
                                <option value="AD">AD</option>
                            </select>
                            <p>-</p>
                            <input
                                type="text"
                                value={usernameSuffix}
                                onChange={(e) => setUsernameSuffix(e.target.value)}
                            />
                            <p>-</p>
                            <input
                                type="text"
                                value={registrationNumber}
                                onChange={(e) => setRegistrationNumber(e.target.value)}
                            />
                        </div>
                        <label className="login-form-label">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                        />
                        {error && <p className="error-message">{error}</p>}
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