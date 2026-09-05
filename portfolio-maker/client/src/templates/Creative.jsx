import React from 'react';
import { Mail, Phone, MapPin, ExternalLink, Sparkles, Layers, Award } from 'lucide-react';
import { Github, Linkedin, Twitter, Instagram, Youtube, Globe } from '../components/common/SocialIcons';

const Creative = ({ portfolio }) => {
  const { personalInfo = {}, education = [], skills = [], experience = [], projects = [], certifications = [], socialLinks = {} } = portfolio || {};

  return (
    <div
      id="portfolio-render-area"
      className="p-4 p-md-5 text-white"
      style={{
        minHeight: '100%',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #311042 100%)',
        fontFamily: "'Outfit', sans-serif"
      }}
    >
      {/* Hero Header */}
      <div className="glass-panel p-4 p-md-5 mb-5 border-0 shadow-lg text-center position-relative overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
        <div className="mb-3">
          {personalInfo.profileImage ? (
            <img
              src={personalInfo.profileImage.startsWith('http') || personalInfo.profileImage.startsWith('/') ? personalInfo.profileImage : `http://localhost:5000${personalInfo.profileImage}`}
              alt={personalInfo.fullName}
              className="rounded-circle img-fluid p-1 shadow"
              style={{ width: '140px', height: '140px', objectFit: 'cover', background: 'var(--accent-gradient)' }}
            />
          ) : (
            <div
              className="rounded-circle d-flex align-items-center justify-content-center mx-auto shadow"
              style={{ width: '130px', height: '130px', background: 'var(--accent-gradient)', fontSize: '3rem', fontWeight: 800 }}
            >
              {personalInfo.fullName ? personalInfo.fullName.charAt(0).toUpperCase() : 'C'}
            </div>
          )}
        </div>

        <div className="badge badge-gradient px-3 py-1 mb-2 text-white" style={{ background: 'var(--accent-gradient)' }}>
          <Sparkles size={14} className="me-1" /> Dynamic Creative Portfolio
        </div>
        <h1 className="display-4 fw-extrabold gradient-text mb-2">{personalInfo.fullName || 'Creative Developer'}</h1>
        <h4 className="text-pink-400 mb-3" style={{ color: '#f472b6' }}>{personalInfo.title || 'UI/UX & Full Stack Engineer'}</h4>
        <p className="lead text-secondary mx-auto mb-4" style={{ maxWidth: '650px', fontSize: '1.1rem' }}>
          {personalInfo.bio}
        </p>

        {/* Social Badges */}
        <div className="d-flex justify-content-center gap-2 flex-wrap">
          {socialLinks.github && (
            <a href={socialLinks.github} target="_blank" rel="noreferrer" className="btn btn-sm btn-gradient">
              <Github size={16} /> GitHub
            </a>
          )}
          {socialLinks.linkedin && (
            <a href={socialLinks.linkedin} target="_blank" rel="noreferrer" className="btn btn-sm btn-gradient">
              <Linkedin size={16} /> LinkedIn
            </a>
          )}
        </div>
      </div>

      {/* Projects Showcase */}
      {projects.length > 0 && (
        <div className="mb-5">
          <h3 className="h3 fw-bold text-white mb-4">
            <Sparkles className="text-pink-400 me-2" size={24} style={{ color: '#ec4899' }} /> Featured Work
          </h3>
          <div className="row g-4">
            {projects.map((proj, idx) => (
              <div key={idx} className="col-md-6">
                <div className="p-4 glass-panel h-100 border-0" style={{ background: 'rgba(255,255,255,0.07)' }}>
                  <h4 className="fw-bold text-white mb-2">{proj.title}</h4>
                  <p className="small text-secondary mb-3">{proj.description}</p>
                  {proj.technologies && (
                    <div className="d-flex flex-wrap gap-1 mb-3">
                      {proj.technologies.map((t, tIdx) => (
                        <span key={tIdx} className="badge" style={{ background: 'rgba(236, 72, 153, 0.2)', color: '#f472b6' }}>
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                  {proj.githubUrl && (
                    <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="small text-info text-decoration-none me-3">
                      Source Code →
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills Pill Badges */}
      {skills.length > 0 && (
        <div className="mb-5">
          <h3 className="h3 fw-bold text-white mb-4">Skills & Mastery</h3>
          <div className="d-flex flex-wrap gap-2">
            {skills.map((s, idx) => (
              <div key={idx} className="px-3 py-2 rounded-pill glass-panel d-flex align-items-center gap-2" style={{ background: 'rgba(255,255,255,0.08)' }}>
                <span className="fw-bold text-white small">{s.name}</span>
                <span className="badge bg-primary rounded-circle" style={{ fontSize: '0.65rem' }}>{s.level}%</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Creative;
