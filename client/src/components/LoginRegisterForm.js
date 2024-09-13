import React, { useState } from 'react';
import './LoginRegisterForm.css';

const LoginRegisterForm = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="form-container">
      <div className={`form-box-container ${isLogin ? '' : 'flip-mode'}`}>
        <div className="form-box login">
          <h2>Sign In</h2>
          <form>
            <div className="input-box">
              <input type="email" placeholder="Email" required />
            </div>
            <div className="input-box">
              <input type="password" placeholder="Password" required />
            </div>
            <button type="submit" className="submit-btn">Sign In</button>
          </form>
          <p>
            Don't have an account? 
            <span onClick={() => setIsLogin(false)} className="switch-text"> Sign Up</span>
          </p>
        </div>

        <div className="form-box register">
          <h2>Sign Up</h2>
          <form>
            <div className="input-box">
              <input type="text" placeholder="Name" required />
            </div>
            <div className="input-box">
              <input type="email" placeholder="Email" required />
            </div>
            <div className="input-box">
              <input type="password" placeholder="Password" required />
            </div>
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
