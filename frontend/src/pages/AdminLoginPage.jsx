import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Lock, User, KeyRound, AlertCircle, ArrowLeft, ShieldCheck, Loader2 } from 'lucide-react';

export default function AdminLoginPage({ onNavigate }) {
  const { login, isAuthenticated } = useAuth();
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // If already logged in, redirect to dashboard
  if (isAuthenticated) {
    if (onNavigate) {
      onNavigate('/admin/dashboard');
    } else {
      window.history.pushState({}, '', '/admin/dashboard');
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  }

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
      setError(err.message || 'Authentication failed. Please verify your credentials.');
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
              <Lock size={28} />
            </div>
            <h1 className="admin-login-title">Portfolio CMS Login</h1>
            <p className="admin-login-subtitle">
              Secure Spring Security JWT administration console
            </p>
          </div>

          {/* Quick Demo Credentials Info */}
          <div className="demo-credentials-banner">
            <ShieldCheck size={16} />
            <div>
              <strong>Evaluation Credentials:</strong>
              <div className="demo-credentials-text">
                User: <code>admin</code> &bull; Pass: <code>adminPassword123!</code>
              </div>
            </div>
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
                  <Lock size={18} />
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
