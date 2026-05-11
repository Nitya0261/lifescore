import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { useTranslation } from "react-i18next";

export default function Navbar() {
  const location = useLocation();
  const currentPath = location.pathname;
  const { user } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const cats = [
    { name: t("nav.home") || "Home", path: "/" },
    { name: "Saving Money", path: "/saving-money" },
    { name: "Investing", path: "/investing" },
    { name: "Debt", path: "/debt" },
    { name: "Real Estate", path: "/real-estate" },
    { name: "Retirement", path: "/retirement" },
    { name: "Side Income", path: "/side-income" },
    { name: t("nav.tools") || "Tools", path: "/tools" },
  ];

  // Mega menu dropdowns for desktop
  const moreLinks = [
    { name: "📊 Markets", path: "/markets" },
    { name: "💰 Crypto", path: "/crypto" },
    { name: "📈 Economy", path: "/economy" },
    { name: "📖 Glossary", path: "/glossary" },
    { name: "⚖️ Compare", path: "/compare/roth-ira-vs-401k" },
    { name: "🧑‍💼 Find Advisor", path: "/find-advisor" },
    { name: "💳 Best Credit Cards", path: "/recommendations/credit-cards" },
    { name: "🏦 High-Yield Savings", path: "/recommendations/high-yield-savings" },
    { name: "📋 Budget Tracker", path: "/dashboard/budget" },
    { name: "🔖 Saved Articles", path: "/dashboard/saved" },
  ];

  return (
    <nav className="main-nav">
      <div className="container">
        <div
          className="d-flex justify-content-between align-items-center py-3 border-bottom"
          style={{ borderColor: "var(--border)" }}
        >
          <Link to="/" className="nav-logo">
            Life<span>Score</span>
            <small>Personal Finance &amp; Life Intelligence</small>
          </Link>
          <div className="d-flex align-items-center gap-3">
            <div className="nav-search d-none d-md-block">
              <input type="text" placeholder="Search articles, tools…" />
            </div>

            {/* Language Selector */}
            <div className="dropdown">
              <button 
                className="btn btn-sm btn-outline-secondary dropdown-toggle d-flex align-items-center justify-content-center" 
                type="button" 
                data-bs-toggle="dropdown" 
                aria-expanded="false"
                style={{ height: "32px", border: "none", background: "var(--card-bg)" }}
              >
                <i className="bi bi-globe me-1"></i> {i18n.language?.substring(0, 2).toUpperCase() || 'EN'}
              </button>
              <ul className="dropdown-menu dropdown-menu-end shadow-sm border-0" style={{ minWidth: "120px" }}>
                <li><button className={`dropdown-item ${i18n.language?.startsWith('en') ? 'active' : ''}`} onClick={() => changeLanguage('en')}>English</button></li>
                <li><button className={`dropdown-item ${i18n.language?.startsWith('es') ? 'active' : ''}`} onClick={() => changeLanguage('es')}>Español</button></li>
                <li><button className={`dropdown-item ${i18n.language?.startsWith('hi') ? 'active' : ''}`} onClick={() => changeLanguage('hi')}>हिंदी</button></li>
              </ul>
            </div>

            <button 
              className="btn btn-sm btn-outline-secondary rounded-circle d-flex align-items-center justify-content-center"
              style={{ width: "32px", height: "32px", border: "none" }}
              onClick={toggleTheme}
            >
              <i className={`bi ${isDark ? "bi-sun-fill text-warning" : "bi-moon-fill"}`}></i>
            </button>
            
            {user && user.role !== "guest" ? (
              <button 
                className="btn btn-dark btn-sm rounded-pill px-3"
                onClick={() => navigate(user.role === "admin" ? "/admin" : "/profile")}
              >
                <i className={`bi ${user.role === "admin" ? "bi-shield-lock" : "bi-person-circle"} me-1`}></i>
                {user.role === "admin" ? "Admin" : t("nav.profile") || "My Profile"}
              </button>
            ) : (
              <button 
                className="subscribe-btn"
                onClick={() => navigate("/login")}
              >
                <i className="bi bi-box-arrow-in-right me-1"></i>{t("nav.login") || "Login"}
              </button>
            )}

            <button
              className="btn btn-sm btn-outline-secondary d-lg-none"
              data-bs-toggle="collapse"
              data-bs-target="#mobileMenu"
            >
              <i className="bi bi-list"></i>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className="collapse d-lg-none" id="mobileMenu">
          <div className="py-3 d-flex flex-column gap-1">
            <p className="text-muted small fw-bold text-uppercase mb-1 mt-2" style={{ letterSpacing: "1px" }}>Categories</p>
            {cats.map((c) => (
              <Link
                key={c.name}
                to={c.path}
                className={`cat-tab ${currentPath === c.path ? "active" : ""}`}
                style={{ textDecoration: 'none' }}
              >
                {c.name}
              </Link>
            ))}
            <hr className="my-2" />
            <p className="text-muted small fw-bold text-uppercase mb-1" style={{ letterSpacing: "1px" }}>More</p>
            {moreLinks.map((l) => (
              <Link
                key={l.name}
                to={l.path}
                className={`cat-tab ${currentPath === l.path ? "active" : ""}`}
                style={{ textDecoration: 'none' }}
              >
                {l.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Desktop Nav */}
        <div className="d-none d-lg-flex align-items-center justify-content-between">
          <ul className="nav-cats">
            {cats.map((c) => (
              <li key={c.name}>
                <Link
                  to={c.path}
                  className={currentPath === c.path ? "active" : ""}
                  style={{ textDecoration: 'none' }}
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
          
          {/* More Dropdown */}
          <div className="dropdown">
            <button 
              className="btn btn-sm d-flex align-items-center gap-1 fw-bold"
              data-bs-toggle="dropdown"
              style={{ color: "var(--ink2)", fontSize: "0.9rem", background: "transparent", border: "none" }}
            >
              More <i className="bi bi-chevron-down" style={{ fontSize: "0.7rem" }}></i>
            </button>
            <ul className="dropdown-menu dropdown-menu-end shadow border-0 p-2" style={{ minWidth: "240px" }}>
              {moreLinks.map((l) => (
                <li key={l.name}>
                  <Link 
                    to={l.path} 
                    className="dropdown-item rounded-2 py-2"
                    style={{ fontSize: "0.9rem" }}
                  >
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
