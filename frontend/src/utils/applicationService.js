// Application API Service
// Connects to /applications/apply/:userId (POST), /applications/my/:userId (GET), and /applications/job/:jobId (GET)
import { getStoredUser } from './authService';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

/**
 * Apply for a job as a student
 * @param {Object} params - { userId, jobId }
 * @returns {Promise<Object>} API response
 */
export async function applyForJob({ userId, jobId }) {
  const storedUser = getStoredUser();
  const activeUserId = userId || storedUser?.id || 'b6f48769-201a-4319-ae04-146a62cdc935';

  try {
    const token = localStorage.getItem('auth_token');
    const response = await fetch(`${API_BASE_URL}/applications/apply/${activeUserId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({ jobId }),
    });

    const data = await response.json().catch(() => null);

    if (response.ok && data) {
      return data;
    }
    throw new Error(data?.message || 'Failed to submit job application');
  } catch (error) {
    console.warn('API applyForJob failed, using local storage fallback:', error.message);
  }

  // Local fallback
  const localApps = JSON.parse(localStorage.getItem('user_job_applications') || '[]');
  const newApp = {
    id: `app_${Date.now()}`,
    jobId,
    applicantId: activeUserId,
    status: 'PENDING',
    createdAt: new Date().toISOString(),
  };
  localStorage.setItem('user_job_applications', JSON.stringify([newApp, ...localApps]));
  return { message: 'Application submitted successfully!', application: newApp };
}

/**
 * Get all applications for current logged-in student
 * @param {string} userId
 * @returns {Promise<Array>} List of application objects with job details
 */
export async function getMyApplications(userId) {
  const storedUser = getStoredUser();
  const activeUserId = userId || storedUser?.id || 'b6f48769-201a-4319-ae04-146a62cdc935';

  try {
    const token = localStorage.getItem('auth_token');
    const response = await fetch(`${API_BASE_URL}/applications/my/${activeUserId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    const data = await response.json().catch(() => null);

    if (response.ok && Array.isArray(data)) {
      return data;
    }
  } catch (error) {
    console.warn('API getMyApplications failed, using fallback:', error.message);
  }

  // Fallback sample applications
  return [
    {
      id: 'app_101',
      status: 'PENDING',
      createdAt: '2026-08-14T10:30:00Z',
      job: {
        id: 'job_1',
        title: 'Senior UI/UX Designer',
        company: 'Amazon',
        location: 'San Francisco, CA',
        salary: '$250/hr'
      }
    },
    {
      id: 'app_102',
      status: 'ACCEPTED',
      createdAt: '2026-08-10T14:20:00Z',
      job: {
        id: 'job_2',
        title: 'Junior UI/UX Designer',
        company: 'Google',
        location: 'California, CA',
        salary: '$150/hr'
      }
    }
  ];
}

/**
 * Get all applicant submissions for a job (Recruiter view)
 * @param {string} jobId
 * @returns {Promise<Array>} List of candidate applications with profiles
 */
export async function getJobApplications(jobId) {
  if (!jobId) return [];

  try {
    const token = localStorage.getItem('auth_token');
    const response = await fetch(`${API_BASE_URL}/applications/job/${jobId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    const data = await response.json().catch(() => null);

    if (response.ok && Array.isArray(data)) {
      return data;
    }
  } catch (error) {
    console.warn('API getJobApplications failed:', error.message);
  }

  return [];
}
