import React, { useState, useEffect } from 'react';
import { X, Users, Mail, CheckCircle2, Clock, UserCheck } from 'lucide-react';
import { getJobApplications } from '../../utils/applicationService';

export default function JobApplicantsModal({ jobId, isOpen, onClose }) {
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!jobId || !isOpen) return;

    async function loadApplicants() {
      setLoading(true);
      try {
        const data = await getJobApplications(jobId);
        setApplicants(data);
      } catch (err) {
        console.error('Failed to load job applicants:', err);
      } finally {
        setLoading(false);
      }
    }

    loadApplicants();
  }, [jobId, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="job-modal-box" style={{ maxWidth: '640px' }} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Users size={22} color="#044635" />
            <h3 className="modal-title">Job Applicants List</h3>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="modal-body" style={{ maxHeight: '420px', overflowY: 'auto' }}>
          {loading ? (
            <div style={{ padding: '40px', textAlign: 'center', color: '#64748B' }}>
              Fetching applicants from GET /applications/job/{jobId}...
            </div>
          ) : applicants.length === 0 ? (
            <div style={{ padding: '40px', textAlign: 'center', color: '#64748B' }}>
              <UserCheck size={36} color="#94A3B8" style={{ marginBottom: '8px' }} />
              <div>No applications received for this job posting yet.</div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {applicants.map((app, index) => {
                const student = app.applicant || {};
                const profile = student.profile || {};
                return (
                  <div
                    key={app.id || index}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justify-content: 'space-between',
                      padding: '14px 18px',
                      backgroundColor: '#F8FAFC',
                      borderRadius: '14px',
                      border: '1px solid #E2E8F0',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div
                        style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '50%',
                          backgroundColor: '#E2E8F0',
                          display: 'flex',
                          alignItems: 'center',
                          justify-content: 'center',
                          fontWeight: '700',
                          color: '#0F172A',
                        }}
                      >
                        {profile.firstName ? profile.firstName[0] : 'S'}
                      </div>
                      <div>
                        <div style={{ fontWeight: '700', fontSize: '14px', color: '#0F172A' }}>
                          {profile.firstName ? `${profile.firstName} ${profile.lastName || ''}` : 'Applicant Candidate'}
                        </div>
                        <div style={{ fontSize: '12px', color: '#64748B', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Mail size={12} /> {student.email || 'candidate@student.com'}
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span
                        style={{
                          fontSize: '11px',
                          fontWeight: '700',
                          padding: '4px 10px',
                          borderRadius: '8px',
                          backgroundColor: app.status === 'ACCEPTED' ? '#DCFCE7' : '#FEF3C7',
                          color: app.status === 'ACCEPTED' ? '#166534' : '#92400E',
                        }}
                      >
                        {app.status || 'PENDING'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
