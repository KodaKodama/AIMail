import React, { useState } from 'react';
// const API_URL = process.env.API_URL;
import '../css/LoginRegisterForm.css';
import { useNavigate } from "react-router-dom";
import axios from 'axios';


const LoginRegisterForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [message, setMessage] = useState('');

  const navigate   = useNavigate();
  // Function to validate password with specified requirements
  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const handlePasswordChange = (e) => {
    const inputPassword = e.target.value;
    setPassword(inputPassword);

    // Check if password meets the criteria
    if (!validatePassword(inputPassword)) {
      setPasswordError('Password must be at least 8 characters long, include one uppercase, one lowercase letter, one number, and one special character.');
    } else {
      setPasswordError('');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/user/login`, {
        email,
        password,
      }, { withCredentials: true });
      // If login is successful
      if (response.status === 200) {
        console.log('Login successful:', response.data);
        setMessage('Login successful!');
        const { token } = response.data;
        localStorage.setItem('token', token);
    }

       // Redirect to preferences page after login
       navigate("/preferences");
    } catch (error) {
      if (error.response) {
        // Server responded with a status other than 200 range
        console.error('Login error:', error.response.data);
        setMessage(`Login failed: ${error.response.data.message || 'Invalid credentials'}`);
    } else if (error.request) {
        // Request was made but no response was received
        console.error('No response from server:', error.request);
        setMessage('No response from server. Please try again.');
    } else {
        // Something else happened while setting up the request
        console.error('Error setting up login request:', error.message);
        setMessage('An unexpected error occurred. Please try again.');
    }
}
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    const userData = {
      name: name,
      email: email,
      password: password,
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/user/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData),
        credentials: 'include',
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Signup successful! You can now log in.');
        console.log('Signup successful:', data);
        // Switch to login form after successful signup
        setIsLogin(true); // This will switch to the login form
      } else {
        // Update the message with error details
        setMessage(`Signup failed: ${data.msg || 'An error occurred'}`);
        console.error('Signup error:', data);
      }

    } catch (error) {
      setMessage('Signup request failed. Please try again.');
      console.error('Signup request failed:', error);
    }
  };

  return (
    <div className="form-container">
      <div className={`form-box-container ${isLogin ? '' : 'flip-mode'}`}>
        {/* Login Form */}
        <div className="form-box login">
          <h2>Sign In</h2>
          <form onSubmit={handleLogin}>
            <div className="input-box">
              <i className="fas fa-envelope icon"></i>
              <input type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required />
            </div>
            <div className="input-box">
              <i className="fas fa-lock icon"></i>
              <input
                type="password"
                placeholder="Password"
                required
                onChange={handlePasswordChange}
                value={password}
                className={passwordError ? 'error' : ''}
              />
            </div>
            <button type="submit" className="submit-btn">Sign In</button>
          </form>
          {message && <p>{message}</p>}
          <p>
            Don't have an account?
            <span onClick={() => setIsLogin(false)} className="switch-text"> Sign Up</span>
          </p>
        </div>

        {/* Register Form */}
        <div className="form-box register">
          <h2>Sign Up</h2>
          <form onSubmit={handleSignup}>
            <div className="input-box">
              <i className="fas fa-user icon"></i>
              <input type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required />
            </div>
            <div className="input-box">
              <i className="fas fa-envelope icon"></i>
              <input type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required />
            </div>

            <div className="input-box">
              <i className="fas fa-lock icon"></i>
              <input
                type="password"
                placeholder="Password"
                required
                onChange={handlePasswordChange}
                value={password}
                className={passwordError ? 'error' : ''}
              />
            </div>
            {passwordError && <p className="error-text">{passwordError}</p>}
            <button type="submit" className="submit-btn">Sign Up</button>
          </form>
          {message && <p>{message}</p>}
          <p>
            Already have an account?
            <span onClick={() => setIsLogin(true)} className="switch-text"> Sign In</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginRegisterForm;
