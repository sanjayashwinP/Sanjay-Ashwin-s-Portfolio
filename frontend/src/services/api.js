// Base API Client Wrapper

// Automatically handle URLs whether user provides with or without /api or trailing slashes
export function getApiBaseUrl() {
  const custom = typeof window !== 'undefined' ? localStorage.getItem('portfolio_api_url') : null;
  const raw = (custom || import.meta.env.VITE_API_URL || 'http://localhost:8080/api').trim().replace(/\/+$/, '');
  return raw.endsWith('/api') ? raw : `${raw}/api`;
}

export function setApiBaseUrl(newUrl) {
  if (typeof window !== 'undefined') {
    if (!newUrl || newUrl.trim() === '') {
      localStorage.removeItem('portfolio_api_url');
    } else {
      let clean = newUrl.trim().replace(/\/+$/, '');
      if (!clean.endsWith('/api')) clean = `${clean}/api`;
      localStorage.setItem('portfolio_api_url', clean);
    }
  }
}

export async function request(endpoint, options = {}) {
  let cleanEndpoint = endpoint.startsWith('/api/') ? endpoint.substring(4) : endpoint;
  if (!cleanEndpoint.startsWith('/')) {
    cleanEndpoint = `/${cleanEndpoint}`;
  }
  const baseUrl = getApiBaseUrl();
  const url = `${baseUrl}${cleanEndpoint}`;
  const token = typeof window !== 'undefined' ? localStorage.getItem('portfolio_token') : null;

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

    // If unauthorized (401) or forbidden (403) due to expired/invalid session, end session immediately
    if (response.status === 401 || response.status === 403) {
      if (token || endpoint.includes('/admin/')) {
        localStorage.removeItem('portfolio_token');
        localStorage.removeItem('portfolio_user');
        if (typeof window !== 'undefined' && window.location.pathname.startsWith('/admin') && window.location.pathname !== '/admin/login') {
          window.location.href = '/admin/login?sessionExpired=true';
        }
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
