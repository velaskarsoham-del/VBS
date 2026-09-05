import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Lock, ArrowRight, Code2, AlertCircle, CheckCircle } from 'lucide-react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setErrorMsg('Please fill in all fields.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }

    if (formData.password.length < 6) {
      setErrorMsg('Password must be at least 6 characters long.');
      return;
    }

    setLoading(true);
    const result = await register(formData);
    setLoading(false);

    if (result.success) {
      navigate('/dashboard');
    } else {
      setErrorMsg(result.message);
    }
  };

  return (
    <div className="min-vh-100 d-flex flex-column" style={{ background: 'var(--bg-primary)' }}>
      <Navbar />

      <div className="container py-5 my-auto d-flex justify-content-center">
        <div className="glass-panel p-4 p-md-5 animate-fade-in" style={{ maxWidth: '480px', width: '100%', borderRadius: '16px' }}>
          <div className="text-center mb-4">
            <div className="d-inline-flex align-items-center justify-content-center p-3 mb-3 rounded-3" style={{ background: 'var(--accent-gradient)' }}>
              <Code2 size={28} color="#fff" />
            </div>
            <h2 className="h3 text-white fw-bold mb-1">Create Account</h2>
            <p className="text-secondary small">Start building your dynamic portfolio</p>
          </div>

          {errorMsg && (
            <div className="alert alert-danger d-flex align-items-center gap-2 py-2 px-3 small mb-4" role="alert" style={{ borderRadius: '8px' }}>
              <AlertCircle size={16} />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="e.g. Soham Velaskar"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="soham@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="At least 6 characters"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                className="form-control"
                placeholder="Re-enter password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn btn-gradient w-100 py-2 mt-3" disabled={loading}>
              {loading ? (
                <span>Creating Portfolio Account...</span>
              ) : (
                <>
                  Get Started <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <div className="text-center mt-4 pt-3 border-top" style={{ borderColor: 'var(--border-color)' }}>
            <p className="text-secondary small mb-0">
              Already have an account?{' '}
              <Link to="/login" className="text-info fw-bold text-decoration-none">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default RegisterPage;
