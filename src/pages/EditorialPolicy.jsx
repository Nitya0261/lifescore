import React from 'react';
import SEO from '../components/SEO';

export default function EditorialPolicy() {
  const lastUpdated = "May 16, 2026";

  return (
    <>
      <SEO 
        title="Editorial Policy & Content Integrity - LifeScore" 
        description="Learn about LifeScore's rigorous standards for financial accuracy, editorial independence, and data verification."
      />

      {/* Header */}
      <section className="py-5" style={{ background: "var(--cream)", borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
        <div className="container py-4 text-center">
          <span className="badge rounded-pill px-3 py-2 mb-3" style={{ background: "var(--teal-light)", color: "var(--teal)", letterSpacing: "1px" }}>
            CONTENT STANDARDS
          </span>
          <h1 className="fw-bold mb-3" style={{ fontFamily: "var(--serif)", color: "var(--ink)", fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>Editorial Policy</h1>
          <p className="text-muted small mb-0">How we maintain absolute accuracy and independence. Updated: {lastUpdated}</p>
        </div>
      </section>

      {/* Content Body */}
      <section className="py-5">
        <div className="container py-4 max-w-4xl">
          <div className="card border-0 p-4 p-sm-5 shadow-sm" style={{ borderRadius: "var(--radius-lg)", background: "var(--card-bg)" }}>
            
            <div className="legal-content text-muted" style={{ fontSize: "1.05rem", lineHeight: "1.8" }}>
              <p className="lead fw-semibold text-dark">
                LifeScore is committed to providing institutional-grade financial intelligence that is accessible, objective, and strictly independent.
              </p>

              <hr className="my-4" />

              <h4 className="fw-bold text-dark mt-4 mb-3">1. Rigorous Accuracy & Verification</h4>
              <p>
                Every article, guide, and data insight on LifeScore undergoes a multi-layer verification process. Our writers are required to cite primary sources, including official government data (BLS, Federal Reserve), academic research, and audited corporate filings.
              </p>
              <ul>
                <li><strong>Data Backtesting:</strong> Our calculators are tested against historical market cycles to ensure the mathematical models remain robust under stress.</li>
                <li><strong>Periodic Review:</strong> Financial regulations and tax laws change. Our editorial team reviews top-performing guides every 6 months to ensure compliance with the latest rules.</li>
              </ul>

              <h4 className="fw-bold text-dark mt-4 mb-3">2. Editorial Independence</h4>
              <p>
                Our editorial team operates with complete autonomy. We do not accept payment in exchange for positive reviews or biased rankings of financial products.
              </p>
              <p>
                While we may earn affiliate commissions from some of the products we recommend (clearly marked as "Sponsored" or "Affiliate"), these partnerships are managed by a separate business team. The editorial team is never incentivized to favor one partner over another.
              </p>

              <h4 className="fw-bold text-dark mt-4 mb-3">3. Ethical Guidelines for AI Content</h4>
              <p>
                LifeScore utilizes advanced AI to assist in data aggregation and initial drafting. However, <strong>no article is published without human oversight.</strong> Every piece of content is reviewed, edited, and fact-checked by a qualified financial editor to ensure tone, accuracy, and nuance.
              </p>

              <h4 className="fw-bold text-dark mt-4 mb-3">4. Conflict of Interest Disclosure</h4>
              <p>
                Our contributors are required to disclose any personal financial interests in companies or products they write about. We strive for transparency, ensuring that you know exactly who is providing the information and any potential biases they may have.
              </p>

              <h4 className="fw-bold text-dark mt-4 mb-3">5. Correction Policy</h4>
              <p>
                In the event of a factual error, we commit to correcting it promptly. Corrections will be clearly noted at the top or bottom of the article to maintain transparency with our readers. If you spot an error, please contact us at <a href="mailto:corrections@lifescore.platform" className="text-teal text-decoration-none fw-bold">corrections@lifescore.platform</a>.
              </p>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
