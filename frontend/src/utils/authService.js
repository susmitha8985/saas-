// Authentication Service
// Connects to the backend auth routes (/auth/register, /auth/login)

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

/**
 * Register a new user
 * @param {Object} userData - { name, email, password }
 * @returns {Promise<Object>} API response with created user object and message
 */
export async function registerUser({ name, email, password }) {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(data.message || data.error || `Registration failed with status ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error('Registration API Error:', error);
    throw error;
  }
}

/**
 * Login user
 * @param {Object} credentials - { email, password }
 * @returns {Promise<Object>} API response with token (JWT) and user object
 */
export async function loginUser({ email, password }) {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(data.message || data.error || `Login failed with status ${response.status}`);
    }

    // Persist JWT token and user info in localStorage
    if (data.token) {
      localStorage.setItem('auth_token', data.token);
    }
    if (data.user) {
      localStorage.setItem('auth_user', JSON.stringify(data.user));
    }

    return data;
  } catch (error) {
    console.error('Login API Error:', error);
    throw error;
  }
}

/**
 * Get stored JWT token
 * @returns {string|null}
 */
export function getStoredToken() {
  return localStorage.getItem('auth_token');
}

/**
 * Get stored user profile
 * @returns {Object|null}
 */
export function getStoredUser() {
  const user = localStorage.getItem('auth_user');
  if (!user) return null;
  try {
    return JSON.parse(user);
  } catch {
    return null;
  }
}

/**
 * Logout current user
 */
export function logoutUser() {
  localStorage.removeItem('auth_token');
  localStorage.removeItem('auth_user');
}
