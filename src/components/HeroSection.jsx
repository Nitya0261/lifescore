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
    <div className="hero-section py-5 py-md-7 overflow-hidden position-relative" style={{ background: "var(--card-bg)" }}>
      {/* Subtle Background Pattern */}
      <div className="position-absolute top-0 start-0 w-100 h-100 opacity-05" style={{ 
        backgroundImage: "radial-gradient(circle at 2px 2px, var(--border) 1px, transparent 0)",
        backgroundSize: "40px 40px",
        zIndex: 0
      }}></div>

      <div className="container position-relative" style={{ zIndex: 1 }}>
        <div className="row justify-content-center text-center">
          <div className="col-lg-10 col-xl-8">
            <div className="mb-4">
              <span className="badge px-3 py-2 rounded-pill fw-bold" style={{ background: "var(--cream)", color: "var(--teal)", border: "1px solid var(--border)" }}>
                <i className="bi bi-shield-check me-2"></i>THE WEALTH INTELLIGENCE ENGINE
              </span>
            </div>
            
            <h1 className="display-3 fw-black mb-4" style={{ fontFamily: "var(--serif)", lineHeight: 1.1, letterSpacing: "-0.03em" }}>
              Master your money with <br className="d-none d-md-block" />
              <span className="text-teal">Precision Intelligence.</span>
            </h1>
            
            <p className="lead text-muted mb-5 mx-auto" style={{ maxWidth: "700px" }}>
              Stop guessing. LifeScore provides the high-fidelity tools and institutional-grade insights you need to build a life of total financial freedom.
            </p>
            
            <div className="d-flex flex-wrap justify-content-center gap-3 mb-5">
              <Link to="/calculate-lifescore" className="btn btn-teal btn-lg px-5 py-3 rounded-pill fw-bold shadow-lg">
                Calculate My LifeScore <i className="bi bi-arrow-right ms-2"></i>
              </Link>
              <Link to="/tools" className="btn btn-outline-dark btn-lg px-5 py-3 rounded-pill fw-bold">
                Explore The Toolkit
              </Link>
            </div>
            
            <div className="row g-4 justify-content-center border-top pt-5 mt-2" style={{ borderColor: "var(--border) !important" }}>
              {[
                { label: "100% Privacy", icon: "bi-lock", desc: "No data sharing" },
                { label: "Institutional Grade", icon: "bi-bank", desc: "Proven models" },
                { label: "Free Forever", icon: "bi-gift", desc: "No hidden fees" }
              ].map((item, idx) => (
                <div key={idx} className="col-6 col-md-3">
                  <div className="d-flex align-items-center justify-content-center gap-2 text-muted">
                    <i className={`bi ${item.icon} text-teal`}></i>
                    <span className="small fw-bold text-uppercase" style={{ letterSpacing: "0.5px" }}>{item.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
