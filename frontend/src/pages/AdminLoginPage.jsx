import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getApiBaseUrl, setApiBaseUrl } from '../services/api';
import { Lock, User, KeyRound, AlertCircle, ArrowLeft, Loader2, Settings, Check, ExternalLink, LogOut } from 'lucide-react';

export default function AdminLoginPage({ onNavigate }) {
  const { user, login, logout, isAuthenticated } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // API Config state
  const [apiUrl, setApiUrl] = useState(getApiBaseUrl());
  const [showApiConfig, setShowApiConfig] = useState(false);
  const [apiUrlSaved, setApiUrlSaved] = useState(false);

  // Check if redirected due to expired session
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.search.includes('sessionExpired=true')) {
      setError('Your admin session expired. Please log in again to update server content.');
    }
  }, []);

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

  const handleSaveApiUrl = (e) => {
    e.preventDefault();
    setApiBaseUrl(apiUrl);
    setApiUrlSaved(true);
    setTimeout(() => setApiUrlSaved(false), 3000);
  };

  const handleBackToPortfolio = () => {
    if (onNavigate) {
      onNavigate('/');
    } else {
      window.history.pushState({}, '', '/');
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  const handleGoToDashboard = () => {
    if (onNavigate) {
      onNavigate('/admin/dashboard');
    } else {
      window.history.pushState({}, '', '/admin/dashboard');
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

          {isAuthenticated ? (
            <div style={{ textAlign: 'center', padding: '1.25rem 0' }}>
              <div style={{ marginBottom: '1.25rem', padding: '1rem', background: 'var(--bg-surface-elevated)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.35rem' }}>
                  Active session found:
                </p>
                <p style={{ color: 'var(--accent-primary)', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
                  {user?.username || 'admin'}
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <button
                  type="button"
                  onClick={handleGoToDashboard}
                  className="btn btn-primary"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  <ExternalLink size={16} />
                  <span>Enter Admin Dashboard</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    logout();
                    setError(null);
                  }}
                  className="btn btn-secondary"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  <LogOut size={16} />
                  <span>Sign Out / Switch Account</span>
                </button>
              </div>
            </div>
          ) : (
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
          )}

          {/* Backend API Configuration Toggle */}
          <div style={{ marginTop: '1.75rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-subtle)', textAlign: 'center' }}>
            <button
              type="button"
              onClick={() => setShowApiConfig(!showApiConfig)}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-muted)',
                fontSize: '0.8rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem'
              }}
            >
              <Settings size={14} />
              <span>Backend API Server Settings</span>
            </button>

            {showApiConfig && (
              <form onSubmit={handleSaveApiUrl} style={{ marginTop: '1rem', textAlign: 'left' }}>
                <div className="form-group" style={{ marginBottom: '0.5rem' }}>
                  <label style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                    Backend Base API URL
                  </label>
                  <input
                    type="url"
                    required
                    value={apiUrl}
                    onChange={(e) => setApiUrl(e.target.value)}
                    placeholder="https://your-backend.onrender.com/api"
                    style={{ fontSize: '0.82rem', fontFamily: 'var(--font-mono)' }}
                  />
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <button type="submit" className="btn btn-secondary btn-sm" style={{ fontSize: '0.78rem' }}>
                    Save API URL
                  </button>
                  {apiUrlSaved && (
                    <span style={{ color: 'var(--success)', fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <Check size={14} /> Saved!
                    </span>
                  )}
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
