import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import App from './App';  // Assuming you have an App component to handle routes

// Create the root and render the App component
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
