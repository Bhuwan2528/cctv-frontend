import React, { useState } from 'react';
import axios from 'axios';
import './AdminLogin.css';

import { FiUser, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';

const AdminLogin = () => {
  const [email, setEmail] = useState(''); // same state name (UI break nahi hoga)
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const res = await axios.post(
        "https://cctv-backend-dhz9.onrender.com/api/auth/login",
        {
          username: email, // 🔥 yaha mapping kar diya
          password: password
        },
        {
          withCredentials: true // 🔥 cookie ke liye important
        }
      );

      console.log(res.data);

      // success
      alert("Login successful");

      // yaha redirect kar sakta hai
      window.location.href = "/admin-panel";

    } catch (err) {
      console.log(err);

      if (err.response) {
        setError(err.response.data.message);
      } else {
        setError("Server error");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-background"></div>
      <div className="admin-login-card">
        <div className="admin-login-header">
          <h2>Admin Panel Login</h2>
          <p>Secure access to your dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="admin-login-form">
          <div className="form-group">
            <label htmlFor="email">Username</label> {/* 🔥 label change only */}
            <div className="input-wrapper">
              <span className="input-icon"><FiUser size={20} /></span>
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter username"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-wrapper">
              <span className="input-icon"><FiLock size={20} /></span>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </button>
            </div>
          </div>

          <div className="form-actions">
            <label className="remember-me">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span className="checkmark"></span>
              Remember me
            </label>
            <a href="#forgot" className="forgot-password">Forgot Password?</a>
          </div>

          {/* 🔥 ERROR SHOW */}
          {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

          <button
            type="submit"
            className={`login-btn ${isSubmitting ? 'loading' : ''}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Authenticating...' : 'Login to Dashboard'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;