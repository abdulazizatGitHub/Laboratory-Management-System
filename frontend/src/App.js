import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './receptionist/pages/Login';
import Main from './receptionist/pages/Main';
import AdminMain from './admin/pages/AdminMain';
import Dashboard from './receptionist/pages/Dashboard';
import AdminDashboard from './admin/pages/AdminDashboard';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/receptionist/*" element={<Main />} />
        <Route path="/admin/*" element={<AdminMain />} />
      </Routes>
    </div>
  );
}
export default App;
