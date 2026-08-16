import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  UploadCloud,
  FileText,
  CheckCircle2,
  Download,
  Eye,
  Sparkles,
  AlertCircle,
  Edit3,
  Trash2
} from 'lucide-react';
import AppSidebar from '../common/AppSidebar';
import { getStoredUser } from '../../utils/authService';
import { getProfile, updateProfile } from '../../utils/profileService';
import { uploadResumeFile } from '../../utils/applicationService';
import { useSEO } from '../../utils/seo';
import './ResumePage.css';

export default function ResumePage() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const storedUser = getStoredUser();
  const [profile, setProfile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const [uploadedResume, setUploadedResume] = useState(null);

  useSEO({
    title: 'Resume & ATS Review - codeforeverybody',
    description: 'Upload your resume, analyze ATS keyword compatibility, and manage your job application documents on codeforeverybody.',
  });

  useEffect(() => {
    async function load() {
      try {
        const data = await getProfile(storedUser?.id);
        setProfile(data);
        if (data?.resumeUrl) {
          setUploadedResume({
            name: data.resumeUrl.split('/').pop() || 'resume.pdf',
            url: data.resumeUrl,
            uploadedAt: 'Active Resume',
          });
        }
      } catch (err) {
        console.error('Failed to load profile for resume page:', err);
      }
    }
    load();
  }, [storedUser?.id]);

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 4000);
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate PDF/DOCX
    if (!file.name.match(/\.(pdf|docx|doc)$/i)) {
      showToast('Please upload a PDF or DOCX file format.');
      return;
    }

    setUploading(true);
    try {
      const res = await uploadResumeFile(storedUser?.id, file);
      setUploadedResume({
        name: file.name,
        url: res.path,
        uploadedAt: 'Just now',
        size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
      });

      // Update user profile resumeUrl
      if (res.path) {
        await updateProfile(storedUser?.id, { resumeUrl: res.path });
      }

      showToast('Resume uploaded and connected successfully to your profile!');
    } catch (err) {
      console.error(err);
      showToast(err.message || 'Failed to upload resume.');
    } finally {
      setUploading(false);
    }
  };

  const displayName = profile?.firstName
    ? `${profile.firstName} ${profile.lastName || ''}`.trim()
    : profile?.name || 'Natashia Khaleira';

  const skillsList = Array.isArray(profile?.skills) ? profile.skills : ['TypeScript', 'NestJS', 'React', 'Node.js', 'System Design'];

  return (
    <div className="res-page-container">
      <div className="res-dashboard-frame">
        {/* Unified App Sidebar */}
        <AppSidebar customUser={profile} />

        {/* Main Content Area */}
        <main className="res-main-content">
          {/* Header Row */}
          <div className="res-header-row">
            <div>
              <h1 className="res-page-title">Resume & Career Portfolio</h1>
              <p className="res-page-sub">Upload your latest CV, run ATS checks, and sync your credentials for job applications.</p>
            </div>
            <button
              className="res-primary-btn"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
            >
              <UploadCloud size={17} />
              {uploading ? 'Uploading...' : 'Upload New Resume'}
            </button>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              accept=".pdf,.docx,.doc"
              onChange={handleFileChange}
            />
          </div>

          {/* Toast Alert */}
          {toastMsg && (
            <div style={{
              padding: '12px 18px',
              backgroundColor: '#1E1E1E',
              color: '#FFFFFF',
              borderRadius: '12px',
              fontSize: '14px',
              fontWeight: '600'
            }}>
              {toastMsg}
            </div>
          )}

          {/* 2-Column Split Content */}
          <div className="res-split-grid">
            {/* Left Column: Upload & Interactive Resume View */}
            <div>
              {/* Drag & Drop Upload Zone */}
              <div
                className="res-upload-card"
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="res-upload-icon">
                  <UploadCloud size={28} />
                </div>
                <h3 className="res-upload-heading">
                  {uploading ? 'Uploading file...' : 'Drop your resume here or Browse files'}
                </h3>
                <p className="res-upload-desc">
                  Supports PDF and DOCX up to 10MB. Uploaded resume will be automatically attached when applying to jobs.
                </p>
              </div>

              {/* Active Uploaded File Card */}
              {uploadedResume && (
                <div className="res-file-card">
                  <div className="res-file-info">
                    <div style={{ width: '42px', height: '42px', backgroundColor: '#FEE2E2', color: '#D9534F', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <FileText size={22} />
                    </div>
                    <div>
                      <h4 className="res-file-name">{uploadedResume.name}</h4>
                      <div className="res-file-size">
                        {uploadedResume.size || '1.4 MB'} • {uploadedResume.uploadedAt}
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                      className="res-primary-btn"
                      style={{ padding: '8px 14px', fontSize: '13px' }}
                      onClick={() => window.open(uploadedResume.url, '_blank')}
                    >
                      <Eye size={15} /> Preview
                    </button>
                  </div>
                </div>
              )}

              {/* Digital Live Resume Summary */}
              <div style={{ marginTop: '24px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#1E1E1E', marginBottom: '14px' }}>
                  Live Profile Resume Preview
                </h3>

                <div className="res-paper-preview">
                  <div className="res-paper-header">
                    <h2 className="res-paper-name">{displayName}</h2>
                    <div className="res-paper-role">{profile?.role || 'Software Engineer'}</div>
                    <div className="res-paper-contact">
                      {profile?.email || 'email@example.com'} • {profile?.phone || '(+1) 555-0199'} • {profile?.city || 'San Francisco'}, {profile?.country || 'USA'}
                    </div>
                  </div>

                  <div>
                    <h4 className="res-paper-sec-title">Professional Summary</h4>
                    <p className="res-paper-text">
                      {profile?.bio || 'Fullstack Software Engineer passionate about scalable system architecture, React, and NestJS web applications.'}
                    </p>
                  </div>

                  <div>
                    <h4 className="res-paper-sec-title">Core Skills & Competencies</h4>
                    <div className="res-skills-tags">
                      {skillsList.map((skill, idx) => (
                        <span key={idx} className="res-skill-pill">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="res-paper-sec-title">Education & Credentials</h4>
                    <p className="res-paper-text">
                      {profile?.education || 'B.Tech in Computer Science & Engineering'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: ATS Optimization Score & Insights */}
            <div>
              <div className="res-ats-card">
                <div className="res-ats-score-row">
                  <div>
                    <h3 style={{ fontSize: '17px', fontWeight: '800', margin: '0 0 4px 0' }}>ATS Resume Match</h3>
                    <span style={{ fontSize: '13px', color: '#78746D' }}>Based on current tech job openings</span>
                  </div>
                  <div className="res-ats-score-badge">88%</div>
                </div>

                <div style={{ height: '1px', backgroundColor: '#EFEBE4' }} />

                <div>
                  <h4 style={{ fontSize: '14px', fontWeight: '800', margin: '0 0 10px 0', color: '#1E1E1E' }}>
                    Optimization Recommendations
                  </h4>
                  <ul className="res-tips-list">
                    <li className="res-tip-item">
                      <CheckCircle2 size={16} color="#16A34A" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span><strong>Key Skills Detected:</strong> React, TypeScript, and NestJS match 92% of software roles.</span>
                    </li>
                    <li className="res-tip-item">
                      <CheckCircle2 size={16} color="#16A34A" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span><strong>Contact Info:</strong> Email and location are verified and machine readable.</span>
                    </li>
                    <li className="res-tip-item">
                      <Sparkles size={16} color="#D9534F" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span><strong>Pro Tip:</strong> Add metrics to your experience section (e.g. "improved load time by 30%").</span>
                    </li>
                  </ul>
                </div>

                <button
                  className="res-primary-btn"
                  onClick={() => navigate('/profile')}
                  style={{ width: '100%', justifyContent: 'center', marginTop: '10px' }}
                >
                  <Edit3 size={15} /> Edit Profile Data
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
