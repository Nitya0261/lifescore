import React from "react";
import { Link } from "react-router-dom";

/**
 * Reusable cross-linking section that appears at the bottom of every category page.
 * Connects users to related tools, glossary, comparisons, and advisor directory.
 * Accepts `currentCategory` to highlight relevant links.
 */
export default function CrossLinks({ currentCategory }) {
  const sections = [
    {
      title: "Tools & Calculators",
      links: [
        { icon: "bi-calculator", label: "SIP Calculator", path: "/tools/sip-calculator" },
        { icon: "bi-graph-up-arrow", label: "Compound Interest", path: "/tools/compound-interest" },
        { icon: "bi-piggy-bank", label: "Retirement Number", path: "/tools/retirement-number" },
        { icon: "bi-wallet2", label: "Net Worth Tracker", path: "/tools/net-worth-tracker" },
        { icon: "bi-receipt", label: "Tax Estimator", path: "/tools/tax-estimator" },
        { icon: "bi-bar-chart-line", label: "Budget Tracker", path: "/dashboard/budget" },
      ]
    },
    {
      title: "Compare & Research",
      links: [
        { icon: "bi-arrow-left-right", label: "Roth IRA vs 401(k)", path: "/compare/roth-ira-vs-401k" },
        { icon: "bi-arrow-left-right", label: "ETF vs Mutual Fund", path: "/compare/etf-vs-mutual-fund" },
        { icon: "bi-book", label: "Finance Glossary A–Z", path: "/glossary" },
        { icon: "bi-person-badge", label: "Find a Financial Advisor", path: "/find-advisor" },
      ]
    },
    {
      title: "Recommendations",
      links: [
        { icon: "bi-credit-card", label: "Best Credit Cards 2026", path: "/recommendations/credit-cards" },
        { icon: "bi-bank", label: "Best High-Yield Savings", path: "/recommendations/high-yield-savings" },
        { icon: "bi-bookmark-heart", label: "My Saved Articles", path: "/dashboard/saved" },
      ]
    },
  ];

  const categoryLinks = [
    { label: "Saving Money", path: "/saving-money" },
    { label: "Investing", path: "/investing" },
    { label: "Debt", path: "/debt" },
    { label: "Real Estate", path: "/real-estate" },
    { label: "Retirement", path: "/retirement" },
    { label: "Side Income", path: "/side-income" },
    { label: "Markets", path: "/markets" },
    { label: "Crypto", path: "/crypto" },
    { label: "Economy", path: "/economy" },
  ].filter(l => l.path !== currentCategory);

  return (
    <section className="py-5" style={{ background: "var(--cream2)" }}>
      <div className="container">
        
        {/* Explore Other Topics */}
        <div className="mb-5">
          <h5 className="fw-bold mb-3" style={{ fontFamily: "var(--serif)", color: "var(--ink)" }}>
            <i className="bi bi-compass me-2"></i>Explore Other Topics
          </h5>
          <div className="d-flex flex-wrap gap-2">
            {categoryLinks.map(link => (
              <Link 
                key={link.path} 
                to={link.path} 
                className="btn btn-sm btn-outline-dark rounded-pill px-3"
                style={{ fontSize: "0.85rem" }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Resources Grid */}
        <div className="row g-4">
          {sections.map(section => (
            <div key={section.title} className="col-md-4">
              <div className="card border-0 h-100 p-4" style={{ background: "var(--card-bg)", borderRadius: "var(--radius)", boxShadow: "var(--shadow)" }}>
                <h6 className="fw-bold text-uppercase text-muted mb-3" style={{ letterSpacing: "1px", fontSize: "0.75rem" }}>
                  {section.title}
                </h6>
                <div className="d-flex flex-column gap-2">
                  {section.links.map(link => (
                    <Link 
                      key={link.path} 
                      to={link.path} 
                      className="d-flex align-items-center gap-2 text-decoration-none"
                      style={{ color: "var(--ink2)", fontSize: "0.9rem", transition: "color 0.15s" }}
                      onMouseOver={(e) => e.currentTarget.style.color = "var(--teal)"}
                      onMouseOut={(e) => e.currentTarget.style.color = "var(--ink2)"}
                    >
                      <i className={`bi ${link.icon}`} style={{ width: "20px", textAlign: "center" }}></i>
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
