import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import HeroSection from "../components/HeroSection";
import BlogGrid from "../components/BlogGrid";
import SEO from "../components/SEO";
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
    { icon: "bi-arrow-left-right", label: "Compare", path: "/compare", color: "#ec4899" },
    { icon: "bi-person-badge-fill", label: "Find Advisor", path: "/advisor", color: "#3b82f6" },
    { icon: "bi-credit-card-fill", label: "Best Cards", path: "/recommendations/cards", color: "#ef4444" },
    { icon: "bi-piggy-bank-fill", label: "HY Savings", path: "/recommendations/savings", color: "#8b5cf6" },
  ];

  return (
    <>
      <SEO 
        title="Personal Finance & Life Intelligence Platform" 
        description="LifeScore helps you track your real net worth, calculate SIP trajectories, and compare ultimate retirement options using tailored financial telemetry."
        url="https://lifescore.app"
      />

      <HeroSection />

      {/* Primary Conversion Path: The Growth Engine */}
      <section className="py-5 py-md-6" style={{ background: "var(--card-bg)" }}>
        <div className="container">
          <div className="row justify-content-center text-center mb-5">
            <div className="col-lg-8">
              <h2 className="ls-heading ls-heading-lg mb-3">Intelligence Toolkit</h2>
              <p className="text-muted fs-5 mb-0">High-precision simulators to model your path to financial freedom.</p>
            </div>
          </div>
          
          <div className="row g-4">
            {[
              { title: "SIP Calculator", desc: "Project wealth from regular investments.", path: "/tools/sip-calculator", icon: "bi-calculator", color: "var(--teal)", bg: "var(--cream2)" },
              { title: "Budget Tracker", desc: "Master your cashflow with 50/30/20 rules.", path: "/dashboard/budget", icon: "bi-pie-chart", color: "var(--teal)", bg: "var(--cream2)" },
              { title: "Retirement Goal", desc: "Find your magic number for total freedom.", path: "/tools/retirement-number", icon: "bi-umbrella", color: "var(--teal)", bg: "var(--cream2)" },
              { title: "Debt Payoff", desc: "Compare Snowball vs. Avalanche strategies.", path: "/tools/debt-payoff", icon: "bi-fire", color: "var(--teal)", bg: "var(--cream2)" },
              { title: "Emergency Fund", desc: "Calculate your safety net in 30 seconds.", path: "/tools/emergency-fund", icon: "bi-shield-check", color: "var(--teal)", bg: "var(--cream2)" },
              { title: "Net Worth Tracker", desc: "See your entire financial life in one place.", path: "/tools/net-worth", icon: "bi-wallet2", color: "var(--teal)", bg: "var(--cream2)" }
            ].map((tool, idx) => (
              <div key={idx} className="col-md-4 col-sm-6">
                <Link to={tool.path} className="ls-card h-100 d-block text-decoration-none transition-all p-4 text-center" style={{ background: "var(--card-bg)", border: "1px solid var(--border)", borderRadius: "24px" }}>
                  <div className="mb-3 d-inline-flex align-items-center justify-content-center" style={{ width: "64px", height: "64px", borderRadius: "16px", background: "var(--cream)", color: tool.color, fontSize: "1.75rem" }}>
                    <i className={`bi ${tool.icon}`}></i>
                  </div>
                  <h5 className="ls-heading ls-heading-sm mb-2">{tool.title}</h5>
                  <p className="text-muted small mb-0">{tool.desc}</p>
                </Link>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-5">
            <Link to="/tools" className="btn btn-outline-dark px-5 py-3 rounded-pill fw-bold">
              View All Financial Tools <i className="bi bi-arrow-right ms-2"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* Editorial Content Layer */}
      <section className="py-5 py-md-6" style={{ background: "var(--cream2)", borderTop: "1px solid var(--border)" }}>
        <div className="container">
          <div className="row align-items-end mb-5">
            <div className="col-md-8">
              <h2 className="ls-heading ls-heading-lg mb-2">Latest Insights</h2>
              <p className="text-muted mb-0">Fresh perspectives on wealth, career, and life strategy.</p>
            </div>
            <div className="col-md-4 text-md-end mt-3 mt-md-0">
              <Link to="/blog" className="text-decoration-none fw-bold text-dark">Browse Archive &rarr;</Link>
            </div>
          </div>
          <BlogGrid />
        </div>
      </section>

      {/* Comparison & Literacy */}
      <section className="py-5 py-md-6" style={{ background: "var(--card-bg)", borderTop: "1px solid var(--border)" }}>
        <div className="container">
          <div className="row g-4 justify-content-center">
            {[
              { label: "Roth IRA vs 401(k)", slug: "roth-ira-vs-401k", icon: "bi-arrow-left-right", color: "var(--teal)" },
              { label: "ETF vs Mutual Fund", slug: "etf-vs-mutual-fund", icon: "bi-arrow-left-right", color: "var(--teal)" },
              { label: "Financial Glossary A–Z", path: "/glossary", icon: "bi-book", color: "var(--teal)" }
            ].map((c, idx) => (
              <div key={idx} className="col-md-4">
                <Link
                  to={c.path || `/compare/${c.slug}`}
                  className="ls-card text-decoration-none h-100 d-block p-4 text-center"
                  style={{ border: "1px solid var(--border)", borderRadius: "20px" }}
                >
                  <i className={`bi ${c.icon} mb-3 d-block`} style={{ fontSize: "2rem", color: c.color }}></i>
                  <h5 className="ls-heading ls-heading-md mb-0">{c.label}</h5>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
