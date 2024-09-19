// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import LoginRegisterForm from './components/LoginRegisterForm';
import Navbar from './components/Navbar';  // Assuming you've created this component

const App = () => {
  return (
    <Router>
      <Navbar /> {/* Global Navbar */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginRegisterForm />} />
        <Route path="/signup" element={<LoginRegisterForm />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;
