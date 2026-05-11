import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const DUMMY_TERMS = [
  { term: "Amortization", slug: "amortization" },
  { term: "Asset Allocation", slug: "asset-allocation" },
  { term: "Bear Market", slug: "bear-market" },
  { term: "Bull Market", slug: "bull-market" },
  { term: "Compound Interest", slug: "compound-interest" },
  { term: "Dollar-Cost Averaging", slug: "dollar-cost-averaging" },
  { term: "ETF (Exchange Traded Fund)", slug: "etf" },
  { term: "Fiduciary", slug: "fiduciary" },
  { term: "Gross Domestic Product (GDP)", slug: "gdp" },
  { term: "Hedge Fund", slug: "hedge-fund" },
  { term: "Inflation", slug: "inflation" },
  { term: "Liquidity", slug: "liquidity" },
  { term: "Mutual Fund", slug: "mutual-fund" },
  { term: "Net Worth", slug: "net-worth" },
  { term: "Options", slug: "options" },
  { term: "Portfolio", slug: "portfolio" },
  { term: "Quantitative Easing", slug: "quantitative-easing" },
  { term: "Roth IRA", slug: "roth-ira" },
  { term: "Stock Split", slug: "stock-split" },
  { term: "Yield", slug: "yield" }
];

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default function GlossaryIndex() {
  const [activeLetter, setActiveLetter] = useState('All');
  const [search, setSearch] = useState('');

  const filteredTerms = DUMMY_TERMS.filter(item => {
    const matchesSearch = item.term.toLowerCase().includes(search.toLowerCase());
    const matchesLetter = activeLetter === 'All' || item.term.toUpperCase().startsWith(activeLetter);
    return matchesSearch && matchesLetter;
  }).sort((a, b) => a.term.localeCompare(b.term));

  return (
    <>
      <SEO 
        title="Financial Glossary & Dictionary | LifeScore" 
        description="Master your money with our comprehensive A-Z personal finance glossary. Over 500 definitions for investing, budgeting, and economics." 
      />
      
      <div style={{ background: "var(--cream)", minHeight: "100vh", padding: "4rem 0" }}>
        <div className="container">
          <div className="text-center mb-5">
            <h1 className="ls-heading ls-heading-xl mb-3">
              Financial Glossary
            </h1>
            <p className="text-muted mx-auto" style={{ maxWidth: "600px", fontSize: "1.1rem" }}>
              The ultimate dictionary for personal finance, investing, and economics. Understand the jargon to make better money decisions.
            </p>
          </div>

          {/* Search Bar */}
          <div className="row justify-content-center mb-5">
            <div className="col-md-8 col-lg-6">
              <div className="input-group input-group-lg shadow-sm" style={{ borderRadius: "50px", overflow: "hidden" }}>
                <span className="input-group-text bg-white border-0 ps-4">
                  <i className="bi bi-search text-muted"></i>
                </span>
                <input 
                  type="text" 
                  className="form-control border-0 px-3" 
                  placeholder="Search for a term (e.g. Compound Interest)..." 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  style={{ boxShadow: "none" }}
                />
              </div>
            </div>
          </div>

          {/* A-Z Filter */}
          <div className="d-flex flex-wrap justify-content-center gap-2 mb-5">
            <button 
              className={`btn btn-sm ${activeLetter === 'All' ? 'btn-dark' : 'btn-outline-secondary'}`}
              onClick={() => setActiveLetter('All')}
              style={{ borderRadius: "var(--radius)" }}
            >
              All
            </button>
            {ALPHABET.map(letter => (
              <button 
                key={letter}
                className={`btn btn-sm ${activeLetter === letter ? 'btn-teal text-white' : 'btn-outline-secondary'}`}
                onClick={() => setActiveLetter(letter)}
                style={{ 
                  borderRadius: "var(--radius)",
                  minWidth: "36px",
                  background: activeLetter === letter ? "var(--teal)" : "transparent"
                }}
              >
                {letter}
              </button>
            ))}
          </div>

          {/* Terms Grid */}
          <div className="row g-4">
            {filteredTerms.length > 0 ? (
              filteredTerms.map((item) => (
                <div key={item.slug} className="col-md-4 col-lg-3">
                  <Link 
                    to={`/glossary/${item.slug}`} 
                    className="ls-card text-decoration-none"
                  >
                    <div className="card-body p-4 d-flex align-items-center">
                      <h5 className="mb-0 ls-heading ls-heading-md">
                        {item.term}
                      </h5>
                    </div>
                  </Link>
                </div>
              ))
            ) : (
              <div className="col-12 text-center py-5">
                <i className="bi bi-search text-muted mb-3 d-block" style={{ fontSize: "3rem" }}></i>
                <h4 className="text-muted">No terms found for "{search}"</h4>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
