import React from "react";
import { Link } from "react-router-dom";
import EMICalculator from "../components/EMICalculator";
import SimulatorSection from "../components/SimulatorSection";
import LifeScoreWidget from "../components/LifeScoreWidget";
import DecisionTree from "../components/DecisionTree";
import SEO from "../components/SEO";

export default function Tools() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How does an EMI calculator work?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "An EMI calculator takes your principal loan amount, interest rate, and loan tenure, and uses a standard mathematical formula to determine your exact monthly payment."
        }
      },
      {
        "@type": "Question",
        "name": "Why use the LifeScore EMI Calculator?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The LifeScore EMI Calculator instantly visualizes your amortization schedule, helping you see exactly how much interest you are paying over the life of the loan."
        }
      }
    ]
  };

  const toolCards = [
    { icon: "bi-calculator", name: "SIP Calculator", desc: "Calculate your Systematic Investment Plan returns over time.", path: "/tools/sip-calculator", color: "#0d9488" },
    { icon: "bi-graph-up-arrow", name: "Compound Interest", desc: "See the power of compounding on your savings and investments.", path: "/tools/compound-interest", color: "#6366f1" },
    { icon: "bi-piggy-bank", name: "Retirement Number", desc: "Find out exactly how much you need to retire comfortably.", path: "/tools/retirement-number", color: "#f59e0b" },
    { icon: "bi-wallet2", name: "Net Worth Tracker", desc: "Track your assets minus liabilities to see your true net worth.", path: "/tools/net-worth-tracker", color: "#ec4899" },
    { icon: "bi-receipt", name: "Tax Estimator", desc: "Estimate your federal and state tax liability for the year.", path: "/tools/tax-estimator", color: "#ef4444" },
    { icon: "bi-bar-chart-line", name: "Budget Tracker", desc: "Track income vs expenses and see your savings rate over time.", path: "/dashboard/budget", color: "#22c55e" },
  ];

  return (
    <>
      <SEO 
        title="Financial Calculators & Tools" 
        description="Run the numbers on your next big move with our interactive EMI calculator and other financial planning tools."
        url="https://lifescore.app/tools"
      >
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </SEO>
      <div style={{ background: "var(--cream)" }}>
        {/* Category Hero */}
        <div style={{ background: "linear-gradient(135deg, #0f1923 0%, #1a3a5c 100%)", color: "#fff", padding: "4rem 0" }}>
          <div className="container">
            <div className="section-eyebrow" style={{ color: "var(--accent)" }}>
              <i className="bi bi-tools me-2"></i>Calculators & Simulators
            </div>
            <h1 style={{ fontFamily: "var(--serif)", fontSize: "3rem", fontWeight: 900, marginBottom: "1rem" }}>
              Financial Tools
            </h1>
            <p style={{ fontSize: "1.1rem", opacity: 0.8, maxWidth: "600px", fontFamily: "var(--serif2)" }}>
              Run the numbers on your next big move. From paying off debt to calculating the true cost of a loan, our interactive tools have you covered.
            </p>
          </div>
        </div>

        {/* Quick-Access Tool Grid */}
        <div className="container py-5">
          <h3 className="fw-bold mb-4" style={{ fontFamily: "var(--serif)" }}>
            <i className="bi bi-lightning-charge text-warning me-2"></i>Quick Access
          </h3>
          <div className="row g-4 mb-5">
            {toolCards.map((tool) => (
              <div key={tool.path} className="col-md-4 col-sm-6">
                <Link 
                  to={tool.path} 
                  className="card h-100 border-0 text-decoration-none"
                  style={{ 
                    background: "var(--card-bg)", 
                    borderRadius: "var(--radius-lg)", 
                    boxShadow: "var(--shadow)",
                    transition: "all 0.2s ease"
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.1)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'none';
                    e.currentTarget.style.boxShadow = 'var(--shadow)';
                  }}
                >
                  <div className="card-body p-4">
                    <div className="d-flex align-items-center gap-3 mb-3">
                      <div 
                        className="d-flex align-items-center justify-content-center rounded-3"
                        style={{ width: "48px", height: "48px", background: tool.color + "15", color: tool.color }}
                      >
                        <i className={`bi ${tool.icon}`} style={{ fontSize: "1.4rem" }}></i>
                      </div>
                      <h5 className="fw-bold mb-0" style={{ color: "var(--ink)" }}>{tool.name}</h5>
                    </div>
                    <p className="text-muted mb-0" style={{ fontSize: "0.95rem" }}>{tool.desc}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          {/* Inline Tools */}
          <h3 className="fw-bold mb-4" style={{ fontFamily: "var(--serif)" }}>
            <i className="bi bi-hand-index-thumb text-primary me-2"></i>Try Right Here
          </h3>
          <div className="row g-4">
            <div className="col-lg-4">
              <h4 style={{ fontFamily: "var(--serif)", fontWeight: 700, marginBottom: "1rem" }}>EMI Calculator</h4>
              <div className="tool-card h-100">
                <EMICalculator />
              </div>
            </div>
            <div className="col-lg-4">
              <h4 style={{ fontFamily: "var(--serif)", fontWeight: 700, marginBottom: "1rem" }}>Life Health Score</h4>
              <div style={{ height: "450px" }}>
                <LifeScoreWidget />
              </div>
            </div>
            <div className="col-lg-4">
              <h4 style={{ fontFamily: "var(--serif)", fontWeight: 700, marginBottom: "1rem" }}>Decision Matrix</h4>
              <div className="h-100">
                <DecisionTree />
              </div>
            </div>
          </div>
        </div>

        <SimulatorSection />

        {/* Cross-links to other resources */}
        <div className="container pb-5">
          <div className="card border-0 p-4 p-md-5" style={{ background: "var(--card-bg)", borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow)" }}>
            <h4 className="fw-bold mb-4" style={{ fontFamily: "var(--serif)" }}>Explore More Resources</h4>
            <div className="row g-3">
              <div className="col-md-3 col-6">
                <Link to="/glossary" className="btn btn-outline-dark w-100 py-3 rounded-3">
                  <i className="bi bi-book me-2"></i>Finance Glossary
                </Link>
              </div>
              <div className="col-md-3 col-6">
                <Link to="/compare/roth-ira-vs-401k" className="btn btn-outline-dark w-100 py-3 rounded-3">
                  <i className="bi bi-arrow-left-right me-2"></i>Compare Options
                </Link>
              </div>
              <div className="col-md-3 col-6">
                <Link to="/find-advisor" className="btn btn-outline-dark w-100 py-3 rounded-3">
                  <i className="bi bi-person-badge me-2"></i>Find an Advisor
                </Link>
              </div>
              <div className="col-md-3 col-6">
                <Link to="/recommendations/credit-cards" className="btn btn-outline-dark w-100 py-3 rounded-3">
                  <i className="bi bi-credit-card me-2"></i>Best Credit Cards
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
