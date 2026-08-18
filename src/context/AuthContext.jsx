import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('scrollwise_token') || null);
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    const loadUser = async () => {
      const storedUser = localStorage.getItem('scrollwise_user');
      const storedToken = localStorage.getItem('scrollwise_token');
      
      if (storedUser && storedToken) {
        setUser(JSON.parse(storedUser));
        setToken(storedToken);
      } else {
        const defaultGuest = {
          _id: "60c72b2f9b1d8b2a1c8f4e00",
          name: "Guest Student",
          email: "guest@scrollwise.ai",
          detectedInterests: ["Java", "System Design", "DSA"],
          profile: {
            avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Guest",
            experienceLevel: "Beginner",
            bio: "Technical education telemetry tracker."
          }
        };
        const defaultToken = "mock_guest_token_123";
        setUser(defaultGuest);
        setToken(defaultToken);
        localStorage.setItem('scrollwise_user', JSON.stringify(defaultGuest));
        localStorage.setItem('scrollwise_token', defaultToken);
      }
      setLoading(false);
    };
    loadUser();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      localStorage.setItem('scrollwise_token', data.token);
      localStorage.setItem('scrollwise_user', JSON.stringify({
        _id: data._id,
        name: data.name,
        email: data.email,
        profile: data.profile,
        detectedInterests: data.detectedInterests
      }));
      
      setToken(data.token);
      setUser({
        _id: data._id,
        name: data.name,
        email: data.email,
        profile: data.profile,
        detectedInterests: data.detectedInterests
      });
      return data;
    } catch (error) {
      console.error("Login error in AuthContext:", error);
      throw error;
    }
  };

  const register = async (name, email, password) => {
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      localStorage.setItem('scrollwise_token', data.token);
      localStorage.setItem('scrollwise_user', JSON.stringify({
        _id: data._id,
        name: data.name,
        email: data.email,
        profile: data.profile,
        detectedInterests: data.detectedInterests
      }));

      setToken(data.token);
      setUser({
        _id: data._id,
        name: data.name,
        email: data.email,
        profile: data.profile,
        detectedInterests: data.detectedInterests
      });
      return data;
    } catch (error) {
      console.error("Registration error in AuthContext:", error);
      throw error;
    }
  };

  const logout = () => {
    const defaultGuest = {
      _id: "60c72b2f9b1d8b2a1c8f4e00",
      name: "Guest Student",
      email: "guest@scrollwise.ai",
      detectedInterests: ["Java", "System Design", "DSA"],
      profile: {
        avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Guest",
        experienceLevel: "Beginner",
        bio: "Technical education telemetry tracker."
      }
    };
    const defaultToken = "mock_guest_token_123";
    localStorage.setItem('scrollwise_user', JSON.stringify(defaultGuest));
    localStorage.setItem('scrollwise_token', defaultToken);
    setToken(defaultToken);
    setUser(defaultGuest);
  };

  // Helper to make authorized API requests
  const apiFetch = async (endpoint, options = {}) => {
    const url = `${API_URL}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (response.status === 401) {
      logout();
      throw new Error('Session expired, please login again.');
    }

    return response;
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout, apiFetch, API_URL }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
