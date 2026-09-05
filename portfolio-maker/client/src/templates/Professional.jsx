import React from 'react';
import { Mail, Phone, MapPin, ExternalLink, Briefcase, GraduationCap, Award } from 'lucide-react';
import { Github, Linkedin, Twitter, Instagram, Youtube, Globe } from '../components/common/SocialIcons';

const Professional = ({ portfolio }) => {
  const { personalInfo = {}, education = [], skills = [], experience = [], projects = [], certifications = [], socialLinks = {} } = portfolio || {};

  return (
    <div id="portfolio-render-area" className="p-4 p-md-5 bg-white text-dark" style={{ minHeight: '100%', fontFamily: "'Inter', sans-serif" }}>
      {/* Header Banner */}
      <div className="p-4 rounded-3 mb-4 text-white" style={{ background: '#1e293b' }}>
        <div className="row align-items-center g-3">
          <div className="col-md-3 text-center text-md-start">
            {personalInfo.profileImage ? (
              <img
                src={personalInfo.profileImage.startsWith('http') || personalInfo.profileImage.startsWith('/') ? personalInfo.profileImage : `http://localhost:5000${personalInfo.profileImage}`}
                alt={personalInfo.fullName}
                className="rounded-circle img-fluid border border-3 border-white shadow-sm"
                style={{ width: '130px', height: '130px', objectFit: 'cover' }}
              />
            ) : (
              <div
                className="rounded-circle d-flex align-items-center justify-content-center mx-auto mx-md-0 shadow-sm"
                style={{ width: '120px', height: '120px', background: '#3b82f6', color: '#fff', fontSize: '2.5rem', fontWeight: 700 }}
              >
                {personalInfo.fullName ? personalInfo.fullName.charAt(0).toUpperCase() : 'P'}
              </div>
            )}
          </div>
          <div className="col-md-9 text-center text-md-start">
            <h1 className="h2 fw-bold text-white mb-1">{personalInfo.fullName || 'Professional Name'}</h1>
            <h5 className="text-blue-400 font-sans-serif mb-2" style={{ color: '#60a5fa' }}>{personalInfo.title || 'Software Engineer'}</h5>
            <p className="small text-slate-300 mb-3" style={{ maxWidth: '600px', color: '#cbd5e1' }}>{personalInfo.bio}</p>

            <div className="d-flex flex-wrap gap-3 small text-slate-300 mb-3">
              {personalInfo.email && <span><Mail size={14} /> {personalInfo.email}</span>}
              {personalInfo.phone && <span><Phone size={14} /> {personalInfo.phone}</span>}
              {personalInfo.location && <span><MapPin size={14} /> {personalInfo.location}</span>}
            </div>

            <div className="d-flex gap-2 justify-content-center justify-content-md-start">
              {socialLinks.github && <a href={socialLinks.github} target="_blank" rel="noreferrer" className="btn btn-sm btn-light"><Github size={14} /> GitHub</a>}
              {socialLinks.linkedin && <a href={socialLinks.linkedin} target="_blank" rel="noreferrer" className="btn btn-sm btn-light"><Linkedin size={14} /> LinkedIn</a>}
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="row g-4">
        {/* Left Column: Experience & Projects */}
        <div className="col-md-7">
          {experience.length > 0 && (
            <div className="mb-4">
              <h4 className="fw-bold border-bottom pb-2 mb-3 text-navy" style={{ color: '#0f172a' }}>
                <Briefcase className="text-primary me-2" size={20} /> Work History
              </h4>
              <div className="d-flex flex-column gap-3">
                {experience.map((exp, idx) => (
                  <div key={idx} className="p-3 border-start border-3 border-primary bg-light rounded-end">
                    <div className="d-flex justify-content-between align-items-baseline">
                      <h6 className="fw-bold mb-0 text-dark">{exp.title}</h6>
                      <span className="badge bg-secondary">{exp.type}</span>
                    </div>
                    <div className="small text-primary fw-semibold mb-2">{exp.company} | {exp.startDate} - {exp.current ? 'Present' : exp.endDate}</div>
                    <p className="small text-secondary mb-0">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {projects.length > 0 && (
            <div>
              <h4 className="fw-bold border-bottom pb-2 mb-3 text-navy" style={{ color: '#0f172a' }}>
                Projects & Portfolio
              </h4>
              <div className="row g-3">
                {projects.map((proj, idx) => (
                  <div key={idx} className="col-12">
                    <div className="p-3 border rounded shadow-sm bg-white">
                      <h6 className="fw-bold mb-1">{proj.title}</h6>
                      <p className="small text-secondary mb-2">{proj.description}</p>
                      {proj.technologies && (
                        <div className="d-flex flex-wrap gap-1 mb-2">
                          {proj.technologies.map((t, tIdx) => (
                            <span key={tIdx} className="badge bg-light text-dark border">{t}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Education & Skills */}
        <div className="col-md-5">
          {skills.length > 0 && (
            <div className="mb-4">
              <h4 className="fw-bold border-bottom pb-2 mb-3 text-navy" style={{ color: '#0f172a' }}>
                Core Skills
              </h4>
              <div className="d-flex flex-column gap-2">
                {skills.map((s, idx) => (
                  <div key={idx}>
                    <div className="d-flex justify-content-between small mb-1">
                      <span className="fw-semibold">{s.name}</span>
                      <span className="text-muted">{s.level}%</span>
                    </div>
                    <div className="progress" style={{ height: '6px' }}>
                      <div className="progress-bar bg-primary" style={{ width: `${s.level}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {education.length > 0 && (
            <div className="mb-4">
              <h4 className="fw-bold border-bottom pb-2 mb-3 text-navy" style={{ color: '#0f172a' }}>
                <GraduationCap className="text-primary me-2" size={20} /> Education
              </h4>
              {education.map((edu, idx) => (
                <div key={idx} className="mb-3 p-3 bg-light rounded border">
                  <h6 className="fw-bold mb-0 text-dark">{edu.degree}</h6>
                  <div className="small text-muted mb-1">{edu.institution}</div>
                  <div className="small text-primary fw-bold">{edu.startYear} - {edu.endYear}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Professional;
