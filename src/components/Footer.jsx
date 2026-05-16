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
        { label: "Editorial Blog", path: "/blog" },
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
              {[
                { id: "twitter-x", label: "Follow us on X (formerly Twitter)" },
                { id: "instagram", label: "Follow us on Instagram" },
                { id: "linkedin", label: "Connect with us on LinkedIn" },
                { id: "youtube", label: "Subscribe to our YouTube channel" },
                { id: "tiktok", label: "Follow us on TikTok" }
              ].map(
                (s) => (
                  <a
                    key={s.id}
                    href={`https://${s.id.includes('twitter') ? 'x' : s.id}.com`}
                    className="footer-link"
                    style={{ margin: 0 }}
                    aria-label={s.label}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className={`bi bi-${s.id}`} aria-hidden="true"></i>
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
          <div className="d-flex justify-content-center gap-3 gap-sm-4 mb-3 flex-wrap" style={{ fontSize: "0.9rem" }}>
            <Link to="/about" className="text-muted text-decoration-none fw-semibold">About Us</Link>
            <Link to="/editorial-policy" className="text-muted text-decoration-none fw-semibold">Editorial Policy</Link>
            <Link to="/contact" className="text-muted text-decoration-none fw-semibold">Contact Desk</Link>
            <Link to="/privacy" className="text-muted text-decoration-none fw-semibold">Privacy Policy</Link>
            <Link to="/terms" className="text-muted text-decoration-none fw-semibold">Terms & Conditions</Link>
            <Link to="/disclaimer" className="text-muted text-decoration-none fw-semibold">Disclaimer</Link>
          </div>
          <span className="footer-bottom-text">
            © 2026 LifeScore · Personal Finance & Life Intelligence · All rights
            reserved · Built with React & Bootstrap
          </span>
          <span className="footer-bottom-text d-block mt-2" style={{ maxWidth: "800px", margin: "0 auto", opacity: 0.6, fontSize: "0.75rem", lineHeight: "1.5" }}>
            ADVERTISER DISCLOSURE: LifeScore is an independent, ad-supported publisher and comparison service. We may receive compensation from some of the companies whose products we review or appear on this site. This compensation may impact how and where products appear, but does not influence our editorial integrity or mathematical models. LifeScore does not include all financial companies or all available financial offers.
          </span>
          <span className="footer-bottom-text d-block mt-1" style={{ maxWidth: "800px", margin: "0 auto", opacity: 0.6, fontSize: "0.75rem", lineHeight: "1.5" }}>
            FINANCIAL DISCLAIMER: The content on LifeScore is for educational purposes only and does not constitute financial, investment, legal, or tax advice. We recommend consulting with a qualified professional before making any significant financial decisions.
          </span>
        </div>
      </div>
    </footer>
  );
}
