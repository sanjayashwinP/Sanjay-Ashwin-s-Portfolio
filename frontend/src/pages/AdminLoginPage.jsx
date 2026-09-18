import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Lock, User, KeyRound, AlertCircle, ArrowLeft, Loader2 } from 'lucide-react';

export default function AdminLoginPage({ onNavigate }) {
  const { login, isAuthenticated } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Safely redirect if authenticated via useEffect (prevents React render-phase update warnings)
  useEffect(() => {
    if (isAuthenticated) {
      if (onNavigate) {
        onNavigate('/admin/dashboard');
      } else {
        window.history.pushState({}, '', '/admin/dashboard');
        window.dispatchEvent(new PopStateEvent('popstate'));
      }
    }
  }, [isAuthenticated, onNavigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      await login(username, password);
      if (onNavigate) {
        onNavigate('/admin/dashboard');
      } else {
        window.history.pushState({}, '', '/admin/dashboard');
        window.dispatchEvent(new PopStateEvent('popstate'));
      }
    } catch (err) {
      setError(err.message || 'Authentication failed. Please verify your credentials or ensure the Spring Boot service is active.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleBackToPortfolio = () => {
    if (onNavigate) {
      onNavigate('/');
    } else {
      window.history.pushState({}, '', '/');
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  return (
    <div className="admin-login-wrapper">
      <div className="admin-login-container">
        <button
          type="button"
          onClick={handleBackToPortfolio}
          className="admin-back-btn"
        >
          <ArrowLeft size={16} />
          <span>Back to Portfolio</span>
        </button>

        <div className="admin-login-card card">
          <div className="admin-login-header">
            <div className="admin-avatar-icon">
              <Lock size={26} />
            </div>
            <h1 className="admin-login-title">Portfolio CMS Login</h1>
            <p className="admin-login-subtitle">
              Authorized personnel only &bull; Spring Security JWT Protected
            </p>
          </div>

          {error && (
            <div className="auth-error-banner" role="alert">
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="admin-login-form">
            <div className="form-group">
              <label htmlFor="adminUsername">Username</label>
              <div className="input-with-icon">
                <User size={18} className="field-icon" />
                <input
                  id="adminUsername"
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  autoComplete="username"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="adminPassword">Password</label>
              <div className="input-with-icon">
                <KeyRound size={18} className="field-icon" />
                <input
                  id="adminPassword"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter administrator password"
                  autoComplete="current-password"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="btn btn-primary admin-submit-btn"
            >
              {submitting ? (
                <>
                  <Loader2 size={18} className="spin-icon" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <Lock size={16} />
                  <span>Sign In to Dashboard</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
