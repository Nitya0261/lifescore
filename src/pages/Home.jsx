import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MoodBar from "../components/MoodBar";
import HeroSection from "../components/HeroSection";
import SmartAlerts from "../components/SmartAlerts";
import BlogGrid from "../components/BlogGrid";
import SimulatorSection from "../components/SimulatorSection";
import NewsSection from "../components/NewsSection";
import CommunitySection from "../components/CommunitySection";
import API_BASE_URL from "../config/api";

export default function Home() {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/announcements`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setAnnouncements(data);
        }
      })
      .catch(err => console.error("Failed to fetch announcements", err));
  }, []);

  const quickLinks = [
    { icon: "bi-calculator-fill", label: "SIP Calculator", path: "/tools/sip-calculator", color: "#0d9488" },
    { icon: "bi-graph-up-arrow", label: "Compound Interest", path: "/tools/compound-interest", color: "#6366f1" },
    { icon: "bi-bar-chart-line-fill", label: "Budget Tracker", path: "/dashboard/budget", color: "#22c55e" },
    { icon: "bi-book-fill", label: "Glossary", path: "/glossary", color: "#f59e0b" },
    { icon: "bi-arrow-left-right", label: "Compare", path: "/compare/roth-ira-vs-401k", color: "#ec4899" },
    { icon: "bi-person-badge-fill", label: "Find Advisor", path: "/find-advisor", color: "#3b82f6" },
    { icon: "bi-credit-card-fill", label: "Best Cards", path: "/recommendations/credit-cards", color: "#ef4444" },
    { icon: "bi-piggy-bank-fill", label: "HY Savings", path: "/recommendations/high-yield-savings", color: "#8b5cf6" },
  ];

  return (
    <>
      <MoodBar />
      
      {/* Global Live Announcements Broadcast Banner */}
      {announcements.length > 0 && (
        <div style={{ borderBottom: "1px solid var(--border)" }}>
          {announcements.map((ann) => (
            <div 
              key={ann._id} 
              style={{ 
                padding: "0.6rem 1rem", 
                background: ann.type === 'danger' ? '#fef2f2' : ann.type === 'warning' ? '#fffbeb' : ann.type === 'success' ? '#f0fdf4' : '#eff6ff',
                color: ann.type === 'danger' ? '#991b1b' : ann.type === 'warning' ? '#b45309' : ann.type === 'success' ? '#166534' : '#1e40af',
                borderBottom: "1px solid rgba(0,0,0,0.05)",
                textAlign: "center",
                fontWeight: 700,
                fontSize: "0.85rem"
              }}
              className="d-flex justify-content-center align-items-center gap-2 flex-wrap"
            >
              <i className="bi bi-megaphone-fill"></i>
              <span>{ann.message}</span>
              {ann.link && (
                <a 
                  href={ann.link} 
                  target={ann.link.startsWith("http") ? "_blank" : "_self"} 
                  rel="noreferrer" 
                  className="ms-2 text-decoration-underline fw-bold"
                  style={{ color: "inherit" }}
                >
                  {ann.linkText || "Learn More"} →
                </a>
              )}
            </div>
          ))}
        </div>
      )}

      <HeroSection />
      <SmartAlerts />

      {/* Quick Access Ribbon */}
      <section className="quick-links-section py-4 border-bottom" style={{ background: "var(--cream2)" }}>
        <div className="container">
          <div className="d-flex flex-wrap justify-content-center gap-3">
            {quickLinks.map((ql) => (
              <Link
                key={ql.path}
                to={ql.path}
                className="ls-card d-flex align-items-center gap-2 text-decoration-none px-4 py-2"
                style={{
                  borderRadius: "50px",
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  height: "auto",
                  border: `1px solid var(--border)`
                }}
              >
                <i className={`bi ${ql.icon}`} style={{ color: ql.color }}></i>
                {ql.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="blog-grid-section">
        <BlogGrid />
      </div>
      <SimulatorSection />
      <NewsSection />

      {/* Comparison Highlights */}
      <section className="ls-section-alt">
        <div className="container">
          <h3 className="ls-heading ls-heading-lg text-center mb-5">
            Popular Comparisons
          </h3>
          <div className="row g-4 justify-content-center">
            {[
              { label: "Roth IRA vs 401(k)", slug: "roth-ira-vs-401k" },
              { label: "ETF vs Mutual Fund", slug: "etf-vs-mutual-fund" },
            ].map((c) => (
              <div key={c.slug} className="col-md-4">
                <Link
                  to={`/compare/${c.slug}`}
                  className="ls-card text-decoration-none"
                >
                  <div className="card-body p-4 text-center">
                    <i className="bi bi-arrow-left-right mb-2 d-block" style={{ fontSize: "2rem", color: "var(--teal)" }}></i>
                    <h5 className="ls-heading ls-heading-md mb-0">{c.label}</h5>
                  </div>
                </Link>
              </div>
            ))}
            <div className="col-md-4">
              <Link
                to="/glossary"
                className="ls-card text-decoration-none"
              >
                <div className="card-body p-4 text-center">
                  <i className="bi bi-book mb-2 d-block" style={{ fontSize: "2rem", color: "var(--gold)" }}></i>
                  <h5 className="ls-heading ls-heading-md mb-0">Financial Glossary A–Z</h5>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CommunitySection />
    </>
  );
}
