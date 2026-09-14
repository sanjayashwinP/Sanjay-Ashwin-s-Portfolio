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

  logout() {
    localStorage.removeItem('portfolio_token');
    localStorage.removeItem('portfolio_user');
  },

  getCurrentUser() {
    try {
      const userStr = localStorage.getItem('portfolio_user');
      return userStr ? JSON.parse(userStr) : null;
    } catch {
      return null;
    }
  },

  isAuthenticated() {
    return !!localStorage.getItem('portfolio_token');
  }
};
