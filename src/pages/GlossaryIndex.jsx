import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

// Expanded high-fidelity financial dictionary
const EXTENDED_TERMS = [
  { term: "Amortization", slug: "amortization", cat: "Real Estate", level: "Intermediate", desc: "The scheduled process of systematically paying off debt through recurring installments over time." },
  { term: "Asset Allocation", slug: "asset-allocation", cat: "Investing", level: "Beginner", desc: "Dividing an investment portfolio among different asset categories like stocks, bonds, and cash." },
  { term: "Bear Market", slug: "bear-market", cat: "Markets", level: "Beginner", desc: "A prolonged market decline where asset prices fall by 20% or more from recent highs." },
  { term: "Bull Market", slug: "bull-market", cat: "Markets", level: "Beginner", desc: "A financial market condition where prices are rising or are expected to rise consistently." },
  { term: "Capital Gains Tax", slug: "capital-gains-tax", cat: "Taxes", level: "Intermediate", desc: "Government levy on the profit realized from the sale of non-inventory assets like equities or property." },
  { term: "Compound Interest", slug: "compound-interest", cat: "Investing", level: "Beginner", desc: "Interest calculated on both initial principal base and cumulative accrued interest from previous cycles." },
  { term: "Dollar-Cost Averaging", slug: "dollar-cost-averaging", cat: "Investing", level: "Beginner", desc: "Investing fixed fiat sums at regular periodic schedules regardless of underlying unit price swings." },
  { term: "EBITDA", slug: "ebitda", cat: "Corporate Finance", level: "Advanced", desc: "Earnings Before Interest, Taxes, Depreciation, and Amortization used as a baseline profitability proxy." },
  { term: "ETF (Exchange Traded Fund)", slug: "etf", cat: "Investing", level: "Beginner", desc: "A marketable security tracking an index, commodity, or basket of assets trading continuously on exchanges." },
  { term: "Fiduciary", slug: "fiduciary", cat: "Wealth Management", level: "Intermediate", desc: "A legal obligation binding advisors to act solely in the highest financial interest of their clients." },
  { term: "Fiat Currency", slug: "fiat-currency", cat: "Economics", level: "Beginner", desc: "Government-issued legal tender not backed by physical commodities like gold or silver." },
  { term: "Gross Domestic Product (GDP)", slug: "gdp", cat: "Economics", level: "Intermediate", desc: "The cumulative aggregate monetary value of all finished goods and services produced within borders." },
  { term: "Hedge Fund", slug: "hedge-fund", cat: "Investing", level: "Advanced", desc: "Pooled private capital structures utilizing alternative trading mechanics to generate absolute alphanumeric alpha." },
  { term: "Inflation", slug: "inflation", cat: "Economics", level: "Beginner", desc: "The systemic baseline rise in consumer pricing indices causing fiat purchasing power erosion." },
  { term: "Liquidity", slug: "liquidity", cat: "Markets", level: "Intermediate", desc: "The degree of efficiency with which an asset can be converted into standard currency without value loss." },
  { term: "Margin Call", slug: "margin-call", cat: "Markets", level: "Advanced", desc: "Broker demands requiring depositors to add fiat liquidity to cover adverse leveraged trading deficits." },
  { term: "Mutual Fund", slug: "mutual-fund", cat: "Investing", level: "Beginner", desc: "An investment vehicle operated by asset managers pooling retail deposits to purchase diversified instruments." },
  { term: "Net Worth", slug: "net-worth", cat: "Personal Finance", level: "Beginner", desc: "The absolute residual fiat measure of all cumulative controlled assets minus total outstanding liabilities." },
  { term: "Options Contract", slug: "options", cat: "Markets", level: "Advanced", desc: "Derivatives granting owners the optional right to transact underlying assets at set strike parameters." },
  { term: "Quantitative Easing", slug: "quantitative-easing", cat: "Economics", level: "Advanced", desc: "Central bank programmatic monetary maneuvers directly injecting broad fiat base supply into local networks." },
  { term: "Roth IRA", slug: "roth-ira", cat: "Retirement", level: "Beginner", desc: "Individual post-tax retirement shelters granting participants lifetime tax-free compounded capital extractions." },
  { term: "Short Selling", slug: "short-selling", cat: "Markets", level: "Advanced", desc: "Borrowing specific equity share contracts to sell immediately in anticipation of future unit repurchases at lower basis points." },
  { term: "Tax Loss Harvesting", slug: "tax-loss-harvesting", cat: "Taxes", level: "Intermediate", desc: "Strategic liquidations of underwater portfolio positions designed to offset positive progressive taxable liabilities." },
  { term: "Vesting Schedule", slug: "vesting-schedule", cat: "Corporate Finance", level: "Intermediate", desc: "Time-based corporate ownership access triggers releasing granted equity or options parameters sequentially." },
  { term: "Yield Curve", slug: "yield", cat: "Economics", level: "Advanced", desc: "Graphical plotting lines measuring sovereign debt bond returns mapped across respective temporal maturity horizons." }
];

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const CATEGORIES = ["All", "Investing", "Markets", "Economics", "Taxes", "Retirement", "Real Estate", "Advanced"];
const LEVELS = ["All", "Beginner", "Intermediate", "Advanced"];

export default function GlossaryIndex() {
  const [search, setSearch] = useState('');
  const [activeLetter, setActiveLetter] = useState('All');
  const [activeCat, setActiveCat] = useState('All');
  const [activeLevel, setActiveLevel] = useState('All');
  const [savedTerms, setSavedTerms] = useState(() => {
    return JSON.parse(localStorage.getItem("ls_saved_terms") || "[]");
  });

  // Toggle internal bookmark state
  const toggleSaveTerm = (slug, e) => {
    e.preventDefault();
    e.stopPropagation();
    let updated;
    if (savedTerms.includes(slug)) {
      updated = savedTerms.filter(s => s !== slug);
    } else {
      updated = [...savedTerms, slug];
    }
    setSavedTerms(updated);
    localStorage.setItem("ls_saved_terms", JSON.stringify(updated));
  };

  // Advanced multi-faceted runtime filtering memoization
  const filteredTerms = useMemo(() => {
    return EXTENDED_TERMS.filter(item => {
      const matchesSearch = item.term.toLowerCase().includes(search.toLowerCase()) || 
                            item.desc.toLowerCase().includes(search.toLowerCase());
      const matchesLetter = activeLetter === 'All' || item.term.toUpperCase().startsWith(activeLetter);
      const matchesCat = activeCat === 'All' || 
                         (activeCat === 'Advanced' ? item.level === 'Advanced' : item.cat === activeCat);
      const matchesLevel = activeLevel === 'All' || item.level === activeLevel;

      return matchesSearch && matchesLetter && matchesCat && matchesLevel;
    }).sort((a, b) => a.term.localeCompare(b.term));
  }, [search, activeLetter, activeCat, activeLevel]);

  // Select Term of the Day showcase
  const featuredTerm = useMemo(() => {
    return EXTENDED_TERMS.find(t => t.slug === "compound-interest") || EXTENDED_TERMS[0];
  }, []);

  const getLevelColor = (lvl) => {
    switch(lvl) {
      case "Beginner": return { bg: "rgba(26,122,94,0.1)", text: "var(--teal)" };
      case "Intermediate": return { bg: "rgba(212,160,23,0.1)", text: "#b06a00" };
      case "Advanced": return { bg: "rgba(192,57,43,0.1)", text: "var(--accent)" };
      default: return { bg: "var(--cream3)", text: "var(--ink)" };
    }
  };

  return (
    <>
      <SEO 
        title="Finance Glossary A–Z | Advanced Economic & Market Dictionary" 
        description="Explore hundreds of fully verified structural definitions spanning modern portfolio theory, advanced derivatives, fiscal mechanics, and tax codes." 
      />
      
      <div style={{ background: "var(--cream)", minHeight: "100vh", padding: "3rem 0" }}>
        <div className="container">
          
          {/* Header Title */}
          <div className="text-center max-w-3xl mx-auto mb-5">
            <span className="badge mb-2 px-3 py-1 fw-bold" style={{ background: "var(--accent-light)", color: "var(--accent)", letterSpacing: "1px" }}>
              COMPREHENSIVE KNOWLEDGE BASE
            </span>
            <h1 className="fw-bold mb-3" style={{ fontFamily: "var(--serif)", color: "var(--ink)", fontSize: "clamp(2.2rem, 4vw, 3.8rem)" }}>
              Financial Glossary <span style={{ color: "var(--accent)" }}>A–Z</span>
            </h1>
            <p className="text-muted" style={{ fontSize: "1.05rem", lineHeight: 1.6 }}>
              Decode global institutional jargon. Explore cross-linked definitions mapped across corporate finance, advanced monetary policy, and personal asset management.
            </p>
          </div>

          {/* Premium "Term of the Day" Showcase Card */}
          <div className="row justify-content-center mb-5">
            <div className="col-lg-10">
              <div className="card border-0 overflow-hidden rounded-4 shadow-sm" style={{ background: "linear-gradient(135deg, var(--ink) 0%, var(--dark-surface) 100%)", color: "#fff" }}>
                <div className="row g-0 align-items-center">
                  <div className="col-md-8 p-4 p-md-5">
                    <div className="d-flex align-items-center gap-2 mb-3">
                      <span className="badge bg-warning text-dark fw-bold px-2 py-1 small">TERM OF THE DAY</span>
                      <span className="text-white-50 small">• {featuredTerm.cat}</span>
                    </div>
                    
                    <h2 className="fw-bold mb-3" style={{ fontFamily: "var(--serif)", fontSize: "2.2rem" }}>
                      {featuredTerm.term}
                    </h2>
                    
                    <p className="mb-4" style={{ color: "rgba(255,255,255,0.85)", fontSize: "1.05rem", lineHeight: 1.6 }}>
                      "{featuredTerm.desc}"
                    </p>

                    <div className="d-flex align-items-center gap-3 flex-wrap">
                      <Link 
                        to={`/glossary/${featuredTerm.slug}`} 
                        className="btn btn-sm fw-bold px-4 py-2 rounded-pill"
                        style={{ background: "var(--accent)", color: "#fff", border: "none" }}
                      >
                        Explore Deep Analysis & Formulas →
                      </Link>
                      <span className="badge px-3 py-2 rounded-pill" style={{ background: "rgba(255,255,255,0.1)", color: "#fff" }}>
                        ⚡ High Engagement Topic
                      </span>
                    </div>
                  </div>

                  <div className="col-md-4 d-none d-md-flex align-items-center justify-content-center border-start border-white border-opacity-10 p-4" style={{ background: "rgba(0,0,0,0.2)" }}>
                    <div className="text-center">
                      <i className="bi bi-book-half text-white-50 d-block mb-2" style={{ fontSize: "4rem" }}></i>
                      <span className="small text-white-50 fw-bold d-block">CROSS-REFERENCED CMS</span>
                      <span className="badge bg-white bg-opacity-10 text-white mt-1">JSON-LD Indexed</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Multi-Facet Filter Console */}
          <div className="row justify-content-center mb-5">
            <div className="col-lg-10">
              <div className="card border-0 p-4 rounded-4 shadow-sm" style={{ background: "var(--card-bg)" }}>
                
                {/* Search string input */}
                <div className="mb-4">
                  <div className="input-group input-group-lg" style={{ borderRadius: "10px", overflow: "hidden", border: "1px solid var(--border)" }}>
                    <span className="input-group-text bg-transparent border-0 ps-3">
                      <i className="bi bi-search text-muted"></i>
                    </span>
                    <input 
                      type="text" 
                      className="form-control border-0 px-2 shadow-none" 
                      placeholder="Search explicit queries, concepts, or descriptors (e.g. 'tax', 'derivative', 'fiat')..." 
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      style={{ background: "transparent", color: "var(--ink)", fontSize: "0.95rem" }}
                    />
                    {search && (
                      <button className="btn border-0 text-muted" onClick={() => setSearch('')}>
                        <i className="bi bi-x-circle-fill"></i>
                      </button>
                    )}
                  </div>
                </div>

                {/* Categorical Tabs */}
                <div className="d-flex align-items-center gap-2 overflow-auto pb-2 mb-3 border-bottom" style={{ whiteSpace: "nowrap" }}>
                  <span className="text-muted small fw-bold me-2 flex-shrink-0"><i className="bi bi-folder-fill me-1"></i>Topic:</span>
                  {CATEGORIES.map(cat => (
                    <button
                      key={cat}
                      className={`btn btn-sm rounded-pill px-3 fw-bold ${activeCat === cat ? 'btn-dark' : 'btn-outline-secondary'}`}
                      style={{ border: activeCat === cat ? "none" : "1px solid var(--border2)", fontSize: "0.8rem" }}
                      onClick={() => setActiveCat(cat)}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Complexity Level Tabs */}
                <div className="d-flex align-items-center gap-2 overflow-auto pb-2 mb-3 border-bottom" style={{ whiteSpace: "nowrap" }}>
                  <span className="text-muted small fw-bold me-2 flex-shrink-0"><i className="bi bi-layers-fill me-1"></i>Difficulty:</span>
                  {LEVELS.map(lvl => (
                    <button
                      key={lvl}
                      className={`btn btn-sm rounded-pill px-3 ${activeLevel === lvl ? 'btn-dark fw-bold' : ''}`}
                      style={{ 
                        background: activeLevel === lvl ? "var(--ink)" : "transparent",
                        color: activeLevel === lvl ? "#fff" : "var(--ink3)",
                        border: activeLevel === lvl ? "none" : "1px solid var(--border)", 
                        fontSize: "0.8rem" 
                      }}
                      onClick={() => setActiveLevel(lvl)}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>

                {/* Index Alphabet List */}
                <div className="d-flex flex-wrap align-items-center gap-1 pt-1">
                  <span className="text-muted small fw-bold me-2 flex-shrink-0"><i className="bi bi-sort-alpha-down me-1"></i>A–Z:</span>
                  <button 
                    className={`btn btn-sm px-2 py-0 ${activeLetter === 'All' ? 'fw-bold text-decoration-underline' : 'text-muted'}`}
                    style={{ border: "none", background: "transparent", fontSize: "0.85rem" }}
                    onClick={() => setActiveLetter('All')}
                  >
                    All
                  </button>
                  {ALPHABET.map(letter => {
                    const hasTerms = EXTENDED_TERMS.some(t => t.term.toUpperCase().startsWith(letter));
                    return (
                      <button 
                        key={letter}
                        disabled={!hasTerms}
                        className={`btn btn-sm px-1 py-0 ${activeLetter === letter ? 'fw-bold text-primary' : 'text-muted'}`}
                        style={{ 
                          border: "none", 
                          background: "transparent", 
                          fontSize: "0.85rem",
                          opacity: hasTerms ? 1 : 0.25,
                          color: activeLetter === letter ? "var(--accent) !important" : "inherit"
                        }}
                        onClick={() => setActiveLetter(letter)}
                      >
                        {letter}
                      </button>
                    );
                  })}
                  
                  <div className="ms-auto small text-muted fw-bold">
                    Showing <span style={{ color: "var(--accent)" }}>{filteredTerms.length}</span> verified terms
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Active Data Render Grid */}
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="row g-4">
                {filteredTerms.length > 0 ? (
                  filteredTerms.map((item) => {
                    const isSaved = savedTerms.includes(item.slug);
                    const lvlStyle = getLevelColor(item.level);

                    return (
                      <div key={item.slug} className="col-md-6">
                        <Link 
                          to={`/glossary/${item.slug}`} 
                          className="card border-0 h-100 text-decoration-none transition-all p-4 rounded-4"
                          style={{ 
                            background: "var(--card-bg)", 
                            boxShadow: "var(--shadow)", 
                            border: "1px solid var(--border)",
                            display: "flex",
                            flexDirection: "column"
                          }}
                        >
                          <div className="d-flex justify-content-between align-items-start mb-2">
                            <span className="badge px-2 py-1 rounded" style={{ background: "var(--cream2)", color: "var(--ink2)", fontSize: "0.7rem", fontWeight: 600 }}>
                              {item.cat}
                            </span>

                            <div className="d-flex align-items-center gap-2">
                              <span 
                                className="badge rounded-pill px-2 py-1"
                                style={{ background: lvlStyle.bg, color: lvlStyle.text, fontSize: "0.65rem", fontWeight: 700 }}
                              >
                                {item.level}
                              </span>

                              <button 
                                className="btn p-0 border-0" 
                                onClick={(e) => toggleSaveTerm(item.slug, e)}
                                title={isSaved ? "Remove bookmark" : "Save term"}
                              >
                                <i className={`bi ${isSaved ? "bi-bookmark-fill text-warning" : "bi-bookmark text-muted"}`} style={{ fontSize: "1rem" }}></i>
                              </button>
                            </div>
                          </div>

                          <h4 className="fw-bold mb-2 mt-1" style={{ fontFamily: "var(--serif)", color: "var(--ink)" }}>
                            {item.term}
                          </h4>

                          <p className="text-muted small mb-3 flex-grow-1" style={{ lineHeight: 1.5 }}>
                            {item.desc}
                          </p>

                          <div className="mt-auto pt-2 border-top d-flex justify-content-between align-items-center text-muted" style={{ fontSize: "0.75rem" }}>
                            <span>Read core definitions</span>
                            <span style={{ color: "var(--accent)", fontWeight: 600 }}>View Guide →</span>
                          </div>
                        </Link>
                      </div>
                    );
                  })
                ) : (
                  <div className="col-12 text-center py-5">
                    <div className="card border-0 p-5 rounded-4" style={{ background: "var(--card-bg)" }}>
                      <i className="bi bi-journal-x text-muted mb-3 d-block" style={{ fontSize: "3.5rem" }}></i>
                      <h4 className="fw-bold mb-2" style={{ color: "var(--ink)" }}>No Glossary Matches Found</h4>
                      <p className="text-muted max-w-md mx-auto mb-4 small">
                        We couldn't map any items satisfying current criteria combined filters for "<span className="text-primary">{search}</span>". Try relaxing parameters or searching standalone text keywords.
                      </p>
                      <div>
                        <button 
                          className="btn btn-dark btn-sm rounded-pill px-4"
                          onClick={() => {
                            setSearch('');
                            setActiveCat('All');
                            setActiveLevel('All');
                            setActiveLetter('All');
                          }}
                        >
                          Reset Filters Console
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
