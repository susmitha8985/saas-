import React, { useState } from 'react';
import { Bookmark } from 'lucide-react';

export default function JobCard({ job, onSelectDetail }) {
  const [bookmarked, setBookmarked] = useState(false);

  const cardStyle = {
    backgroundColor: job.bgColor || '#F1F5F9',
  };

  return (
    <div className="job-card-item" style={cardStyle}>
      <div>
        {/* Top Row: Date Pill + Bookmark */}
        <div className="job-card-top-row">
          <span className="job-date-pill">{job.date || 'Today'}</span>
          <button
            className="bookmark-btn"
            onClick={(e) => {
              e.stopPropagation();
              setBookmarked(!bookmarked);
            }}
            aria-label="Bookmark Job"
          >
            <Bookmark
              size={16}
              fill={bookmarked ? '#0F1217' : 'none'}
              color="#0F1217"
            />
          </button>
        </div>

        {/* Company Row */}
        <div className="job-company-header">
          <span className="company-name-text">{job.company}</span>
          <img
            src={job.companyLogo || 'https://cdn-icons-png.flaticon.com/512/1006/1006771.png'}
            alt={job.company}
            className="company-logo-img"
          />
        </div>

        {/* Job Title */}
        <h3 className="job-card-title">{job.title}</h3>

        {/* Tags */}
        <div className="job-tags-list">
          {Array.isArray(job.tags) &&
            job.tags.map((tag, idx) => (
              <span key={idx} className="job-tag-badge">
                {tag}
              </span>
            ))}
        </div>
      </div>

      {/* Bottom Row: Salary + Location + Details Button */}
      <div className="job-card-bottom-row">
        <div className="salary-loc-group">
          <span className="card-salary-text">{job.salary || '$150/hr'}</span>
          <span className="card-location-text">{job.location || 'Remote'}</span>
        </div>

        <button
          className="details-btn"
          onClick={() => onSelectDetail(job)}
        >
          Details
        </button>
      </div>
    </div>
  );
}
