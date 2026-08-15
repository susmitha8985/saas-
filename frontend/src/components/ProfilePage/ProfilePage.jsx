import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Edit2, Camera, ExternalLink, CheckCircle } from 'lucide-react';
import Sidebar from './Sidebar';
import TopHeader from './TopHeader';
import EditProfileModal from './EditProfileModal';
import { getProfile, updateProfile, DEFAULT_PROFILE } from '../../utils/profileService';
import { getStoredUser, isAuthenticated } from '../../utils/authService';
import './ProfilePage.css';

export default function ProfilePage() {
  const { userId: paramUserId } = useParams();
  const navigate = useNavigate();
  const storedUser = getStoredUser();
  const userId = paramUserId || storedUser?.id || DEFAULT_PROFILE.userId;

  const [profile, setProfile] = useState(DEFAULT_PROFILE);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeModalSection, setActiveModalSection] = useState(null); // 'personal' | 'address' | 'academic' | null
  const [toastMessage, setToastMessage] = useState('');

  // Authorization check for protected profile route
  useEffect(() => {
    if (!paramUserId && !isAuthenticated()) {
      navigate('/auth?mode=signin');
    }
  }, [paramUserId, navigate]);

  // Fetch profile on mount or userId param change
  useEffect(() => {
    let isMounted = true;
    async function loadProfile() {
      try {
        setLoading(true);
        setError(null);
        const data = await getProfile(userId);
        if (isMounted) {
          setProfile(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Failed to load user profile');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }
    loadProfile();
    return () => {
      isMounted = false;
    };
  }, [userId]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 4000);
  };

  const handleSaveProfile = async (updatedFields) => {
    try {
      const result = await updateProfile(userId, updatedFields);
      setProfile((prev) => ({ ...prev, ...result }));
      showToast('Profile updated successfully!');
    } catch (err) {
      console.error('Error saving profile:', err);
      showToast('Failed to update profile via API.');
    }
  };

  const fullName = profile.firstName
    ? `${profile.firstName} ${profile.lastName || ''}`.trim()
    : profile.name || 'Natashia Khaleira';

  return (
    <div className="profile-app-container">
      {/* Left Navigation Sidebar */}
      <Sidebar user={profile} activeTab="Pages" />

      {/* Main Container Area */}
      <main className="profile-main-wrapper">
        {/* Top Header Bar (#044635) */}
        <TopHeader />

        {/* Section Heading */}
        <h1 className="page-title">My Profile</h1>

        {/* Notification Toast */}
        {toastMessage && (
          <div style={{
            padding: '12px 18px',
            backgroundColor: '#ECFDF5',
            border: '1px solid #10B981',
            color: '#065F46',
            borderRadius: '10px',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: '14px',
            fontWeight: '600'
          }}>
            <CheckCircle size={18} color="#10B981" />
            <span>{toastMessage}</span>
          </div>
        )}

        {loading ? (
          <div style={{ padding: '60px', textAlign: 'center', color: '#646464' }}>
            Loading user profile...
          </div>
        ) : error ? (
          <div style={{ padding: '20px', backgroundColor: '#FEF2F2', color: '#991B1B', borderRadius: '12px' }}>
            {error}
          </div>
        ) : (
          <div className="profile-cards-container">
            {/* 1. Header Profile Banner Card */}
            <div className="profile-card profile-header-card">
              <div className="avatar-wrapper">
                <img
                  src={profile.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'}
                  alt={fullName}
                  className="profile-avatar-lg"
                />
                <button
                  className="camera-badge"
                  aria-label="Change Profile Photo"
                  onClick={() => setActiveModalSection('personal')}
                  title="Update Photo"
                >
                  <Camera size={14} />
                </button>
              </div>

              <div className="profile-header-info">
                <h2 className="profile-header-name">{fullName}</h2>
                <div className="profile-header-role">{profile.role || 'Admin'}</div>
                <div className="profile-header-location">{profile.location || `${profile.city || 'Leeds'}, ${profile.country || 'United Kingdom'}`}</div>
              </div>
            </div>

            {/* 2. Personal Information Card */}
            <div className="profile-card">
              <div className="card-header-row">
                <h3 className="card-title">Personal Information</h3>
                <button
                  className="edit-btn"
                  onClick={() => setActiveModalSection('personal')}
                >
                  Edit <Edit2 size={14} />
                </button>
              </div>

              <div className="details-grid">
                <div className="detail-item">
                  <span className="detail-label">First Name</span>
                  <span className="detail-value">{profile.firstName || 'Natashia'}</span>
                </div>

                <div className="detail-item">
                  <span className="detail-label">Last Name</span>
                  <span className="detail-value">{profile.lastName || 'Khaleira'}</span>
                </div>

                <div className="detail-item">
                  <span className="detail-label">Date of Birth</span>
                  <span className="detail-value">{profile.displayDateOfBirth || '12-10-1990'}</span>
                </div>

                <div className="detail-item">
                  <span className="detail-label">Email Address</span>
                  <span className="detail-value">{profile.email || 'info@binary-fusion.com'}</span>
                </div>

                <div className="detail-item">
                  <span className="detail-label">Phone Number</span>
                  <span className="detail-value">{profile.phone || '(+62) 821 2554-5846'}</span>
                </div>

                <div className="detail-item">
                  <span className="detail-label">User Role</span>
                  <span className="detail-value">{profile.role || 'Admin'}</span>
                </div>
              </div>
            </div>

            {/* 3. Address Card */}
            <div className="profile-card">
              <div className="card-header-row">
                <h3 className="card-title">Address</h3>
                <button
                  className="edit-btn edit-btn-secondary"
                  onClick={() => setActiveModalSection('address')}
                >
                  Edit <Edit2 size={14} />
                </button>
              </div>

              <div className="details-grid">
                <div className="detail-item">
                  <span className="detail-label">Country</span>
                  <span className="detail-value">{profile.country || 'United Kingdom'}</span>
                </div>

                <div className="detail-item">
                  <span className="detail-label">City</span>
                  <span className="detail-value">{profile.city || 'Leeds, East London'}</span>
                </div>

                <div className="detail-item">
                  <span className="detail-label">Postal Code</span>
                  <span className="detail-value">{profile.postalCode || 'ERT 1254'}</span>
                </div>
              </div>
            </div>

            {/* 4. Professional & Academic Details Card (API GET/PUT payload fields) */}
            <div className="profile-card">
              <div className="card-header-row">
                <h3 className="card-title">Professional & Academic Details</h3>
                <button
                  className="edit-btn edit-btn-secondary"
                  onClick={() => setActiveModalSection('academic')}
                >
                  Edit <Edit2 size={14} />
                </button>
              </div>

              <div className="details-grid">
                <div className="detail-item" style={{ gridColumn: 'span 3' }}>
                  <span className="detail-label">Bio</span>
                  <span className="detail-value">{profile.bio || 'Software Engineer passionate about AI'}</span>
                </div>

                <div className="detail-item" style={{ gridColumn: 'span 2' }}>
                  <span className="detail-label">Skills</span>
                  <div className="skills-badges-list">
                    {Array.isArray(profile.skills) && profile.skills.length > 0 ? (
                      profile.skills.map((skill, idx) => (
                        <span key={idx} className="skill-tag-pill">
                          {skill}
                        </span>
                      ))
                    ) : (
                      <span className="detail-value">TypeScript, NestJS, React</span>
                    )}
                  </div>
                </div>

                <div className="detail-item">
                  <span className="detail-label">Education</span>
                  <span className="detail-value">{profile.education || 'B.Tech in Computer Science'}</span>
                </div>

                {profile.resumeUrl && (
                  <div className="detail-item">
                    <span className="detail-label">Resume</span>
                    <a
                      href={profile.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="detail-value"
                      style={{ color: 'var(--color-primary-orange)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                    >
                      View Resume <ExternalLink size={13} />
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Edit Profile Modal Dialog */}
      <EditProfileModal
        isOpen={Boolean(activeModalSection)}
        section={activeModalSection || 'personal'}
        onClose={() => setActiveModalSection(null)}
        profile={profile}
        onSave={handleSaveProfile}
      />
    </div>
  );
}
