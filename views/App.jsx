import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import ForgotPassword from './pages/forgot-password';

const App = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/reset-password/*" element={<ForgotPassword />} />
  </Routes>
);

export default App;
