import React from 'react';
import { useParams, Link } from 'react-router-dom';
import SEO from '../components/SEO';

// In production, this would be fetched from Sanity CMS
const DUMMY_TERM_DATA = {
  "compound-interest": {
    term: "Compound Interest",
    definition: "Compound interest is the interest on savings calculated on both the initial principal and the accumulated interest from previous periods. Think of it as 'interest on interest'. It makes a sum grow at a faster rate than simple interest, which is calculated only on the principal amount.",
    example: "If you invest $1,000 at an annual interest rate of 5%, compounded annually, you will earn $50 in the first year. In the second year, you earn 5% on $1,050, which is $52.50. Over decades, this exponential growth creates significant wealth.",
    relatedTerms: [
      { term: "Simple Interest", slug: "simple-interest" },
      { term: "Yield", slug: "yield" },
      { term: "Rule of 72", slug: "rule-of-72" }
    ]
  },
  "roth-ira": {
    term: "Roth IRA",
    definition: "A Roth IRA is an individual retirement account allowing a person to set aside after-tax income up to a specified amount each year. Both earnings on the account and withdrawals after age 59½ are tax-free.",
    example: "You contribute $5,000 of your after-tax salary to a Roth IRA today. Over 30 years, it grows to $40,000. When you retire, you can withdraw the entire $40,000 completely tax-free.",
    relatedTerms: [
      { term: "Traditional IRA", slug: "traditional-ira" },
      { term: "401(k)", slug: "401k" }
    ]
  }
};

export default function GlossaryTerm() {
  const { slug } = useParams();
  
  // Simulated fetch
  const termData = DUMMY_TERM_DATA[slug] || {
    term: slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
    definition: "This is a placeholder definition for the term. In the live implementation, this data is dynamically fetched from the Sanity CMS using the slug parameter.",
    example: "Example scenario demonstrating how this financial concept works in the real world.",
    relatedTerms: []
  };

  // Generate JSON-LD DefinedTerm schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    "name": termData.term,
    "description": termData.definition,
    "inDefinedTermSet": "https://lifescore.app/glossary"
  };

  return (
    <>
      <SEO 
        title={`What is ${termData.term}? | Definition & Example | LifeScore Glossary`}
        description={termData.definition.substring(0, 150) + "..."}
      >
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </SEO>

      <div style={{ background: "var(--cream)", minHeight: "100vh", padding: "4rem 0" }}>
        <div className="container">
          
          <div className="mb-4">
            <Link to="/glossary" className="text-decoration-none text-muted" style={{ fontWeight: 500 }}>
              <i className="bi bi-arrow-left me-2"></i>Back to Glossary
            </Link>
          </div>

          <div className="row justify-content-center">
            <div className="col-lg-8">
              
              <div className="card border-0" style={{ background: "var(--card-bg)", borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow)" }}>
                <div className="card-body p-4 p-md-5">
                  <h1 className="fw-bold mb-4" style={{ fontFamily: "var(--serif)", color: "var(--ink)", fontSize: "2.5rem" }}>
                    {termData.term}
                  </h1>
                  
                  <div className="mb-5">
                    <h5 className="fw-bold text-teal mb-3 d-flex align-items-center">
                      <i className="bi bi-book me-2"></i>Definition
                    </h5>
                    <p style={{ fontSize: "1.1rem", lineHeight: "1.8", color: "var(--ink2)" }}>
                      {termData.definition}
                    </p>
                  </div>

                  <div className="mb-5 p-4 rounded" style={{ background: "var(--cream2)", borderLeft: "4px solid var(--teal)" }}>
                    <h5 className="fw-bold mb-3 d-flex align-items-center" style={{ color: "var(--ink)" }}>
                      <i className="bi bi-lightbulb me-2 text-warning"></i>Example
                    </h5>
                    <p className="mb-0" style={{ lineHeight: "1.6", color: "var(--ink2)" }}>
                      {termData.example}
                    </p>
                  </div>

                  {termData.relatedTerms && termData.relatedTerms.length > 0 && (
                    <div className="border-top pt-4 mt-4">
                      <h5 className="fw-bold mb-3" style={{ color: "var(--ink)" }}>Related Terms</h5>
                      <div className="d-flex flex-wrap gap-2">
                        {termData.relatedTerms.map((t, idx) => (
                          <Link 
                            key={idx} 
                            to={`/glossary/${t.slug}`} 
                            className="badge text-decoration-none p-2 px-3"
                            style={{ background: "var(--card-bg)", color: "var(--teal)", border: "1px solid var(--border)", fontSize: "0.9rem" }}
                          >
                            {t.term}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                  
                </div>
              </div>

            </div>

            {/* Sidebar for related articles (simulated) */}
            <div className="col-lg-4 mt-5 mt-lg-0">
              <div className="card border-0 sticky-lg-top" style={{ top: "100px", background: "transparent" }}>
                <div className="card-body p-0">
                  <h5 className="fw-bold mb-4" style={{ fontFamily: "var(--serif)" }}>Guides on {termData.term}</h5>
                  <div className="d-flex flex-column gap-3">
                    <div className="card border-0 p-3" style={{ background: "var(--card-bg)", borderRadius: "var(--radius)" }}>
                      <span className="badge mb-2 align-self-start" style={{ background: "var(--teal-light)", color: "var(--teal)" }}>Investing</span>
                      <a href="#" className="fw-bold text-dark text-decoration-none">How to calculate {termData.term} for your portfolio</a>
                    </div>
                    <div className="card border-0 p-3" style={{ background: "var(--card-bg)", borderRadius: "var(--radius)" }}>
                      <span className="badge mb-2 align-self-start" style={{ background: "var(--teal-light)", color: "var(--teal)" }}>Retirement</span>
                      <a href="#" className="fw-bold text-dark text-decoration-none">Why {termData.term} matters for your 401(k)</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
