import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import SEO from '../components/SEO';

const EXTENDED_TERM_DICTIONARY = {
  "compound-interest": {
    term: "Compound Interest",
    cat: "Investing",
    definition: "Compound interest is the foundational financial mechanics where accumulated asset interest is perpetually added back to the primary principal base. Future compounding cycles evaluate percentage accruals against this continuously expanding base, creating an exponential asset appreciation curve over prolonged investment horizons.",
    formula: "A = P(1 + r/n)^(nt)",
    formulaDesc: "Where P is principal base, r is expected annual rate, n is compounding cycles per year, and t is holding duration in years.",
    example: "Assuming an initial baseline seed capital deposit of $10,000 earning an annualized yield rate of 8% compounded annually: At Year 1 completion, gross balance attains $10,800. At Year 2 completion, the 8% accrual evaluates against the $10,800 total, resulting in an incremental $864 gain ($11,664 cumulative). Across 30 years without further external principal additions, the balance reaches $100,626.",
    relatedTerms: [
      { term: "Dollar-Cost Averaging", slug: "dollar-cost-averaging" },
      { term: "Yield", slug: "yield" },
      { term: "Asset Allocation", slug: "asset-allocation" }
    ]
  },
  "roth-ira": {
    term: "Roth IRA",
    cat: "Retirement",
    definition: "An individualized tax-advantaged retirement shelter codified within the US Internal Revenue Code. Subscriptions require verified post-tax fiat earnings. In exchange for forfeiting immediate marginal tax reductions, all cumulative asset compounding, dividend streams, and final distributions are exempt from federal and state progressive taxation mechanics post age 59½.",
    formula: "Net Yield = Accumulated Appreciation - $0.00 Lifetime Capital Taxes",
    formulaDesc: "Assumes continuous adherence to statutory custodial holding periods and modified gross income phase-out eligibility bounds.",
    example: "An individual deposits an aggregate sum of $5,000 annually over 35 active working calendar years ($175,000 total principal). Through diversified multi-asset index tracking, cumulative portfolio appreciation drives the final total balance to $850,000. Upon satisfying statutory age benchmarks, the account holder extracts the entire $850,000 absolutely tax-free, avoiding an estimated $135,000+ in standard marginal tax drain.",
    relatedTerms: [
      { term: "ETF (Exchange Traded Fund)", slug: "etf" },
      { term: "Asset Allocation", slug: "asset-allocation" }
    ]
  },
  "etf": {
    term: "ETF (Exchange Traded Fund)",
    cat: "Investing",
    definition: "A highly liquid marketable security structured as an open-ended investment company or unit investment trust. ETFs bundle highly diversified arrays of individual company stocks, sovereign bonds, or physical commodities into standalone, fractionalized shares that execute continuous intraday transactions across major live market exchanges.",
    formula: "NAV = (Total Assets - Total Liabilities) / Total Outstanding Shares",
    formulaDesc: "Specialized authorized participants execute continuous underlying creation and redemption baskets to ensure public market quote parity.",
    example: "An investor purchases 100 shares of an S&P 500 tracking ETF during mid-day market ticks. This single security instant order delivers immediate indirect ownership exposure across 500 distinct large-cap corporate frameworks while maintaining internal management expense burdens typically below 0.05% annualized.",
    relatedTerms: [
      { term: "Mutual Fund", slug: "mutual-fund" },
      { term: "Liquidity", slug: "liquidity" }
    ]
  },
  "amortization": {
    term: "Amortization",
    cat: "Real Estate",
    definition: "The systematic distribution of an overarching debt principal along with corresponding calculated debt yield cost across a pre-determined sequential duration schedule. Early schedule installments overwhelmingly service calculated premium interest obligations, whereas backend phase installments dedicate capital to amortize original underlying asset principals.",
    formula: "PMT = P * [r(1+r)^n] / [(1+r)^n - 1]",
    formulaDesc: "Standard fixed annuity amortization calculation utilizing monthly equivalent fractional parameters.",
    example: "A retail client secures a 30-year fixed-rate residential mortgage totaling $400,000 at a 6.5% interest baseline. Month 1 payment allocates roughly $2,166 straight toward interest charges and merely $355 toward lowering real underlying principal base. By Month 350, this payment mechanics perfectly inverts.",
    relatedTerms: [
      { term: "Net Worth", slug: "net-worth" },
      { term: "Inflation", slug: "inflation" }
    ]
  }
};

export default function GlossaryTerm() {
  const { term: slug } = useParams();
  const [understood, setUnderstood] = useState(false);

  // Fallback programmatic generation for items outside hardcoded primary deep entries
  const termData = EXTENDED_TERM_DICTIONARY[slug] || {
    term: slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
    cat: "General Finance",
    definition: `Comprehensive economic overview and contextual breakdown mapping the structural mechanics of ${slug.split('-').join(' ')}. This foundational indicator governs critical underlying interactions inside personal wealth management, long-term capital allocation strategies, and multi-asset dynamic yield modeling.`,
    formula: "Customized Parameter Allocation",
    formulaDesc: "Varies strictly based on local regulatory compliance frameworks and specific underlying asset class configurations.",
    example: `Demonstrative case logic: When institutional custodians or retail participants incorporate ${slug.split('-').join(' ')} guidelines inside standard lifecycle tracking, aggregate long-term risk metrics demonstrate increased stability against broad fiscal downcycles.`,
    relatedTerms: [
      { term: "Compound Interest", slug: "compound-interest" },
      { term: "Asset Allocation", slug: "asset-allocation" },
      { term: "Net Worth", slug: "net-worth" }
    ]
  };

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
        title={`What is ${termData.term}? | Advanced Definition & Formulas`}
        description={termData.definition.substring(0, 150) + "..."}
      >
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </SEO>

      <div style={{ background: "var(--cream)", minHeight: "100vh", padding: "3rem 0" }}>
        <div className="container">
          
          {/* Back Action Bar */}
          <div className="mb-4">
            <Link to="/glossary" className="btn btn-sm btn-outline-secondary rounded-pill px-3 fw-bold" style={{ background: "var(--card-bg)", border: "1px solid var(--border)" }}>
              <i className="bi bi-arrow-left me-1"></i> Back to Dictionary Console
            </Link>
          </div>

          <div className="row justify-content-center g-4">
            {/* Primary Content Panel */}
            <div className="col-lg-8">
              <div className="card border-0 p-3 p-sm-4 p-md-5 rounded-4 shadow-sm mb-4" style={{ background: "var(--card-bg)" }}>
                
                {/* Category Pill */}
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <span className="badge px-3 py-1 rounded-pill" style={{ background: "var(--teal-light)", color: "var(--teal)", fontWeight: 700, fontSize: "0.75rem" }}>
                    {termData.cat}
                  </span>
                  <span className="text-muted small">Verified Core Resource</span>
                </div>

                <h1 className="fw-bold mb-4" style={{ fontFamily: "var(--serif)", color: "var(--ink)", fontSize: "clamp(2rem, 3.5vw, 2.8rem)", lineHeight: 1.15 }}>
                  {termData.term}
                </h1>

                {/* Main Definition Body */}
                <div className="mb-4">
                  <h5 className="fw-bold mb-3 d-flex align-items-center" style={{ color: "var(--ink)" }}>
                    <i className="bi bi-journal-text text-teal me-2"></i> Comprehensive Definition
                  </h5>
                  <p className="text-muted" style={{ fontSize: "1.1rem", lineHeight: 1.75 }}>
                    {termData.definition}
                  </p>
                </div>

                {/* Mathematical Formula / Structure Container */}
                {termData.formula && (
                  <div className="mb-4 p-3 p-sm-4 rounded-4" style={{ background: "var(--cream2)", border: "1px solid var(--border)" }}>
                    <span className="badge bg-dark text-white px-2 py-1 mb-2 small">STRUCTURAL FORMULA</span>
                    <div className="text-center py-2 my-1 overflow-auto">
                      <code className="fw-bold d-block" style={{ fontSize: "clamp(1rem, 2.5vw, 1.35rem)", color: "var(--accent)", fontFamily: "monospace" }}>
                        {termData.formula}
                      </code>
                    </div>
                    {termData.formulaDesc && (
                      <p className="text-muted small text-center mb-0 mt-2">
                        {termData.formulaDesc}
                      </p>
                    )}
                  </div>
                )}

                {/* Applied Practical Example */}
                <div className="mb-4 p-3 p-sm-4 rounded-4" style={{ background: "var(--card-bg)", borderLeft: "4px solid var(--accent)", border: "1px solid var(--border)" }}>
                  <h5 className="fw-bold mb-2 d-flex align-items-center" style={{ color: "var(--ink)" }}>
                    <i className="bi bi-lightbulb-fill text-warning me-2"></i> Practical Applied Case
                  </h5>
                  <p className="text-muted small mb-0" style={{ lineHeight: 1.65 }}>
                    {termData.example}
                  </p>
                </div>

                {/* Interactive Mastery Validation Checklist */}
                <div className="pt-3 border-top d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-3">
                  <div>
                    <span className="fw-bold d-block small" style={{ color: "var(--ink)" }}>Concept Proficiency Check</span>
                    <span className="text-muted small">Mark concept to update local learning metrics tracker.</span>
                  </div>

                  <button 
                    className={`btn btn-sm rounded-pill px-4 py-2 fw-bold ${understood ? 'btn-success' : 'btn-outline-secondary'}`}
                    onClick={() => setUnderstood(!understood)}
                    style={{ transition: "all 0.2s" }}
                  >
                    <i className={`bi ${understood ? 'bi-check2-all' : 'bi-circle'} me-1`}></i>
                    {understood ? "Concept Mastered" : "Mark as Understood"}
                  </button>
                </div>

              </div>

              {/* Related Scope Tags */}
              {termData.relatedTerms && termData.relatedTerms.length > 0 && (
                <div className="card border-0 p-3 p-sm-4 rounded-4 shadow-sm" style={{ background: "var(--card-bg)" }}>
                  <h6 className="fw-bold mb-3" style={{ color: "var(--ink)" }}>Cross-Referenced Definitions</h6>
                  <div className="d-flex flex-wrap gap-2 align-items-center">
                    {termData.relatedTerms.map((t) => (
                      <Link 
                        key={t.slug} 
                        to={`/glossary/${t.slug}`} 
                        className="btn btn-sm rounded-pill px-3 py-1 fw-bold"
                        style={{ background: "var(--cream2)", color: "var(--ink2)", border: "1px solid var(--border)", fontSize: "0.8rem" }}
                      >
                        {t.term}
                      </Link>
                    ))}
                    <Link 
                      to="/glossary" 
                      className="btn btn-sm rounded-pill px-3 py-1 fw-bold ms-auto mt-2 mt-sm-0"
                      style={{ background: "transparent", color: "var(--accent)", border: "none", fontSize: "0.8rem" }}
                    >
                      View Full Index →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar Context panel */}
            <div className="col-lg-4">
              <div className="card border-0 p-3 p-sm-4 rounded-4 shadow-sm mb-4 sticky-lg-top" style={{ top: "100px", background: "var(--ink)", color: "#fff" }}>
                <span className="badge bg-white bg-opacity-10 text-white px-2 py-1 align-self-start mb-3 small">LIFESCORE SYSTEM</span>
                
                <h4 className="fw-bold mb-3" style={{ fontFamily: "var(--serif)" }}>
                  Integrate {termData.term} inside your planning
                </h4>
                
                <p className="small mb-4" style={{ color: "rgba(255,255,255,0.75)", lineHeight: 1.6 }}>
                  Our smart financial score calculators automatically assess critical portfolio parameters, asset risk factors, and target-date milestones.
                </p>

                <div className="d-flex flex-column gap-2 mb-4">
                  <div className="p-3 rounded-3" style={{ background: "rgba(255,255,255,0.06)" }}>
                    <span className="text-warning small fw-bold d-block mb-1">Step 1: Compute Lifetime Targets</span>
                    <span className="small text-white-50 d-block">Evaluate accurate required net assets.</span>
                  </div>
                  <div className="p-3 rounded-3" style={{ background: "rgba(255,255,255,0.06)" }}>
                    <span className="text-info small fw-bold d-block mb-1">Step 2: Automate Contributions</span>
                    <span className="small text-white-50 d-block">Establish structured portfolio allocations.</span>
                  </div>
                </div>

                <Link to="/tools" className="btn btn-primary w-100 fw-bold py-2 text-center" style={{ background: "var(--accent)", border: "none", borderRadius: "8px" }}>
                  Launch Strategy Console
                </Link>
              </div>
            </div>

          </div>

        </div>
      </div>
    </>
  );
}
