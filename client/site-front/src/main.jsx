import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import HomePage from './components/HomePage';
import LoginRegisterForm from './components/LoginRegisterForm';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HomePage />
  </React.StrictMode>,
    <React.StrictMode>
    <LoginRegisterForm />
  </React.StrictMode>,
);
