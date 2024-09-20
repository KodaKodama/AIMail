// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'; 
import HomePage from './components/HomePage';
import LoginRegisterForm from './components/LoginRegisterForm';
import AboutPage from './components/AboutPage';

const App = () => {
  return (
    <Router>
      <Navbar /> {/* Global Navbar */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<LoginRegisterForm />} />
        <Route path="/signup" element={<LoginRegisterForm />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;
