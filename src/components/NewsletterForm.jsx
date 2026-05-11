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
            <strong>You're in!</strong>
            <div style={{ fontSize: "0.9rem" }}>Watch your inbox every Monday for the top 5 articles + one actionable finance tip.</div>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubscribe} className="d-flex flex-column gap-2">
          <div className="d-flex gap-2">
            <input 
              type="email" 
              className="form-control" 
              placeholder="Enter your email address" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={status === 'loading'}
              style={{ padding: "0.8rem 1rem", borderRadius: "8px" }}
            />
            <button 
              type="submit" 
              className="btn fw-bold" 
              disabled={status === 'loading'}
              style={{ background: "var(--teal)", color: "#fff", padding: "0 1.5rem", borderRadius: "8px", whiteSpace: "nowrap" }}
            >
              {status === 'loading' ? <span className="spinner-border spinner-border-sm"></span> : "Subscribe"}
            </button>
          </div>
          {status === 'error' && <small className="text-danger mt-1"><i className="bi bi-exclamation-circle me-1"></i>{message}</small>}
          <small className="text-muted mt-1" style={{ fontSize: "0.8rem" }}>Join 10,000+ readers. No spam, ever. Unsubscribe anytime.</small>
        </form>
      )}
    </div>
  );
}
