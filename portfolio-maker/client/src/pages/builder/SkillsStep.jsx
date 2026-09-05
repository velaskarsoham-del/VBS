import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Code, Plus, Trash2 } from 'lucide-react';

const SkillsStep = () => {
  const { portfolio, updateSection } = usePortfolio();
  const skills = portfolio.skills || [];

  const handleAdd = () => {
    const newSkill = { name: 'React', level: 85, category: 'Frontend' };
    updateSection('skills', [...skills, newSkill]);
  };

  const handleRemove = (index) => {
    const updated = skills.filter((_, i) => i !== index);
    updateSection('skills', updated);
  };

  const handleChange = (index, field, value) => {
    const updated = skills.map((item, i) => {
      if (i === index) {
        return { ...item, [field]: value };
      }
      return item;
    });
    updateSection('skills', updated);
  };

  return (
    <div className="animate-fade-in">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h4 className="text-white fw-bold mb-1 d-flex align-items-center gap-2">
            <Code className="text-info" size={20} /> Skills & Proficiency
          </h4>
          <p className="text-secondary small mb-0">Add technologies, programming languages, and proficiency levels.</p>
        </div>
        <button onClick={handleAdd} className="btn btn-outline btn-sm">
          <Plus size={16} /> Add Skill
        </button>
      </div>

      {skills.length === 0 ? (
        <div className="text-center p-4 rounded-3 border border-dashed text-secondary" style={{ borderColor: 'var(--border-color)' }}>
          No skills added yet. Click "+ Add Skill" to start.
        </div>
      ) : (
        <div className="d-flex flex-column gap-3">
          {skills.map((item, idx) => (
            <div key={idx} className="p-3 rounded-3 border position-relative" style={{ background: 'rgba(10,13,20,0.5)', borderColor: 'var(--border-color)' }}>
              <button
                onClick={() => handleRemove(idx)}
                className="btn btn-sm btn-outline text-danger border-0 position-absolute top-0 end-0 m-2"
                title="Remove Skill"
              >
                <Trash2 size={16} />
              </button>

              <div className="row g-3 align-items-center">
                <div className="col-md-5 form-group mb-0">
                  <label className="form-label">Skill Name *</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. React.js, Node.js, Python"
                    value={item.name || ''}
                    onChange={(e) => handleChange(idx, 'name', e.target.value)}
                  />
                </div>

                <div className="col-md-4 form-group mb-0">
                  <label className="form-label">Proficiency ({item.level || 80}%)</label>
                  <input
                    type="range"
                    className="form-range"
                    min="10"
                    max="100"
                    step="5"
                    value={item.level || 80}
                    onChange={(e) => handleChange(idx, 'level', parseInt(e.target.value))}
                  />
                </div>

                <div className="col-md-3 form-group mb-0">
                  <label className="form-label">Category</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Frontend/Backend"
                    value={item.category || 'Technical'}
                    onChange={(e) => handleChange(idx, 'category', e.target.value)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SkillsStep;
