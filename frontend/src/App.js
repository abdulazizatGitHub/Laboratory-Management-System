import React from 'react';
import "./App.css"
import { Routes, Route } from 'react-router-dom';
import Login from './receptionist/pages/Login';
import Main from './receptionist/pages/Main';
import AdminMain from './admin/pages/AdminMain';
import PhlebotomyMain from './phelobotony/pages/PhlebotomyMain';
import PrivateRoutes from './Services/ProtectedRoutes';
import ForgotPassword from './receptionist/pages/ForgotPassword';

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Public Route: Login */}
        <Route path="/" element={<Login />} />

        {/* Protected Routes */}
        <Route element={<PrivateRoutes />}>
          <Route path="/receptionist/*" element={<Main />} />
          <Route path="/admin/*" element={<AdminMain />} />
          <Route path="/phelobotny/*" element={<PhlebotomyMain />} />
        </Route>

        {/* Forgot Password Route */}
        <Route path='/Forgotpassword' element={<ForgotPassword />} />
      </Routes>
    </div>
  );
}

export default App;
