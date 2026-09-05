import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Share2 } from 'lucide-react';
import { Github, Linkedin, Twitter, Instagram, Youtube, Globe } from '../../components/common/SocialIcons';

const SocialLinksStep = () => {
  const { portfolio, updateField } = usePortfolio();
  const socialLinks = portfolio.socialLinks || {};

  return (
    <div className="animate-fade-in">
      <h4 className="text-white fw-bold mb-3 d-flex align-items-center gap-2">
        <Share2 className="text-pink-400" size={20} style={{ color: '#ec4899' }} /> Social Media & Links
      </h4>
      <p className="text-secondary small mb-4">Add links to your public profiles. Only entered links will appear on your portfolio.</p>

      <div className="form-group">
        <label className="form-label d-flex align-items-center gap-2">
          <Github size={16} /> GitHub Profile
        </label>
        <input
          type="url"
          className="form-control"
          placeholder="https://github.com/your-username"
          value={socialLinks.github || ''}
          onChange={(e) => updateField('socialLinks', 'github', e.target.value)}
        />
      </div>

      <div className="form-group">
        <label className="form-label d-flex align-items-center gap-2">
          <Linkedin size={16} /> LinkedIn Profile
        </label>
        <input
          type="url"
          className="form-control"
          placeholder="https://linkedin.com/in/your-username"
          value={socialLinks.linkedin || ''}
          onChange={(e) => updateField('socialLinks', 'linkedin', e.target.value)}
        />
      </div>

      <div className="form-group">
        <label className="form-label d-flex align-items-center gap-2">
          <Twitter size={16} /> Twitter / X Profile
        </label>
        <input
          type="url"
          className="form-control"
          placeholder="https://x.com/your-username"
          value={socialLinks.twitter || ''}
          onChange={(e) => updateField('socialLinks', 'twitter', e.target.value)}
        />
      </div>

      <div className="form-group">
        <label className="form-label d-flex align-items-center gap-2">
          <Instagram size={16} /> Instagram Profile
        </label>
        <input
          type="url"
          className="form-control"
          placeholder="https://instagram.com/your-username"
          value={socialLinks.instagram || ''}
          onChange={(e) => updateField('socialLinks', 'instagram', e.target.value)}
        />
      </div>

      <div className="form-group">
        <label className="form-label d-flex align-items-center gap-2">
          <Youtube size={16} /> YouTube Channel
        </label>
        <input
          type="url"
          className="form-control"
          placeholder="https://youtube.com/@your-channel"
          value={socialLinks.youtube || ''}
          onChange={(e) => updateField('socialLinks', 'youtube', e.target.value)}
        />
      </div>

      <div className="form-group">
        <label className="form-label d-flex align-items-center gap-2">
          <Globe size={16} /> Personal Website / Blog
        </label>
        <input
          type="url"
          className="form-control"
          placeholder="https://yourdomain.com"
          value={socialLinks.website || ''}
          onChange={(e) => updateField('socialLinks', 'website', e.target.value)}
        />
      </div>
    </div>
  );
};

export default SocialLinksStep;
