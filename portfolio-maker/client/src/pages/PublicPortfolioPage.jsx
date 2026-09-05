import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import * as portfolioService from '../services/portfolioService';
import TemplateRenderer from '../templates/TemplateRenderer';
import { Download, Sparkles, AlertTriangle, ArrowLeft } from 'lucide-react';
import { exportToPdf } from '../utils/exportPdf';

const PublicPortfolioPage = () => {
  const { username } = useParams();
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const fetchPublicData = async () => {
      try {
        setLoading(true);
        const data = await portfolioService.getPublicPortfolio(username);
        if (data.success && data.portfolio) {
          setPortfolio(data.portfolio);
        } else {
          setErrorMsg('Portfolio not found or set to private.');
        }
      } catch (err) {
        console.error('Failed to fetch public portfolio:', err);
        setErrorMsg('This portfolio is private, does not exist, or has been unpublished.');
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchPublicData();
    }
  }, [username]);

  const handleDownloadPdf = () => {
    exportToPdf('portfolio-render-area', `${username}-portfolio.pdf`);
  };

  if (loading) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center" style={{ background: '#0a0d14' }}>
        <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
          <span className="visually-hidden">Loading Portfolio...</span>
        </div>
      </div>
    );
  }

  if (errorMsg || !portfolio) {
    return (
      <div className="min-vh-100 d-flex flex-column align-items-center justify-content-center text-center p-4" style={{ background: '#0a0d14' }}>
        <div className="glass-panel p-5" style={{ maxWidth: '500px', borderRadius: '16px' }}>
          <AlertTriangle size={48} className="text-warning mb-3" />
          <h2 className="h4 text-white fw-bold mb-2">Portfolio Unavailable</h2>
          <p className="text-secondary small mb-4">{errorMsg}</p>
          <Link to="/" className="btn btn-primary">
            <ArrowLeft size={16} /> Return to Portfolio Maker
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-vh-100 position-relative">
      {/* Floating Header Action Controls */}
      <div
        className="position-fixed top-0 end-0 p-3 d-flex gap-2"
        style={{ zIndex: 1000, backdropFilter: 'blur(8px)' }}
      >
        <button onClick={handleDownloadPdf} className="btn btn-primary btn-sm shadow">
          <Download size={14} /> Download PDF
        </button>
        <Link to="/" className="btn btn-outline btn-sm glass-panel text-white shadow">
          <Sparkles size={14} /> Built with PortfolioMaker
        </Link>
      </div>

      <TemplateRenderer portfolio={portfolio} isPreview={false} />
    </div>
  );
};

export default PublicPortfolioPage;
