import React, { useState } from 'react';
import '../css/LoginRegisterForm.css';

const LoginRegisterForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

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

  return (
    <div className="form-container">
      <div className={`form-box-container ${isLogin ? '' : 'flip-mode'}`}>
        {/* Login Form */}
        <div className="form-box login">
          <h2>Sign In</h2>
          <form>
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
            <button type="submit" className="submit-btn">Sign In</button>
          </form>
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
