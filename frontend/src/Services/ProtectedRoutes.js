import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const PrivateRoutes = () => {
    const location = useLocation();
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    
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
        
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('role');
        return <Navigate to="/" />;
    }

    return <Outlet />;
};

export default PrivateRoutes;
