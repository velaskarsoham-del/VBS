import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { usePortfolio } from '../context/PortfolioContext';
import { LayoutDashboard, Sparkles, Globe, Eye, Download, LogOut, CheckCircle2, Circle, Copy, Check, ExternalLink, RefreshCw } from 'lucide-react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { exportToPdf } from '../utils/exportPdf';

const DashboardPage = () => {
  const { user, logout } = useAuth();
  const { portfolio, togglePublish, calculateCompletion, loading } = usePortfolio();
  const [copied, setCopied] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const navigate = useNavigate();

  const completion = calculateCompletion();
  const publicUrl = `${window.location.origin}/portfolio/${user?.username || portfolio.username || 'user'}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(publicUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleTogglePublish = async () => {
    setPublishing(true);
    await togglePublish(!portfolio.published);
    setPublishing(false);
  };

  const handleExportPdf = () => {
    navigate('/builder');
  };

  return (
    <div className="min-vh-100 d-flex flex-column" style={{ background: 'var(--bg-primary)' }}>
      <Navbar />

      <div className="container py-5 my-auto max-w-1200 mx-auto">
        {/* Welcome Header */}
        <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between mb-5 gap-3">
          <div>
            <div className="d-flex align-items-center gap-2 mb-1">
              <span className="badge badge-primary">Student Dashboard</span>
              <span className="small text-muted">@{user?.username}</span>
            </div>
            <h1 className="h2 fw-bold text-white mb-1">
              Welcome back, <span className="gradient-text">{user?.name || 'Developer'}</span>!
            </h1>
            <p className="text-secondary small mb-0">Manage your dynamic portfolio information, template selection, and public URL.</p>
          </div>

          <div className="d-flex gap-2">
            <Link to="/builder" className="btn btn-gradient">
              <Sparkles size={18} /> Edit Portfolio
            </Link>
            <a href={`/portfolio/${user?.username}`} target="_blank" rel="noreferrer" className="btn btn-outline">
              <ExternalLink size={18} /> View Public Site
            </a>
          </div>
        </div>

        {/* Dashboard Grid Cards */}
        <div className="row g-4 mb-5">
          {/* Card 1: Profile Completion Gauge */}
          <div className="col-md-6">
            <div className="p-4 glass-panel h-100 d-flex flex-column justify-content-between">
              <div>
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <h5 className="fw-bold text-white mb-0">Profile Completion</h5>
                  <span className="h4 fw-bold gradient-text mb-0">{completion}%</span>
                </div>

                <div className="progress-track mb-4" style={{ height: '10px' }}>
                  <div className="progress-fill" style={{ width: `${completion}%` }} />
                </div>

                <div className="row g-2 small">
                  <div className="col-6 d-flex align-items-center gap-2">
                    {portfolio.personalInfo?.fullName ? <CheckCircle2 size={16} className="text-success" /> : <Circle size={16} className="text-muted" />}
                    <span className={portfolio.personalInfo?.fullName ? 'text-white' : 'text-muted'}>Personal Info</span>
                  </div>
                  <div className="col-6 d-flex align-items-center gap-2">
                    {portfolio.education?.length > 0 ? <CheckCircle2 size={16} className="text-success" /> : <Circle size={16} className="text-muted" />}
                    <span className={portfolio.education?.length > 0 ? 'text-white' : 'text-muted'}>Education</span>
                  </div>
                  <div className="col-6 d-flex align-items-center gap-2">
                    {portfolio.skills?.length > 0 ? <CheckCircle2 size={16} className="text-success" /> : <Circle size={16} className="text-muted" />}
                    <span className={portfolio.skills?.length > 0 ? 'text-white' : 'text-muted'}>Skills ({portfolio.skills?.length || 0})</span>
                  </div>
                  <div className="col-6 d-flex align-items-center gap-2">
                    {portfolio.projects?.length > 0 ? <CheckCircle2 size={16} className="text-success" /> : <Circle size={16} className="text-muted" />}
                    <span className={portfolio.projects?.length > 0 ? 'text-white' : 'text-muted'}>Projects ({portfolio.projects?.length || 0})</span>
                  </div>
                  <div className="col-6 d-flex align-items-center gap-2">
                    {portfolio.experience?.length > 0 ? <CheckCircle2 size={16} className="text-success" /> : <Circle size={16} className="text-muted" />}
                    <span className={portfolio.experience?.length > 0 ? 'text-white' : 'text-muted'}>Experience</span>
                  </div>
                  <div className="col-6 d-flex align-items-center gap-2">
                    {portfolio.certifications?.length > 0 ? <CheckCircle2 size={16} className="text-success" /> : <Circle size={16} className="text-muted" />}
                    <span className={portfolio.certifications?.length > 0 ? 'text-white' : 'text-muted'}>Certifications</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Portfolio Visibility & Public URL */}
          <div className="col-md-6">
            <div className="p-4 glass-panel h-100 d-flex flex-column justify-content-between">
              <div>
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <h5 className="fw-bold text-white mb-0">Portfolio Visibility</h5>
                  <span className={`badge ${portfolio.published ? 'badge-success' : 'bg-secondary'}`}>
                    {portfolio.published ? 'Published (Live)' : 'Draft'}
                  </span>
                </div>

                <p className="text-secondary small mb-3">
                  {portfolio.published
                    ? 'Your portfolio is live and publicly accessible at your unique URL.'
                    : 'Your portfolio is currently private. Click publish to generate a shareable link.'}
                </p>

                <div className="form-group mb-3">
                  <label className="form-label">Your Public Portfolio Link</label>
                  <div className="d-flex gap-2">
                    <input type="text" className="form-control font-monospace small" value={publicUrl} readOnly />
                    <button onClick={handleCopyLink} className="btn btn-outline">
                      {copied ? <Check size={16} className="text-success" /> : <Copy size={16} />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="d-flex gap-2 pt-2">
                <button onClick={handleTogglePublish} className={`btn flex-fill ${portfolio.published ? 'btn-outline' : 'btn-primary'}`} disabled={publishing}>
                  {publishing ? 'Updating...' : portfolio.published ? 'Unpublish Portfolio' : 'Publish Portfolio'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions & AI Assistant Bar */}
        <div className="row g-4 mb-5">
          <div className="col-md-6">
            <div className="p-4 glass-panel h-100 border" style={{ borderColor: 'var(--accent-glow)' }}>
              <div className="d-flex align-items-center gap-2 mb-3">
                <Sparkles className="text-warning" size={20} />
                <h5 className="fw-bold text-white mb-0">AI Portfolio Assistant</h5>
              </div>
              <p className="text-secondary small mb-3">
                Smart recommendations to optimize your portfolio score and appeal to recruiters:
              </p>

              <div className="p-3 rounded-3 mb-3" style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)' }}>
                <div className="small fw-bold text-info mb-1 font-monospace">AI Recommendation Engine</div>
                <p className="small text-light mb-0">
                  {completion < 70
                    ? '💡 Add at least 2 full-stack projects with live demo URLs to boost your completion score above 80%.'
                    : '⚡ Great job! Your portfolio completeness is solid. Consider adding GitHub links and verifying social profiles.'}
                </p>
              </div>

              <div className="d-flex gap-2">
                <Link to="/builder" className="btn btn-gradient btn-sm">
                  <Sparkles size={14} /> Improve Portfolio with AI
                </Link>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="p-4 glass-panel h-100">
              <h5 className="fw-bold text-white mb-3">Quick Actions</h5>
              <div className="d-flex flex-column gap-2">
                <Link to="/builder" className="btn btn-outline btn-sm justify-content-start">
                  <Sparkles size={16} /> Open Portfolio Builder Form
                </Link>
                <button onClick={handleExportPdf} className="btn btn-outline btn-sm justify-content-start">
                  <Download size={16} /> Export Portfolio PDF
                </button>
                <button onClick={logout} className="btn btn-outline btn-sm text-danger border-0 justify-content-start">
                  <LogOut size={16} /> Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default DashboardPage;

