import React from 'react';
import { X, BookOpen, Briefcase, Award, Rocket, Check } from 'lucide-react';

export default function AboutModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="job-modal-box" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '580px' }}>
        {/* Header */}
        <div className="modal-header">
          <div>
            <h3 className="modal-title" style={{ fontSize: '22px' }}>About codeforeverybody</h3>
            <span style={{ fontSize: '13px', color: '#54B5FF', fontWeight: '700' }}>
              Premier Course Selling & Career Placement Platform
            </span>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="modal-body">
          {/* Mission Banner */}
          <div
            style={{
              background: 'linear-gradient(135deg, #0F1217 0%, #1E2638 100%)',
              color: '#FFFFFF',
              padding: '20px',
              borderRadius: '18px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <h4 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '8px', color: '#FFFFFF' }}>
              Learn Skills. Build Projects. Land Your Dream Job.
            </h4>
            <p style={{ fontSize: '13.5px', color: '#CBD5E1', lineHeight: '1.6' }}>
              <strong>codeforeverybody</strong> is an interactive course platform empowering developers with job-ready skills in Fullstack Engineering, System Design, AI, and cloud architecture, paired directly with top tech recruiters.
            </p>
          </div>

          {/* Pillars List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '4px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <div style={{ background: '#E0F2FE', padding: '8px', borderRadius: '10px', color: '#0284C7' }}>
                <BookOpen size={20} />
              </div>
              <div>
                <div style={{ fontSize: '15px', fontWeight: '700', color: '#0F172A' }}>
                  Industry-Oriented Coding Courses
                </div>
                <div style={{ fontSize: '13px', color: '#64748B' }}>
                  Master React, NestJS, Python, FastAPI, and Cloud Infrastructure with real hands-on lab projects.
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <div style={{ background: '#DCFCE7', padding: '8px', borderRadius: '10px', color: '#16A34A' }}>
                <Briefcase size={20} />
              </div>
              <div>
                <div style={{ fontSize: '15px', fontWeight: '700', color: '#0F172A' }}>
                  Direct Recruiter Job Board
                </div>
                <div style={{ fontSize: '13px', color: '#64748B' }}>
                  Connect course graduates directly with hiring managers posting remote and full-time engineering roles.
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <div style={{ background: '#F3E8FF', padding: '8px', borderRadius: '10px', color: '#9333EA' }}>
                <Award size={20} />
              </div>
              <div>
                <div style={{ fontSize: '15px', fontWeight: '700', color: '#0F172A' }}>
                  Verified Skills & Certificates
                </div>
                <div style={{ fontSize: '13px', color: '#64748B' }}>
                  Earn verified certificates that showcase your production-ready code to prospective employers.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <button
            className="submit-job-btn"
            onClick={onClose}
            style={{ background: '#0F1217', color: '#FFFFFF' }}
          >
            Got It!
          </button>
        </div>
      </div>
    </div>
  );
}
