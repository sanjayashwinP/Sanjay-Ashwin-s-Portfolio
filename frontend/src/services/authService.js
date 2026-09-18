import { request } from './api';

export const authService = {
  async login(username, password) {
    const res = await request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });

    if (res?.data?.token) {
      localStorage.setItem('portfolio_token', res.data.token);
      localStorage.setItem('portfolio_user', JSON.stringify({
        username: res.data.username,
        role: res.data.role
      }));
    }
    return res.data;
  },

  isTokenExpired(token) {
    if (!token) return true;
    try {
      const parts = token.split('.');
      if (parts.length !== 3) return true;
      const payload = JSON.parse(atob(parts[1]));
      if (!payload.exp) return false;
      return Date.now() >= payload.exp * 1000;
    } catch {
      return true;
    }
  },

  logout() {
    localStorage.removeItem('portfolio_token');
    localStorage.removeItem('portfolio_user');
  },

  getCurrentUser() {
    try {
      const token = localStorage.getItem('portfolio_token');
      if (!token || this.isTokenExpired(token)) {
        this.logout();
        return null;
      }
      const userStr = localStorage.getItem('portfolio_user');
      return userStr ? JSON.parse(userStr) : null;
    } catch {
      return null;
    }
  },

  isAuthenticated() {
    const token = localStorage.getItem('portfolio_token');
    if (!token || this.isTokenExpired(token)) {
      this.logout();
      return false;
    }
    return true;
  }
};
