import React, { useState, useEffect, useRef } from "react";
import {
  BLOG_POSTS,
  TRENDING,
  SIM_SCENARIOS,
  GEO_TIPS,
  MICRO_ACTIONS,
} from "../data/mockData";
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
                className="hero-img-placeholder rounded-3 mb-3"
                style={{
                  background: main.bg,
                  minHeight: "280px",
                  display: "flex",
                  alignItems: "flex-end",
                  padding: "1.5rem",
                }}
              >
                <div>
                  <CatTag
                    cat={main.cat}
                    color="#fff"
                    bg="rgba(255,255,255,0.2)"
                    style={{ marginBottom: "0.75rem" }}
                  />
                  <h1
                    className="hero-title hero-title-white mb-2"
                    style={{ fontSize: "clamp(1.4rem,2.5vw,2.2rem)" }}
                  >
                    {main.title}
                  </h1>
                  <p className="hero-deck hero-deck-white mb-3">{main.deck}</p>
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

          {/* SECONDARY + SCORE WIDGET */}
          <div className="col-lg-3">
            {/* Secondary story */}
            <Link
              to={`/article/${secondary.slug}`}
              className="ls-card mb-3 text-decoration-none d-block"
              style={{
                background: secondary.bg,
                minHeight: "180px",
                display: "flex",
                alignItems: "flex-end",
                padding: "1.25rem",
                border: "none"
              }}
            >
              <div>
                <CatTag
                  cat={secondary.cat}
                  color="#fff"
                  bg="rgba(255,255,255,0.2)"
                  style={{ marginBottom: "0.5rem" }}
                />
                <h2 className="ls-heading text-white mb-1" style={{ fontSize: "1.1rem" }}>
                  {secondary.title}
                </h2>
                <div className="hero-byline" style={{ fontSize: "0.75rem" }}>
                  <span style={{ color: "rgba(255,255,255,0.7)" }}>
                    {secondary.author}
                  </span>
                </div>
              </div>
            </Link>

            {/* Ad slot */}
            <AdSlot type="banner" label="Advertisement — Google AdSense" />
            
            {showNewsletter && (
              <div className="ls-card p-4 mt-3 position-relative overflow-hidden" style={{ borderLeft: '4px solid var(--teal)' }}>
                <div 
                  className="position-absolute top-0 end-0 p-3" 
                  style={{ zIndex: 5, cursor: 'pointer', opacity: 0.5 }}
                  onClick={dismissNewsletter}
                >
                  <i className="bi bi-x-lg"></i>
                </div>
                
                <div className="d-flex align-items-center gap-2 mb-2">
                  <div className="bg-teal-light p-2 rounded-circle d-flex align-items-center justify-content-center" style={{ width: '32px', height: '32px' }}>
                    <i className="bi bi-lightning-charge-fill text-teal" style={{ fontSize: '0.8rem' }}></i>
                  </div>
                  <h6 className="ls-heading ls-heading-md mb-0">Smart Insights</h6>
                </div>
                
                <h5 className="ls-heading ls-heading-sm mb-2" style={{ fontSize: '1.1rem' }}>Weekly Wealth Digest</h5>
                <p className="ls-text-muted small mb-3">
                  Join 10,000+ readers for curated financial tips and market analysis every Monday.
                </p>
                
                <NewsletterForm source="hero" />
                
                <div className="mt-3 pt-3 border-top d-flex justify-content-between align-items-center">
                  <span className="ls-text-muted" style={{ fontSize: '0.65rem' }}>
                    <i className="bi bi-shield-check me-1"></i>No spam, ever.
                  </span>
                  <span className="badge bg-light text-dark fw-normal" style={{ fontSize: '0.6rem' }}>
                    Free Forever
                  </span>
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
