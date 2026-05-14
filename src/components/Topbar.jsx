import React, { useState, useEffect } from "react";
import API_BASE_URL from "../config/api";

export default function Topbar() {
  const [time, setTime] = useState(new Date());
  const [markets, setMarkets] = useState([]);

  useEffect(() => {
    const i = setInterval(() => setTime(new Date()), 60000);
    return () => clearInterval(i);
  }, []);

  useEffect(() => {
    const fetchMarkets = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/market-data`);
        const data = await res.json();
        setMarkets(data);
      } catch (err) {
        console.error(err);
      }
    };
    
    fetchMarkets();
    // Refresh every 5 minutes on the client too
    const marketInterval = setInterval(fetchMarkets, 300000);
    return () => clearInterval(marketInterval);
  }, []);

  const fmt = (d) =>
    d.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  return (
    <div className="topbar border-bottom" style={{ background: "var(--card-bg)", fontSize: "0.8rem", position: "relative", zIndex: 10 }}>
      <div className="container">
        <div className="d-flex justify-content-between align-items-center py-2 gap-3">
          {/* Left: Date */}
          <div className="d-none d-lg-flex align-items-center fw-bold" style={{ color: "var(--ink2)", fontSize: "0.75rem", letterSpacing: "0.5px" }}>
            <i className="bi bi-calendar3 me-2 text-accent"></i>
            {fmt(time)}
          </div>
          
          {/* Middle: Live Market Data (Horizontally scrollable to prevent wrapping breaks) */}
          <div className="d-flex flex-grow-1 overflow-auto hide-scrollbar position-relative" style={{ WebkitOverflowScrolling: 'touch' }}>
            <div className="d-flex gap-4 align-items-center mx-auto fw-bold py-1 px-2">
              {markets.length > 0 ? markets.map((m, idx) => {
                const isPositive = m.change >= 0;
                return (
                  <div key={idx} className="d-flex align-items-center gap-2 transition-all hover-lift" style={{ whiteSpace: "nowrap", cursor: "default" }}>
                    <span className="fw-bolder" style={{ color: "var(--accent)", padding: "2px 8px", background: "var(--cream2)", borderRadius: "6px", fontSize: "0.7rem", letterSpacing: "0.5px", border: "1px solid var(--border)" }}>
                      {m.name}
                    </span>
                    <span style={{ color: "var(--ink)", fontSize: "0.85rem", letterSpacing: "-0.5px" }}>
                      {m.price?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                    <span className="d-flex align-items-center gap-1 rounded-pill px-2" style={{ background: isPositive ? "rgba(34, 197, 94, 0.1)" : "rgba(239, 68, 68, 0.1)", color: isPositive ? "#16a34a" : "#dc2626", fontSize: "0.7rem", fontWeight: 700 }}>
                      {isPositive ? <i className="bi bi-caret-up-fill" style={{ fontSize: "0.6rem" }}></i> : <i className="bi bi-caret-down-fill" style={{ fontSize: "0.6rem" }}></i>} 
                      {Math.abs(m.changePercent || 0).toFixed(2)}%
                    </span>
                  </div>
                );
              }) : (
                <span className="text-muted d-flex align-items-center gap-2 small fw-bold">
                  <div className="spinner-border spinner-border-sm text-accent" role="status"></div>
                  Initializing Global Markets...
                </span>
              )}
            </div>
          </div>

          {/* Right: Socials */}
          <div className="d-none d-md-flex gap-3 align-items-center">
            <a href="#" className="text-muted transition-all hover-accent" style={{ textDecoration: "none" }}><i className="bi bi-twitter-x"></i></a>
            <a href="#" className="text-muted transition-all hover-accent" style={{ textDecoration: "none" }}><i className="bi bi-instagram"></i></a>
            <a href="#" className="text-muted transition-all hover-accent" style={{ textDecoration: "none" }}><i className="bi bi-youtube"></i></a>
          </div>
        </div>
      </div>
      
      {/* Inline styles for hiding scrollbar and hover effects */}
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .hover-accent:hover { color: var(--accent) !important; transform: translateY(-1px); }
        .hover-lift:hover { transform: translateY(-1px); }
      `}} />
    </div>
  );
}
