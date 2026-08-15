import React, { useState, useEffect } from 'react';
import { X, MapPin, DollarSign, Calendar, Briefcase, Mail, User, CheckCircle } from 'lucide-react';
import { getJobDetails } from '../../utils/jobService';
import { applyForJob } from '../../utils/applicationService';
import { getStoredUser } from '../../utils/authService';

export default function JobDetailModal({ jobId, isOpen, onClose }) {
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [applied, setApplied] = useState(false);
  const [msg, setMsg] = useState('');

  const handleApply = async () => {
    const storedUser = getStoredUser();
    setSubmitting(true);
    setMsg('');
    try {
      const res = await applyForJob({ userId: storedUser?.id, jobId });
      setApplied(true);
      setMsg(res.message || 'Application Submitted!');
    } catch (err) {
      console.error('Failed to apply for job:', err);
      setMsg('Failed to submit application.');
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (!jobId || !isOpen) return;

    let isMounted = true;
    async function loadDetail() {
      setLoading(true);
      try {
        const data = await getJobDetails(jobId);
        if (isMounted) setJob(data);
      } catch (err) {
        console.error('Failed to load job detail:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadDetail();
    return () => {
      isMounted = false;
    };
  }, [jobId, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="job-modal-box" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {job?.companyLogo && (
              <img
                src={job.companyLogo}
                alt={job.company}
                style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }}
              />
            )}
            <div>
              <h3 className="modal-title">{job?.title || 'Job Details'}</h3>
              <span style={{ fontSize: '13px', color: '#64748B', fontWeight: '500' }}>
                {job?.company}
              </span>
            </div>
          </div>

          <button className="modal-close-btn" onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="modal-body">
          {loading ? (
            <div style={{ padding: '40px', textAlign: 'center', color: '#64748B' }}>
              Fetching job details from GET /jobs/detail/{jobId}...
            </div>
          ) : !job ? (
            <div style={{ padding: '20px', color: '#EF4444' }}>Job details not found.</div>
          ) : (
            <>
              {/* Meta Stats Bar */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '12px',
                  backgroundColor: job.bgColor || '#F8FAFC',
                  padding: '16px',
                  borderRadius: '16px',
                  border: '1px solid rgba(0,0,0,0.06)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <DollarSign size={18} color="#0F1217" />
                  <div>
                    <div style={{ fontSize: '11px', color: '#64748B' }}>Salary</div>
                    <div style={{ fontSize: '14px', fontWeight: '800', color: '#0F1217' }}>
                      {job.salary}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <MapPin size={18} color="#0F1217" />
                  <div>
                    <div style={{ fontSize: '11px', color: '#64748B' }}>Location</div>
                    <div style={{ fontSize: '14px', fontWeight: '700', color: '#0F1217' }}>
                      {job.location}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Calendar size={18} color="#0F1217" />
                  <div>
                    <div style={{ fontSize: '11px', color: '#64748B' }}>Posted</div>
                    <div style={{ fontSize: '14px', fontWeight: '700', color: '#0F1217' }}>
                      {job.date}
                    </div>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="job-tags-list" style={{ marginTop: '4px' }}>
                {Array.isArray(job.tags) &&
                  job.tags.map((tag, idx) => (
                    <span key={idx} className="job-tag-badge">
                      {tag}
                    </span>
                  ))}
              </div>

              {/* Description */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <h4 style={{ fontSize: '15px', fontWeight: '700', color: '#0F172A' }}>
                  Description
                </h4>
                <p style={{ fontSize: '14px', color: '#334155', lineHeight: '1.6' }}>
                  {job.description || 'Looking for a NestJS & React developer.'}
                </p>
              </div>

              {/* Recruiter Information */}
              <div
                style={{
                  borderTop: '1px solid #F1F5F9',
                  paddingTop: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                }}
              >
                <h4 style={{ fontSize: '14px', fontWeight: '700', color: '#0F172A' }}>
                  Recruiter Contact
                </h4>
                <div style={{ display: 'flex', gap: '20px', fontSize: '13.5px', color: '#475569' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <User size={15} color="#64748B" />
                    <span>ID: <strong>{job.recruiterId || 'recruiter_01'}</strong></span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Mail size={15} color="#64748B" />
                    <span>{job.recruiterEmail || 'recruiter@company.com'}</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer CTA */}
        <div className="modal-footer">
          {applied ? (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: '#10B981',
                fontWeight: '700',
                fontSize: '14px',
              }}
            >
              <CheckCircle size={18} /> {msg || 'Application Submitted!'}
            </div>
          ) : (
            <button
              className="submit-job-btn"
              onClick={handleApply}
              disabled={loading || submitting || !job}
            >
              {submitting ? 'Submitting...' : 'Apply Now'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
