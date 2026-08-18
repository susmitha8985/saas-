/**
 * @fileoverview AuthContext — provides authentication state and API helpers
 * to the entire React component tree via Context + hook.
 *
 * Key design decisions:
 * - A `GUEST_USER` constant is defined once to avoid duplication (DRY).
 * - `persistAuthSession` is a private helper that encapsulates the
 *   localStorage + state update logic repeated after login/register.
 * - `apiFetch` automatically attaches the Bearer token and handles 401s.
 */
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

/* ─────────────────────────────────────────────
   CONSTANTS
───────────────────────────────────────────── */

/**
 * Default guest profile used before the user authenticates.
 * Defined once here to eliminate duplication across login/register/logout.
 * @type {import('./types').UserProfile}
 */
const GUEST_USER = {
  _id: '60c72b2f9b1d8b2a1c8f4e00',
  name: 'Guest Student',
  email: 'guest@scrollwise.ai',
  detectedInterests: ['Java', 'System Design', 'DSA'],
  profile: {
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Guest',
    experienceLevel: 'Beginner',
    bio: 'Technical education telemetry tracker.',
  },
};

const GUEST_TOKEN = 'mock_guest_token_123';

const STORAGE_KEYS = {
  USER: 'scrollwise_user',
  TOKEN: 'scrollwise_token',
};

/* ─────────────────────────────────────────────
   CONTEXT DEFINITION
───────────────────────────────────────────── */

/**
 * @typedef {Object} AuthContextValue
 * @property {import('./types').UserProfile|null} user    - Currently authenticated user (or guest).
 * @property {string|null}                        token   - JWT bearer token.
 * @property {boolean}                            loading - True while restoring session from storage.
 * @property {Function}                           login   - Authenticates with email + password.
 * @property {Function}                           register - Registers a new account.
 * @property {Function}                           logout  - Falls back to guest session.
 * @property {Function}                           apiFetch - Authenticated fetch wrapper.
 * @property {string}                             API_URL - Base API URL from env.
 */

/** @type {React.Context<AuthContextValue>} */
const AuthContext = createContext(null);

/* ─────────────────────────────────────────────
   PROVIDER
───────────────────────────────────────────── */

/**
 * Provides auth state to all descendants.
 * @param {{ children: React.ReactNode }} props
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  /* ── Session Restoration ── */
  useEffect(() => {
    const restoreSession = () => {
      try {
        const storedUser = localStorage.getItem(STORAGE_KEYS.USER);
        const storedToken = localStorage.getItem(STORAGE_KEYS.TOKEN);

        if (storedUser && storedToken) {
          setUser(JSON.parse(storedUser));
          setToken(storedToken);
        } else {
          persistAuthSession(GUEST_USER, GUEST_TOKEN);
        }
      } catch {
        // Corrupted localStorage data — fall back to guest
        persistAuthSession(GUEST_USER, GUEST_TOKEN);
      } finally {
        setLoading(false);
      }
    };

    restoreSession();
  }, []);

  /* ── Private Helpers ── */

  /**
   * Persists an authenticated session to localStorage and updates React state.
   * Centralises the state + storage writes that were previously duplicated.
   *
   * @param {import('./types').UserProfile} userData
   * @param {string}                        authToken
   */
  const persistAuthSession = useCallback((userData, authToken) => {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userData));
    localStorage.setItem(STORAGE_KEYS.TOKEN, authToken);
    setUser(userData);
    setToken(authToken);
  }, []);

  /**
   * Extracts the user-facing fields from a raw API response body.
   * @param {Object} data - Raw API response JSON.
   * @returns {import('./types').UserProfile}
   */
  const extractUserPayload = (data) => ({
    _id: data._id,
    name: data.name,
    email: data.email,
    profile: data.profile,
    detectedInterests: data.detectedInterests,
  });

  /* ── Public API ── */

  /**
   * Authenticates an existing user.
   * @param {string} email
   * @param {string} password
   * @returns {Promise<Object>} Raw server response data.
   * @throws {Error} On network failure or non-OK HTTP status.
   */
  const login = useCallback(async (email, password) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Login failed.');

    persistAuthSession(extractUserPayload(data), data.token);
    return data;
  }, [API_URL, persistAuthSession]);

  /**
   * Registers a new user account.
   * @param {string} name
   * @param {string} email
   * @param {string} password
   * @returns {Promise<Object>} Raw server response data.
   * @throws {Error} On network failure or non-OK HTTP status.
   */
  const register = useCallback(async (name, email, password) => {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Registration failed.');

    persistAuthSession(extractUserPayload(data), data.token);
    return data;
  }, [API_URL, persistAuthSession]);

  /**
   * Logs out the current user and reverts to the guest session.
   * Keeps a guest session active so the feed remains browsable without auth.
   */
  const logout = useCallback(() => {
    persistAuthSession(GUEST_USER, GUEST_TOKEN);
  }, [persistAuthSession]);

  /**
   * Makes an authenticated HTTP request to the ScrollWise API.
   * Automatically injects the `Authorization: Bearer` header.
   * On 401 Unauthorized, the session is reset to guest.
   *
   * @param {string} endpoint - Path relative to `API_URL` (e.g., '/dashboard').
   * @param {RequestInit} [options={}] - Standard fetch options.
   * @returns {Promise<Response>}
   * @throws {Error} On session expiry (401).
   */
  const apiFetch = useCallback(async (endpoint, options = {}) => {
    const currentToken = localStorage.getItem(STORAGE_KEYS.TOKEN);
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(currentToken ? { Authorization: `Bearer ${currentToken}` } : {}),
        ...options.headers,
      },
    });

    if (response.status === 401) {
      logout();
      throw new Error('Session expired. Please log in again.');
    }

    return response;
  }, [API_URL, logout]);

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout, apiFetch, API_URL }}>
      {children}
    </AuthContext.Provider>
  );
}

/* ─────────────────────────────────────────────
   HOOK
───────────────────────────────────────────── */

/**
 * Consumes the AuthContext.
 * Must be called inside a component wrapped in `<AuthProvider>`.
 *
 * @returns {AuthContextValue}
 * @throws {Error} If used outside AuthProvider.
 */
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an <AuthProvider>');
  return ctx;
}
