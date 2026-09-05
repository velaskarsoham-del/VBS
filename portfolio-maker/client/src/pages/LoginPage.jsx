import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Lock, Mail, ArrowRight, Code2, AlertCircle } from 'lucide-react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email || !password) {
      setErrorMsg('Please fill in both email and password.');
      return;
    }

    setLoading(true);
    const result = await login({ email, password });
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
        <div className="glass-panel p-4 p-md-5 animate-fade-in" style={{ maxWidth: '440px', width: '100%', borderRadius: '16px' }}>
          <div className="text-center mb-4">
            <div className="d-inline-flex align-items-center justify-content-center p-3 mb-3 rounded-3" style={{ background: 'var(--accent-gradient)' }}>
              <Code2 size={28} color="#fff" />
            </div>
            <h2 className="h3 text-white fw-bold mb-1">Welcome Back</h2>
            <p className="text-secondary small">Sign in to manage your portfolio</p>
          </div>

          {errorMsg && (
            <div className="alert alert-danger d-flex align-items-center gap-2 py-2 px-3 small mb-4" role="alert" style={{ borderRadius: '8px' }}>
              <AlertCircle size={16} />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <div className="position-relative">
                <input
                  type="email"
                  className="form-control ps-4"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <div className="d-flex align-items-center justify-content-between mb-1">
                <label className="form-label mb-0">Password</label>
              </div>
              <input
                type="password"
                className="form-control"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary w-100 py-2 mt-3" disabled={loading}>
              {loading ? (
                <span>Signing in...</span>
              ) : (
                <>
                  Sign In <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <div className="text-center mt-4 pt-3 border-top" style={{ borderColor: 'var(--border-color)' }}>
            <p className="text-secondary small mb-0">
              Don't have an account?{' '}
              <Link to="/register" className="text-info fw-bold text-decoration-none">
                Create Portfolio Account
              </Link>
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default LoginPage;
