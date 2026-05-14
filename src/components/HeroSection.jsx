import React, { useState, useEffect } from "react";
import { BLOG_POSTS } from "../data/mockData";
import CatTag from "./CatTag";
import Byline from "./Byline";
import AdSlot from "./AdSlot";
import StockMarketWidget from "./StockMarketWidget";
import NewsletterForm from "./NewsletterForm";
import { Link } from "react-router-dom";

export default function HeroSection() {
  const main = BLOG_POSTS[0];
  const secondary = BLOG_POSTS[1];
  const [showNewsletter, setShowNewsletter] = useState(true);

  useEffect(() => {
    const dismissed = localStorage.getItem("newsletterDismissed");
    if (dismissed) setShowNewsletter(false);
  }, []);

  const dismissNewsletter = () => {
    setShowNewsletter(false);
    localStorage.setItem("newsletterDismissed", "true");
  };

  return (
    <div className="hero-section py-4">
      <div className="container">
        <div className="row g-4 align-items-stretch">
          {/* MAIN STORY */}
          <div className="col-lg-6">
            <Link to={`/article/${main.slug}`} className="hero-main-story h-100 text-decoration-none d-block">
              <div
                className="hero-img-placeholder rounded-4 mb-3 position-relative overflow-hidden shadow-sm"
                style={{
                  background: main.bg,
                  minHeight: "280px",
                  display: "flex",
                  alignItems: "flex-end",
                  padding: "1.75rem",
                  border: "1px solid var(--border)"
                }}
              >
                {/* Absolute gradient base layer to ensure crisp typography over imagery */}
                <div className="position-absolute top-0 start-0 w-100 h-100" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)", zIndex: 1 }} />
                
                {/* Massive background icon */}
                <div className="position-absolute d-flex align-items-center justify-content-center w-100 h-100 top-0 start-0" style={{ zIndex: 0, opacity: 0.15, fontSize: "15rem", transform: "translateY(-10%)" }}>
                  {main.icon}
                </div>
                <div className="position-relative" style={{ zIndex: 2 }}>
                  <CatTag
                    cat={main.cat}
                    color="#fff"
                    bg="var(--accent)"
                    style={{ marginBottom: "0.75rem", fontWeight: 700 }}
                  />
                  <h1
                    className="fw-bold mb-2 text-white"
                    style={{ fontSize: "clamp(1.4rem, 2.5vw, 2.2rem)", fontFamily: "var(--serif)", textShadow: "0 2px 4px rgba(0,0,0,0.4)" }}
                  >
                    {main.title}
                  </h1>
                  <p className="mb-3 text-white-50" style={{ fontSize: "0.95rem", lineHeight: 1.5 }}>
                    {main.deck}
                  </p>
                  <Byline
                    author={main.author}
                    avatar={main.avatar}
                    date={main.date}
                    readTime={main.readTime}
                  />
                </div>
              </div>
            </Link>
          </div>

          {/* SECONDARY + REFINED INTELLIGENCE BRIEF WIDGET */}
          <div className="col-lg-3">
            {/* Secondary story */}
            <Link
              to={`/article/${secondary.slug}`}
              className="card mb-3 text-decoration-none d-block rounded-4 overflow-hidden shadow-sm"
              style={{
                background: secondary.bg,
                minHeight: "180px",
                display: "flex",
                alignItems: "flex-end",
                padding: "1.25rem",
                border: "1px solid var(--border)",
                position: "relative"
              }}
            >
              <div className="position-absolute top-0 start-0 w-100 h-100" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 100%)", zIndex: 1 }} />
              
              {/* Background icon */}
              <div className="position-absolute d-flex align-items-center justify-content-center w-100 h-100 top-0 start-0" style={{ zIndex: 0, opacity: 0.15, fontSize: "10rem", transform: "translateY(-15%)" }}>
                {secondary.icon}
              </div>
              <div className="position-relative" style={{ zIndex: 2 }}>
                <CatTag
                  cat={secondary.cat}
                  color="#fff"
                  bg="rgba(255,255,255,0.25)"
                  style={{ marginBottom: "0.5rem", fontSize: "0.65rem", fontWeight: 700 }}
                />
                <h2 className="fw-bold text-white mb-1" style={{ fontFamily: "var(--serif)", fontSize: "1.1rem", lineHeight: 1.3 }}>
                  {secondary.title}
                </h2>
                <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.7)" }}>
                  <span>{secondary.author}</span>
                </div>
              </div>
            </Link>

            {/* Ad slot */}
            <AdSlot type="banner" label="Advertisement — Supported Intelligence" />
            
            {/* Fully Custom Premium Adaptive Weekly Wealth Card */}
            {showNewsletter && (
              <div 
                className="card border-0 p-4 mt-3 position-relative overflow-hidden rounded-4 transition-all" 
                style={{ 
                  background: 'rgba(255, 255, 255, 0.85)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  boxShadow: '0 12px 40px rgba(0, 0, 0, 0.06), 0 1px 3px rgba(0,0,0,0.03)',
                  border: '1px solid rgba(255,255,255,1)'
                }}
              >
                {/* Decorative background flare */}
                <div 
                  className="position-absolute rounded-circle" 
                  style={{ 
                    width: '150px', height: '150px', 
                    background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)',
                    opacity: 0.06, top: '-40px', right: '-40px', zIndex: 0
                  }}
                ></div>

                <div 
                  className="position-absolute top-0 end-0 p-3" 
                  style={{ zIndex: 5, cursor: 'pointer', transition: 'all 0.2s ease' }}
                  onClick={dismissNewsletter}
                  title="Dismiss intelligence block"
                >
                  <i className="bi bi-x-lg text-muted" style={{ fontSize: '0.9rem', opacity: 0.7 }}></i>
                </div>
                
                <div className="position-relative" style={{ zIndex: 1 }}>
                  <div className="d-flex align-items-center gap-2 mb-3">
                    <div className="rounded-circle d-flex align-items-center justify-content-center shadow-sm" style={{ background: 'var(--accent)', color: '#fff', width: '26px', height: '26px' }}>
                      <i className="bi bi-envelope-check-fill" style={{ fontSize: '0.75rem' }}></i>
                    </div>
                    <span className="text-uppercase fw-bold" style={{ fontSize: '0.65rem', letterSpacing: '1px', color: 'var(--accent)' }}>
                      Smart Insights
                    </span>
                  </div>
                  
                  <h5 className="fw-bold mb-2" style={{ fontFamily: 'var(--serif)', color: 'var(--ink)', fontSize: '1.25rem', lineHeight: 1.2, letterSpacing: '-0.3px' }}>
                    Weekly Wealth Digest
                  </h5>
                  <p className="text-muted small mb-4" style={{ fontSize: '0.85rem', lineHeight: 1.6 }}>
                    Curated high-impact equity strategies and portfolio stress-test summaries delivered every Monday.
                  </p>
                  
                  <NewsletterForm source="hero" />
                  
                  <div className="mt-4 pt-3 border-top d-flex justify-content-between align-items-center" style={{ borderColor: 'rgba(0,0,0,0.06) !important' }}>
                    <span className="text-muted d-flex align-items-center gap-1" style={{ fontSize: '0.65rem', fontWeight: 500 }}>
                      <i className="bi bi-shield-fill-check text-success"></i> Zero tracking ads
                    </span>
                    <span className="badge px-3 py-1.5 rounded-pill" style={{ background: 'rgba(107, 53, 163, 0.06)', color: 'var(--accent)', fontSize: '0.65rem', fontWeight: 700 }}>
                      Free Access
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* STOCK MARKET WIDGET */}
          <div className="col-lg-3">
            <StockMarketWidget />
          </div>
        </div>
      </div>
    </div>
  );
}
