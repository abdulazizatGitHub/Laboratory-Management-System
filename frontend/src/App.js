import React from 'react';
import "./App.css"
import { Routes, Route } from 'react-router-dom';
import Login from './receptionist/pages/Login';
import Main from './receptionist/pages/Main';
import AdminMain from './admin/pages/AdminMain';
import PhlebotomyMain from './phelobotony/pages/PhlebotomyMain';
import PrivateRoutes from './Services/ProtectedRoutes';


function App() {
  return (
    <div className="App">
      <Routes>
        {/* Public Route: Login */}
        <Route path="/" element={<Login />} />

        {/* Protected Routes: Main, AdminMain, PhlebotomyMain */}
       <Route element={<PrivateRoutes />}>
          <Route path="/receptionist/*" element={<Main />} />
          <Route path="/admin/*" element={<AdminMain />} />
          <Route path="/phelobotny/*" element={<PhlebotomyMain />} />
          </Route>
      </Routes>
    </div>
  );
}

export default App;
