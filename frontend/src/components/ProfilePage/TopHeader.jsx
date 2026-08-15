import React from 'react';
import { Search, MessageSquare, Bell } from 'lucide-react';

export default function TopHeader() {
  const formattedDate = new Date().toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  return (
    <header className="profile-top-bar">
      <div className="top-bar-search-box">
        <Search className="search-icon" />
        <input
          type="text"
          className="search-input"
          placeholder="Search"
          aria-label="Search"
        />
      </div>

      <div className="top-bar-right">
        <span className="top-bar-date">{formattedDate || 'Tuesday, 18 July'}</span>

        <button className="icon-badge-btn" aria-label="Messages">
          <MessageSquare size={18} />
          <span className="badge-count">01</span>
        </button>

        <button className="icon-badge-btn" aria-label="Notifications">
          <Bell size={18} />
          <span className="badge-count">01</span>
        </button>
      </div>
    </header>
  );
}
