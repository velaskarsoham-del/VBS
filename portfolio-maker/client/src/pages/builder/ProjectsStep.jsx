import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { FolderGit2, Plus, Trash2 } from 'lucide-react';

const ProjectsStep = () => {
  const { portfolio, updateSection } = usePortfolio();
  const projects = portfolio.projects || [];

  const handleAdd = () => {
    const newProj = {
      title: 'Virtual Banking System',
      description: 'A full-stack banking app allowing users to perform secure transfers and track passbook history.',
      technologies: ['React', 'Node.js', 'Express', 'MongoDB'],
      githubUrl: 'https://github.com',
      liveDemoUrl: 'https://demo.com',
      imageUrl: ''
    };
    updateSection('projects', [...projects, newProj]);
  };

  const handleRemove = (index) => {
    const updated = projects.filter((_, i) => i !== index);
    updateSection('projects', updated);
  };

  const handleChange = (index, field, value) => {
    const updated = projects.map((item, i) => {
      if (i === index) {
        return { ...item, [field]: value };
      }
      return item;
    });
    updateSection('projects', updated);
  };

  const handleTechChange = (index, techString) => {
    const techArray = techString.split(',').map((t) => t.trim()).filter((t) => t.length > 0);
    handleChange(index, 'technologies', techArray);
  };

  return (
    <div className="animate-fade-in">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h4 className="text-white fw-bold mb-1 d-flex align-items-center gap-2">
            <FolderGit2 className="text-indigo" size={20} /> Projects & Portfolio
          </h4>
          <p className="text-secondary small mb-0">Showcase your best software, web, or ML projects.</p>
        </div>
        <button onClick={handleAdd} className="btn btn-outline btn-sm">
          <Plus size={16} /> Add Project
        </button>
      </div>

      {projects.length === 0 ? (
        <div className="text-center p-4 rounded-3 border border-dashed text-secondary" style={{ borderColor: 'var(--border-color)' }}>
          No projects added yet. Click "+ Add Project" to showcase your work.
        </div>
      ) : (
        <div className="d-flex flex-column gap-3">
          {projects.map((item, idx) => (
            <div key={idx} className="p-3 rounded-3 border position-relative" style={{ background: 'rgba(10,13,20,0.5)', borderColor: 'var(--border-color)' }}>
              <button
                onClick={() => handleRemove(idx)}
                className="btn btn-sm btn-outline text-danger border-0 position-absolute top-0 end-0 m-2"
                title="Remove Project"
              >
                <Trash2 size={16} />
              </button>

              <div className="form-group">
                <label className="form-label">Project Title *</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. AI-Powered Dynamic Portfolio Maker"
                  value={item.title || ''}
                  onChange={(e) => handleChange(idx, 'title', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Description *</label>
                <textarea
                  className="form-control"
                  rows="2"
                  placeholder="What does the project do? What problem does it solve?"
                  value={item.description || ''}
                  onChange={(e) => handleChange(idx, 'description', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Technologies Used (Comma Separated)</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. React, Node.js, Express, MongoDB, Python"
                  value={item.technologies ? item.technologies.join(', ') : ''}
                  onChange={(e) => handleTechChange(idx, e.target.value)}
                />
              </div>

              <div className="row g-3">
                <div className="col-md-6 form-group mb-0">
                  <label className="form-label">GitHub Repository URL</label>
                  <input
                    type="url"
                    className="form-control"
                    placeholder="https://github.com/username/repo"
                    value={item.githubUrl || ''}
                    onChange={(e) => handleChange(idx, 'githubUrl', e.target.value)}
                  />
                </div>
                <div className="col-md-6 form-group mb-0">
                  <label className="form-label">Live Demo URL</label>
                  <input
                    type="url"
                    className="form-control"
                    placeholder="https://myproject.demo.com"
                    value={item.liveDemoUrl || ''}
                    onChange={(e) => handleChange(idx, 'liveDemoUrl', e.target.value)}
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

export default ProjectsStep;
