import React, { useState, useEffect } from 'react';
import { X, Users, Mail, FileText, Download, CheckCircle, Clock } from 'lucide-react';
import { getJobApplicants } from '../../utils/applicationService';
import './JobsPage.css';

export default function ViewApplicantsModal({ jobId, jobTitle, isOpen, onClose }) {
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen && jobId) {
      setLoading(true);
      getJobApplicants(jobId)
        .then((res) => {
          setApplicants(res || []);
        })
        .catch((e) => console.error(e))
        .finally(() => setLoading(false));
    }
  }, [isOpen, jobId]);

  if (!isOpen) return null;

  return (
    <div className="job-modal-backdrop" onClick={onClose}>
      <div
        className="job-modal-container"
        style={{ maxWidth: '640px' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="job-modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: '#FEE2E2', color: '#D9534F', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Users size={20} />
            </div>
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: '800', margin: 0, color: '#1E1E1E' }}>
                Candidates for {jobTitle || 'Job Position'}
              </h2>
              <span style={{ fontSize: '12px', color: '#78746D' }}>
                {applicants.length} Total applicants
              </span>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="job-modal-body">
          {loading ? (
            <div style={{ padding: '40px', textAlign: 'center', color: '#78746D' }}>
              Loading applicant profiles...
            </div>
          ) : applicants.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {applicants.map((item) => {
                const applicant = item.applicant || {};
                const profile = applicant.profile || {};
                const candidateName = profile.firstName
                  ? `${profile.firstName} ${profile.lastName || ''}`.trim()
                  : applicant.email?.split('@')[0] || 'Candidate';

                return (
                  <div
                    key={item.id}
                    style={{
                      padding: '16px 20px',
                      backgroundColor: '#FAF7F2',
                      borderRadius: '14px',
                      border: '1px solid #EFEBE4',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '14px'
                    }}
                  >
                    <div>
                      <h4 style={{ margin: '0 0 4px 0', fontSize: '15px', fontWeight: '800', color: '#1E1E1E' }}>
                        {candidateName}
                      </h4>
                      <div style={{ fontSize: '12.5px', color: '#646464', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Mail size={13} /> {applicant.email || 'No email provided'}
                      </div>
                      {profile.skills && (
                        <div style={{ marginTop: '6px', fontSize: '11.5px', color: '#D9534F', fontWeight: '700' }}>
                          Skills: {Array.isArray(profile.skills) ? profile.skills.join(', ') : profile.skills}
                        </div>
                      )}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      {profile.resumeUrl ? (
                        <a
                          href={profile.resumeUrl}
                          target="_blank"
                          rel="noreferrer"
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            padding: '8px 12px',
                            backgroundColor: '#FFFFFF',
                            border: '1px solid #D8D2C6',
                            borderRadius: '8px',
                            color: '#1E1E1E',
                            fontSize: '12px',
                            fontWeight: '700',
                            textDecoration: 'none'
                          }}
                        >
                          <FileText size={14} color="#D9534F" /> Resume
                        </a>
                      ) : (
                        <span style={{ fontSize: '11px', color: '#94A3B8' }}>No CV attached</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div style={{ padding: '40px', textAlign: 'center', color: '#78746D' }}>
              No candidates have applied to this job listing yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
