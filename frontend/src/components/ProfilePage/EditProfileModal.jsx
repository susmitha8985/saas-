import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export default function EditProfileModal({ isOpen, onClose, profile, onSave, section = 'personal' }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    role: '',
    country: '',
    city: '',
    postalCode: '',
    bio: '',
    skillsStr: '',
    education: '',
    resumeUrl: '',
  });

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (profile) {
      setFormData({
        firstName: profile.firstName || '',
        lastName: profile.lastName || '',
        email: profile.email || '',
        phone: profile.phone || '',
        dateOfBirth: profile.dateOfBirth || '1990-10-12',
        role: profile.role || 'Admin',
        country: profile.country || 'United Kingdom',
        city: profile.city || 'Leeds, East London',
        postalCode: profile.postalCode || 'ERT 1254',
        bio: profile.bio || 'Software Engineer passionate about AI',
        skillsStr: Array.isArray(profile.skills) ? profile.skills.join(', ') : profile.skills || 'TypeScript, NestJS, React',
        education: profile.education || 'B.Tech in Computer Science',
        resumeUrl: profile.resumeUrl || 'https://example.com/resume.pdf',
      });
    }
  }, [profile, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    const skillsArray = formData.skillsStr
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const updatedProfile = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      name: `${formData.firstName} ${formData.lastName}`.trim(),
      email: formData.email,
      phone: formData.phone,
      dateOfBirth: formData.dateOfBirth,
      displayDateOfBirth: formData.dateOfBirth ? formData.dateOfBirth.split('-').reverse().join('-') : '12-10-1990',
      role: formData.role,
      country: formData.country,
      city: formData.city,
      postalCode: formData.postalCode,
      location: `${formData.city}, ${formData.country}`,
      bio: formData.bio,
      skills: skillsArray,
      education: formData.education,
      resumeUrl: formData.resumeUrl,
    };

    try {
      await onSave(updatedProfile);
      onClose();
    } catch (err) {
      console.error('Failed to save profile changes:', err);
    } finally {
      setSaving(false);
    }
  };

  const modalTitle = section === 'address'
    ? 'Edit Address Details'
    : section === 'academic'
    ? 'Edit Professional Details'
    : 'Edit Personal Information';

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="edit-modal-box" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <h3 className="modal-title">{modalTitle}</h3>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            {section === 'personal' && (
              <>
                <div className="form-grid-2">
                  <div className="form-group">
                    <label className="form-label">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="form-input"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="form-input"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Phone Number</label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>

                <div className="form-grid-2">
                  <div className="form-group">
                    <label className="form-label">Date of Birth</label>
                    <div style={{ position: 'relative' }}>
                      <input
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                        className="form-input"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">User Role</label>
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      className="form-input"
                    >
                      <option value="Admin">Admin</option>
                      <option value="Software Engineer">Software Engineer</option>
                      <option value="Student">Student</option>
                      <option value="Instructor">Instructor</option>
                    </select>
                  </div>
                </div>
              </>
            )}

            {section === 'address' && (
              <>
                <div className="form-group">
                  <label className="form-label">Country</label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-grid-2">
                  <div className="form-group">
                    <label className="form-label">City</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="form-input"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Postal Code</label>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </div>
                </div>
              </>
            )}

            {section === 'academic' && (
              <>
                <div className="form-group">
                  <label className="form-label">Bio</label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    className="form-input form-textarea"
                    placeholder="Short bio..."
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Skills (comma-separated)</label>
                  <input
                    type="text"
                    name="skillsStr"
                    value={formData.skillsStr}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="TypeScript, NestJS, React"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Education</label>
                  <input
                    type="text"
                    name="education"
                    value={formData.education}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="B.Tech in Computer Science"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Resume URL</label>
                  <input
                    type="url"
                    name="resumeUrl"
                    value={formData.resumeUrl}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="https://example.com/resume.pdf"
                  />
                </div>
              </>
            )}
          </div>

          {/* Footer */}
          <div className="modal-footer">
            <button
              type="submit"
              className="save-changes-btn"
              disabled={saving}
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
