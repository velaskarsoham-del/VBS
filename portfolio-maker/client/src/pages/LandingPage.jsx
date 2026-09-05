import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Zap, Layout, Globe, ArrowRight, Eye, FolderGit2, Edit3, Check } from 'lucide-react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { Github, Linkedin } from '../components/common/SocialIcons';

const LandingPage = () => {
  return (
    <div className="min-vh-100 d-flex flex-column" style={{ background: 'var(--bg-primary)' }}>
      <Navbar />

      {/* 1. HERO SECTION */}
      <section className="py-5 text-center position-relative overflow-hidden">
        {/* Glow backdrop effect */}
        <div
          style={{
            position: 'absolute',
            top: '-25%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '800px',
            height: '600px',
            background: 'radial-gradient(circle, rgba(99,102,241,0.18) 0%, rgba(9,13,22,0) 70%)',
            pointerEvents: 'none',
            zIndex: 0
          }}
        />

        <div className="pm-container py-4 position-relative" style={{ zIndex: 1 }}>
          {/* Small Badge */}
          <div className="d-inline-flex align-items-center gap-2 px-3 py-1 mb-4 rounded-pill glass-panel border" style={{ borderColor: 'rgba(99,102,241,0.35)' }}>
            <Sparkles size={15} className="text-warning" />
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#a5b4fc' }}>
              Build your portfolio smarter
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="display-3 fw-extrabold mb-4 text-white mx-auto" style={{ letterSpacing: '-1.5px', maxWidth: '800px' }}>
            Build Your Professional <span className="gradient-text">Portfolio</span> in Minutes.
          </h1>

          {/* Subtitle */}
          <p className="lead text-secondary mb-5 mx-auto" style={{ maxWidth: '700px', fontSize: '1.15rem', lineHeight: '1.7' }}>
            Create a beautiful developer portfolio from your skills, projects, education and experience — without writing a single line of design code.
          </p>

          {/* Action Buttons */}
          <div className="d-flex flex-sm-row flex-column align-items-center justify-content-center gap-3 mb-4">
            <Link to="/register" className="btn btn-gradient btn-lg px-4 shadow-lg">
              Create My Portfolio <ArrowRight size={18} />
            </Link>
            <a href="#templates" className="btn btn-outline btn-lg px-4">
              Explore Templates
            </a>
          </div>

          {/* Benefits Row (Properly spaced flex items) */}
          <div className="d-flex flex-wrap align-items-center justify-content-center gap-4 text-secondary small mb-5">
            <div className="d-flex align-items-center gap-1.5">
              <Check size={16} className="text-success" /> <span>No design skills required</span>
            </div>
            <div className="d-flex align-items-center gap-1.5">
              <Check size={16} className="text-success" /> <span>Multiple professional templates</span>
            </div>
            <div className="d-flex align-items-center gap-1.5">
              <Check size={16} className="text-success" /> <span>Publish with your own URL</span>
            </div>
          </div>

          {/* 3. HERO VISUAL MOCKUP CARD */}
          <div className="mx-auto mt-4 glass-panel shadow-glow card-hover text-start overflow-hidden max-w-1100 animate-fade-in" style={{ borderRadius: '20px' }}>
            {/* Browser Top Bar */}
            <div className="d-flex align-items-center justify-content-between px-3 py-2 border-bottom" style={{ borderColor: 'var(--border-color)', background: 'rgba(10,13,20,0.9)' }}>
              <div className="d-flex align-items-center gap-2">
                <div style={{ width: 11, height: 11, borderRadius: '50%', background: '#ff5f56' }} />
                <div style={{ width: 11, height: 11, borderRadius: '50%', background: '#ffbd2e' }} />
                <div style={{ width: 11, height: 11, borderRadius: '50%', background: '#27c93f' }} />
              </div>
              <div className="flex-1 text-center">
                <span className="badge px-3 py-1 font-monospace text-secondary" style={{ background: 'rgba(255,255,255,0.05)', fontSize: '0.75rem' }}>
                  portfoliomaker.com/soham-velaskar
                </span>
              </div>
              <div style={{ width: 36 }} />
            </div>

            {/* Inner Portfolio Card Preview */}
            <div className="p-4 p-md-5" style={{ background: '#0c1019' }}>
              <div className="row g-4 align-items-center">
                <div className="col-md-7">
                  <div className="d-inline-flex align-items-center gap-1 px-2.5 py-1 mb-2 rounded-pill font-monospace small" style={{ background: 'rgba(16,185,129,0.12)', color: '#6ee7b7', border: '1px solid rgba(16,185,129,0.25)', fontSize: '0.75rem' }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981', display: 'inline-block' }} /> Available for Hire
                  </div>
                  <h2 className="display-6 fw-bold text-white mb-1">Soham Velaskar</h2>
                  <h5 className="text-indigo font-monospace mb-3" style={{ color: '#a5b4fc' }}>Full Stack Engineer & ML Student</h5>
                  <p className="text-secondary small mb-4" style={{ lineHeight: '1.6' }}>
                    Building scalable Web applications with Node.js, Express, React, and MongoDB. Passionate about machine learning algorithms and clean software architecture.
                  </p>

                  <div className="d-flex flex-wrap gap-1.5 mb-4">
                    <span className="badge bg-secondary font-monospace" style={{ fontSize: '0.72rem' }}>React.js</span>
                    <span className="badge bg-secondary font-monospace" style={{ fontSize: '0.72rem' }}>Node.js</span>
                    <span className="badge bg-secondary font-monospace" style={{ fontSize: '0.72rem' }}>Express</span>
                    <span className="badge bg-secondary font-monospace" style={{ fontSize: '0.72rem' }}>MongoDB</span>
                    <span className="badge bg-secondary font-monospace" style={{ fontSize: '0.72rem' }}>Python</span>
                  </div>

                  <div className="d-flex gap-2">
                    <span className="btn btn-outline btn-sm d-flex align-items-center gap-1" style={{ fontSize: '0.75rem', padding: '0.25rem 0.6rem' }}>
                      <Github size={12} /> GitHub
                    </span>
                    <span className="btn btn-outline btn-sm d-flex align-items-center gap-1" style={{ fontSize: '0.75rem', padding: '0.25rem 0.6rem' }}>
                      <Linkedin size={12} /> LinkedIn
                    </span>
                  </div>
                </div>

                <div className="col-md-5">
                  <div className="p-3 glass-panel border" style={{ background: '#131a2a', borderColor: 'rgba(255,255,255,0.08)', borderRadius: '14px' }}>
                    <div className="small text-muted mb-2 font-monospace" style={{ fontSize: '0.72rem' }}>FEATURED PROJECT</div>
                    <h6 className="text-white fw-bold mb-1">Virtual Banking System</h6>
                    <p className="small text-secondary mb-3" style={{ fontSize: '0.8rem' }}>Full-stack banking application featuring secure transfers, passbook records, and role-based access control.</p>
                    <div className="d-flex gap-1.5">
                      <span className="badge badge-primary" style={{ fontSize: '0.68rem' }}>Java</span>
                      <span className="badge badge-primary" style={{ fontSize: '0.68rem' }}>MySQL</span>
                      <span className="badge badge-primary" style={{ fontSize: '0.68rem' }}>REST API</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FEATURES SECTION */}
      <section id="features" className="py-5" style={{ background: 'var(--bg-secondary)' }}>
        <div className="pm-container py-4">
          <div className="text-center mb-5">
            <h2 className="h1 text-white mb-3 fw-extrabold">Everything You Need to Build Your Portfolio</h2>
            <p className="text-secondary mx-auto" style={{ maxWidth: '640px', fontSize: '1.05rem' }}>
              Designed specifically for engineering students and software developers looking to showcase their work effortlessly.
            </p>
          </div>

          <div className="pm-grid-3">
            <div className="p-4 glass-panel h-100 card-hover">
              <div className="p-3 rounded-3 d-inline-block mb-3" style={{ background: 'rgba(99,102,241,0.15)', color: '#a5b4fc' }}>
                <Edit3 size={24} />
              </div>
              <h4 className="text-white mb-2 h5 fw-bold">Portfolio Builder</h4>
              <p className="text-secondary small mb-0">
                Organized step-by-step form for personal details, education, skills, projects, experience, and certifications.
              </p>
            </div>

            <div className="p-4 glass-panel h-100 card-hover">
              <div className="p-3 rounded-3 d-inline-block mb-3" style={{ background: 'rgba(6,182,212,0.15)', color: '#67e8f9' }}>
                <Eye size={24} />
              </div>
              <h4 className="text-white mb-2 h5 fw-bold">Live Preview</h4>
              <p className="text-secondary small mb-0">
                Form edits update the portfolio canvas instantly with zero delay, giving you real-time feedback.
              </p>
            </div>

            <div className="p-4 glass-panel h-100 card-hover">
              <div className="p-3 rounded-3 d-inline-block mb-3" style={{ background: 'rgba(168,85,247,0.15)', color: '#c084fc' }}>
                <Layout size={24} />
              </div>
              <h4 className="text-white mb-2 h5 fw-bold">Professional Templates</h4>
              <p className="text-secondary small mb-0">
                Choose between Modern Developer (Dark Neon), Professional (Clean White), and Creative (Glassmorphism) themes.
              </p>
            </div>

            <div className="p-4 glass-panel h-100 card-hover">
              <div className="p-3 rounded-3 d-inline-block mb-3" style={{ background: 'rgba(236,72,153,0.15)', color: '#f472b6' }}>
                <FolderGit2 size={24} />
              </div>
              <h4 className="text-white mb-2 h5 fw-bold">Project Showcase</h4>
              <p className="text-secondary small mb-0">
                Display technical projects with technology tags, repository links, live demos, and description cards.
              </p>
            </div>

            <div className="p-4 glass-panel h-100 card-hover">
              <div className="p-3 rounded-3 d-inline-block mb-3" style={{ background: 'rgba(16,185,129,0.15)', color: '#6ee7b7' }}>
                <Globe size={24} />
              </div>
              <h4 className="text-white mb-2 h5 fw-bold">Public Portfolio URL</h4>
              <p className="text-secondary small mb-0">
                Publish your portfolio with one click and share your unique custom URL with recruiters and employers.
              </p>
            </div>

            <div className="p-4 glass-panel h-100 card-hover">
              <div className="p-3 rounded-3 d-inline-block mb-3" style={{ background: 'rgba(245,158,11,0.15)', color: '#fcd34d' }}>
                <Zap size={24} />
              </div>
              <h4 className="text-white mb-2 h5 fw-bold">Easy Editing</h4>
              <p className="text-secondary small mb-0">
                Update your portfolio anytime from your student dashboard as your skills, credentials, and career grow.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. HOW IT WORKS SECTION */}
      <section id="how-it-works" className="py-5">
        <div className="pm-container py-4">
          <div className="text-center mb-5">
            <h2 className="h1 text-white mb-3 fw-extrabold">Build Your Portfolio in 3 Simple Steps</h2>
            <p className="text-secondary mx-auto" style={{ maxWidth: '600px' }}>
              From initial data entry to a live published website in under 5 minutes.
            </p>
          </div>

          <div className="pm-grid-3">
            <div className="p-4 glass-panel h-100 position-relative card-hover">
              <div className="step-number mb-2">01</div>
              <h4 className="text-white h5 fw-bold mb-2">Enter Your Information</h4>
              <p className="text-secondary small mb-0">
                Fill in your personal bio, projects, technical skills, education, and social profile links in our clean builder form.
              </p>
            </div>

            <div className="p-4 glass-panel h-100 position-relative card-hover">
              <div className="step-number mb-2">02</div>
              <h4 className="text-white h5 fw-bold mb-2">Customize Your Design</h4>
              <p className="text-secondary small mb-0">
                Choose your favorite template theme (Modern Developer, Professional, or Creative) and see changes live.
              </p>
            </div>

            <div className="p-4 glass-panel h-100 position-relative card-hover">
              <div className="step-number mb-2">03</div>
              <h4 className="text-white h5 fw-bold mb-2">Publish Your Portfolio</h4>
              <p className="text-secondary small mb-0">
                Click publish to generate your shareable public URL or export your portfolio as a formatted PDF.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. TEMPLATE PREVIEW SECTION */}
      <section id="templates" className="py-5" style={{ background: 'var(--bg-secondary)' }}>
        <div className="pm-container py-4 text-center">
          <h2 className="h1 text-white mb-2 fw-extrabold">Choose a style that represents you.</h2>
          <p className="text-secondary mb-5 mx-auto" style={{ maxWidth: '600px' }}>
            Your information remains preserved while switching design templates with a single click.
          </p>

          <div className="pm-grid-3 text-start">
            <div className="p-4 glass-panel border h-100 card-hover" style={{ borderColor: 'var(--accent-primary)' }}>
              <div className="d-flex align-items-center justify-content-between mb-3">
                <h5 className="text-white fw-bold mb-0">Modern Developer</h5>
                <span className="badge badge-primary">Popular</span>
              </div>
              <p className="small text-secondary mb-3">Dark neon accent theme with code snippets and technical skill progress bars.</p>
              <div className="p-3 rounded-3 bg-dark border border-secondary small text-muted font-monospace mb-3">
                <span className="text-indigo">const</span> dev = &#123;<br />
                &nbsp;&nbsp;name: <span className="text-success">"Soham"</span>,<br />
                &nbsp;&nbsp;stack: [<span className="text-warning">"MERN"</span>, <span className="text-warning">"ML"</span>]<br />
                &#125;;
              </div>
            </div>

            <div className="p-4 glass-panel border h-100 card-hover">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <h5 className="text-white fw-bold mb-0">Professional</h5>
                <span className="badge bg-secondary">Executive</span>
              </div>
              <p className="small text-secondary mb-3">Clean corporate white design with a structured work history timeline.</p>
              <div className="p-3 rounded-3 bg-light text-dark small font-sans-serif mb-3">
                <div className="fw-bold text-dark">Full Stack Developer Intern</div>
                <div className="text-primary small">Tech Startup • 2024 - Present</div>
              </div>
            </div>

            <div className="p-4 glass-panel border h-100 card-hover">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <h5 className="text-white fw-bold mb-0">Creative</h5>
                <span className="badge bg-danger">Vibrant</span>
              </div>
              <p className="small text-secondary mb-3">Dynamic glassmorphic gradient background with rounded pill badges.</p>
              <div className="p-3 rounded-3 text-white small mb-3" style={{ background: 'var(--accent-gradient)' }}>
                <div className="fw-bold">Glassmorphic UI Design</div>
                <div className="small opacity-75">Dynamic project cards & pill skill badges</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CTA SECTION */}
      <section className="py-5">
        <div className="pm-container">
          <div className="p-5 glass-panel text-center position-relative overflow-hidden card-hover" style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.12) 0%, rgba(236,72,153,0.12) 100%)', borderRadius: '24px', border: '1px solid rgba(99,102,241,0.3)' }}>
            <h2 className="display-5 fw-extrabold text-white mb-3">Your next opportunity starts with a great portfolio.</h2>
            <p className="lead text-secondary mx-auto mb-4" style={{ maxWidth: '600px', fontSize: '1.1rem' }}>
              Build yours today and share your work with the world.
            </p>
            <Link to="/register" className="btn btn-gradient btn-lg px-5 shadow-lg">
              Create My Portfolio <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* 8. FOOTER */}
      <Footer />
    </div>
  );
};

export default LandingPage;
