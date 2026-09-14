// Base API Client Wrapper

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

export async function request(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;
  const token = localStorage.getItem('portfolio_token');

  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    // If unauthorized, clear invalid token
    if (response.status === 401) {
      localStorage.removeItem('portfolio_token');
      localStorage.removeItem('portfolio_user');
      if (window.location.pathname.startsWith('/admin') && window.location.pathname !== '/admin/login') {
        window.location.href = '/admin/login';
      }
    }

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      const errorMessage = data?.message || `HTTP Error ${response.status}: ${response.statusText}`;
      throw new Error(errorMessage);
    }

    return data;
  } catch (err) {
    console.error(`API Request failed for ${endpoint}:`, err.message);
    throw err;
  }
}
