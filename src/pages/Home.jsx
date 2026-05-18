import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import HeroSection from "../components/HeroSection";
import BlogGrid from "../components/BlogGrid";
import SEO from "../components/SEO";
import API_BASE_URL from "../config/api";

export default function Home() {
  const [announcements, setAnnouncements] = useState([]);
  const [marketTab, setMarketTab] = useState("US");
  const [marketHubData, setMarketHubData] = useState({
    US: [
      { name: "S&P 500", ticker: "^GSPC", value: 5420.15, change: "+1.25%", up: true, volume: "2.4B", trend: [40, 45, 42, 48, 52, 50, 55, 60] },
      { name: "Dow Jones", ticker: "^DJI", value: 39120.44, change: "+0.82%", up: true, volume: "380M", trend: [50, 52, 49, 53, 55, 54, 58, 62] },
      { name: "Nasdaq 100", ticker: "^NDX", value: 18840.12, change: "+1.82%", up: true, volume: "4.1B", trend: [30, 35, 40, 38, 45, 48, 52, 65] },
      { name: "Russell 2000", ticker: "^RUT", value: 2055.80, change: "-0.45%", up: false, volume: "1.1B", trend: [60, 58, 55, 57, 54, 52, 50, 45] }
    ],
    UK: [
      { name: "FTSE 100", ticker: "^FTSE", value: 8240.50, change: "+0.65%", up: true, volume: "620M", trend: [45, 48, 47, 50, 52, 51, 53, 55] },
      { name: "FTSE 250", ticker: "^FTMC", value: 20450.80, change: "+0.32%", up: true, volume: "240M", trend: [40, 42, 45, 43, 46, 48, 47, 50] },
      { name: "FTSE All-Share", ticker: "^FTAS", value: 4510.20, change: "+0.58%", up: true, volume: "890M", trend: [42, 45, 44, 48, 50, 49, 51, 54] },
      { name: "GBP/USD", ticker: "GBP=X", value: 1.2845, change: "+0.15%", up: true, volume: "—", trend: [50, 51, 50, 52, 53, 52, 54, 55] }
    ],
    Canada: [
      { name: "S&P/TSX Composite", ticker: "^GSPTSE", value: 22650.10, change: "+0.92%", up: true, volume: "310M", trend: [35, 38, 42, 40, 45, 48, 50, 55] },
      { name: "S&P/TSX 60", ticker: "^TX60", value: 1355.40, change: "+1.05%", up: true, volume: "185M", trend: [38, 40, 44, 42, 48, 50, 52, 58] },
      { name: "S&P/TSX Venture", ticker: "^JX", value: 585.20, change: "-1.15%", up: false, volume: "45M", trend: [55, 52, 50, 48, 45, 42, 40, 38] },
      { name: "USD/CAD", ticker: "CAD=X", value: 1.3620, change: "-0.22%", up: false, volume: "—", trend: [60, 58, 55, 57, 54, 52, 50, 48] }
    ],
    Crypto: [
      { name: "Bitcoin", ticker: "BTC-USD", value: 68450.00, change: "+4.85%", up: true, volume: "$32.4B", trend: [20, 25, 35, 30, 45, 55, 65, 80] },
      { name: "Ethereum", ticker: "ETH-USD", value: 3820.50, change: "+5.12%", up: true, volume: "$18.1B", trend: [22, 28, 32, 40, 48, 52, 60, 75] },
      { name: "Solana", ticker: "SOL-USD", value: 172.40, change: "+8.45%", up: true, volume: "$4.8B", trend: [15, 20, 30, 45, 40, 55, 70, 85] },
      { name: "Cardano", ticker: "ADA-USD", value: 0.485, change: "-1.20%", up: false, volume: "$420M", trend: [50, 48, 45, 46, 42, 44, 40, 38] }
    ]
  });

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/announcements`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setAnnouncements(data);
        }
      })
      .catch(err => console.error("Failed to fetch announcements", err));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setMarketHubData(prev => {
        const next = { ...prev };
        Object.keys(next).forEach(region => {
          next[region] = next[region].map(asset => {
            const deltaPercent = (Math.random() - 0.48) * 0.4;
            const updatedValue = asset.value * (1 + deltaPercent / 100);
            const currentChangeNum = parseFloat(asset.change.replace(/[+%]/g, ''));
            const newChangeNum = currentChangeNum + deltaPercent;
            const newChangeStr = `${newChangeNum >= 0 ? '+' : ''}${newChangeNum.toFixed(2)}%`;
            const newTrend = [...asset.trend.slice(1), Math.min(100, Math.max(0, asset.trend[asset.trend.length - 1] + (deltaPercent * 10)))];

            return {
              ...asset,
              value: region === "Crypto" ? parseFloat(updatedValue.toFixed(asset.value < 1 ? 4 : 2)) : parseFloat(updatedValue.toFixed(2)),
              change: newChangeStr,
              up: newChangeNum >= 0,
              trend: newTrend
            };
          });
        });
        return next;
      });
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  const quickLinks = [
    { icon: "bi-calculator-fill", label: "SIP Calculator", path: "/tools/sip-calculator", color: "#0d9488" },
    { icon: "bi-graph-up-arrow", label: "Compound Interest", path: "/tools/compound-interest", color: "#6366f1" },
    { icon: "bi-bar-chart-line-fill", label: "Budget Tracker", path: "/dashboard/budget", color: "#22c55e" },
    { icon: "bi-book-fill", label: "Glossary", path: "/glossary", color: "#f59e0b" },
    { icon: "bi-arrow-left-right", label: "Compare", path: "/compare", color: "#ec4899" },
    { icon: "bi-person-badge-fill", label: "Find Advisor", path: "/advisor", color: "#3b82f6" },
    { icon: "bi-credit-card-fill", label: "Best Cards", path: "/recommendations/cards", color: "#ef4444" },
    { icon: "bi-piggy-bank-fill", label: "HY Savings", path: "/recommendations/savings", color: "#8b5cf6" },
  ];

  return (
    <>
      <SEO 
        title="Personal Finance & Life Intelligence Platform" 
        description="LifeScore helps you track your real net worth, calculate SIP trajectories, and compare ultimate retirement options using tailored financial telemetry."
        url="https://lifescore.app"
      />

      <HeroSection />

      {/* Primary Conversion Path: The Growth Engine */}
      <section className="py-5 py-md-6" style={{ background: "var(--card-bg)" }}>
        <div className="container">
          <div className="row justify-content-center text-center mb-5">
            <div className="col-lg-8">
              <h2 className="ls-heading ls-heading-lg mb-3">Intelligence Toolkit</h2>
              <p className="text-muted fs-5 mb-0">High-precision simulators to model your path to financial freedom.</p>
            </div>
          </div>
          
          <div className="row g-4">
            {[
              { title: "SIP Calculator", desc: "Project wealth from regular investments.", path: "/tools/sip-calculator", icon: "bi-calculator", color: "var(--teal)", bg: "var(--cream2)" },
              { title: "Budget Tracker", desc: "Master your cashflow with 50/30/20 rules.", path: "/dashboard/budget", icon: "bi-pie-chart", color: "var(--teal)", bg: "var(--cream2)" },
              { title: "Retirement Goal", desc: "Find your magic number for total freedom.", path: "/tools/retirement-number", icon: "bi-umbrella", color: "var(--teal)", bg: "var(--cream2)" },
              { title: "Debt Payoff", desc: "Compare Snowball vs. Avalanche strategies.", path: "/tools/debt-payoff", icon: "bi-fire", color: "var(--teal)", bg: "var(--cream2)" },
              { title: "Emergency Fund", desc: "Calculate your safety net in 30 seconds.", path: "/tools/emergency-fund", icon: "bi-shield-check", color: "var(--teal)", bg: "var(--cream2)" },
              { title: "Net Worth Tracker", desc: "See your entire financial life in one place.", path: "/tools/net-worth", icon: "bi-wallet2", color: "var(--teal)", bg: "var(--cream2)" }
            ].map((tool, idx) => (
              <div key={idx} className="col-md-4 col-sm-6">
                <Link to={tool.path} className="ls-card h-100 d-block text-decoration-none transition-all p-4 text-center" style={{ background: "var(--card-bg)", border: "1px solid var(--border)", borderRadius: "24px" }}>
                  <div className="mb-3 d-inline-flex align-items-center justify-content-center" style={{ width: "64px", height: "64px", borderRadius: "16px", background: "var(--cream)", color: tool.color, fontSize: "1.75rem" }}>
                    <i className={`bi ${tool.icon}`}></i>
                  </div>
                  <h5 className="ls-heading ls-heading-sm mb-2">{tool.title}</h5>
                  <p className="text-muted small mb-0">{tool.desc}</p>
                </Link>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-5">
            <Link to="/tools" className="btn btn-outline-dark px-5 py-3 rounded-pill fw-bold">
              View All Financial Tools <i className="bi bi-arrow-right ms-2"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* Global Macro & Markets Engine Section */}
      <section className="py-5 py-md-6 border-top border-bottom" style={{ background: "linear-gradient(135deg, #020617 0%, #0f172a 100%)", color: "#fff", position: "relative", overflow: "hidden" }}>
        <div className="position-absolute top-0 end-0 p-5 opacity-10 d-none d-lg-block" style={{ fontSize: "15rem", transform: "translateY(-30%)", pointerEvents: "none" }}>
          📈
        </div>
        
        <div className="container position-relative" style={{ zIndex: 2 }}>
          <div className="row justify-content-center text-center mb-5">
            <div className="col-lg-8">
              <span className="badge bg-danger rounded-pill px-3 py-2 fw-bold mb-3 shadow-sm" style={{ letterSpacing: "1px", fontSize: "0.7rem" }}>
                <span className="spinner-grow spinner-grow-sm me-2 align-middle" style={{ width: "0.50rem", height: "0.50rem" }}></span>
                LIVE SIMULATED MARKET HUB
              </span>
              <h2 className="ls-heading text-white fw-bolder mb-3" style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", fontFamily: "var(--serif)" }}>
                Global Macro & Markets Engine
              </h2>
              <p className="text-white-50 fs-5 mb-0">
                Institutional-grade telemetry tracking live stock indexes and crypto markets in real-time.
              </p>
            </div>
          </div>

          {/* Tab Selector & Controls */}
          <div className="d-flex flex-wrap gap-2 justify-content-center mb-4">
            {[
              { id: "US", label: "🇺🇸 USA Markets" },
              { id: "UK", label: "🇬🇧 UK Markets" },
              { id: "Canada", label: "🇨🇦 Canada TSX" },
              { id: "Crypto", label: "🪙 Crypto Assets" }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setMarketTab(tab.id)}
                className={`btn rounded-pill px-4 py-2 transition-all fw-bold ${marketTab === tab.id ? 'btn-primary border-0 shadow' : 'btn-outline-light border-white border-opacity-20'}`}
                style={{ fontSize: "0.85rem" }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Cards Grid */}
          <div className="row g-4">
            {marketHubData[marketTab]?.map((asset) => {
              return (
                <div className="col-md-6 col-lg-3" key={asset.name}>
                  <div className="card h-100 p-4 border-0 rounded-4" style={{ background: "rgba(30, 41, 59, 0.4)", backdropFilter: "blur(12px)", border: "1px solid rgba(255, 255, 255, 0.05) !important", transition: "all 0.3s ease" }}>
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <div>
                        <span className="text-uppercase opacity-50 fw-bold" style={{ fontSize: "0.65rem", letterSpacing: "1px" }}>{asset.ticker}</span>
                        <h5 className="ls-heading text-white mb-0 mt-1" style={{ fontSize: "1.1rem" }}>{asset.name}</h5>
                      </div>
                      <span className={`px-2 py-1 rounded small fw-bold ${asset.up ? 'bg-success bg-opacity-10 text-success' : 'bg-danger bg-opacity-10 text-danger'}`} style={{ fontSize: "0.75rem" }}>
                        {asset.up ? '▲' : '▼'} {asset.change}
                      </span>
                    </div>

                    <div className="d-flex align-items-baseline gap-2 my-3">
                      <span className="fw-black fs-2 text-white" style={{ fontFamily: "var(--serif)", letterSpacing: "-0.02em" }}>
                        {marketTab === "Crypto" ? (asset.value < 1 ? `$${asset.value}` : `$${asset.value.toLocaleString()}`) : asset.value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                    </div>

                    {/* Interactive mini sparkline SVG */}
                    <div className="mt-2" style={{ height: "40px" }}>
                      <svg className="w-100 h-100 overflow-visible">
                        <polyline
                          fill="none"
                          stroke={asset.up ? "#10b981" : "#ef4444"}
                          strokeWidth="2"
                          points={asset.trend.map((val, idx) => `${(idx / (asset.trend.length - 1)) * 100},${35 - (val / 100) * 30}`).join(' ')}
                          style={{ transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)" }}
                        />
                        {asset.trend.map((val, idx) => (
                          <circle
                            key={idx}
                            cx={`${(idx / (asset.trend.length - 1)) * 100}`}
                            cy={`${35 - (val / 100) * 30}`}
                            r={idx === asset.trend.length - 1 ? "3" : "1"}
                            fill={asset.up ? "#10b981" : "#ef4444"}
                          />
                        ))}
                      </svg>
                    </div>

                    <div className="d-flex justify-content-between mt-3 pt-3 border-top border-white border-opacity-5 text-white-50" style={{ fontSize: "0.7rem" }}>
                      <span>Session Volume</span>
                      <span className="fw-bold text-white">{asset.volume}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-5">
            <Link to="/markets" className="btn btn-primary px-5 py-3 rounded-pill fw-bold shadow-lg" style={{ background: "var(--teal)", borderColor: "var(--teal)" }}>
              Open Interactive Trade & Macro Room <i className="bi bi-arrow-up-right-circle ms-2"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* Editorial Content Layer */}
      <section className="py-5 py-md-6" style={{ background: "var(--cream2)", borderTop: "1px solid var(--border)" }}>
        <div className="container">
          <div className="row align-items-end mb-5">
            <div className="col-md-8">
              <h2 className="ls-heading ls-heading-lg mb-2">Latest Insights</h2>
              <p className="text-muted mb-0">Fresh perspectives on wealth, career, and life strategy.</p>
            </div>
            <div className="col-md-4 text-md-end mt-3 mt-md-0">
              <Link to="/blog" className="text-decoration-none fw-bold text-dark">Browse Archive &rarr;</Link>
            </div>
          </div>
          <BlogGrid />
        </div>
      </section>

      {/* Comparison & Literacy */}
      <section className="py-5 py-md-6" style={{ background: "var(--card-bg)", borderTop: "1px solid var(--border)" }}>
        <div className="container">
          <div className="row g-4 justify-content-center">
            {[
              { label: "Roth IRA vs 401(k)", slug: "roth-ira-vs-401k", icon: "bi-arrow-left-right", color: "var(--teal)" },
              { label: "ETF vs Mutual Fund", slug: "etf-vs-mutual-fund", icon: "bi-arrow-left-right", color: "var(--teal)" },
              { label: "Financial Glossary A–Z", path: "/glossary", icon: "bi-book", color: "var(--teal)" }
            ].map((c, idx) => (
              <div key={idx} className="col-md-4">
                <Link
                  to={c.path || `/compare/${c.slug}`}
                  className="ls-card text-decoration-none h-100 d-block p-4 text-center"
                  style={{ border: "1px solid var(--border)", borderRadius: "20px" }}
                >
                  <i className={`bi ${c.icon} mb-3 d-block`} style={{ fontSize: "2rem", color: c.color }}></i>
                  <h5 className="ls-heading ls-heading-md mb-0">{c.label}</h5>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
