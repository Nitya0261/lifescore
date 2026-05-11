import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function AuthModal({ isOpen, onClose }) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div 
      className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" 
      style={{ 
        zIndex: 9999, 
        background: 'rgba(5, 12, 26, 0.85)', 
        backdropFilter: 'blur(8px)' 
      }}
      onClick={onClose}
    >
      <div 
        className="ls-card p-0 overflow-hidden animate__animated animate__zoomIn" 
        style={{ 
          maxWidth: '450px', 
          width: '90%', 
          border: 'none',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Background Pattern */}
        <div 
          className="p-5 text-center position-relative" 
          style={{ 
            background: 'linear-gradient(135deg, var(--navy) 0%, #0a1f3d 100%)',
            color: '#fff' 
          }}
        >
          <div 
            className="position-absolute top-0 end-0 p-3" 
            style={{ cursor: 'pointer', opacity: 0.6 }}
            onClick={onClose}
          >
            <i className="bi bi-x-lg"></i>
          </div>
          
          <div 
            className="bg-white bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4" 
            style={{ width: '80px', height: '80px' }}
          >
            <i className="bi bi-lock-fill text-warning" style={{ fontSize: '2.5rem' }}></i>
          </div>
          
          <h3 className="ls-heading text-white mb-2" style={{ fontSize: '1.75rem' }}>Experience Locked</h3>
          <p className="text-white opacity-75 mb-0" style={{ fontSize: '0.95rem' }}>
            You're missing out on rewards!
          </p>
        </div>

        {/* Body */}
        <div className="p-4 bg-white">
          <div className="mb-4">
            <h6 className="text-uppercase fw-bold text-muted mb-3" style={{ fontSize: '0.75rem', letterSpacing: '1px' }}>Benefits of joining:</h6>
            <div className="d-flex flex-column gap-3">
              <div className="d-flex align-items-center gap-3">
                <i className="bi bi-star-fill text-warning"></i>
                <span className="ls-text-ink" style={{ fontSize: '0.9rem' }}>Earn **XP** for every tool you use</span>
              </div>
              <div className="d-flex align-items-center gap-3">
                <i className="bi bi-graph-up text-success"></i>
                <span className="ls-text-ink" style={{ fontSize: '0.9rem' }}>Track your **LifeScore** progress</span>
              </div>
              <div className="d-flex align-items-center gap-3">
                <i className="bi bi-bell-fill text-primary"></i>
                <span className="ls-text-ink" style={{ fontSize: '0.9rem' }}>Personalized financial alerts</span>
              </div>
            </div>
          </div>

          <div className="d-grid gap-2">
            <button 
              className="ls-btn-primary py-3" 
              style={{ borderRadius: '12px', fontWeight: 700 }}
              onClick={() => {
                onClose();
                navigate('/login');
              }}
            >
              Sign In to LifeScore
            </button>
            <button 
              className="btn btn-link text-decoration-none text-muted small py-2"
              onClick={() => {
                onClose();
                navigate('/login');
              }}
            >
              Don't have an account? Create one &rarr;
            </button>
          </div>
        </div>
        
        {/* Footer */}
        <div className="p-3 bg-light text-center border-top">
          <span className="text-muted" style={{ fontSize: '0.75rem' }}>
            Join 120,000+ members improving their finances today.
          </span>
        </div>
      </div>
    </div>
  );
}
