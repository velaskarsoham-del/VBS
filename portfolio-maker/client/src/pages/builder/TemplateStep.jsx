import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Layout, CheckCircle2 } from 'lucide-react';

const templates = [
  {
    id: 'modern-dev',
    name: '1. Modern Developer',
    badge: 'Popular',
    desc: 'Dark theme with glowing neon accents, terminal bio code block, and technical skill badges.',
    accent: '#6366f1'
  },
  {
    id: 'professional',
    name: '2. Professional',
    badge: 'Corporate',
    desc: 'Clean white executive layout with a structured work experience timeline and progress bars.',
    accent: '#3b82f6'
  },
  {
    id: 'creative',
    name: '3. Creative',
    badge: 'Vibrant',
    desc: 'Dynamic gradient backdrop with glassmorphic cards and rounded pill skill badges.',
    accent: '#ec4899'
  }
];

const TemplateStep = () => {
  const { portfolio, changeTemplate } = usePortfolio();
  const selectedTemplate = portfolio.selectedTemplate || 'modern-dev';

  return (
    <div className="animate-fade-in">
      <h4 className="text-white fw-bold mb-2 d-flex align-items-center gap-2">
        <Layout className="text-warning" size={20} /> Choose Portfolio Template
      </h4>
      <p className="text-secondary small mb-4">
        Your information remains saved. Click a template below to preview its design live on the right.
      </p>

      <div className="d-flex flex-column gap-3">
        {templates.map((tpl) => {
          const isSelected = selectedTemplate === tpl.id;
          return (
            <div
              key={tpl.id}
              onClick={() => changeTemplate(tpl.id)}
              className="p-3 rounded-3 border cursor-pointer transition-all"
              style={{
                background: isSelected ? 'rgba(99,102,241,0.12)' : 'rgba(10,13,20,0.5)',
                borderColor: isSelected ? tpl.accent : 'var(--border-color)',
                boxShadow: isSelected ? `0 0 15px ${tpl.accent}33` : 'none'
              }}
            >
              <div className="d-flex align-items-center justify-content-between mb-2">
                <div className="d-flex align-items-center gap-2">
                  <h6 className="fw-bold text-white mb-0">{tpl.name}</h6>
                  <span className="badge bg-secondary font-monospace" style={{ fontSize: '0.7rem' }}>
                    {tpl.badge}
                  </span>
                </div>
                {isSelected && <CheckCircle2 size={20} style={{ color: tpl.accent }} />}
              </div>
              <p className="small text-secondary mb-0">{tpl.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TemplateStep;
