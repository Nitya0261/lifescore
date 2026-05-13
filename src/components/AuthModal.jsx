import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function AuthModal({ isOpen, onClose }) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div 
      className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center animate__animated animate__fadeIn animate__faster" 
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
        {/* Header with Luxurious Gradient Box */}
        <div 
          className="p-5 text-center position-relative" 
          style={{ 
            background: 'linear-gradient(135deg, var(--ink) 0%, var(--dark-surface) 100%)',
            color: '#fff',
            borderBottom: '3px solid var(--accent)'
          }}
        >
          <div 
            className="position-absolute top-0 end-0 p-3" 
            style={{ cursor: 'pointer', color: 'rgba(255,255,255,0.7)', transition: 'color 0.2s' }}
            onClick={onClose}
            onMouseOver={(e) => e.currentTarget.style.color = '#fff'}
            onMouseOut={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}
          >
            <i className="bi bi-x-lg" style={{ fontSize: '1.2rem' }}></i>
          </div>
          
          <div 
            className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4" 
            style={{ 
              width: '84px', 
              height: '84px',
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.12)'
            }}
          >
            <i className="bi bi-shield-lock-fill text-warning" style={{ fontSize: '2.8rem' }}></i>
          </div>
          
          <h3 className="fw-bold text-white mb-2" style={{ fontFamily: 'var(--serif)', fontSize: '1.8rem', letterSpacing: '-0.02em' }}>
            Feature Locked
          </h3>
          <p className="mb-0" style={{ fontSize: '0.95rem', color: 'rgba(255, 255, 255, 0.8)' }}>
            Sign in to unlock interactive member tools.
          </p>
        </div>

        {/* Adaptive Body Content */}
        <div className="p-4 p-md-5" style={{ background: 'var(--card-bg)' }}>
          <div className="mb-4 pb-2">
            <h6 className="text-uppercase fw-bold mb-3" style={{ fontSize: '0.72rem', letterSpacing: '1.5px', color: 'var(--accent)' }}>
              Member Exclusives
            </h6>
            <div className="d-flex flex-column gap-3">
              <div className="d-flex align-items-center gap-3">
                <div className="d-flex align-items-center justify-content-center rounded-circle flex-shrink-0" style={{ width: '32px', height: '32px', background: 'rgba(212,160,23,0.12)', color: '#d4a017' }}>
                  <i className="bi bi-star-fill small"></i>
                </div>
                <span style={{ fontSize: '0.95rem', color: 'var(--ink)', fontWeight: 500 }}>
                  Earn cumulative <strong>XP</strong> points on every single tool usage
                </span>
              </div>
              
              <div className="d-flex align-items-center gap-3">
                <div className="d-flex align-items-center justify-content-center rounded-circle flex-shrink-0" style={{ width: '32px', height: '32px', background: 'rgba(26,122,94,0.12)', color: 'var(--teal)' }}>
                  <i className="bi bi-bar-chart-fill small"></i>
                </div>
                <span style={{ fontSize: '0.95rem', color: 'var(--ink)', fontWeight: 500 }}>
                  Save customized simulations & track personal <strong>LifeScore</strong> milestones
                </span>
              </div>

              <div className="d-flex align-items-center gap-3">
                <div className="d-flex align-items-center justify-content-center rounded-circle flex-shrink-0" style={{ width: '32px', height: '32px', background: 'rgba(192,57,43,0.12)', color: 'var(--accent)' }}>
                  <i className="bi bi-bell-fill small"></i>
                </div>
                <span style={{ fontSize: '0.95rem', color: 'var(--ink)', fontWeight: 500 }}>
                  Receive custom high-yield notifications & specific market triggers
                </span>
              </div>
            </div>
          </div>

          <div className="d-grid gap-2">
            <button 
              className="btn btn-primary py-3 fw-bold w-100 shadow-sm" 
              style={{ 
                background: 'var(--accent)', 
                borderColor: 'var(--accent)', 
                borderRadius: '10px', 
                fontSize: '1.05rem',
                transition: 'all 0.2s'
              }}
              onClick={() => {
                onClose();
                navigate('/login');
              }}
              onMouseOver={(e) => e.currentTarget.style.filter = 'brightness(1.1)'}
              onMouseOut={(e) => e.currentTarget.style.filter = 'none'}
            >
              Sign In with Credentials
            </button>
            <button 
              className="btn border-0 py-2 w-100 mt-1"
              style={{ background: 'transparent', color: 'var(--ink3)', fontSize: '0.85rem', fontWeight: 600 }}
              onClick={() => {
                onClose();
                navigate('/register');
              }}
              onMouseOver={(e) => e.currentTarget.style.color = 'var(--ink)'}
              onMouseOut={(e) => e.currentTarget.style.color = 'var(--ink3)'}
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
