import React, { useState } from 'react';
import { X, Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';

export default function ContactModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({ name: '', email: '', subject: 'Course & Job Query', message: '' });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="job-modal-box" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '540px' }}>
        <div className="modal-header">
          <div>
            <h3 className="modal-title">Contact codeforeverybody</h3>
            <span style={{ fontSize: '12.5px', color: '#64748B' }}>
              We are here to assist learners and recruiters 24/7
            </span>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
        </div>

        {submitted ? (
          <div style={{ padding: '40px 24px', textAlign: 'center' }}>
            <CheckCircle size={48} color="#10B981" style={{ marginBottom: '12px' }} />
            <h4 style={{ fontSize: '18px', fontWeight: '800', color: '#0F172A' }}>
              Message Sent Successfully!
            </h4>
            <p style={{ fontSize: '14px', color: '#64748B', marginTop: '6px' }}>
              Thank you for contacting codeforeverybody. Our team will reach out shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              {/* Contact Info Cards */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '12px',
                  backgroundColor: '#0F1217',
                  color: '#FFFFFF',
                  padding: '16px',
                  borderRadius: '16px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Mail size={18} color="#54B5FF" />
                  <div>
                    <div style={{ fontSize: '11px', color: '#94A3B8' }}>Email Us</div>
                    <div style={{ fontSize: '13px', fontWeight: '700', color: '#FFFFFF' }}>
                      support@codeforeverybody.com
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Phone size={18} color="#54B5FF" />
                  <div>
                    <div style={{ fontSize: '11px', color: '#94A3B8' }}>Helpline</div>
                    <div style={{ fontSize: '13px', fontWeight: '700', color: '#FFFFFF' }}>
                      +1 (800) 555-CODE
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Your Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="form-input"
                  placeholder="John Doe"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="form-input"
                  placeholder="john@example.com"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Message</label>
                <textarea
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="form-input"
                  style={{ minHeight: '80px', resize: 'vertical' }}
                  placeholder="Ask about our coding courses, job postings, or platform support..."
                />
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="submit"
                className="submit-job-btn"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#54B5FF', color: '#0F1217' }}
              >
                Send Message <Send size={15} />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
