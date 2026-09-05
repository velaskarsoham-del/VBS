import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { User, Mail, Phone, MapPin, Upload, FileText, Camera } from 'lucide-react';

const PersonalInfoStep = () => {
  const { portfolio, updateField, uploadAvatar } = usePortfolio();
  const personalInfo = portfolio.personalInfo || {};
  const [uploading, setUploading] = useState(false);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    await uploadAvatar(file);
    setUploading(false);
  };

  return (
    <div className="animate-fade-in">
      <h4 className="text-white fw-bold mb-3 d-flex align-items-center gap-2">
        <User className="text-indigo" size={20} /> Personal Information
      </h4>
      <p className="text-secondary small mb-4">Enter your core profile details and upload a profile photo.</p>

      {/* Profile Photo Upload */}
      <div className="form-group mb-4 p-3 rounded-3 border" style={{ background: 'rgba(10,13,20,0.5)', borderColor: 'var(--border-color)' }}>
        <label className="form-label mb-2">Profile Photo</label>
        <div className="d-flex align-items-center gap-3">
          {personalInfo.profileImage ? (
            <img
              src={personalInfo.profileImage.startsWith('http') || personalInfo.profileImage.startsWith('/') ? personalInfo.profileImage : `http://localhost:5000${personalInfo.profileImage}`}
              alt="Avatar"
              className="rounded-circle border"
              style={{ width: '64px', height: '64px', objectFit: 'cover', borderColor: 'var(--accent-primary)' }}
            />
          ) : (
            <div
              className="rounded-circle d-flex align-items-center justify-content-center text-white font-monospace"
              style={{ width: '64px', height: '64px', background: 'var(--accent-gradient)', fontSize: '1.5rem' }}
            >
              {personalInfo.fullName ? personalInfo.fullName.charAt(0) : '?'}
            </div>
          )}

          <div>
            <label className="btn btn-outline btn-sm cursor-pointer mb-1">
              <Upload size={14} /> {uploading ? 'Uploading...' : 'Choose Image'}
              <input type="file" accept="image/*" className="d-none" onChange={handleImageChange} disabled={uploading} />
            </label>
            <div className="small text-muted" style={{ fontSize: '0.75rem' }}>Supports JPG, PNG, WEBP (Max 5MB)</div>
          </div>
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Full Name *</label>
        <input
          type="text"
          className="form-control"
          placeholder="e.g. Soham Velaskar"
          value={personalInfo.fullName || ''}
          onChange={(e) => updateField('personalInfo', 'fullName', e.target.value)}
        />
      </div>

      <div className="form-group">
        <label className="form-label">Professional Title *</label>
        <input
          type="text"
          className="form-control"
          placeholder="e.g. Full Stack Developer | ML Enthusiast"
          value={personalInfo.title || ''}
          onChange={(e) => updateField('personalInfo', 'title', e.target.value)}
        />
      </div>

      <div className="form-group">
        <label className="form-label">Short Bio *</label>
        <textarea
          className="form-control"
          rows="3"
          placeholder="Briefly describe your passion, expertise, and goals..."
          value={personalInfo.bio || ''}
          onChange={(e) => updateField('personalInfo', 'bio', e.target.value)}
        />
      </div>

      <div className="row g-3">
        <div className="col-md-6 form-group">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            placeholder="soham@example.com"
            value={personalInfo.email || ''}
            onChange={(e) => updateField('personalInfo', 'email', e.target.value)}
          />
        </div>

        <div className="col-md-6 form-group">
          <label className="form-label">Phone Number</label>
          <input
            type="text"
            className="form-control"
            placeholder="+1 (555) 000-1234"
            value={personalInfo.phone || ''}
            onChange={(e) => updateField('personalInfo', 'phone', e.target.value)}
          />
        </div>
      </div>

      <div className="row g-3">
        <div className="col-md-6 form-group">
          <label className="form-label">Location</label>
          <input
            type="text"
            className="form-control"
            placeholder="City, Country"
            value={personalInfo.location || ''}
            onChange={(e) => updateField('personalInfo', 'location', e.target.value)}
          />
        </div>

        <div className="col-md-6 form-group">
          <label className="form-label">Resume URL</label>
          <input
            type="url"
            className="form-control"
            placeholder="https://drive.google.com/..."
            value={personalInfo.resumeUrl || ''}
            onChange={(e) => updateField('personalInfo', 'resumeUrl', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoStep;
