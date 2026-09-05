import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { usePortfolio } from '../context/PortfolioContext';
import { User, GraduationCap, Code, Briefcase, FolderGit2, Award, Share2, Layout, Save, Eye, ArrowLeft, Check, Sparkles, Download } from 'lucide-react';
import PersonalInfoStep from './builder/PersonalInfoStep';
import EducationStep from './builder/EducationStep';
import SkillsStep from './builder/SkillsStep';
import ExperienceStep from './builder/ExperienceStep';
import ProjectsStep from './builder/ProjectsStep';
import CertificationsStep from './builder/CertificationsStep';
import SocialLinksStep from './builder/SocialLinksStep';
import TemplateStep from './builder/TemplateStep';
import TemplateRenderer from '../templates/TemplateRenderer';
import { exportToPdf } from '../utils/exportPdf';

const steps = [
  { id: 'personal', name: 'Personal', icon: User },
  { id: 'education', name: 'Education', icon: GraduationCap },
  { id: 'skills', name: 'Skills', icon: Code },
  { id: 'experience', name: 'Experience', icon: Briefcase },
  { id: 'projects', name: 'Projects', icon: FolderGit2 },
  { id: 'certifications', name: 'Certifications', icon: Award },
  { id: 'socials', name: 'Social Links', icon: Share2 },
  { id: 'template', name: 'Templates', icon: Layout }
];

const BuilderPage = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const [showMobilePreview, setShowMobilePreview] = useState(false);
  const { portfolio, savePortfolio, saving, saveStatus } = usePortfolio();

  const renderActiveStep = () => {
    switch (activeTab) {
      case 'personal': return <PersonalInfoStep />;
      case 'education': return <EducationStep />;
      case 'skills': return <SkillsStep />;
      case 'experience': return <ExperienceStep />;
      case 'projects': return <ProjectsStep />;
      case 'certifications': return <CertificationsStep />;
      case 'socials': return <SocialLinksStep />;
      case 'template': return <TemplateStep />;
      default: return <PersonalInfoStep />;
    }
  };

  const handleSave = async () => {
    await savePortfolio();
  };

  const handleExportPdf = () => {
    exportToPdf('portfolio-render-area', `${portfolio.personalInfo?.fullName || 'portfolio'}.pdf`);
  };

  return (
    <div className="min-vh-100 d-flex flex-column" style={{ background: 'var(--bg-primary)' }}>
      {/* Builder Top Bar */}
      <header className="glass-nav py-2 px-3 border-bottom d-flex align-items-center justify-content-between" style={{ zIndex: 100 }}>
        <div className="d-flex align-items-center gap-3">
          <Link to="/dashboard" className="btn btn-outline btn-sm text-secondary">
            <ArrowLeft size={16} /> Back to Dashboard
          </Link>
          <span className="fw-bold text-white d-none d-md-inline">Portfolio Builder</span>
        </div>

        <div className="d-flex align-items-center gap-2">
          {saveStatus === 'saved' && (
            <span className="badge badge-success d-flex align-items-center gap-1">
              <Check size={12} /> Saved
            </span>
          )}

          <button onClick={handleExportPdf} className="btn btn-outline btn-sm" title="Download PDF">
            <Download size={16} /> PDF
          </button>

          <button onClick={handleSave} className="btn btn-primary btn-sm" disabled={saving}>
            <Save size={16} /> {saving ? 'Saving...' : 'Save Changes'}
          </button>

          <button
            onClick={() => setShowMobilePreview(!showMobilePreview)}
            className="btn btn-gradient btn-sm d-lg-none"
          >
            <Eye size={16} /> {showMobilePreview ? 'Edit Form' : 'Live Preview'}
          </button>
        </div>
      </header>

      {/* Builder Split Workspace */}
      <div className="builder-layout">
        {/* Left Side: Navigation Tabs + Form Inputs */}
        <div className={`builder-sidebar p-3 ${showMobilePreview ? 'd-none d-lg-flex' : 'd-flex'}`}>
          {/* Step Navigation Pills */}
          <div className="d-flex flex-wrap gap-1 p-1 mb-3 rounded-3 border" style={{ background: 'rgba(10,13,20,0.6)', borderColor: 'var(--border-color)' }}>
            {steps.map((step) => {
              const Icon = step.icon;
              const isActive = activeTab === step.id;
              return (
                <button
                  key={step.id}
                  onClick={() => setActiveTab(step.id)}
                  className={`btn btn-sm flex-fill d-flex align-items-center justify-content-center gap-1 ${isActive ? 'btn-primary' : 'btn-outline'}`}
                  style={{ fontSize: '0.78rem', padding: '0.4rem 0.6rem', border: isActive ? 'none' : 'transparent' }}
                >
                  <Icon size={14} />
                  <span>{step.name}</span>
                </button>
              );
            })}
          </div>

          {/* Form Step Body */}
          <div className="flex-1 overflow-y-auto pr-1" style={{ overflowY: 'auto' }}>
            {renderActiveStep()}
          </div>
        </div>

        {/* Right Side: Instant Synchronous Live Preview Pane */}
        <div className={`builder-main-preview ${!showMobilePreview ? 'd-none d-lg-flex' : 'd-flex'}`}>
          <div className="preview-container-box">
            <TemplateRenderer portfolio={portfolio} isPreview={true} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuilderPage;
