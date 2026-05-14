import React, { useState, useEffect } from 'react';
import API_BASE_URL from '../config/api';

export default function NewsTicker() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/news`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setNews(data);
        }
      })
      .catch(console.error);
  }, []);

  if (news.length === 0) return null;

  return (
    <div style={{ 
      background: "var(--ink)", 
      color: "var(--cream)", 
      padding: "8px 0", 
      overflow: "hidden", 
      whiteSpace: "nowrap",
      position: "relative",
      display: "flex",
      alignItems: "center",
      borderBottom: "1px solid rgba(255,255,255,0.1)",
      fontSize: "0.85rem"
    }}>
      <div className="container-fluid px-2 px-sm-4 d-flex align-items-center">
        <div className="fw-bold me-3 text-uppercase d-flex align-items-center" style={{ color: "var(--teal)", letterSpacing: "1px", zIndex: 2, background: "var(--ink)" }}>
          <i className="bi bi-lightning-charge-fill me-1"></i> Live
        </div>
        <div className="ticker-wrapper" style={{ flex: 1, overflow: "hidden" }}>
          <div className="ticker-track" style={{ display: "inline-block", animation: "ticker 40s linear infinite" }}>
            {/* Double the news array to create a seamless infinite loop */}
            {[...news, ...news].map((item, idx) => (
              <span key={idx} className="mx-4">
                <a 
                  href={item.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-decoration-none"
                  style={{ color: "var(--cream)", transition: "color 0.2s" }}
                  onMouseOver={e => e.currentTarget.style.color = "var(--teal)"}
                  onMouseOut={e => e.currentTarget.style.color = "var(--cream)"}
                >
                  <strong className="opacity-75 me-1">[{item.source}]</strong> {item.title}
                </a>
              </span>
            ))}
          </div>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .ticker-track:hover {
          animation-play-state: paused !important;
        }
      `}} />
    </div>
  );
}
