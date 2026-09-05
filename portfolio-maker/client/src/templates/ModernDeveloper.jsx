import React from 'react';
import { Mail, Phone, MapPin, ExternalLink, Download, Award, Briefcase, GraduationCap, Code } from 'lucide-react';
import { Github, Linkedin, Twitter, Instagram, Youtube, Globe } from '../components/common/SocialIcons';

const ModernDeveloper = ({ portfolio, isPreview = false }) => {
  const { personalInfo = {}, education = [], skills = [], experience = [], projects = [], certifications = [], socialLinks = {} } = portfolio || {};

  return (
    <div id="portfolio-render-area" className="p-4 p-md-5 text-white" style={{ background: '#0a0d14', minHeight: '100%', fontFamily: "'Inter', sans-serif" }}>
      {/* Header / Hero */}
      <div className="row align-items-center g-4 pb-5 mb-4 border-bottom" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
        <div className="col-md-3 text-center text-md-start">
          {personalInfo.profileImage ? (
            <img
              src={personalInfo.profileImage.startsWith('http') || personalInfo.profileImage.startsWith('/') ? personalInfo.profileImage : `http://localhost:5000${personalInfo.profileImage}`}
              alt={personalInfo.fullName}
              className="rounded-circle img-fluid border border-2 border-indigo shadow-lg"
              style={{ width: '150px', height: '150px', objectFit: 'cover', borderColor: '#6366f1' }}
            />
          ) : (
            <div
              className="rounded-circle d-flex align-items-center justify-content-center mx-auto mx-md-0 shadow"
              style={{ width: '140px', height: '140px', background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)', fontSize: '3rem', fontWeight: 800 }}
            >
              {personalInfo.fullName ? personalInfo.fullName.charAt(0).toUpperCase() : 'D'}
            </div>
          )}
        </div>

        <div className="col-md-9 text-center text-md-start">
          <div className="d-inline-flex align-items-center gap-2 px-3 py-1 mb-2 rounded-pill font-monospace small" style={{ background: 'rgba(99,102,241,0.15)', color: '#a5b4fc', border: '1px solid rgba(99,102,241,0.3)' }}>
            <Code size={14} /> Available for Hire
          </div>
          <h1 className="display-4 fw-extrabold text-white mb-2" style={{ letterSpacing: '-1px' }}>
            {personalInfo.fullName || 'Developer Name'}
          </h1>
          <h4 className="text-info font-monospace mb-3">{personalInfo.title || 'Full Stack Developer'}</h4>

          <p className="text-secondary mb-4" style={{ maxWidth: '650px', fontSize: '1rem', lineHeight: '1.7' }}>
            {personalInfo.bio || 'Passionate developer crafting high performance applications.'}
          </p>

          {/* Contact Details */}
          <div className="d-flex flex-wrap align-items-center gap-3 text-secondary small mb-4">
            {personalInfo.email && (
              <span className="d-flex align-items-center gap-1">
                <Mail size={14} className="text-indigo" /> {personalInfo.email}
              </span>
            )}
            {personalInfo.phone && (
              <span className="d-flex align-items-center gap-1">
                <Phone size={14} className="text-indigo" /> {personalInfo.phone}
              </span>
            )}
            {personalInfo.location && (
              <span className="d-flex align-items-center gap-1">
                <MapPin size={14} className="text-indigo" /> {personalInfo.location}
              </span>
            )}
          </div>

          {/* Social Links */}
          <div className="d-flex flex-wrap gap-2 justify-content-center justify-content-md-start">
            {socialLinks.github && (
              <a href={socialLinks.github} target="_blank" rel="noreferrer" className="btn btn-outline-light btn-sm d-flex align-items-center gap-1">
                <Github size={16} /> GitHub
              </a>
            )}
            {socialLinks.linkedin && (
              <a href={socialLinks.linkedin} target="_blank" rel="noreferrer" className="btn btn-outline-light btn-sm d-flex align-items-center gap-1">
                <Linkedin size={16} /> LinkedIn
              </a>
            )}
            {socialLinks.twitter && (
              <a href={socialLinks.twitter} target="_blank" rel="noreferrer" className="btn btn-outline-light btn-sm d-flex align-items-center gap-1">
                <Twitter size={16} /> Twitter
              </a>
            )}
            {socialLinks.website && (
              <a href={socialLinks.website} target="_blank" rel="noreferrer" className="btn btn-outline-light btn-sm d-flex align-items-center gap-1">
                <Globe size={16} /> Portfolio
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Projects Section */}
      {projects.length > 0 && (
        <section className="mb-5">
          <h3 className="h4 fw-bold text-white mb-4 d-flex align-items-center gap-2">
            <Code className="text-indigo" /> Featured Projects
          </h3>
          <div className="row g-4">
            {projects.map((proj, idx) => (
              <div className="col-md-6" key={idx}>
                <div className="p-4 rounded-3 h-100 border" style={{ background: '#121824', borderColor: 'rgba(255,255,255,0.08)' }}>
                  <h5 className="fw-bold text-white mb-2">{proj.title || 'Untitled Project'}</h5>
                  <p className="small text-secondary mb-3">{proj.description}</p>

                  {proj.technologies && proj.technologies.length > 0 && (
                    <div className="d-flex flex-wrap gap-1 mb-3">
                      {proj.technologies.map((tech, tIdx) => (
                        <span key={tIdx} className="badge bg-secondary font-monospace" style={{ fontSize: '0.7rem' }}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="d-flex gap-3 pt-2">
                    {proj.githubUrl && (
                      <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="small text-info text-decoration-none d-flex align-items-center gap-1">
                        <Github size={14} /> Repository
                      </a>
                    )}
                    {proj.liveDemoUrl && (
                      <a href={proj.liveDemoUrl} target="_blank" rel="noreferrer" className="small text-warning text-decoration-none d-flex align-items-center gap-1">
                        <ExternalLink size={14} /> Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills Section */}
      {skills.length > 0 && (
        <section className="mb-5">
          <h3 className="h4 fw-bold text-white mb-4">Technical Proficiency</h3>
          <div className="row g-3">
            {skills.map((skill, idx) => (
              <div className="col-md-6" key={idx}>
                <div className="p-3 rounded-3 border" style={{ background: '#121824', borderColor: 'rgba(255,255,255,0.08)' }}>
                  <div className="d-flex justify-content-between mb-1">
                    <span className="fw-bold text-light small">{skill.name}</span>
                    <span className="small text-muted font-monospace">{skill.level}%</span>
                  </div>
                  <div className="progress-track" style={{ height: '6px' }}>
                    <div className="progress-fill" style={{ width: `${skill.level}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Experience & Education Grid */}
      <div className="row g-4 mb-5">
        {experience.length > 0 && (
          <div className="col-md-6">
            <h3 className="h4 fw-bold text-white mb-4 d-flex align-items-center gap-2">
              <Briefcase className="text-info" /> Work Experience
            </h3>
            <div className="d-flex flex-column gap-3">
              {experience.map((exp, idx) => (
                <div className="p-3 rounded-3 border" style={{ background: '#121824', borderColor: 'rgba(255,255,255,0.08)' }} key={idx}>
                  <div className="d-flex justify-content-between align-items-start mb-1">
                    <h6 className="fw-bold text-white mb-0">{exp.title}</h6>
                    <span className="badge badge-primary">{exp.type}</span>
                  </div>
                  <div className="text-info small font-monospace mb-2">{exp.company} • {exp.startDate} - {exp.current ? 'Present' : exp.endDate}</div>
                  <p className="small text-secondary mb-0">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {education.length > 0 && (
          <div className="col-md-6">
            <h3 className="h4 fw-bold text-white mb-4 d-flex align-items-center gap-2">
              <GraduationCap className="text-warning" /> Education
            </h3>
            <div className="d-flex flex-column gap-3">
              {education.map((edu, idx) => (
                <div className="p-3 rounded-3 border" style={{ background: '#121824', borderColor: 'rgba(255,255,255,0.08)' }} key={idx}>
                  <h6 className="fw-bold text-white mb-1">{edu.degree}</h6>
                  <div className="text-warning small font-monospace mb-2">{edu.institution} • {edu.startYear} - {edu.endYear}</div>
                  {edu.grade && <div className="small text-light mb-1">Grade: {edu.grade}</div>}
                  <p className="small text-secondary mb-0">{edu.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Certifications */}
      {certifications.length > 0 && (
        <section>
          <h3 className="h4 fw-bold text-white mb-4 d-flex align-items-center gap-2">
            <Award className="text-success" /> Certifications
          </h3>
          <div className="row g-3">
            {certifications.map((cert, idx) => (
              <div className="col-md-6" key={idx}>
                <div className="p-3 rounded-3 border d-flex justify-content-between align-items-center" style={{ background: '#121824', borderColor: 'rgba(255,255,255,0.08)' }}>
                  <div>
                    <h6 className="fw-bold text-white mb-1">{cert.name}</h6>
                    <div className="small text-muted">{cert.issuingOrganization} ({cert.issueDate})</div>
                  </div>
                  {cert.credentialUrl && (
                    <a href={cert.credentialUrl} target="_blank" rel="noreferrer" className="btn btn-outline-light btn-sm">
                      Verify
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ModernDeveloper;
