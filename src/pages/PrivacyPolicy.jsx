import React from 'react';
import SEO from '../components/SEO';

export default function PrivacyPolicy() {
  const lastUpdated = "May 12, 2026";

  return (
    <>
      <SEO 
        title="Privacy Policy - LifeScore Platform Data Disclosures" 
        description="Review how the LifeScore personal finance engine processes analytics, safeguards simulator configurations, and guarantees absolute GDPR/CCPA alignment."
        url="https://lifesscore.live/privacy"
      />

      {/* Header */}
      <section className="py-5" style={{ background: "var(--cream)", borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
        <div className="container py-4 text-center">
          <span className="badge rounded-pill px-3 py-2 mb-3" style={{ background: "var(--teal-light)", color: "var(--teal)", letterSpacing: "1px" }}>
            DATA INTEGRITY
          </span>
          <h1 className="fw-bold mb-3" style={{ fontFamily: "var(--serif)", color: "var(--ink)", fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>Privacy Policy</h1>
          <p className="text-muted small mb-0">Effective Date: {lastUpdated}</p>
        </div>
      </section>

      {/* Content Body */}
      <section className="py-5">
        <div className="container py-4 max-w-4xl">
          <div className="card border-0 p-4 p-sm-5 shadow-sm" style={{ borderRadius: "var(--radius-lg)", background: "var(--card-bg)" }}>
            
            <div className="legal-content text-muted" style={{ fontSize: "1.05rem", lineHeight: "1.8" }}>
              <p className="lead fw-semibold text-dark">
                At LifeScore, safeguarding your digital footprints and personal net-worth configurations is our absolute baseline. We engineer our toolset to maximize localized compute, minimizing persistent server logging wherever mechanically feasible.
              </p>

              <hr className="my-4" />

              <h4 className="fw-bold text-dark mt-4 mb-3">1. Information Collection & Storage</h4>
              <p>
                We capture two clear tiers of application state during ordinary operation:
              </p>
              <ul className="mb-4">
                <li><strong>Local Transient Inputs:</strong> Financial inputs processed through our calculators (e.g., SIP inputs, custom budget rows, compound interest variables) are preserved client-side inside persistent <code>localStorage</code> or session scopes to provide UI retention across tabs.</li>
                <li><strong>Explicit Submissions:</strong> Account configurations, newsletter opt-in bindings, and authentication tokens are actively stored in highly secure backend models upon voluntary registration.</li>
              </ul>

              <h4 className="fw-bold text-dark mt-4 mb-3">2. Cookies & Telemetry Layers</h4>
              <p>
                To measure content engagement and debug computational bottlenecks, we deploy strictly curated operational cookies. We explicitly exclude invasive third-party cross-site tracker injected scripts. You retain total agency to clear browser settings without losing fundamental unauthenticated reader capabilities.
              </p>

              <h4 className="fw-bold text-dark mt-4 mb-3">3. External Links & Affiliate Frameworks</h4>
              <p>
                Our editorial articles frequently link directly to highly vetted external asset managers, brokerages, and official regulatory portals. Clicking out bound links shifts your session context to those respective platforms' data enforcement directives. We encourage reviewing their separate disclosures upon arrival.
              </p>

              <h4 className="fw-bold text-dark mt-4 mb-3">4. Security Infrastructure</h4>
              <p>
                All continuous communication layers execute end-to-end via cryptographic HTTPS transport layer protections. Backend administrative logic runs behind isolated container bounds, authenticated purely via signed JSON Web Tokens (JWT).
              </p>

              <h4 className="fw-bold text-dark mt-4 mb-3">5. Rights under GDPR & CCPA</h4>
              <p>
                Global readers maintain instant structural read/delete privileges over persistent platform accounts. If you wish to trigger a full corporate erasure order of stored personal identifier keys, dispatch a direct notice to our operational compliance desk at <code>privacy@lifescore.platform</code>.
              </p>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
