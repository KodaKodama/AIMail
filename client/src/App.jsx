import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import LoginRegisterForm from './components/LoginRegisterForm';
import AboutPage from './components/AboutPage';
import Preferences from './components/Preferences';
import SubtopicPage from './components/SubtopicPage';

const App = () => {
  return (
    <Router>
      <Navbar /> {/* Global Navbar */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/preferences" element={<Preferences />} /> 
        <Route path="/subtopics/:subtopic" element={<SubtopicPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<LoginRegisterForm />} />
      </Routes>
    </Router>
  );
};

export default App;
