import React, { useState } from 'react';
import axios from 'axios';
import '../CSS/Forgotpassword.css'; // Import the CSS file for styling

const ForgotPassword = () => {
    const [username, setUsername] = useState('');
    const [password, setNewPassword] = useState('');
    const [resetCode, setResetCode] = useState('');
    const [message, setMessage] = useState('');

    const URl='https://backend-lab-981eb22ce767.herokuapp.com';

    const handleSendResetCode = async () => {
        try {
            await axios.post(`${URl}/Forgotpassword`, { username });
            setMessage('Reset code sent successfully');
        } catch (error) {
            console.error('Error:', error);
            setMessage('Failed to send reset code');
        }
    };

    const handleResetPassword = async () => {
        try {
            if (!resetCode) {
                setMessage('Reset code is required');
                return;
            }

            if (!password) {
                setMessage('New password is required');
                return;
            }

            await axios.post(`${URl}/resetPassword`, { username, resetCode, newPassword: password });
            setMessage('Password updated successfully');
        } catch (error) {
            console.error('Error:', error);
            setMessage('Failed to update password');
        }
    };

    return (
        <div className="container-forgot-password">
            <h2 className="heading-forgot-password">Forgot Password</h2>
            <input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="input-forgot-password"
            />
            <button onClick={handleSendResetCode} className="login-button-forgot-password">Send Reset Code</button>
            <input
                type="text"
                placeholder="Enter reset code"
                value={resetCode}
                onChange={(e) => setResetCode(e.target.value)}
                className="input-forgot-password"
            />
            <input
                type="password"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setNewPassword(e.target.value)}
                className="input-forgot-password"
            />
            <button onClick={handleResetPassword} className="login-button-forgot-password">Reset Password</button>
            <p>{message}</p>
        </div>
    );
};

export default ForgotPassword;
