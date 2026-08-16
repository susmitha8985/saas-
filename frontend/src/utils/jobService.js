import { getStoredUser } from './authService';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const INITIAL_JOBS = [
  {
    id: 'job_1',
    jobId: 'job_1',
    title: 'Senior UI/UX Designer',
    company: 'Amazon',
    companyLogo: 'https://cdn-icons-png.flaticon.com/512/732/732177.png',
    location: 'San Francisco, CA',
    salary: '$250/hr',
    date: '20 May, 2023',
    bgColor: '#FEE7D6', // Peach pastel
    tags: ['Part time', 'Senior level', 'Distant', 'Project work'],
    description: 'Lead the next generation of customer-centric user interfaces for Amazon AWS cloud services.',
    recruiterId: 'recruiter_amazon_01',
    recruiterName: 'Sarah Jenkins',
    recruiterEmail: 'sarah.j@amazon.com',
    createdAt: new Date('2023-05-20').getTime(),
  },
  {
    id: 'job_2',
    jobId: 'job_2',
    title: 'Junior UI/UX Designer',
    company: 'Google',
    companyLogo: 'https://cdn-icons-png.flaticon.com/512/300/300221.png',
    location: 'California, CA',
    salary: '$150/hr',
    date: '4 Feb, 2023',
    bgColor: '#D7F5E9', // Mint pastel
    tags: ['Full time', 'Junior level', 'Distant', 'Project work', 'Flexible Schedule'],
    description: 'Work alongside Google Search UX research team to craft beautiful Android & Web interfaces.',
    recruiterId: 'recruiter_google_02',
    recruiterName: 'David Chen',
    recruiterEmail: 'david.chen@google.com',
    createdAt: new Date('2023-02-04').getTime(),
  },
  {
    id: 'job_3',
    jobId: 'job_3',
    title: 'Senior Motion Designer',
    company: 'Dribbble',
    companyLogo: 'https://cdn-icons-png.flaticon.com/512/732/732204.png',
    location: 'New York, NY',
    salary: '$260/hr',
    date: '29 Jan, 2023',
    bgColor: '#E6E1F9', // Lavender pastel
    tags: ['Part time', 'Senior level', 'Full Day', 'Shift work'],
    description: 'Create fluid 3D micro-animations and motion designs for Dribbble Pro user showcases.',
    recruiterId: 'recruiter_dribbble_03',
    recruiterName: 'Elena Rostova',
    recruiterEmail: 'elena@dribbble.com',
    createdAt: new Date('2023-01-29').getTime(),
  },
  {
    id: 'job_4',
    jobId: 'job_4',
    title: 'UX Designer',
    company: 'Twitter',
    companyLogo: 'https://cdn-icons-png.flaticon.com/512/733/733579.png',
    location: 'California, CA',
    salary: '$120/hr',
    date: '11 Apr, 2023',
    bgColor: '#E2F1FD', // Light Blue pastel
    tags: ['Full time', 'Middle level', 'Distant', 'Project work'],
    description: 'Designing high-concurrency social feeds, interactive widgets, and instant messaging features.',
    recruiterId: 'recruiter_twitter_04',
    recruiterName: 'Alex Mercer',
    recruiterEmail: 'alex.m@twitter.com',
    createdAt: new Date('2023-04-11').getTime(),
  },
  {
    id: 'job_5',
    jobId: 'job_5',
    title: 'Graphic Designer',
    company: 'Airbnb',
    companyLogo: 'https://cdn-icons-png.flaticon.com/512/2111/2111320.png',
    location: 'New York, NY',
    salary: '$300/hr',
    date: '2 Apr, 2023',
    bgColor: '#FDE2F0', // Soft Pink pastel
    tags: ['Part time', 'Senior level'],
    description: 'Formulate brand guidelines, travel campaigns, and visual marketing assets across 50+ countries.',
    recruiterId: 'recruiter_airbnb_05',
    recruiterName: 'Chloe Bennett',
    recruiterEmail: 'chloe.b@airbnb.com',
    createdAt: new Date('2023-04-02').getTime(),
  },
  {
    id: 'job_6',
    jobId: 'job_6',
    title: 'Graphic Designer',
    company: 'Apple',
    companyLogo: 'https://cdn-icons-png.flaticon.com/512/0/747.png',
    location: 'San Francisco, CA',
    salary: '$140/hr',
    date: '18 Jan, 2023',
    bgColor: '#F1F5F9', // Soft Slate pastel
    tags: ['Part time', 'Distant'],
    description: 'Craft minimalist typography, packaging collateral, and iOS App Store feature banners.',
    recruiterId: 'recruiter_apple_06',
    recruiterName: 'Marcus Vance',
    recruiterEmail: 'm.vance@apple.com',
    createdAt: new Date('2023-01-18').getTime(),
  },
];

/**
 * Get All Jobs sorted by latest created
 * Method: GET
 * Endpoint: /jobs
 * @returns {Promise<Array>} List of all jobs
 */
export async function getAllJobs() {
  try {
    const response = await fetch(`${API_BASE_URL}/jobs`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await response.json().catch(() => null);

    if (response.ok && Array.isArray(data)) {
      return data.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
    }
  } catch (error) {
    console.warn('GET /jobs API offline, loading cached/default jobs:', error.message);
  }

  // Local storage fallback
  const storedJobs = localStorage.getItem('app_jobs_list');
  if (storedJobs) {
    try {
      const parsed = JSON.parse(storedJobs);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
      }
    } catch {
      // return default
    }
  }

  localStorage.setItem('app_jobs_list', JSON.stringify(INITIAL_JOBS));
  return INITIAL_JOBS;
}

/**
 * Get Specific Job Details
 * Method: GET
 * Endpoint: /jobs/detail/:jobId
 * @param {string} jobId
 * @returns {Promise<Object>} Job details object with recruiter info
 */
export async function getJobDetails(jobId) {
  if (!jobId) throw new Error('JobId is required');

  try {
    const response = await fetch(`${API_BASE_URL}/jobs/detail/${jobId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await response.json().catch(() => null);

    if (response.ok && data) {
      return data;
    }
  } catch (error) {
    console.warn(`GET /jobs/detail/${jobId} API unreachable, fetching locally:`, error.message);
  }

  const allJobs = await getAllJobs();
  const found = allJobs.find((j) => String(j.id) === String(jobId) || String(j.jobId) === String(jobId));

  if (found) return found;

  // Fallback generic object
  return {
    id: jobId,
    jobId,
    title: 'Fullstack Developer',
    description: 'Looking for a NestJS & React developer.',
    company: 'Tech Corp',
    location: 'Remote',
    salary: '$180/hr',
    date: 'Just now',
    bgColor: '#E2F1FD',
    tags: ['Full time', 'Middle level', 'Remote'],
    recruiterId: 'recruiter_default',
    recruiterName: 'Senior Talent Acquisition',
    recruiterEmail: 'careers@techcorp.com',
    createdAt: Date.now(),
  };
}

/**
 * Post a New Job (Recruiters)
 * Method: POST
 * Endpoint: /jobs/:userId
 * @param {string} userId - Recruiter ID
 * @param {Object} jobPayload - { title, description, company, location, salary, tags }
 * @returns {Promise<Object>} Created job object
 */
export async function postNewJob(userId, jobPayload = {}) {
  const storedUser = getStoredUser();
  const targetUserId = userId || storedUser?.id || 'b6f48769-201a-4319-ae04-146a62cdc935';

  const newJobObject = {
    id: `job_${Date.now()}`,
    jobId: `job_${Date.now()}`,
    title: jobPayload.title || 'Fullstack Developer',
    description: jobPayload.description || 'Looking for a NestJS & React developer.',
    company: jobPayload.company || 'Tech Corp',
    location: jobPayload.location || 'Remote',
    salary: jobPayload.salary || '$150/hr',
    date: 'Today',
    bgColor: jobPayload.bgColor || '#E6E1F9',
    tags: jobPayload.tags || ['Full time', 'Senior level', 'Remote', 'Project work'],
    companyLogo: jobPayload.companyLogo || 'https://cdn-icons-png.flaticon.com/512/1006/1006771.png',
    recruiterId: targetUserId,
    recruiterName: jobPayload.recruiterName || 'Lead Recruiter',
    recruiterEmail: jobPayload.recruiterEmail || 'hiring@techcorp.com',
    createdAt: Date.now(),
  };

  try {
    const response = await fetch(`${API_BASE_URL}/jobs/${targetUserId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: newJobObject.title,
        description: newJobObject.description,
        company: newJobObject.company,
        location: newJobObject.location,
        salary: newJobObject.salary,
        tags: newJobObject.tags,
      }),
    });

    const data = await response.json().catch(() => null);

    if (response.ok && data) {
      const merged = { ...newJobObject, ...data };
      const currentList = await getAllJobs();
      const updatedList = [merged, ...currentList];
      localStorage.setItem('app_jobs_list', JSON.stringify(updatedList));
      return merged;
    }
  } catch (error) {
    console.warn('POST /jobs API unreachable, saving job locally:', error.message);
  }

  // Local storage save
  const currentList = await getAllJobs();
  const updatedList = [newJobObject, ...currentList];
  localStorage.setItem('app_jobs_list', JSON.stringify(updatedList));
  return newJobObject;
}
