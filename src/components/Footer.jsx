import React from "react";
import { Link } from "react-router-dom";
import NewsletterForm from "./NewsletterForm";

export default function Footer() {
  const cols = [
    {
      title: "Finance Topics",
      links: [
        { label: "Saving Money", path: "/saving-money" },
        { label: "Investing", path: "/investing" },
        { label: "Debt Payoff", path: "/debt" },
        { label: "Real Estate", path: "/real-estate" },
        { label: "Retirement", path: "/retirement" },
        { label: "Side Income", path: "/side-income" },
      ],
    },
    {
      title: "Tools & Calculators",
      links: [
        { label: "All Tools", path: "/tools" },
        { label: "SIP Calculator", path: "/tools/sip-calculator" },
        { label: "Compound Interest", path: "/tools/compound-interest" },
        { label: "Retirement Number", path: "/tools/retirement-number" },
        { label: "Net Worth Tracker", path: "/tools/net-worth" },
        { label: "Tax Estimator", path: "/tools/tax-estimator" },
        { label: "Budget Tracker", path: "/dashboard/budget" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Finance Glossary", path: "/glossary" },
        { label: "Roth IRA vs 401k", path: "/compare/roth-ira-vs-401k" },
        { label: "ETF vs Mutual Fund", path: "/compare/etf-vs-mutual-fund" },
        { label: "Find an Advisor", path: "/advisor" },
        { label: "Best Credit Cards", path: "/recommendations/cards" },
        { label: "High-Yield Savings", path: "/recommendations/savings" },
        { label: "Markets", path: "/markets" },
      ],
    },
  ];

  return (
    <footer>
      <div className="container">
        <div className="row g-4 mb-4">
          <div className="col-lg-3">
            <Link to="/" className="footer-logo-text text-decoration-none">
              Life<span>Score</span>
            </Link>
            <p className="footer-tagline">
              Trusted personal finance guidance for over 120,000 readers
              worldwide. Independent, ad-supported, and always free.
            </p>
            <div className="d-flex gap-3 mt-3">
              {["twitter-x", "instagram", "linkedin", "youtube", "tiktok"].map(
                (s) => (
                  <a
                    key={s}
                    href="#"
                    className="footer-link"
                    style={{ margin: 0 }}
                  >
                    <i className={`bi bi-${s}`}></i>
                  </a>
                ),
              )}
            </div>
          </div>
          {cols.map((col) => (
            <div className="col-lg-2 col-sm-4 col-6" key={col.title}>
              <div className="footer-col-title">{col.title}</div>
              {col.links.map((l) => (
                <Link key={l.label} to={l.path} className="footer-link">
                  {l.label}
                </Link>
              ))}
            </div>
          ))}
          <div className="col-lg-3 col-sm-12">
            <div className="footer-col-title">Join Our Newsletter</div>
            <p className="text-muted" style={{ fontSize: "0.9rem" }}>Get our top 5 articles and one actionable finance tip delivered to your inbox every Monday.</p>
            <NewsletterForm source="footer" />
          </div>
        </div>
        <div className="footer-bottom">
          <span className="footer-bottom-text">
            © 2026 LifeScore · Personal Finance & Life Intelligence · All rights
            reserved · Built with React & Bootstrap
          </span>
          <span className="footer-bottom-text">
            Disclosure: LifeScore is ad-supported. We may earn affiliate
            commissions from links. Content is for informational purposes only.
          </span>
        </div>
      </div>
    </footer>
  );
}
