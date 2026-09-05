import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Briefcase, Plus, Trash2 } from 'lucide-react';

const ExperienceStep = () => {
  const { portfolio, updateSection } = usePortfolio();
  const experience = portfolio.experience || [];

  const handleAdd = () => {
    const newExp = {
      title: 'Full Stack Developer Intern',
      company: 'Tech Startup Inc.',
      type: 'Internship',
      startDate: 'Jun 2024',
      endDate: 'Aug 2024',
      current: false,
      description: 'Worked on RESTful API development and building responsive frontend dashboards.'
    };
    updateSection('experience', [...experience, newExp]);
  };

  const handleRemove = (index) => {
    const updated = experience.filter((_, i) => i !== index);
    updateSection('experience', updated);
  };

  const handleChange = (index, field, value) => {
    const updated = experience.map((item, i) => {
      if (i === index) {
        return { ...item, [field]: value };
      }
      return item;
    });
    updateSection('experience', updated);
  };

  return (
    <div className="animate-fade-in">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h4 className="text-white fw-bold mb-1 d-flex align-items-center gap-2">
            <Briefcase className="text-primary" size={20} /> Experience & Internships
          </h4>
          <p className="text-secondary small mb-0">Add work history, internships, or freelance experience.</p>
        </div>
        <button onClick={handleAdd} className="btn btn-outline btn-sm">
          <Plus size={16} /> Add Experience
        </button>
      </div>

      {experience.length === 0 ? (
        <div className="text-center p-4 rounded-3 border border-dashed text-secondary" style={{ borderColor: 'var(--border-color)' }}>
          No work experience entries added yet. Click "+ Add Experience" to start.
        </div>
      ) : (
        <div className="d-flex flex-column gap-3">
          {experience.map((item, idx) => (
            <div key={idx} className="p-3 rounded-3 border position-relative" style={{ background: 'rgba(10,13,20,0.5)', borderColor: 'var(--border-color)' }}>
              <button
                onClick={() => handleRemove(idx)}
                className="btn btn-sm btn-outline text-danger border-0 position-absolute top-0 end-0 m-2"
                title="Remove Experience"
              >
                <Trash2 size={16} />
              </button>

              <div className="row g-3">
                <div className="col-md-6 form-group">
                  <label className="form-label">Job Title *</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. Software Engineer Intern"
                    value={item.title || ''}
                    onChange={(e) => handleChange(idx, 'title', e.target.value)}
                  />
                </div>
                <div className="col-md-6 form-group">
                  <label className="form-label">Company / Organization *</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. Google or Freelance"
                    value={item.company || ''}
                    onChange={(e) => handleChange(idx, 'company', e.target.value)}
                  />
                </div>
              </div>

              <div className="row g-3">
                <div className="col-md-4 form-group">
                  <label className="form-label">Employment Type</label>
                  <select
                    className="form-control"
                    value={item.type || 'Full-time'}
                    onChange={(e) => handleChange(idx, 'type', e.target.value)}
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Internship">Internship</option>
                    <option value="Freelance">Freelance</option>
                    <option value="Contract">Contract</option>
                    <option value="Part-time">Part-time</option>
                  </select>
                </div>
                <div className="col-md-4 form-group">
                  <label className="form-label">Start Date</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. Jun 2024"
                    value={item.startDate || ''}
                    onChange={(e) => handleChange(idx, 'startDate', e.target.value)}
                  />
                </div>
                <div className="col-md-4 form-group">
                  <label className="form-label">End Date</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. Aug 2024 or Present"
                    value={item.endDate || ''}
                    onChange={(e) => handleChange(idx, 'endDate', e.target.value)}
                    disabled={item.current}
                  />
                </div>
              </div>

              <div className="form-group mb-0">
                <label className="form-label">Description / Achievements</label>
                <textarea
                  className="form-control"
                  rows="2"
                  placeholder="Key responsibilities and accomplishments..."
                  value={item.description || ''}
                  onChange={(e) => handleChange(idx, 'description', e.target.value)}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExperienceStep;
