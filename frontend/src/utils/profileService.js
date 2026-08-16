import { getStoredUser } from './authService';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const DEFAULT_PROFILE = {
  userId: 'b6f48769-201a-4319-ae04-146a62cdc935',
  firstName: 'Natashia',
  lastName: 'Khaleira',
  name: 'Natashia Khaleira',
  role: 'Admin',
  email: 'info@binary-fusion.com',
  phone: '(+62) 821 2554-5846',
  dateOfBirth: '1990-10-12',
  displayDateOfBirth: '12-10-1990',
  country: 'United Kingdom',
  city: 'Leeds, East London',
  postalCode: 'ERT 1254',
  location: 'Leeds, United Kingdom',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  bio: 'Software Engineer passionate about AI',
  skills: ['TypeScript', 'NestJS', 'React', 'Node.js', 'System Design'],
  education: 'B.Tech in Computer Science',
  resumeUrl: 'https://example.com/resume.pdf',
};

/**
 * Get User Profile by userId
 * @param {string} userId
 * @returns {Promise<Object>} Profile data object
 */
export async function getProfile(userId) {
  const storedUser = getStoredUser();
  const targetUserId = userId || storedUser?.id || DEFAULT_PROFILE.userId;

  try {
    const token = localStorage.getItem('auth_token');
    const response = await fetch(`${API_BASE_URL}/profile/${targetUserId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    const data = await response.json().catch(() => null);

    if (response.ok && data) {
      return { ...DEFAULT_PROFILE, ...data };
    }
  } catch (error) {
    console.warn('Backend API unreachable, returning cached/default profile:', error.message);
  }

  // Local fallback
  const localProfile = localStorage.getItem(`user_profile_${userId}`);
  if (localProfile) {
    try {
      return { ...DEFAULT_PROFILE, ...JSON.parse(localProfile) };
    } catch {
      // return default
    }
  }

  return DEFAULT_PROFILE;
}

/**
 * Create or Update User Profile
 * @param {string} userId
 * @param {Object} profileData
 * @returns {Promise<Object>} Updated profile object
 */
export async function updateProfile(userId, profileData = {}) {
  const storedUser = getStoredUser();
  const targetUserId = userId || storedUser?.id || DEFAULT_PROFILE.userId;
  const currentProfile = await getProfile(targetUserId);
  const updatedPayload = {
    ...currentProfile,
    ...profileData,
    userId: targetUserId,
  };

  try {
    const token = localStorage.getItem('auth_token');
    const response = await fetch(`${API_BASE_URL}/profile/${targetUserId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({
        bio: updatedPayload.bio,
        skills: updatedPayload.skills,
        education: updatedPayload.education,
        resumeUrl: updatedPayload.resumeUrl,
        firstName: updatedPayload.firstName,
        lastName: updatedPayload.lastName,
        email: updatedPayload.email,
        phone: updatedPayload.phone,
        dateOfBirth: updatedPayload.dateOfBirth,
        role: updatedPayload.role,
        country: updatedPayload.country,
        city: updatedPayload.city,
        postalCode: updatedPayload.postalCode,
      }),
    });

    const data = await response.json().catch(() => null);

    if (response.ok && data) {
      const merged = { ...updatedPayload, ...data };
      localStorage.setItem(`user_profile_${targetUserId}`, JSON.stringify(merged));
      return merged;
    }
  } catch (error) {
    console.warn('Backend PUT API unreachable, saving locally:', error.message);
  }

  // Save to localStorage as fallback
  localStorage.setItem(`user_profile_${targetUserId}`, JSON.stringify(updatedPayload));
  return updatedPayload;
}
