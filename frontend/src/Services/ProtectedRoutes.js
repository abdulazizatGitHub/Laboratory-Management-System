import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoutes = () => {
    const token = localStorage.getItem('token'); // Assuming you're storing your token in localStorage

    return (
        token ? <Outlet /> : <Navigate to="/" />
    );
};

export default PrivateRoutes;
