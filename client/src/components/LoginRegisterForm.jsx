import React, { useState } from 'react';
import '../css/LoginRegisterForm.css';
const API_URL = process.env.API_URL;
import axios from 'axios';

const LoginRegisterForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [message, setMessage] = useState('');

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
      const response = await axios.post(`${API_URL}/user/login`, {
        email,
        password,
      });

      // You can handle the token here if needed
      const { token } = response.data;
      localStorage.setItem('token', token);  // Store token locally (or handle as needed)

      setMessage('Login successful!');
    } catch (error) {
      if (error.response && error.response.data) {
        setMessage(error.response.data.message);
      } else {
        setMessage('An error occurred');
      }
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
          <form>
            <div className="input-box">
              <i className="fas fa-user icon"></i>
              <input type="text" placeholder="Name" required />
            </div>
            <div className="input-box">
              <i className="fas fa-envelope icon"></i>
              <input type="email" placeholder="Email" required />
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
