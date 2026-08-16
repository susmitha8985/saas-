import React, { useState } from 'react';
import { X, Send } from 'lucide-react';
import { postNewJob } from '../../utils/jobService';
import { getStoredUser } from '../../utils/authService';

export default function PostJobModal({ isOpen, onClose, onJobPosted }) {
  const [userId, setUserId] = useState(() => getStoredUser()?.id || 'b6f48769-201a-4319-ae04-146a62cdc935');
  const [formData, setFormData] = useState({
    title: 'Fullstack Developer',
    description: 'Looking for a NestJS & React developer.',
    company: 'Tech Corp',
    location: 'Remote',
    salary: '$150/hr',
    tagsStr: 'Full time, Senior level, Remote',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!formData.title.trim()) {
      setError('Job Title is required.');
      return;
    }
    if (!formData.company.trim()) {
      setError('Company Name is required.');
      return;
    }
    if (!formData.description.trim()) {
      setError('Job Description is required.');
      return;
    }

    setLoading(true);

    const tagsArray = formData.tagsStr
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const payload = {
      title: formData.title,
      description: formData.description,
      company: formData.company,
      location: formData.location,
      salary: formData.salary,
      tags: tagsArray,
    };

    try {
      const created = await postNewJob(userId, payload);
      if (onJobPosted) {
        onJobPosted(created);
      }
      onClose();
    } catch (err) {
      console.error('POST /jobs/:userId Error:', err);
      setError(err.message || 'Failed to post job');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="job-modal-box" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <h3 className="modal-title">Post a New Job (Recruiter)</h3>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            {error && (
              <div style={{ padding: '10px 14px', backgroundColor: '#FEF2F2', color: '#991B1B', borderRadius: '8px', fontSize: '13px' }}>
                {error}
              </div>
            )}

            <div className="form-group">
              <label className="form-label">Recruiter User ID (URL Param)</label>
              <input
                type="text"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                className="form-input"
                placeholder="b6f48769-201a-4319-ae04-146a62cdc935"
                required
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div className="form-group">
                <label className="form-label">Job Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Fullstack Developer"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Company Name</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Tech Corp"
                  required
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div className="form-group">
                <label className="form-label">Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Remote"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Salary Rate</label>
                <input
                  type="text"
                  name="salary"
                  value={formData.salary}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="$150/hr"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="form-input"
                style={{ minHeight: '80px', resize: 'vertical' }}
                placeholder="Looking for a NestJS & React developer."
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Tags (comma-separated)</label>
              <input
                type="text"
                name="tagsStr"
                value={formData.tagsStr}
                onChange={handleChange}
                className="form-input"
                placeholder="Full time, Senior level, Remote"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="modal-footer">
            <button
              type="submit"
              className="submit-job-btn"
              disabled={loading}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
            >
              {loading ? 'Posting...' : 'Publish Job'} <Send size={15} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
