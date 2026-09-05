import React from 'react';
import { Code2, Heart } from 'lucide-react';
import { Github } from './SocialIcons';

const Footer = () => {
  return (
    <footer id="about" className="py-5 border-top mt-auto" style={{ borderColor: 'var(--border-color)', background: 'var(--bg-secondary)' }}>
      <div className="pm-container">
        <div className="d-flex flex-column flex-md-row align-items-center justify-content-between gap-4 mb-4">
          <div>
            <div className="d-flex align-items-center gap-2 mb-2">
              <div
                className="d-flex align-items-center justify-content-center"
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '10px',
                  background: 'var(--accent-gradient)'
                }}
              >
                <Code2 size={18} color="#ffffff" />
              </div>
              <span className="text-white fw-bold h5 mb-0">
                Portfolio<span className="gradient-text">Maker</span>
              </span>
            </div>
            <p className="text-secondary small mb-0" style={{ maxWidth: '380px' }}>
              Build. Showcase. Grow. Create modern developer portfolios from your skills and projects in minutes.
            </p>
          </div>

          <div className="d-flex flex-wrap justify-content-md-end gap-4 small text-secondary">
            <a href="#features" className="nav-link-custom">Features</a>
            <a href="#how-it-works" className="nav-link-custom">How It Works</a>
            <a href="#templates" className="nav-link-custom">Templates</a>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="nav-link-custom d-flex align-items-center gap-1">
              <Github size={14} /> GitHub
            </a>
            <a href="mailto:contact@portfoliomaker.local" className="nav-link-custom">Contact</a>
          </div>
        </div>

        <div className="pt-4 border-top d-flex flex-column flex-sm-row justify-content-between align-items-center gap-2 small text-muted" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
          <div>© {new Date().getFullYear()} PortfolioMaker. Built with MERN Stack for Developers & Engineering Students.</div>
          <div className="d-flex align-items-center gap-1">
            Made with <Heart size={14} className="text-danger fill-current" /> for Code & Design
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
