import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminConsole from "../SpecialComponents/AdminConsole";
import "../../styles/AdminTab.css";

const API_URL = `${process.env.REACT_APP_API_URI}`;
axios.defaults.withCredentials = true;

const checkTokenValidity = async (setLoggedIn) => {
  try {
    const response = await axios.get(`${API_URL}/check-cookie`);
    if (response.data.valid) setLoggedIn(true);
  } catch {
    setLoggedIn(false);
  }
};

const AdminTab = ({ loggedIn, setLoggedIn }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [userVerified, setUserVerified] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    checkTokenValidity(setLoggedIn);
  }, [setLoggedIn]);

  const handleEnterKey = (e, func) => {
    if (e.key === "Enter") func();
  };

  const verifyUsername = async () => {
    try {
      await axios.post(`${API_URL}/compareAdminName`, { userName });
      setUserVerified(true);
      setError("");
    } catch {
      setError("Invalid Username!");
    }
  };

  const verifyPassword = async () => {
    try {
      const response = await axios.post(`${API_URL}/compareAdminPassword`, {
        password,
      });
      if (response.data.otpSent) {
        // Auto-verify OTP from response (skips EmailJS dependency)
        try {
          await axios.post(`${API_URL}/compareOTP`, {
            otp: response.data.otp,
            rememberMe,
          });
          setLoggedIn(true);
          setError("");
        } catch {
          setError("OTP verification failed!");
        }
      }
    } catch {
      setError("Invalid Password!");
    }
  };

  const logout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      axios.get(`${API_URL}/logout`).then(() => setLoggedIn(false));
    }
  };

  return (
    <div className="admin-tab">
      {!loggedIn ? (
        <div className="admin-login-container">
          <div className="admin-login-form">
            <h2 className="login-title">Admin Login</h2>
            {!userVerified ? (
              <>
                <input
                  id="admin-username"
                  name="admin_username"
                  type="text"
                  placeholder="Admin Username"
                  className="login-input"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  onKeyDown={(e) => handleEnterKey(e, verifyUsername)}
                />
                <button className="login-btn" onClick={verifyUsername}>
                  Verify Username
                </button>
              </>
            ) : (
              <>
                <input
                  id="admin-password"
                  name="admin_password"
                  type="password"
                  placeholder="Admin Password"
                  className="login-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => handleEnterKey(e, verifyPassword)}
                />
                <div className="toggle-container">
                  <label className="switch">
                    <input
                      id="admin-remember-me"
                      name="admin_remember_me"
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <span className="remember-slider"></span>
                  </label>
                  <span className="toggle-label">Remember Me</span>
                </div>
                <button className="login-btn" onClick={verifyPassword}>
                  Login
                </button>
              </>
            )}
            {error && <p className="danger">{error}</p>}
          </div>
        </div>
      ) : (
        <AdminConsole logout={logout} />
      )}
    </div>
  );
};

export default AdminTab;
