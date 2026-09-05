import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Award, Plus, Trash2 } from 'lucide-react';

const CertificationsStep = () => {
  const { portfolio, updateSection } = usePortfolio();
  const certifications = portfolio.certifications || [];

  const handleAdd = () => {
    const newCert = {
      name: 'Full Stack Web Development',
      issuingOrganization: 'Coursera / Meta',
      issueDate: '2024',
      credentialUrl: 'https://coursera.org/verify/...'
    };
    updateSection('certifications', [...certifications, newCert]);
  };

  const handleRemove = (index) => {
    const updated = certifications.filter((_, i) => i !== index);
    updateSection('certifications', updated);
  };

  const handleChange = (index, field, value) => {
    const updated = certifications.map((item, i) => {
      if (i === index) {
        return { ...item, [field]: value };
      }
      return item;
    });
    updateSection('certifications', updated);
  };

  return (
    <div className="animate-fade-in">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h4 className="text-white fw-bold mb-1 d-flex align-items-center gap-2">
            <Award className="text-success" size={20} /> Certifications & Badges
          </h4>
          <p className="text-secondary small mb-0">Add professional certifications, licenses, and verified badges.</p>
        </div>
        <button onClick={handleAdd} className="btn btn-outline btn-sm">
          <Plus size={16} /> Add Certification
        </button>
      </div>

      {certifications.length === 0 ? (
        <div className="text-center p-4 rounded-3 border border-dashed text-secondary" style={{ borderColor: 'var(--border-color)' }}>
          No certifications added yet. Click "+ Add Certification" to list your verified credentials.
        </div>
      ) : (
        <div className="d-flex flex-column gap-3">
          {certifications.map((item, idx) => (
            <div key={idx} className="p-3 rounded-3 border position-relative" style={{ background: 'rgba(10,13,20,0.5)', borderColor: 'var(--border-color)' }}>
              <button
                onClick={() => handleRemove(idx)}
                className="btn btn-sm btn-outline text-danger border-0 position-absolute top-0 end-0 m-2"
                title="Remove Certification"
              >
                <Trash2 size={16} />
              </button>

              <div className="row g-3">
                <div className="col-md-6 form-group">
                  <label className="form-label">Certificate Name *</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. AWS Certified Developer"
                    value={item.name || ''}
                    onChange={(e) => handleChange(idx, 'name', e.target.value)}
                  />
                </div>
                <div className="col-md-6 form-group">
                  <label className="form-label">Issuing Organization *</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. Amazon Web Services / Meta"
                    value={item.issuingOrganization || ''}
                    onChange={(e) => handleChange(idx, 'issuingOrganization', e.target.value)}
                  />
                </div>
              </div>

              <div className="row g-3">
                <div className="col-md-6 form-group mb-0">
                  <label className="form-label">Issue Date</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. Nov 2024"
                    value={item.issueDate || ''}
                    onChange={(e) => handleChange(idx, 'issueDate', e.target.value)}
                  />
                </div>
                <div className="col-md-6 form-group mb-0">
                  <label className="form-label">Credential Verification URL</label>
                  <input
                    type="url"
                    className="form-control"
                    placeholder="https://verify.credential.com/..."
                    value={item.credentialUrl || ''}
                    onChange={(e) => handleChange(idx, 'credentialUrl', e.target.value)}
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

export default CertificationsStep;
