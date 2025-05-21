import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import ForgotPassword from './pages/forgot-password';
import Dashboard from './pages/dashboard';


const App = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/reset-password/*" element={<ForgotPassword />} />
    <Route path="/dashboard/*" element={<Dashboard userRole="therapist" />} />
    <Route path="/admin/*" element={<Dashboard userRole="admin" />} />
  </Routes>
);

export default App;
