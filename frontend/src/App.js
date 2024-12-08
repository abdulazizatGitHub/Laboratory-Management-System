import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './receptionist/pages/Login';
import Main from './receptionist/pages/Main';
import AdminMain from './admin/pages/AdminMain';
import PhlebotomyMain from './phelobotony/pages/PhlebotomyMain';
import PrivateRoutes from './Services/ProtectedRoutes';
import ForgotPassword from './receptionist/pages/ForgotPassword';
// import AdminLogin from './admin/pages/AdminLogin';

// const TIMEOUT_DURATION = 10 * 60 * 1000; // 10 minutes in milliseconds

// const useSessionTimeout = () => {
//     const navigate = useNavigate();
//     const [timeoutId, setTimeoutId] = useState(null);

//     const resetTimeout = () => {
//         if (timeoutId) {
//             clearTimeout(timeoutId);
//         }
//         const id = setTimeout(() => {
//             // Clear user session and redirect to login
//             localStorage.removeItem('token');
//             localStorage.removeItem('user');
//             localStorage.removeItem('role');
//             navigate('/');
//         }, TIMEOUT_DURATION);
//         setTimeoutId(id);
//     };

//     useEffect(() => {
//         // Set up event listeners for user activity
//         window.addEventListener('mousemove', resetTimeout);
//         window.addEventListener('keydown', resetTimeout);
//         window.addEventListener('click', resetTimeout);
        
//         // Initial timeout setup
//         resetTimeout();

//         return () => {
//             window.removeEventListener('mousemove', resetTimeout);
//             window.removeEventListener('keydown', resetTimeout);
//             window.removeEventListener('click', resetTimeout);
//             clearTimeout(timeoutId);
//         };
//     }, [navigate]);

//     return;
// };

function App() {
    // useSessionTimeout();

    return (
        <div className="App">
      <Routes>
        {/* Public Route: Login */}
        <Route path="/" element={<Login />} />
        {/* Protected Routes */}
        <Route element={<PrivateRoutes />}>
          <Route path="/receptionist/*" element={<Main />} />
          <Route path="/admin/*" element={<AdminMain />} />
          {/* <Route path="/phelobotny/*" element={<PhlebotomyMain />} /> */}
        </Route>
        {/* Forgot Password Route */}
        <Route path='/Forgotpassword' element={<ForgotPassword />} />
      </Routes>
    </div>
    );
}

export default App;
