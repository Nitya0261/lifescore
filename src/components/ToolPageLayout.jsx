import React from 'react';
import { Link } from 'react-router-dom';
import SEO from './SEO';
import RelatedArticlesCTA from './RelatedArticlesCTA';

export default function ToolPageLayout({ 
  title, 
  description, 
  url, 
  keyword, 
  faq, 
  articleContent, 
  category,
  children 
}) {
  return (
    <>
      <SEO title={title} description={description} url={url}>
        {faq && (
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": faq.map(q => ({
                "@type": "Question",
                "name": q.question,
                "acceptedAnswer": { "@type": "Answer", "text": q.answer }
              }))
            })}
          </script>
        )}
      </SEO>
      
      <div style={{ background: "var(--cream)", minHeight: "100vh", paddingBottom: "4rem" }}>
        {/* Header */}
        <div style={{ background: "linear-gradient(135deg, #0f1923 0%, #1a3a5c 100%)", color: "#fff", padding: "clamp(2rem, 5vw, 4rem) 0" }}>
          <div className="container text-center px-3">
            <h1 style={{ fontFamily: "var(--serif)", fontSize: "clamp(1.8rem, 5vw, 3rem)", fontWeight: 900, marginBottom: "1rem" }}>
              {keyword}
            </h1>
            <p style={{ fontSize: "clamp(0.95rem, 2.5vw, 1.1rem)", opacity: 0.8, maxWidth: "600px", margin: "0 auto", fontFamily: "var(--serif2)" }}>
              {description}
            </p>
          </div>
        </div>

        <div className="container mt-4 mt-lg-5">
          <div className="row g-4 g-lg-5">
            {/* Main Content Area */}
            <div className="col-lg-8">
              {/* The Calculator Widget */}
              <div style={{ background: "var(--card-bg)", borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow)", padding: "clamp(1.2rem, 4vw, 2.5rem)", marginBottom: "2.5rem" }}>
                {children}
                <div className="mt-4 p-3 rounded-3 small" style={{ background: "var(--cream2)", border: "1px solid var(--border)", color: "var(--ink3)", fontSize: "0.75rem", lineHeight: "1.5" }}>
                  <i className="bi bi-info-circle me-2"></i>
                  <strong>Tool Disclaimer:</strong> This calculator is for educational purposes only. Projections are based on mathematical formulas and do not guarantee future results. All investments involve risk. We recommend consulting with a <Link to="/advisor" className="text-teal text-decoration-none fw-bold">certified financial advisor</Link> before making significant decisions.
                </div>
              </div>

              {/* Explainer Article */}
              <div style={{ background: "var(--card-bg)", borderRadius: "var(--radius-lg)", padding: "clamp(1.2rem, 4vw, 2.5rem)", boxShadow: "var(--shadow)", marginBottom: "2.5rem", color: "var(--ink2)", lineHeight: "1.8" }}>
                <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(1.4rem, 4vw, 2rem)", fontWeight: 900, marginBottom: "1.5rem", color: "var(--ink)" }}>Everything you need to know about {keyword}</h2>
                {articleContent}
              </div>

              {/* FAQ Section */}
              {faq && faq.length > 0 && (
                <div style={{ background: "var(--card-bg)", borderRadius: "var(--radius-lg)", padding: "clamp(1.2rem, 4vw, 2.5rem)", boxShadow: "var(--shadow)" }}>
                  <h3 style={{ fontFamily: "var(--serif)", fontSize: "clamp(1.3rem, 3.5vw, 1.75rem)", fontWeight: 800, marginBottom: "1.5rem" }}>Frequently Asked Questions</h3>
                  <div className="accordion" id="faqAccordion">
                    {faq.map((item, index) => (
                      <div className="accordion-item mb-3 border-0" key={index} style={{ background: "var(--cream2)", borderRadius: "8px", overflow: "hidden" }}>
                        <h2 className="accordion-header">
                          <button className="accordion-button collapsed fw-bold" type="button" data-bs-toggle="collapse" data-bs-target={`#faq-${index}`} style={{ background: "transparent", color: "var(--ink)", boxShadow: "none" }}>
                            {item.question}
                          </button>
                        </h2>
                        <div id={`faq-${index}`} className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                          <div className="accordion-body" style={{ color: "var(--ink2)" }}>
                            {item.answer}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {category && <RelatedArticlesCTA category={category} />}
            </div>

            {/* Related Tools Sidebar */}
            <div className="col-lg-4">
              <div style={{ position: "sticky", top: "100px" }}>
                <h4 style={{ fontFamily: "var(--serif)", fontWeight: 800, marginBottom: "1.5rem" }}>Related Tools</h4>
                <div className="d-flex flex-column gap-3">
                  <Link to="/tools/sip-calculator" className="text-decoration-none p-3" style={{ background: "var(--card-bg)", borderRadius: "var(--radius-md)", border: "1px solid var(--border)", display: "flex", alignItems: "center", gap: "1rem", color: "var(--ink)", transition: "all 0.2s" }}>
                    <div style={{ width: "40px", height: "40px", borderRadius: "8px", background: "var(--teal-light)", color: "var(--teal)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem" }}><i className="bi bi-graph-up-arrow"></i></div>
                    <span className="fw-bold">SIP Calculator</span>
                  </Link>
                  <Link to="/tools/compound-interest" className="text-decoration-none p-3" style={{ background: "var(--card-bg)", borderRadius: "var(--radius-md)", border: "1px solid var(--border)", display: "flex", alignItems: "center", gap: "1rem", color: "var(--ink)", transition: "all 0.2s" }}>
                    <div style={{ width: "40px", height: "40px", borderRadius: "8px", background: "rgba(102, 126, 234, 0.1)", color: "#667eea", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem" }}><i className="bi bi-snow2"></i></div>
                    <span className="fw-bold">Compound Interest</span>
                  </Link>
                  <Link to="/tools/retirement-number" className="text-decoration-none p-3" style={{ background: "var(--card-bg)", borderRadius: "var(--radius-md)", border: "1px solid var(--border)", display: "flex", alignItems: "center", gap: "1rem", color: "var(--ink)", transition: "all 0.2s" }}>
                    <div style={{ width: "40px", height: "40px", borderRadius: "8px", background: "rgba(237, 137, 54, 0.1)", color: "#ed8936", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem" }}><i className="bi bi-umbrella"></i></div>
                    <span className="fw-bold">Retirement Number</span>
                  </Link>
                  <Link to="/tools/net-worth" className="text-decoration-none p-3" style={{ background: "var(--card-bg)", borderRadius: "var(--radius-md)", border: "1px solid var(--border)", display: "flex", alignItems: "center", gap: "1rem", color: "var(--ink)", transition: "all 0.2s" }}>
                    <div style={{ width: "40px", height: "40px", borderRadius: "8px", background: "var(--accent-light)", color: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem" }}><i className="bi bi-wallet2"></i></div>
                    <span className="fw-bold">Net Worth Tracker</span>
                  </Link>
                  <Link to="/tools/tax-estimator" className="text-decoration-none p-3" style={{ background: "var(--card-bg)", borderRadius: "var(--radius-md)", border: "1px solid var(--border)", display: "flex", alignItems: "center", gap: "1rem", color: "var(--ink)", transition: "all 0.2s" }}>
                    <div style={{ width: "40px", height: "40px", borderRadius: "8px", background: "rgba(229, 62, 62, 0.1)", color: "#e53e3e", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem" }}><i className="bi bi-receipt"></i></div>
                    <span className="fw-bold">Tax Estimator</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
