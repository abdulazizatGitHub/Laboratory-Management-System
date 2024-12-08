import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const PrivateRoutes = () => {
    const location = useLocation();
    const token = localStorage.getItem('token');
    // console.log('the session token in protected routes is:', localStorage.getItem('token'));
    const user = JSON.parse(localStorage.getItem('user'));

    // Redirect to login if token or user data is not available
    if (!token || !user) {
        // If user is not logged in or user data is not available, redirect to login
        return <Navigate to="/" />;
    }

    const allowedRoutes = {
        Admin: ['/admin'],
        Receptionist: ['/receptionist'],
        Phlebotomy: ['/phelobotny']
    };

    // Check if the current route matches the allowed routes for the user's role
    const isRouteAllowed = allowedRoutes[user.role].some(route => location.pathname.startsWith(route));

    if (!isRouteAllowed) {
        // Clear session data and redirect to login if route is not allowed
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('role');
        return <Navigate to="/" />;
    }

    return <Outlet />;
};

export default PrivateRoutes;
