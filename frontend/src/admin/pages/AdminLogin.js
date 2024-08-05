import React, { useState } from "react";
import '../css/AdminLogin.css';
import loginImage from '../../Assessts/Images/login.jpeg';
import { Link, useNavigate } from "react-router-dom";
import ReactLoading from 'react-loading';
import { adminLogin } from "../../Services/API";

const AdminLogin = () => {
    const navigation = useNavigate();
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await adminLogin(username, password);
            const { token, admin } = response.data;
            console.log('The admin login response: ', admin);
            if(response.data.message === "Login successful") {
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(admin));
                localStorage.setItem('role', admin.role);
                navigation('/admin');
                console.log("the session user is: ", JSON.parse(localStorage.getItem('user')));
                console.log('The session token is: ', localStorage.getItem('token'));
            } else {
                setError('Invalid username or password');
            }
        } catch (error) {
            console.error('Login failed:', error);
            setError('Invalid username or password');
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <div className="admin-login-container">
            {loading && (
                <div className="admin-loader-container">
                    <ReactLoading type={"bars"} color={"#03fc4e"} height={100} width={100} />
                </div>
            )}
            <div className="admin-image-container">
                <img className="admin-log-image" src={loginImage} alt="AdminLogin" />
            </div>
            <div className="admin-login-form-container">
                <div className="admin-login-form-main">
                    <div className="admin-login-headings-container">
                        <p className="admin-welcome-heading">Welcome Back!</p>
                        <p>Login to continue to Admin Portal</p>
                    </div>
                    <div className="admin-login-form-input-container">
                        <label>Username</label>
                        <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Enter your username"
                            />
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                        />
                        {error && <p style={{color: 'red'}} className="error-message">{error}</p>}
                        <Link to='/Forgotpassword' className="admin-forgotpass-link">Forgot password?</Link>
                    </div>
                    <div className="admin-login-form-btn-container">
                        <button className="admin-login-form-btn" onClick={handleLogin}>Login</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
