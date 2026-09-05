import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { GraduationCap, Plus, Trash2 } from 'lucide-react';

const EducationStep = () => {
  const { portfolio, updateSection } = usePortfolio();
  const education = portfolio.education || [];

  const handleAdd = () => {
    const newEntry = {
      degree: 'B.S. in Computer Engineering',
      institution: 'University Name',
      startYear: '2021',
      endYear: '2025',
      grade: '8.5 CGPA',
      description: 'Relevant coursework in data structures, web engineering, and machine learning.'
    };
    updateSection('education', [...education, newEntry]);
  };

  const handleRemove = (index) => {
    const updated = education.filter((_, i) => i !== index);
    updateSection('education', updated);
  };

  const handleChange = (index, field, value) => {
    const updated = education.map((item, i) => {
      if (i === index) {
        return { ...item, [field]: value };
      }
      return item;
    });
    updateSection('education', updated);
  };

  return (
    <div className="animate-fade-in">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h4 className="text-white fw-bold mb-1 d-flex align-items-center gap-2">
            <GraduationCap className="text-warning" size={20} /> Education Details
          </h4>
          <p className="text-secondary small mb-0">Add your degrees, college, and academic achievements.</p>
        </div>
        <button onClick={handleAdd} className="btn btn-outline btn-sm">
          <Plus size={16} /> Add Education
        </button>
      </div>

      {education.length === 0 ? (
        <div className="text-center p-4 rounded-3 border border-dashed text-secondary" style={{ borderColor: 'var(--border-color)' }}>
          No education entries added yet. Click "+ Add Education" to start.
        </div>
      ) : (
        <div className="d-flex flex-column gap-3">
          {education.map((item, idx) => (
            <div key={idx} className="p-3 rounded-3 border position-relative" style={{ background: 'rgba(10,13,20,0.5)', borderColor: 'var(--border-color)' }}>
              <button
                onClick={() => handleRemove(idx)}
                className="btn btn-sm btn-outline text-danger border-0 position-absolute top-0 end-0 m-2"
                title="Remove Education"
              >
                <Trash2 size={16} />
              </button>

              <div className="row g-3">
                <div className="col-md-6 form-group">
                  <label className="form-label">Degree / Program *</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. B.Tech in Computer Engineering"
                    value={item.degree || ''}
                    onChange={(e) => handleChange(idx, 'degree', e.target.value)}
                  />
                </div>
                <div className="col-md-6 form-group">
                  <label className="form-label">College / University *</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. Stanford University"
                    value={item.institution || ''}
                    onChange={(e) => handleChange(idx, 'institution', e.target.value)}
                  />
                </div>
              </div>

              <div className="row g-3">
                <div className="col-md-4 form-group">
                  <label className="form-label">Start Year</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="2021"
                    value={item.startYear || ''}
                    onChange={(e) => handleChange(idx, 'startYear', e.target.value)}
                  />
                </div>
                <div className="col-md-4 form-group">
                  <label className="form-label">End Year</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="2025 (or Present)"
                    value={item.endYear || ''}
                    onChange={(e) => handleChange(idx, 'endYear', e.target.value)}
                  />
                </div>
                <div className="col-md-4 form-group">
                  <label className="form-label">Grade / CGPA</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. 3.9 GPA or 8.8 CGPA"
                    value={item.grade || ''}
                    onChange={(e) => handleChange(idx, 'grade', e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group mb-0">
                <label className="form-label">Description / Achievements</label>
                <textarea
                  className="form-control"
                  rows="2"
                  placeholder="Key coursework, honors, or thesis..."
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

export default EducationStep;
