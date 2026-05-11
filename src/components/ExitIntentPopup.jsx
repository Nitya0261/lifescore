import React, { useState, useEffect } from 'react';
import NewsletterForm from './NewsletterForm';

export default function ExitIntentPopup() {
  const [show, setShow] = useState(false);
  const [canShow, setCanShow] = useState(false);

  useEffect(() => {
    // Only allow showing after 5 seconds to prevent "starting card" issue
    const timer = setTimeout(() => {
      setCanShow(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Only show once per session
    if (sessionStorage.getItem('exitIntentShown')) return;
    if (!canShow) return;

    const handleMouseLeave = (e) => {
      // If the mouse leaves the top of the window
      if (e.clientY <= 0) {
        setShow(true);
        sessionStorage.setItem('exitIntentShown', 'true');
        document.removeEventListener('mouseleave', handleMouseLeave);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [canShow]);

  if (!show) return null;

  return (
    <div 
      className="modal show d-block" 
      tabIndex="-1" 
      style={{ 
        background: 'rgba(10, 25, 41, 0.85)', 
        backdropFilter: 'blur(8px)',
        zIndex: 2000 
      }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="ls-card p-0 overflow-hidden" style={{ border: 'none', maxWidth: '500px', margin: '0 auto' }}>
          <div className="modal-body p-0 position-relative">
            <button 
              type="button" 
              className="btn-close position-absolute top-0 end-0 m-3 shadow-none" 
              onClick={() => setShow(false)} 
              aria-label="Close"
              style={{ zIndex: 10 }}
            ></button>
            
            <div className="p-4 p-md-5 text-center">
              <div className="mb-4 text-teal" style={{ fontSize: '3.5rem' }}>
                <i className="bi bi-envelope-check-fill"></i>
              </div>
              <h2 className="ls-heading ls-heading-lg mb-3">Wait! Don't leave empty-handed.</h2>
              <p className="ls-text-muted mb-4" style={{ fontSize: '1rem' }}>
                Join 10,000+ others who get our top 5 articles and an actionable finance tip every Monday.
              </p>
              
              <div className="text-start">
                <div className="p-3 rounded-3" style={{ background: 'var(--cream2)' }}>
                  <h6 className="ls-heading ls-heading-md mb-2" style={{ fontSize: '0.9rem' }}>Weekly Wealth Digest</h6>
                  <NewsletterForm source="exit_intent_popup" />
                </div>
              </div>
              
              <button className="btn btn-link text-muted mt-4 text-decoration-none small" onClick={() => setShow(false)}>
                No thanks, I'll pay more taxes instead
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
