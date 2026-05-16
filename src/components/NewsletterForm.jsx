import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import API_BASE_URL from '../config/api';

export default function NewsletterForm({ source = "website" }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [message, setMessage] = useState('');
  const { addXp, XP_REWARDS } = useAuth();

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    
    try {
      const res = await fetch(`${API_BASE_URL}/api/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source })
      });

      const data = await res.json();

      if (res.ok) {
        setStatus('success');
        setMessage(data.msg || "Successfully subscribed!");
        setEmail('');
        addXp(XP_REWARDS?.SUBSCRIBE_NEWSLETTER || 50, "Subscribed to Newsletter!");
      } else {
        setStatus('error');
        setMessage(data.msg || "Something went wrong.");
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
      setMessage("Failed to connect to server.");
    }
  };

  return (
    <div className="newsletter-wrapper">
      {status === 'success' ? (
        <div className="alert alert-success d-flex align-items-center mb-0" style={{ borderRadius: "var(--radius-md)", border: "none", background: "rgba(56, 178, 172, 0.15)", color: "var(--teal)" }}>
          <i className="bi bi-check-circle-fill fs-4 me-3"></i>
          <div>
            <strong>Plan Secured!</strong>
            <div style={{ fontSize: "0.9rem" }}>Check your inbox every Monday for your personalized wealth trajectory and market updates.</div>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubscribe} className="d-flex flex-column gap-2 m-0 p-0">
          <div className="position-relative d-flex align-items-center" style={{ background: "rgba(255,255,255,0.7)", borderRadius: "10px", border: "1px solid rgba(0,0,0,0.06)", boxShadow: "inset 0 2px 4px rgba(0,0,0,0.02)" }}>
            <i className="bi bi-envelope position-absolute text-muted" style={{ left: "12px", fontSize: "0.9rem", zIndex: 2 }}></i>
            <input 
              type="email" 
              className="form-control shadow-none border-0 bg-transparent ps-5" 
              placeholder="Enter email for your weekly plan..." 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={status === 'loading'}
              style={{ 
                height: "46px",
                color: "var(--ink)", 
                fontSize: "0.85rem",
                fontWeight: 500,
                paddingRight: "75px"
              }}
            />
            <button 
              type="submit" 
              className="btn btn-sm position-absolute rounded-3 shadow-sm d-flex align-items-center justify-content-center transition-all" 
              disabled={status === 'loading'}
              style={{ 
                right: "6px",
                height: "34px",
                background: "var(--accent)", 
                color: "#fff", 
                padding: "0 1.2rem", 
                fontSize: "0.8rem",
                fontWeight: 600,
                border: "none",
                letterSpacing: "0.3px"
              }}
            >
              {status === 'loading' ? <span className="spinner-border spinner-border-sm" style={{ width: '1rem', height: '1rem' }}></span> : "Get My Plan"}
            </button>
          </div>
          {status === 'error' && <small className="text-danger mt-1 fw-bold" style={{ fontSize: "0.75rem" }}><i className="bi bi-exclamation-circle me-1"></i>{message}</small>}
        </form>
      )}
    </div>
  );
}
