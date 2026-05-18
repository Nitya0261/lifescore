import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BLOG_POSTS } from "../data/mockData";

const POPULAR_SEARCHES = [
  "50/30/20 rule",
  "SIP Calculator",
  "Retirement planning",
  "Index funds",
  "Debt payoff strategy",
  "Emergency fund",
  "High-yield savings"
];

const CATEGORIES = [
  "All",
  "Saving Money",
  "Investing",
  "Debt Freedom",
  "Real Estate",
  "Retirement",
  "Tools"
];

const TOOLS = [
  { title: "SIP Calculator", path: "/tools/sip-calculator", category: "Tools", desc: "Project wealth from regular investments." },
  { title: "Budget Tracker", path: "/dashboard/budget", category: "Tools", desc: "Master your cashflow with 50/30/20 rules." },
  { title: "Retirement Number", path: "/tools/retirement-number", category: "Tools", desc: "Find your magic number for total freedom." },
  { title: "Debt Payoff", path: "/tools/debt-payoff", category: "Tools", desc: "Compare Snowball vs. Avalanche strategies." },
  { title: "Emergency Fund", path: "/tools/emergency-fund", category: "Tools", desc: "Calculate your safety net in 30 seconds." },
  { title: "Net Worth Tracker", path: "/tools/net-worth", category: "Tools", desc: "See your entire financial life in one place." }
];

export default function SearchModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [results, setResults] = useState([]);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleToggle = () => {
      setIsOpen(true);
      setTimeout(() => inputRef.current?.focus(), 100);
    };
    window.addEventListener('toggle-search', handleToggle);
    return () => window.removeEventListener('toggle-search', handleToggle);
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const q = query.toLowerCase();
    const allItems = [
      ...BLOG_POSTS.map(p => ({ ...p, type: 'article' })),
      ...TOOLS.map(t => ({ ...t, type: 'tool' }))
    ];

    const filtered = allItems.filter(item => {
      const matchesQuery = item.title.toLowerCase().includes(q) || 
                          (item.deck && item.deck.toLowerCase().includes(q)) ||
                          (item.tags && item.tags.some(t => t.toLowerCase().includes(q)));
      
      const matchesCategory = activeCategory === "All" || item.cat === activeCategory || item.category === activeCategory;
      
      return matchesQuery && matchesCategory;
    });

    setResults(filtered.slice(0, 8));
  }, [query, activeCategory]);

  const handleClose = () => {
    setIsOpen(false);
    setQuery("");
  };

  if (!isOpen) return null;

  return (
    <div 
      className="search-overlay position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center pt-5 px-3"
      style={{ 
        zIndex: 2000, 
        background: "rgba(10, 25, 20, 0.85)", 
        backdropFilter: "blur(12px)",
        animation: "fadeIn 0.2s ease-out"
      }}
      onClick={handleClose}
    >
      <div 
        className="search-container w-100" 
        style={{ maxWidth: "720px", animation: "slideDown 0.3s cubic-bezier(0.16, 1, 0.3, 1)" }}
        onClick={e => e.stopPropagation()}
      >
        <div className="bg-white rounded-4 shadow-2xl overflow-hidden border border-white border-opacity-10" style={{ background: "var(--card-bg)" }}>
          {/* Search Header */}
          <div className="p-4 border-bottom d-flex align-items-center gap-3">
            <i className="bi bi-search fs-4 text-muted"></i>
            <input 
              ref={inputRef}
              type="text" 
              className="form-control form-control-lg border-0 shadow-none p-0 fs-4 fw-medium" 
              placeholder="Search intelligence, tools, and guides..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              style={{ background: "transparent" }}
            />
            <button className="btn btn-link text-muted text-decoration-none p-0 fs-5" onClick={handleClose} aria-label="Close search">
              <i className="bi bi-x-lg"></i>
            </button>
          </div>

          {/* Search Body */}
          <div className="p-4" style={{ maxHeight: "70vh", overflowY: "auto" }}>
            {query.trim() === "" ? (
              <>
                <h6 className="text-uppercase small fw-bold text-muted mb-3" style={{ letterSpacing: "1px" }}>Popular Searches</h6>
                <div className="d-flex flex-wrap gap-2 mb-4">
                  {POPULAR_SEARCHES.map(s => (
                    <button 
                      key={s} 
                      className="btn btn-sm rounded-pill px-3 py-1 border transition-all"
                      style={{ background: "var(--cream2)", fontSize: "0.85rem" }}
                      onClick={() => setQuery(s)}
                    >
                      {s}
                    </button>
                  ))}
                </div>
                
                <h6 className="text-uppercase small fw-bold text-muted mb-3" style={{ letterSpacing: "1px" }}>Browse by Category</h6>
                <div className="row g-3">
                  {CATEGORIES.filter(c => c !== "All").map(c => (
                    <div key={c} className="col-sm-4">
                      <button 
                        className="w-100 text-start btn border p-3 rounded-3 d-flex align-items-center justify-content-between transition-all hover-teal"
                        onClick={() => { setActiveCategory(c); setQuery(" "); }}
                      >
                        <span className="fw-semibold small">{c}</span>
                        <i className="bi bi-chevron-right small text-muted"></i>
                      </button>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <>
                {/* Result Filters */}
                <div className="d-flex gap-2 mb-4 overflow-auto pb-2" style={{ whiteSpace: "nowrap" }}>
                  {CATEGORIES.map(c => (
                    <button 
                      key={c}
                      className={`btn btn-xs rounded-pill px-3 py-1 border-0 fw-bold ${activeCategory === c ? 'bg-teal text-white' : 'bg-light text-muted'}`}
                      style={{ fontSize: "0.75rem" }}
                      onClick={() => setActiveCategory(c)}
                    >
                      {c}
                    </button>
                  ))}
                </div>

                {/* Results List */}
                <div className="results-list">
                  {results.length > 0 ? (
                    results.map((item, idx) => (
                      <Link 
                        key={idx}
                        to={item.path || `/article/${item.slug}`} 
                        className="d-block text-decoration-none p-3 rounded-3 mb-2 transition-all hover-bg-light border border-transparent hover-border-light"
                        onClick={handleClose}
                      >
                        <div className="d-flex align-items-center justify-content-between mb-1">
                          <span className="text-uppercase extra-small fw-black text-teal opacity-75">{item.type} • {item.cat || item.category}</span>
                        </div>
                        <h6 className="mb-1 fw-bold text-dark">{item.title}</h6>
                        <p className="small text-muted mb-0 text-truncate">{item.deck || item.desc}</p>
                      </Link>
                    ))
                  ) : (
                    <div className="text-center py-5">
                      <div className="mb-3">
                        <i className="bi bi-search text-muted opacity-25" style={{ fontSize: "3rem" }}></i>
                      </div>
                      <h5 className="fw-bold">No results found for "{query}"</h5>
                      <p className="text-muted">Try searching for something else or browse categories.</p>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Search Footer */}
          <div className="p-3 bg-light border-top d-flex justify-content-between align-items-center">
            <div className="d-flex gap-3">
              <span className="extra-small text-muted"><kbd className="bg-white border text-dark me-1">ESC</kbd> to close</span>
              <span className="extra-small text-muted"><kbd className="bg-white border text-dark me-1">↑↓</kbd> to navigate</span>
              <span className="extra-small text-muted"><kbd className="bg-white border text-dark me-1">ENTER</kbd> to select</span>
            </div>
            <div className="extra-small fw-bold text-teal">LifeScore Intelligence Search v2.0</div>
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideDown {
          from { transform: translateY(-20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .hover-bg-light:hover { background: var(--cream2) !important; }
        .hover-teal:hover { border-color: var(--teal) !important; background: var(--cream) !important; }
        .btn-xs { padding: 0.25rem 0.5rem; font-size: 0.7rem; }
      `}</style>
    </div>
  );
}
