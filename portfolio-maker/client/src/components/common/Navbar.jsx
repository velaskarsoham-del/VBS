import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Code2, LayoutDashboard, LogOut, Sparkles, Menu, X } from 'lucide-react';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="pm-navbar">
      <div className="pm-container">
        <div className="pm-navbar-inner">
          {/* Logo */}
          <Link to="/" className="d-flex align-items-center gap-2 text-decoration-none">
            <div
              className="d-flex align-items-center justify-content-center shadow-sm"
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                background: 'var(--accent-gradient)'
              }}
            >
              <Code2 size={20} color="#ffffff" />
            </div>
            <span className="text-white" style={{ fontSize: '1.2rem', fontWeight: 800, letterSpacing: '-0.5px' }}>
              Portfolio<span className="gradient-text">Maker</span>
            </span>
          </Link>

          {/* Desktop Single Row: Navigation Links + Action Buttons */}
          <div className="d-none d-md-flex align-items-center gap-4">
            {!isAuthenticated && (
              <div className="pm-nav-links">
                <a href="#features" className="nav-link-custom">Features</a>
                <a href="#how-it-works" className="nav-link-custom">How It Works</a>
                <a href="#templates" className="nav-link-custom">Templates</a>
                <a href="#about" className="nav-link-custom">About</a>
              </div>
            )}

            <div className="pm-nav-actions">
              {isAuthenticated ? (
                <>
                  <Link to="/dashboard" className="btn btn-outline btn-sm">
                    <LayoutDashboard size={15} /> Dashboard
                  </Link>
                  <Link to="/builder" className="btn btn-gradient btn-sm">
                    <Sparkles size={15} /> Edit Portfolio
                  </Link>
                  <button onClick={handleLogout} className="btn btn-outline btn-sm text-secondary" title="Sign Out">
                    <LogOut size={15} />
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="btn btn-outline btn-sm px-3">
                    Sign In
                  </Link>
                  <Link to="/register" className="btn btn-primary btn-sm px-4">
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile Hamburger Toggle Button (Hidden on Desktop) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="pm-menu-btn d-md-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="d-md-none py-3 border-top pm-mobile-drawer animate-fade-in" style={{ borderColor: 'var(--border-color)' }}>
            {!isAuthenticated && (
              <div className="d-flex flex-column gap-2 mb-3">
                <a href="#features" onClick={() => setMobileMenuOpen(false)} className="nav-link-custom py-2">Features</a>
                <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)} className="nav-link-custom py-2">How It Works</a>
                <a href="#templates" onClick={() => setMobileMenuOpen(false)} className="nav-link-custom py-2">Templates</a>
                <a href="#about" onClick={() => setMobileMenuOpen(false)} className="nav-link-custom py-2">About</a>
              </div>
            )}

            <div className="d-flex flex-column gap-2">
              {isAuthenticated ? (
                <>
                  <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)} className="btn btn-outline btn-sm justify-content-center">
                    <LayoutDashboard size={16} /> Dashboard
                  </Link>
                  <Link to="/builder" onClick={() => setMobileMenuOpen(false)} className="btn btn-gradient btn-sm justify-content-center">
                    <Sparkles size={16} /> Edit Portfolio
                  </Link>
                  <button onClick={() => { handleLogout(); setMobileMenuOpen(false); }} className="btn btn-outline btn-sm text-danger justify-content-center">
                    <LogOut size={16} /> Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="btn btn-outline btn-sm justify-content-center">
                    Sign In
                  </Link>
                  <Link to="/register" onClick={() => setMobileMenuOpen(false)} className="btn btn-primary btn-sm justify-content-center">
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
