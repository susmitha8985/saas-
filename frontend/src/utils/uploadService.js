// Upload API Service
// Connects to /upload/resume/:userId (POST)
import { getStoredUser } from './authService';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

/**
 * Upload a PDF resume file directly to NestJS server
 * @param {string} userId
 * @param {File} fileObject
 * @returns {Promise<Object>} API response with uploaded file URL path
 */
export async function uploadResumeFile(userId, fileObject) {
  if (!fileObject) {
    throw new Error('Please select a PDF file to upload.');
  }

  const storedUser = getStoredUser();
  const activeUserId = userId || storedUser?.id || 'b6f48769-201a-4319-ae04-146a62cdc935';

  const formData = new FormData();
  formData.append('file', fileObject);

  try {
    const token = localStorage.getItem('auth_token');
    const response = await fetch(`${API_BASE_URL}/upload/resume/${activeUserId}`, {
      method: 'POST',
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: formData,
    });

    const data = await response.json().catch(() => null);

    if (response.ok && data) {
      return data;
    }
    throw new Error(data?.message || `File upload failed with status ${response.status}`);
  } catch (error) {
    console.warn('API uploadResumeFile failed:', error.message);
    throw error;
  }
}
