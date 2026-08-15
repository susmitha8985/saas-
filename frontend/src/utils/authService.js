// Authentication Service
// Connects to the backend auth routes (/auth/register, /auth/login)

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

/**
 * Helper to validate email format via Regex
 * @param {string} email
 * @returns {boolean}
 */
export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(String(email).toLowerCase());
}

/**
 * Check if current session is authenticated
 * @returns {boolean}
 */
export function isAuthenticated() {
  const token = getStoredToken();
  const user = getStoredUser();
  return Boolean(token && user);
}

/**
 * Register a new user
 * @param {Object} userData - { name, email, password }
 * @returns {Promise<Object>} API response with created user object and message
 */
export async function registerUser({ name, email, password }) {
  if (!name || name.trim().length < 2) {
    throw new Error('Please enter a valid full name (at least 2 characters).');
  }

  if (!email || !isValidEmail(email)) {
    throw new Error('Please enter a valid email address.');
  }

  if (!password || password.length < 6) {
    throw new Error('Password must be at least 6 characters long.');
  }

  try {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: name.trim(), email: email.trim(), password: password.trim() }),
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
  if (!email || !isValidEmail(email)) {
    throw new Error('Please enter a valid email address.');
  }

  if (!password || password.length < 6) {
    throw new Error('Password must be at least 6 characters long.');
  }

  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email.trim(), password: password.trim() }),
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
