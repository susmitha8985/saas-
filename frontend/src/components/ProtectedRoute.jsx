import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { getStoredToken, getStoredUser } from '../utils/authService';

/**
 * ProtectedRoute Component
 * Restricts access to authenticated users only.
 * If not authenticated, redirects to /auth?mode=signin with return location.
 */
export default function ProtectedRoute({ children }) {
  const location = useLocation();
  const token = getStoredToken();
  const user = getStoredUser();

  if (!token || !user) {
    return <Navigate to="/auth?mode=signin" state={{ from: location }} replace />;
  }

  return children;
}
