import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { useTranslation } from "react-i18next";

export default function Navbar() {
  const location = useLocation();
  const currentPath = location.pathname;
  const { user, toggleAuthModal } = useAuth();
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

  // Flat array for quick mapping inside mobile drawer
  const flatMoreLinks = menuGroups.flatMap(g => g.items);

  return (
    <nav className="main-nav sticky-top shadow-sm" style={{ background: "var(--card-bg)", transition: "background 0.3s" }}>
      <div className="container">
        <div
          className="d-flex justify-content-between align-items-center py-3 border-bottom"
          style={{ borderColor: "var(--border)" }}
        >
          <Link to="/" className="nav-logo" style={{ textDecoration: "none" }}>
            <span style={{ fontWeight: 900, fontSize: "1.25rem" }}>Life<span style={{ color: "var(--accent)" }}>Score</span></span>
            <small className="d-none d-sm-block" style={{ color: "var(--ink3)", fontSize: "0.7rem", marginTop: "-2px" }}>Personal Finance &amp; Life Intelligence</small>
          </Link>
          
          <div className="d-flex align-items-center gap-2 gap-sm-3">
            <div className="nav-search d-none d-md-block">
              <input 
                type="text" 
                placeholder="Search articles, tools…" 
                style={{ 
                  background: "var(--cream)", 
                  color: "var(--ink)", 
                  border: "1px solid var(--border)", 
                  borderRadius: "20px", 
                  padding: "4px 16px",
                  fontSize: "0.85rem"
                }} 
              />
            </div>

            {/* Language Selector */}
            <div className="dropdown">
              <button 
                className="btn btn-sm dropdown-toggle d-flex align-items-center justify-content-center fw-bold px-2 px-sm-2.5" 
                type="button" 
                data-bs-toggle="dropdown" 
                aria-expanded="false"
                style={{ 
                  height: "32px", 
                  border: "1px solid var(--border)", 
                  background: "var(--cream2)", 
                  color: "var(--ink)",
                  borderRadius: "16px",
                  fontSize: "0.8rem"
                }}
              >
                <i className="bi bi-globe me-1 text-primary"></i> <span className="d-none d-xs-inline">{i18n.language?.substring(0, 2).toUpperCase() || 'EN'}</span>
              </button>
              <ul className="dropdown-menu dropdown-menu-end shadow border-0 p-2 rounded-3" style={{ minWidth: "130px", background: "var(--card-bg)", border: "1px solid var(--border)" }}>
                {['en', 'es', 'hi'].map((lang) => {
                  const labelMap = { en: "English", es: "Español", hi: "हिंदी" };
                  const isActive = i18n.language?.startsWith(lang);
                  return (
                    <li key={lang}>
                      <button 
                        className="dropdown-item rounded py-1.5 small fw-bold" 
                        style={{ 
                          background: isActive ? "var(--ink)" : "transparent",
                          color: isActive ? "#fff" : "var(--ink)",
                          fontSize: "0.85rem"
                        }}
                        onClick={() => changeLanguage(lang)}
                      >
                        {labelMap[lang]}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Dark/Light mode trigger */}
            <button 
              className="btn btn-sm rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
              style={{ width: "32px", height: "32px", border: "1px solid var(--border)", background: "var(--cream2)", color: "var(--ink)" }}
              onClick={toggleTheme}
              title="Toggle design mode"
            >
              <i className={`bi ${isDark ? "bi-sun-fill text-warning" : "bi-moon-stars-fill text-primary"}`} style={{ fontSize: "0.9rem" }}></i>
            </button>
            
            {/* Authenticated user control */}
            {user && user.role !== "guest" ? (
              <button 
                className="btn btn-sm rounded-pill px-2.5 px-sm-3 fw-bold shadow-sm text-truncate d-flex align-items-center"
                style={{ background: "var(--ink)", color: "var(--card-bg)", border: "none", maxWidth: "130px" }}
                onClick={() => navigate(user.role === "admin" ? "/admin" : "/profile")}
              >
                {user.avatarUrl ? (
                  <img src={user.avatarUrl} alt="Avatar" style={{ width: "20px", height: "20px", borderRadius: "50%", objectFit: "cover", marginRight: "6px" }} />
                ) : (
                  <i className={`bi ${user.role === "admin" ? "bi-shield-lock-fill text-warning" : "bi-person-circle text-teal"} me-1`}></i>
                )}
                <span className="d-none d-sm-inline">{user.role === "admin" ? "Admin Panel" : t("nav.profile") || "My Profile"}</span>
                <span className="d-inline d-sm-none">{user.role === "admin" ? "Admin" : "Profile"}</span>
              </button>
            ) : (
              <button 
                className="btn btn-sm rounded-pill px-2.5 px-sm-3 fw-bold shadow-sm text-truncate"
                style={{ background: "var(--accent)", color: "#fff", border: "none" }}
                onClick={() => toggleAuthModal(true)}
              >
                <i className="bi bi-box-arrow-in-right me-1"></i>
                <span className="d-none d-sm-inline">{t("nav.login") || "Member Login"}</span>
                <span className="d-inline d-sm-none">Login</span>
              </button>
            )}

            <button
              className="btn btn-sm d-lg-none flex-shrink-0"
              data-bs-toggle="collapse"
              data-bs-target="#mobileMenu"
              style={{ background: "var(--cream2)", color: "var(--ink)", border: "1px solid var(--border)", width: "32px", height: "32px", padding: 0 }}
            >
              <i className="bi bi-list" style={{ fontSize: "1.1rem" }}></i>
            </button>
          </div>
        </div>

        {/* Responsive Mobile Drawer */}
        <div className="collapse d-lg-none" id="mobileMenu">
          <div className="py-3 d-flex flex-column gap-1">
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
        <div className="d-none d-lg-flex align-items-center justify-content-between py-1">
          <ul className="nav-cats m-0 p-0 d-flex align-items-center gap-4 list-unstyled">
            {cats.map((c) => (
              <li key={c.name}>
                <Link
                  to={c.path}
                  className="fw-bold pb-1"
                  style={{ 
                    textDecoration: 'none',
                    color: currentPath === c.path ? "var(--accent)" : "var(--ink)",
                    borderBottom: currentPath === c.path ? "2px solid var(--accent)" : "none",
                    fontSize: "0.9rem",
                    transition: "color 0.2s"
                  }}
                  onMouseOver={(e) => e.currentTarget.style.color = "var(--accent)"}
                  onMouseOut={(e) => e.currentTarget.style.color = currentPath === c.path ? "var(--accent)" : "var(--ink)"}
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
          
          {/* Advanced Section Mega Dropdown */}
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
              Explore Services <i className="bi bi-chevron-down" style={{ fontSize: "0.7rem" }}></i>
            </button>
            
            {/* Themed luxurious absolute menu block */}
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
  );
}
