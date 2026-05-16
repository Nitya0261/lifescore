import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AuthModal({ isOpen, onClose }) {
  const navigate = useNavigate();
  const { loginUser, loginWithGoogle } = useAuth();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await loginUser(email, password);
    setLoading(false);
    
    if (res.success) {
      onClose(); // Close modal on success
      if (email.toLowerCase().includes("admin")) {
        navigate("/admin");
      } else {
        navigate("/profile");
      }
    } else {
      setError(res.error || "Login failed");
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    setLoading(true);
    if (loginWithGoogle) {
      const res = await loginWithGoogle();
      setLoading(false);
      if (res?.success) {
        onClose();
        navigate("/profile");
      } else {
        setError(res?.error || "Google sign-in flow failed");
      }
    } else {
      setLoading(false);
      setError("Google Sign-In is not initialized");
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center animate__animated animate__fadeIn animate__faster" 
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
      style={{ 
        zIndex: 99999, 
        background: 'rgba(5, 12, 26, 0.85)', 
        backdropFilter: 'blur(10px)' 
      }}
      onClick={onClose}
    >
      <div 
        className="p-0 overflow-hidden animate__animated animate__zoomIn animate__faster" 
        style={{ 
          maxWidth: '460px', 
          width: '92%', 
          background: 'var(--card-bg)',
          borderRadius: '16px',
          border: '1px solid var(--border)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div 
          className="p-4 text-center position-relative" 
          style={{ 
            background: 'linear-gradient(135deg, var(--ink) 0%, var(--dark-surface) 100%)',
            color: '#fff',
            borderBottom: '3px solid var(--accent)'
          }}
        >
          <button 
            className="btn position-absolute top-0 end-0 p-3" 
            style={{ color: 'rgba(255,255,255,0.7)', transition: 'color 0.2s', background: 'transparent', border: 'none' }}
            onClick={onClose}
            aria-label="Close authentication modal"
            onMouseOver={(e) => e.currentTarget.style.color = '#fff'}
            onMouseOut={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}
          >
            <i className="bi bi-x-lg" style={{ fontSize: '1.2rem' }} aria-hidden="true"></i>
          </button>
          
          <h3 id="auth-modal-title" className="fw-bold text-white mb-1 mt-2" style={{ fontFamily: 'var(--serif)', fontSize: '1.6rem', letterSpacing: '-0.02em' }}>
            Welcome Back
          </h3>
          <p className="mb-0" style={{ fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.8)' }}>
            Sign in to unlock your intelligent dashboard.
          </p>
        </div>

        {/* Login Form Body */}
        <div className="p-4 p-md-5" style={{ background: 'var(--card-bg)' }}>
          <form onSubmit={handleSubmit}>
            {error && <div className="alert alert-danger" style={{ fontSize: "0.85rem", padding: "0.5rem" }}>{error}</div>}
            
            <div className="mb-3 text-start">
              <label htmlFor="auth-email" className="form-label" style={{ fontWeight: 600, fontSize: "0.85rem", color: "var(--ink)" }}>Email address</label>
              <input 
                id="auth-email"
                type="email" 
                className="form-control" 
                placeholder="Enter your email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{ padding: "0.75rem", borderRadius: "8px" }}
              />
            </div>
            <div className="mb-4 text-start">
              <div className="d-flex justify-content-between">
                <label htmlFor="auth-password" className="form-label" style={{ fontWeight: 600, fontSize: "0.85rem", color: "var(--ink)" }}>Password</label>
                <Link to="/forgot-password" style={{ fontSize: "0.8rem", color: "var(--accent)", textDecoration: "none", fontWeight: 600 }}>Forgot password?</Link>
              </div>
              <input 
                id="auth-password"
                type="password" 
                className="form-control" 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ padding: "0.75rem", borderRadius: "8px" }}
              />
            </div>

            <button type="submit" disabled={loading} className="btn w-100 mb-3 fw-bold text-white" style={{ padding: "0.75rem", borderRadius: "8px", background: "var(--accent)" }}>
              {loading ? "Signing in..." : "Sign In"}
            </button>
            
            <button type="button" onClick={handleGoogleLogin} disabled={loading} className="btn btn-outline-secondary w-100 fw-bold mb-2" style={{ padding: "0.75rem", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>
              <i className="bi bi-google text-danger"></i> Sign in with Google
            </button>
          </form>

          <div className="text-center mt-3" style={{ fontSize: "0.85rem", color: "var(--ink3)", fontWeight: 600 }}>
            <button 
              className="btn btn-link p-0 text-decoration-none"
              style={{ color: "var(--ink)", fontWeight: 700 }}
              onClick={() => {
                onClose();
                navigate('/register');
              }}
            >
              New member? Register instantly &rarr;
            </button>
          </div>
        </div>
        
        {/* Adaptive Footer Block */}
        <div className="p-3 text-center border-top" style={{ background: 'var(--cream2)', borderColor: 'var(--border) !important' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--ink3)', fontWeight: 600 }}>
            <i className="bi bi-shield-check text-success me-1"></i> Trusted guidance joining over 120,000+ total global accounts.
          </span>
        </div>
      </div>
    </div>
  );
}
