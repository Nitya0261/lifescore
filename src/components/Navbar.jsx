import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { useTranslation } from "react-i18next";
import API_BASE_URL from "../config/api";

export default function Navbar() {
  const location = useLocation();
  const currentPath = location.pathname;
  const { user, toggleAuthModal } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [markets, setMarkets] = React.useState([]);

  React.useEffect(() => {
    const fetchMarkets = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/market-data`);
        const data = await res.json();
        setMarkets(data.slice(0, 3)); // Only show top 3 to reduce clutter
      } catch (err) {
        console.error(err);
      }
    };
    fetchMarkets();
  }, []);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const cats = [
    { name: "Intelligence Hub", path: "#", isMenu: true },
    { name: "Calculators", path: "/tools" },
    { name: "Market Live", path: "/markets" },
  ];

  // Grouped High-Fidelity navigation mapping
  const menuGroups = [
    {
      title: "Guidance & Compare",
      items: [
        { name: "⚖️ Compare Hub Overview", path: "/compare" },
        { name: "▪️ Roth IRA vs 401(k)", path: "/compare/roth-ira-vs-401k" },
        { name: "▪️ ETF vs Mutual Fund", path: "/compare/etf-vs-mutual-fund" },
        { name: "🧑‍💼 Find Professional Advisor", path: "/advisor" },
      ]
    },
    {
      title: "Top Yield Recommendations",
      items: [
        { name: "🏦 High-Yield Savings Accounts", path: "/recommendations/savings" },
        { name: "💳 Best Premium Credit Cards", path: "/recommendations/cards" },
      ]
    },
    {
      title: "Market Intelligence",
      items: [
        { name: "📊 Markets Terminal", path: "/markets" },
        { name: "💰 Crypto Dashboard", path: "/crypto" },
        { name: "📈 Macro Economy", path: "/economy" },
        { name: "📖 Glossary Dictionary A–Z", path: "/glossary" },
      ]
    },
    {
      title: "Member Dashboards",
      items: [
        { name: "📋 Personal Budget Tracker", path: "/dashboard/budget" },
        { name: "🔖 Saved Bookmarks Console", path: "/dashboard/saved" },
      ]
    }
  ];

  const flatMoreLinks = menuGroups.flatMap(g => g.items);

  return (
    <>
      <nav className="main-nav sticky-top shadow-sm" style={{ background: "var(--card-bg)", transition: "background 0.3s" }}>
        <div className="container">
          <div className="d-flex justify-content-between align-items-center py-2">
            <Link to="/" className="nav-logo" style={{ textDecoration: "none" }}>
              <span style={{ fontWeight: 900, fontSize: "1.25rem" }}>Life<span style={{ color: "var(--accent)" }}>Score</span></span>
            </Link>
            
            <div className="d-flex align-items-center gap-2 gap-sm-3">
              {/* Desktop Utilities */}
              <button 
                className="btn btn-sm rounded-circle d-flex align-items-center justify-content-center shadow-sm"
                style={{ width: "36px", height: "36px", border: "1px solid var(--border)", background: "var(--card-bg)", color: "var(--ink)" }}
                onClick={() => window.dispatchEvent(new CustomEvent('toggle-search'))}
                aria-label="Search"
              >
                <i className="bi bi-search" style={{ fontSize: "0.9rem" }} aria-hidden="true"></i>
              </button>

              <button 
                className="btn btn-sm rounded-circle d-flex align-items-center justify-content-center shadow-sm"
                style={{ width: "36px", height: "36px", border: "1px solid var(--border)", background: "var(--card-bg)", color: "var(--ink)" }}
                onClick={() => window.dispatchEvent(new CustomEvent('toggle-chatbot'))}
                aria-label="AI Assistant"
              >
                <i className="bi bi-robot" style={{ fontSize: "0.9rem" }} aria-hidden="true"></i>
              </button>

              <div className="dropdown">
                <button 
                  className="btn btn-sm rounded-circle d-flex align-items-center justify-content-center shadow-sm"
                  style={{ width: "36px", height: "36px", border: "1px solid var(--border)", background: "var(--card-bg)", color: "var(--ink)" }}
                  data-bs-toggle="dropdown"
                  aria-label="Settings and Tools"
                >
                  <i className="bi bi-three-dots-vertical" style={{ fontSize: "1rem" }} aria-hidden="true"></i>
                </button>
                <ul className="dropdown-menu dropdown-menu-end shadow-lg border-0 p-3 rounded-4 mt-2" style={{ minWidth: "240px" }}>
                  <li>
                    <button className="dropdown-item d-flex align-items-center gap-3 py-2 rounded-3" onClick={() => window.dispatchEvent(new CustomEvent('toggle-chatbot'))}>
                      <i className="bi bi-robot text-teal"></i>
                      <span>AI Assistant</span>
                    </button>
                  </li>
                  <li><hr className="dropdown-divider opacity-50" /></li>
                  <li className="px-3 py-2">
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="small fw-bold">Dark Mode</span>
                      <div className="form-check form-switch m-0">
                        <input className="form-check-input" type="checkbox" checked={isDark} onChange={toggleTheme} aria-label="Toggle Dark Mode" />
                      </div>
                    </div>
                  </li>
                  <li className="px-3 py-2">
                    <span className="small fw-bold d-block mb-2">Language</span>
                    <div className="d-flex gap-2">
                      <button className="btn btn-xs btn-outline-secondary py-0 px-2" style={{ fontSize: '0.7rem' }} onClick={() => changeLanguage('en')} aria-label="Switch language to English">EN</button>
                      <button className="btn btn-xs btn-outline-secondary py-0 px-2" style={{ fontSize: '0.7rem' }} onClick={() => changeLanguage('es')} aria-label="Switch language to Spanish">ES</button>
                      <button className="btn btn-xs btn-outline-secondary py-0 px-2" style={{ fontSize: '0.7rem' }} onClick={() => changeLanguage('hi')} aria-label="Switch language to Hindi">HI</button>
                    </div>
                  </li>
                </ul>
              </div>
              
              {user && user.role !== "guest" ? (
                <button 
                  className="btn btn-sm rounded-pill px-3 fw-bold shadow-sm"
                  style={{ background: "var(--ink)", color: "var(--card-bg)", border: "none" }}
                  onClick={() => navigate(user.role === "admin" ? "/admin" : "/profile")}
                >
                  Profile
                </button>
              ) : (
                <Link 
                  to="/calculate-lifescore"
                  className="btn btn-sm rounded-pill px-3 fw-bold shadow-sm text-decoration-none"
                  style={{ background: "var(--teal)", color: "#fff", border: "none" }}
                >
                  Calculate Score
                </Link>
              )}

              <button
                className="btn btn-sm d-lg-none"
                data-bs-toggle="collapse"
                data-bs-target="#mobileMenu"
                aria-label="Toggle mobile menu"
              >
                <i className="bi bi-list" style={{ fontSize: "1.2rem" }} aria-hidden="true"></i>
              </button>
            </div>
          </div>
        </div>

        {/* Responsive Mobile Drawer */}
        <div className="collapse d-lg-none" id="mobileMenu">
          <div className="container py-3 d-flex flex-column gap-1">
            <p className="text-muted small fw-bold text-uppercase mb-1 mt-2 px-2" style={{ letterSpacing: "1px", fontSize: "0.7rem" }}>
              Main Categories
            </p>
            {cats.map((c) => (
              <Link
                key={c.name}
                to={c.path}
                onClick={() => {
                  const menu = document.getElementById("mobileMenu");
                  if (menu) menu.classList.remove("show");
                }}
                className="rounded px-3 py-2 fw-bold"
                style={{ 
                  textDecoration: 'none', 
                  color: currentPath === c.path ? "var(--accent)" : "var(--ink)",
                  background: currentPath === c.path ? "var(--cream2)" : "transparent",
                  fontSize: "0.95rem"
                }}
              >
                {c.name}
              </Link>
            ))}
            
            <hr className="my-2" style={{ borderColor: "var(--border)" }} />
            
            {menuGroups.map((group, gIdx) => (
              <div key={gIdx} className="mb-2">
                <p className="text-muted small fw-bold text-uppercase mb-1 px-2" style={{ letterSpacing: "1px", fontSize: "0.7rem", color: "var(--accent) !important" }}>
                  {group.title}
                </p>
                {group.items.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => {
                      const menu = document.getElementById("mobileMenu");
                      if (menu) menu.classList.remove("show");
                    }}
                    className="rounded px-3 py-1.5 d-block"
                    style={{ 
                      textDecoration: 'none', 
                      color: currentPath === item.path ? "var(--accent)" : "var(--ink2)",
                      background: currentPath === item.path ? "var(--cream2)" : "transparent",
                      fontSize: "0.85rem"
                    }}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Desktop Cat Ribbon */}
        <div className="container d-none d-lg-flex align-items-center justify-content-between py-1">
          <ul className="nav-cats m-0 p-0 d-flex align-items-center gap-4 list-unstyled">
            {cats.map((c) => (
              <li key={c.name} className={c.isMenu ? "dropdown" : ""}>
                {c.isMenu ? (
                  <button 
                    className="fw-bold pb-1 bg-transparent border-0 d-flex align-items-center gap-1"
                    data-bs-toggle="dropdown"
                    style={{ 
                      color: "var(--ink)",
                      fontSize: "0.9rem",
                    }}
                  >
                    {c.name} <i className="bi bi-chevron-down" style={{ fontSize: "0.7rem" }}></i>
                  </button>
                ) : (
                  <Link
                    to={c.path}
                    className="fw-bold pb-1 position-relative"
                    style={{ 
                      textDecoration: "none",
                      color: currentPath === c.path ? "var(--accent)" : "var(--ink)",
                      borderBottom: currentPath === c.path ? "2px solid var(--accent)" : "none",
                      fontSize: "0.9rem",
                      transition: "color 0.2s"
                    }}
                  >
                    {c.name}
                  </Link>
                )}
                {c.isMenu && (
                  <ul className="dropdown-menu shadow-lg border-0 p-3 rounded-4 mt-2" style={{ minWidth: "260px" }}>
                    {[
                      { label: "Saving Money", path: "/saving-money" },
                      { label: "Investing", path: "/investing" },
                      { label: "Debt Payoff", path: "/debt" },
                      { label: "Real Estate", path: "/real-estate" },
                      { label: "Retirement", path: "/retirement" },
                      { label: "Side Income", path: "/side-income" },
                      { label: "Editorial Blog", path: "/blog" },
                    ].map(link => (
                      <li key={link.path}>
                        <Link to={link.path} className="dropdown-item py-2 px-3 rounded-3 small fw-medium">{link.label}</Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
          
          <div className="d-flex align-items-center gap-2">
            <div className="dropdown">
              <button 
                className="btn btn-sm d-flex align-items-center gap-1 fw-bold rounded-pill px-3 py-1"
                data-bs-toggle="dropdown"
                style={{ 
                  color: "var(--ink)", 
                  background: "var(--cream2)", 
                  border: "1px solid var(--border)",
                  fontSize: "0.85rem" 
                }}
              >
                Services <i className="bi bi-chevron-down" style={{ fontSize: "0.7rem" }}></i>
              </button>
            
              <ul 
                className="dropdown-menu dropdown-menu-end shadow-lg border-0 p-3 rounded-4 mt-2 animate__animated animate__fadeIn animate__faster" 
                style={{ 
                  minWidth: "320px", 
                  background: "var(--card-bg)", 
                  border: "1px solid var(--border)",
                  boxShadow: "var(--shadow)" 
                }}
              >
                {menuGroups.map((group, idx) => (
                  <React.Fragment key={idx}>
                    {idx > 0 && <hr className="my-2" style={{ borderColor: "var(--border2)" }} />}
                    <li className="px-2 pt-1 pb-1">
                      <span className="text-uppercase fw-bold small d-block" style={{ fontSize: "0.68rem", letterSpacing: "1px", color: "var(--accent)" }}>
                        {group.title}
                      </span>
                    </li>
                    {group.items.map((item) => {
                      const isSelected = currentPath === item.path;
                      return (
                        <li key={item.name}>
                          <Link 
                            to={item.path} 
                            className="dropdown-item rounded-3 py-2 px-3 fw-medium d-flex align-items-center justify-content-between"
                            style={{ 
                              fontSize: "0.85rem",
                              color: isSelected ? "var(--accent)" : "var(--ink)",
                              background: isSelected ? "var(--cream2)" : "transparent",
                              transition: "all 0.15s"
                            }}
                            onMouseOver={(e) => {
                              e.currentTarget.style.background = "var(--cream2)";
                              e.currentTarget.style.color = "var(--accent)";
                            }}
                            onMouseOut={(e) => {
                              e.currentTarget.style.background = isSelected ? "var(--cream2)" : "transparent";
                              e.currentTarget.style.color = isSelected ? "var(--accent)" : "var(--ink)";
                            }}
                          >
                            <span>{item.name}</span>
                            {isSelected && <i className="bi bi-check-circle-fill text-accent small"></i>}
                          </Link>
                        </li>
                      );
                    })}
                  </React.Fragment>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
