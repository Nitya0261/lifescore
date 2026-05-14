import React from 'react';
import SEO from '../components/SEO';

export default function TermsConditions() {
  const lastUpdated = "May 12, 2026";

  return (
    <>
      <SEO 
        title="Terms & Conditions - LifeScore Platform Usage Framework" 
        description="Read the terms of use governing the LifeScore personal finance application, educational tools disclaimers, and community IP guidelines."
      />

      {/* Header */}
      <section className="py-5" style={{ background: "var(--cream)", borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
        <div className="container py-4 text-center">
          <span className="badge rounded-pill px-3 py-2 mb-3" style={{ background: "var(--teal-light)", color: "var(--teal)", letterSpacing: "1px" }}>
            LEGAL BINDING
          </span>
          <h1 className="fw-bold mb-3" style={{ fontFamily: "var(--serif)", color: "var(--ink)", fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>Terms & Conditions</h1>
          <p className="text-muted small mb-0">Last Iterated: {lastUpdated}</p>
        </div>
      </section>

      {/* Content Body */}
      <section className="py-5">
        <div className="container py-4 max-w-4xl">
          <div className="card border-0 p-4 p-sm-5 shadow-sm" style={{ borderRadius: "var(--radius-lg)", background: "var(--card-bg)" }}>
            
            <div className="legal-content text-muted" style={{ fontSize: "1.05rem", lineHeight: "1.8" }}>
              
              <div className="alert alert-warning border-0 p-4 rounded-4 mb-5" style={{ background: "rgba(255, 193, 7, 0.1)", color: "#856404" }}>
                <h5 className="fw-bold mb-2"><i className="bi bi-exclamation-triangle-fill me-2"></i> CRITICAL EDUCATIONAL DISCLAIMER</h5>
                <p className="mb-0 small">
                  The calculations, market projections, articles, and interactive widgets provided throughout the LifeScore ecosystem are intended strictly for educational simulation and general personal finance awareness. <strong>We are not registered investment advisors, tax attorneys, or legal practitioners.</strong> Simulated outcomes do not constitute definitive investment directives. Consult directly with verified fiduciaries before deploying real capital.
                </p>
              </div>

              <h4 className="fw-bold text-dark mb-3">1. Platform Access Agreement</h4>
              <p>
                By accessing or registering within the LifeScore web platform, you agree to comply with these terms. You confirm you possess the legal competence and regional alignment necessary to execute basic consumer agreements under applicable regional laws.
              </p>

              <h4 className="fw-bold text-dark mt-4 mb-3">2. Intellectual Property Scope</h4>
              <p>
                All proprietary layout configurations, quantitative chart drawing algorithms, unique calculators, written editorials, and design logos are owned exclusively by LifeScore. Unsanctioned automated web scraping, commercial code replication, or misleading uncredited framing is explicitly prohibited.
              </p>

              <h4 className="fw-bold text-dark mt-4 mb-3">3. Interactive Services & Community Accounts</h4>
              <p>
                Registered members gain access to private net worth logs, favoriting functions, and personalized UI indicators. You agree to utilize these structures responsibly. Attempting to reverse engineer backend routes, flood comment services, or misrepresent credential tokens results in instant account revocation.
              </p>

              <h4 className="fw-bold text-dark mt-4 mb-3">4. Limitation of Operational Liability</h4>
              <p>
                Calculations execute instantly using provided user inputs against current formulaic baselines. We do not guarantee continuous external data API connectivity or absolute market predictive precision. LifeScore bears zero financial liability for secondary losses, missed compound cycles, or misread asset configurations resulting from platform reliance.
              </p>

              <h4 className="fw-bold text-dark mt-4 mb-3">5. Iterative Modifications</h4>
              <p>
                We reserve the operational autonomy to iterate these directives as regulatory bounds shift or functional features expand. Continued continuous access of the portal following published updates constitutes constructive acceptance of modified parameters.
              </p>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
