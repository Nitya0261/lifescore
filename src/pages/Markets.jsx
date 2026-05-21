import React, { useState, useEffect } from "react";
import BlogGrid from "../components/BlogGrid";
import BookmarkButton from "../components/BookmarkButton";
import SEO from "../components/SEO";

export default function Markets() {
  const [activeTab, setActiveTab] = useState("US");
  const [lastUpdated, setLastUpdated] = useState(new Date().toLocaleTimeString());
  const [isUpdating, setIsUpdating] = useState(false);

  // Initial rich mock data structured by jurisdiction
  const [marketData, setMarketData] = useState({
    US: [
      { name: "S&P 500", ticker: "^GSPC", value: 5420.15, change: "+1.25%", netChange: "+66.90", up: true, high: "5,432.10", low: "5,390.40", volume: "2.4B", trend: [40, 45, 42, 48, 52, 50, 55, 60] },
      { name: "Dow Jones", ticker: "^DJI", value: 39120.44, change: "+0.82%", netChange: "+318.10", up: true, high: "39,210.00", low: "38,980.50", volume: "380M", trend: [50, 52, 49, 53, 55, 54, 58, 62] },
      { name: "Nasdaq 100", ticker: "^NDX", value: 18840.12, change: "+1.82%", netChange: "+336.80", up: true, high: "18,910.40", low: "18,720.10", volume: "4.1B", trend: [30, 35, 40, 38, 45, 48, 52, 65] },
      { name: "Russell 2000", ticker: "^RUT", value: 2055.80, change: "-0.45%", netChange: "-9.25", up: false, high: "2,070.15", low: "2,045.00", volume: "1.1B", trend: [60, 58, 55, 57, 54, 52, 50, 45] },
      { name: "CBOE Volatility (VIX)", ticker: "^VIX", value: 12.45, change: "-4.20%", netChange: "-0.55", up: false, high: "13.10", low: "12.20", volume: "—", trend: [30, 28, 32, 25, 24, 26, 22, 20] }
    ],
    UK: [
      { name: "FTSE 100", ticker: "^FTSE", value: 8240.50, change: "+0.65%", netChange: "+53.20", up: true, high: "8,265.10", low: "8,190.00", volume: "620M", trend: [45, 48, 47, 50, 52, 51, 53, 55] },
      { name: "FTSE 250", ticker: "^FTMC", value: 20450.80, change: "+0.32%", netChange: "+65.10", up: true, high: "20,510.00", low: "20,380.20", volume: "240M", trend: [40, 42, 45, 43, 46, 48, 47, 50] },
      { name: "FTSE All-Share", ticker: "^FTAS", value: 4510.20, change: "+0.58%", netChange: "+26.00", up: true, high: "4,525.00", low: "4,485.50", volume: "890M", trend: [42, 45, 44, 48, 50, 49, 51, 54] },
      { name: "GBP/USD", ticker: "GBP=X", value: 1.2845, change: "+0.15%", netChange: "+0.0019", up: true, high: "1.2860", low: "1.2810", volume: "—", trend: [50, 51, 50, 52, 53, 52, 54, 55] }
    ],
    Canada: [
      { name: "S&P/TSX Composite", ticker: "^GSPTSE", value: 22650.10, change: "+0.92%", netChange: "+206.40", up: true, high: "22,710.00", low: "22,520.80", volume: "310M", trend: [35, 38, 42, 40, 45, 48, 50, 55] },
      { name: "S&P/TSX 60", ticker: "^TX60", value: 1355.40, change: "+1.05%", netChange: "+14.10", up: true, high: "1362.00", low: "1348.50", volume: "185M", trend: [38, 40, 44, 42, 48, 50, 52, 58] },
      { name: "S&P/TSX Venture", ticker: "^JX", value: 585.20, change: "-1.15%", netChange: "-6.80", up: false, high: "594.00", low: "582.10", volume: "45M", trend: [55, 52, 50, 48, 45, 42, 40, 38] },
      { name: "USD/CAD", ticker: "CAD=X", value: 1.3620, change: "-0.22%", netChange: "-0.0030", up: false, high: "1.3665", low: "1.3605", volume: "—", trend: [60, 58, 55, 57, 54, 52, 50, 48] }
    ],
    Crypto: [
      { name: "Bitcoin", ticker: "BTC-USD", value: 68450.00, change: "+4.85%", netChange: "+$3,160", up: true, high: "$69,120", low: "$65,100", volume: "$32.4B", trend: [20, 25, 35, 30, 45, 55, 65, 80] },
      { name: "Ethereum", ticker: "ETH-USD", value: 3820.50, change: "+5.12%", netChange: "+$186.20", up: true, high: "$3,890", low: "$3,610", volume: "$18.1B", trend: [22, 28, 32, 40, 48, 52, 60, 75] },
      { name: "Solana", ticker: "SOL-USD", value: 172.40, change: "+8.45%", netChange: "+$13.40", up: true, high: "$176.50", low: "$158.00", volume: "$4.8B", trend: [15, 20, 30, 45, 40, 55, 70, 85] },
      { name: "Cardano", ticker: "ADA-USD", value: 0.485, change: "-1.20%", netChange: "-$0.006", up: false, high: "$0.495", low: "$0.472", volume: "$420M", trend: [50, 48, 45, 46, 42, 44, 40, 38] },
      { name: "Chainlink", ticker: "LINK-USD", value: 16.80, change: "+2.35%", netChange: "+$0.38", up: true, high: "$17.10", low: "$16.20", volume: "$610M", trend: [30, 32, 35, 38, 40, 45, 42, 48] }
    ]
  });

  // Central Bank Policy Indicators
  const macroPolicies = {
    US: { bank: "Federal Reserve", rate: "5.25% - 5.50%", inflation: "3.4%", nextMeeting: "June 12, 2026", stance: "Hawkish Hold" },
    UK: { bank: "Bank of England", rate: "5.25%", inflation: "3.2%", nextMeeting: "June 18, 2026", stance: "Cautious Easing" },
    Canada: { bank: "Bank of Canada", rate: "4.75%", inflation: "2.7%", nextMeeting: "July 22, 2026", stance: "Accommodative" },
    Crypto: { bank: "DeFi / Network Gas", rate: "12 Gwei Avg", inflation: "1.7% Issuance", nextMeeting: "Halving Epochs", stance: "Highly Liquid" }
  };

  // Top gainers/losers leaderboard mapped across active segments
  const marketMovers = {
    US: [
      { symbol: "NVDA", name: "NVIDIA Corp.", change: "+6.8%", volume: "85M", price: "$1,120.40", type: "gainer" },
      { symbol: "AAPL", name: "Apple Inc.", change: "+2.4%", volume: "62M", price: "$192.15", type: "gainer" },
      { symbol: "TSLA", name: "Tesla Inc.", change: "-4.2%", volume: "95M", price: "$172.50", type: "loser" },
      { symbol: "AMD", name: "Advanced Micro Devices", change: "+3.8%", volume: "48M", price: "$165.80", type: "gainer" }
    ],
    UK: [
      { symbol: "AZN.L", name: "AstraZeneca PLC", change: "+3.1%", volume: "12M", price: "£12,450", type: "gainer" },
      { symbol: "BP.L", name: "BP PLC", change: "-1.8%", volume: "35M", price: "£485.20", type: "loser" },
      { symbol: "HSBA.L", name: "HSBC Holdings", change: "+1.2%", volume: "22M", price: "£680.10", type: "gainer" }
    ],
    Canada: [
      { symbol: "RY.TO", name: "Royal Bank of Canada", change: "+1.5%", volume: "8.2M", price: "$142.50", type: "gainer" },
      { symbol: "SHOP.TO", name: "Shopify Inc.", change: "+4.8%", volume: "14M", price: "$98.20", type: "gainer" },
      { symbol: "SU.TO", name: "Suncor Energy", change: "-2.1%", volume: "11M", price: "$52.10", type: "loser" }
    ],
    Crypto: [
      { symbol: "PEPE", name: "Pepecoin", change: "+24.5%", volume: "$1.2B", price: "$0.000014", type: "gainer" },
      { symbol: "NEAR", name: "NEAR Protocol", change: "+12.2%", volume: "$680M", price: "$7.85", type: "gainer" },
      { symbol: "WIF", name: "dogwifhat", change: "-8.4%", volume: "$410M", price: "$2.85", type: "loser" }
    ]
  };

  // Live polling effect simulates ultra real-time market oscillations
  useEffect(() => {
    const interval = setInterval(() => {
      setIsUpdating(true);
      setMarketData(prev => {
        const next = { ...prev };
        Object.keys(next).forEach(region => {
          next[region] = next[region].map(asset => {
            // Apply randomized micro volatility tick (+/- 0.2%)
            const deltaPercent = (Math.random() - 0.48) * 0.4;
            const updatedValue = asset.value * (1 + deltaPercent / 100);
            
            // Format numeric value nicely
            const isCrypto = region === "Crypto";
            const currentChangeNum = parseFloat(asset.change.replace(/[+%]/g, ''));
            const newChangeNum = currentChangeNum + deltaPercent;
            const newChangeStr = `${newChangeNum >= 0 ? '+' : ''}${newChangeNum.toFixed(2)}%`;
            
            // Push trend array point dynamically
            const newTrend = [...asset.trend.slice(1), Math.min(100, Math.max(0, asset.trend[asset.trend.length - 1] + (deltaPercent * 10)))];

            return {
              ...asset,
              value: isCrypto ? parseFloat(updatedValue.toFixed(asset.value < 1 ? 4 : 2)) : parseFloat(updatedValue.toFixed(2)),
              change: newChangeStr,
              up: newChangeNum >= 0,
              trend: newTrend
            };
          });
        });
        return next;
      });

      setTimeout(() => {
        setLastUpdated(new Date().toLocaleTimeString());
        setIsUpdating(false);
      }, 400);

    }, 4500);

    return () => clearInterval(interval);
  }, []);

  const activeSegmentData = marketData[activeTab];
  const activeMacro = macroPolicies[activeTab];
  const activeMovers = marketMovers[activeTab];

  // Helper formatting for main numbers
  const formatVal = (val, tab) => {
    if (tab === "Crypto") {
      return val < 1 ? `$${val}` : `$${val.toLocaleString()}`;
    }
    return val.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  return (
    <div style={{ background: "var(--cream)", minHeight: "100vh" }}>
      <SEO 
        title="Full Market Analysis & Telemetry Dashboard" 
        description="Complex global institutional metrics covering real-time equities for Wall Street, London Stock Exchange, TSX Canada, and top cryptocurrency assets."
        url="https://lifesscore.live/markets"
      />

      {/* Modern High-End Terminal Banner */}
      <div 
        style={{ 
          background: "linear-gradient(135deg, #020617 0%, #0f172a 100%)", 
          color: "#fff", 
          padding: "3.5rem 0 5.5rem 0",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
          position: "relative"
        }}
      >
        <div className="position-absolute top-0 end-0 p-5 opacity-10 d-none d-lg-block" style={{ fontSize: "12rem", transform: "translateY(-20%)", pointerEvents: "none" }}>
          🌐
        </div>

        <div className="container position-relative" style={{ zIndex: 2 }}>
          <div className="d-flex flex-wrap justify-content-between align-items-center mb-3">
            <div className="d-flex flex-wrap align-items-center gap-2">
              <span className="badge bg-warning text-dark rounded-pill px-3 py-2 fw-black shadow-sm" style={{ letterSpacing: "1px", fontSize: "0.7rem" }}>
                ⚠️ LIVE SIMULATED MARKET HUB
              </span>
              <span className="badge bg-danger rounded-pill px-3 py-2 fw-bold shadow-sm" style={{ letterSpacing: "1px", fontSize: "0.7rem" }}>
                <span className="spinner-grow spinner-grow-sm me-1 align-middle" style={{ width: "0.5rem", height: "0.5rem" }}></span>
                SIMULATED TELEMETRY
              </span>
              <span className={`badge ${isUpdating ? 'bg-warning text-dark' : 'bg-success'} rounded-pill px-2 py-1 transition-all`} style={{ fontSize: "0.65rem" }}>
                {isUpdating ? 'OSCILLATING TICK...' : 'SYNCED'}
              </span>
            </div>

            <div className="text-end mt-2 mt-sm-0">
              <span className="text-white-50 small me-2">Last Heartbeat:</span>
              <code className="bg-dark text-white px-2 py-1 rounded border border-secondary border-opacity-25 fw-bold">
                {lastUpdated}
              </code>
            </div>
          </div>

          <h1 className="fw-bolder mb-2" style={{ fontFamily: "var(--serif)", fontSize: "clamp(2rem, 4vw, 3.2rem)", letterSpacing: "-0.03em" }}>
            Global Macro & Markets Engine
          </h1>
          <p className="text-white-50 mb-0" style={{ fontSize: "1.05rem", maxWidth: "750px" }}>
            Programmatically simulated cross-border capital liquidity analytics tracking stock exchanges in the <span className="text-white fw-bold">United States</span>, <span className="text-white fw-bold">United Kingdom</span>, <span className="text-white fw-bold">Canada</span>, alongside high-volatility decentralized <span className="text-white fw-bold">Crypto networks</span>.
          </p>
          <div className="mt-3 p-3 rounded bg-white bg-opacity-5 border border-white border-opacity-10" style={{ maxWidth: "750px" }}>
            <small className="text-white-50 d-block" style={{ fontSize: "0.8rem", lineHeight: 1.4 }}>
              <i className="bi bi-info-circle-fill me-1 text-warning"></i> <strong>Transparency Disclaimer:</strong> All telemetry and metrics shown on this page are simulated oscillations generated programmatically. These values are not live exchange rates and do not constitute professional investment advice or recommendation.
            </small>
          </div>
        </div>
      </div>

      {/* Main Terminal Controller Suite */}
      <div className="container" style={{ marginTop: "-3rem", position: "relative", zIndex: 10 }}>
        
        {/* Geographic Segmentation Nav */}
        <div className="card shadow-lg p-2 mb-4 rounded-4" style={{ background: "var(--card-bg)", borderColor: "var(--border)" }}>
          <div className="d-flex flex-wrap gap-2 justify-content-between align-items-center">
            <div className="nav nav-pills gap-1 flex-grow-1" role="tablist">
              {[
                { id: "US", label: "🇺🇸 Wall Street (US)", flag: "US", desc: "NYSE & Nasdaq" },
                { id: "UK", label: "🇬🇧 United Kingdom", flag: "UK", desc: "LSE Main Market" },
                { id: "Canada", label: "🇨🇦 TSX Canada", flag: "CA", desc: "Toronto Ex" },
                { id: "Crypto", label: "🪙 Cryptocurrency", flag: "CRYPTO", desc: "DeFi / Spot" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`btn rounded-pill px-2 px-sm-4 py-1 py-sm-2 text-start transition-all ${activeTab === tab.id ? 'btn-primary shadow-sm fw-bold' : 'btn-light text-muted'}`}
                  style={{ 
                    flex: "1 1 auto",
                    border: "1px solid transparent", 
                    borderColor: activeTab === tab.id ? 'var(--accent)' : 'var(--border2)' 
                  }}
                >
                  <div className="d-flex align-items-center justify-content-between">
                    <div>
                      <div style={{ fontSize: "0.95rem" }}>{tab.label}</div>
                      <small className={`d-block ${activeTab === tab.id ? 'text-white-50' : 'text-muted'} small`} style={{ fontSize: "0.65rem" }}>
                        {tab.desc}
                      </small>
                    </div>
                    {activeTab === tab.id && <i className="bi bi-check2-circle ms-2 fs-5"></i>}
                  </div>
                </button>
              ))}
            </div>

            {/* Overall Sentiment Indicator */}
            <div className="px-3 py-2 rounded-pill bg-light d-flex align-items-center gap-2 border border-secondary border-opacity-10 ms-auto">
              <span className="small fw-bold text-muted" style={{ fontSize: "0.75rem" }}>Macro Bias:</span>
              <span className="badge bg-success bg-opacity-10 text-success border border-success border-opacity-25 px-2 py-1">
                <i className="bi bi-bullseye me-1"></i> Bounded Bullish (72%)
              </span>
            </div>
          </div>
        </div>

        {/* Ticker Cards Complex Grid */}
        <div className="row g-4 mb-4">
          {activeSegmentData.map((asset) => (
            <div className="col-xl-4 col-md-6" key={asset.name}>
              <div 
                className={`card h-100 rounded-4 p-4 shadow-sm transition-all ${isUpdating ? 'border-warning' : ''}`}
                style={{ 
                  background: "var(--card-bg)", 
                  borderColor: "var(--border)",
                  borderTop: `4px solid ${asset.up ? 'var(--teal)' : 'var(--accent)'}`
                }}
              >
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <div>
                    <span className="badge bg-secondary bg-opacity-10 text-muted px-2 py-1 mb-1 fw-bold me-1" style={{ fontSize: "0.65rem" }}>
                      {asset.ticker}
                    </span>
                    <span className="badge bg-warning text-dark px-2 py-1 mb-1 fw-bold" style={{ fontSize: "0.6rem", letterSpacing: "0.5px" }}>
                      SIMULATED
                    </span>
                    <h4 className="fw-bold mb-0 text-truncate" style={{ color: "var(--ink)", fontSize: "1.2rem" }}>
                      {asset.name}
                    </h4>
                  </div>
                  <div className={`px-2 py-1 rounded small fw-bold ${asset.up ? 'bg-success bg-opacity-10 text-success' : 'bg-danger bg-opacity-10 text-danger'}`} style={{ fontSize: "0.85rem" }}>
                    <i className={`bi bi-arrow-${asset.up ? 'up-right' : 'down-right'} me-1`}></i>
                    {asset.change}
                  </div>
                  <div className="position-relative" style={{ zIndex: 15 }}>
                    <BookmarkButton 
                      itemType="market-ticker" 
                      title={`${asset.name} (${asset.ticker})`} 
                      slug={`/markets/${asset.ticker}`} 
                      className="btn-sm p-1"
                    />
                  </div>
                </div>

                {/* Primary Price Metric Display */}
                <div className="d-flex align-items-baseline gap-2 my-2">
                  <span className="fw-black" style={{ fontFamily: "var(--serif)", fontSize: "2.1rem", color: "var(--ink)", letterSpacing: "-0.02em" }}>
                    {formatVal(asset.value, activeTab)}
                  </span>
                  <span className={`small fw-bold ${asset.up ? 'text-success' : 'text-danger'}`} style={{ fontSize: "0.8rem" }}>
                    ({asset.netChange})
                  </span>
                  <span className="text-warning fw-bold ms-1" style={{ fontSize: "0.7rem", letterSpacing: "0.5px" }}>[SIM]</span>
                </div>

                {/* SVG Live Rendered Sparkline Trend */}
                <div className="mt-3 mb-3">
                  <div className="d-flex justify-content-between text-muted small mb-1" style={{ fontSize: "0.65rem" }}>
                    <span>Session Trend Oscillations</span>
                    <span>Live Output</span>
                  </div>
                  <div className="p-2 rounded bg-light border border-secondary border-opacity-10" style={{ height: "45px" }}>
                    <svg className="w-100 h-100 overflow-visible">
                      <polyline
                        fill="none"
                        stroke={asset.up ? "#10b981" : "#ef4444"}
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        points={asset.trend.map((val, idx) => `${(idx / (asset.trend.length - 1)) * 100},${40 - (val / 100) * 35}`).join(' ')}
                        style={{ transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)" }}
                      />
                      {/* Glow Dots at vertices */}
                      {asset.trend.map((val, idx) => (
                        <circle
                          key={idx}
                          cx={`${(idx / (asset.trend.length - 1)) * 100}`}
                          cy={`${40 - (val / 100) * 35}`}
                          r={idx === asset.trend.length - 1 ? "3.5" : "1.5"}
                          fill={asset.up ? "#059669" : "#dc2626"}
                          className={idx === asset.trend.length - 1 ? "animate-pulse" : ""}
                        />
                      ))}
                    </svg>
                  </div>
                </div>

                {/* Complex Metadata Footers */}
                <div className="mt-auto pt-3 border-top border-secondary border-opacity-10 d-flex justify-content-between text-muted small" style={{ fontSize: "0.75rem" }}>
                  <div>
                    <span className="d-block opacity-75" style={{ fontSize: "0.65rem" }}>Day Range</span>
                    <span className="fw-bold" style={{ color: "var(--ink)" }}>{asset.low} - {asset.high}</span>
                  </div>
                  <div className="text-end">
                    <span className="d-block opacity-75" style={{ fontSize: "0.65rem" }}>Volume</span>
                    <span className="fw-bold" style={{ color: "var(--ink)" }}>{asset.volume}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Supplementary Macro Briefing & Leaders Section */}
        <div className="row g-4 mb-5">
          
          {/* Section A: Central Bank Policy State */}
          <div className="col-lg-5">
            <div className="card h-100 rounded-4 p-4 shadow-sm" style={{ background: "var(--card-bg)", borderColor: "var(--border)" }}>
              <div className="d-flex align-items-center gap-2 mb-3">
                <div className="p-2 rounded bg-primary bg-opacity-10 text-primary">
                  <i className="bi bi-bank fs-5"></i>
                </div>
                <div>
                  <h5 className="fw-bold mb-0" style={{ color: "var(--ink)" }}>Central Bank Outlook</h5>
                  <small className="text-muted" style={{ fontSize: "0.75rem" }}>Jurisdiction Policy Mandates</small>
                </div>
              </div>

              <div className="p-3 rounded-3 bg-light border border-secondary border-opacity-10 mb-3">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="text-muted small fw-bold">Authority:</span>
                  <span className="badge bg-dark text-white px-2 py-1">{activeMacro.bank}</span>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="text-muted small fw-bold">Base Benchmark Rate:</span>
                  <span className="fw-bold text-primary fs-5">{activeMacro.rate}</span>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="text-muted small fw-bold">Target Core Inflation:</span>
                  <span className="fw-bold text-danger">{activeMacro.inflation}</span>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="text-muted small fw-bold">Near-Term Stance:</span>
                  <span className="badge bg-info bg-opacity-10 text-info border border-info border-opacity-25">{activeMacro.stance}</span>
                </div>
              </div>

              <div className="mt-auto alert alert-secondary p-3 mb-0 rounded-3 border-0">
                <div className="d-flex gap-2 align-items-center">
                  <i className="bi bi-calendar-event text-primary flex-shrink-0 fs-5"></i>
                  <div style={{ fontSize: "0.8rem", lineHeight: 1.3 }}>
                    <strong className="d-block text-dark">Next Policy Decision Epoch</strong>
                    Scheduled telemetry outputs await central bank forward guidance on <span className="text-primary fw-bold">{activeMacro.nextMeeting}</span>.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section B: Dynamic Active Movers Leaderboard */}
          <div className="col-lg-7">
            <div className="card h-100 rounded-4 p-4 shadow-sm" style={{ background: "var(--card-bg)", borderColor: "var(--border)" }}>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="d-flex align-items-center gap-2">
                  <div className="p-2 rounded bg-warning bg-opacity-10 text-warning">
                    <i className="bi bi-lightning-charge fs-5"></i>
                  </div>
                  <div>
                    <h5 className="fw-bold mb-0" style={{ color: "var(--ink)" }}>Session Outliers</h5>
                    <small className="text-muted" style={{ fontSize: "0.75rem" }}>Extreme Standard Deviation Crossers</small>
                  </div>
                </div>
                <span className="badge bg-light text-muted border small">Equities / Spot Mapped</span>
              </div>

              <div className="table-responsive flex-grow-1">
                <table className="table table-hover align-middle mb-0">
                  <thead className="table-light text-muted small text-uppercase" style={{ fontSize: "0.7rem", letterSpacing: "0.5px" }}>
                    <tr>
                      <th className="py-2 rounded-start">Asset Entity</th>
                      <th className="py-2">Last Price</th>
                      <th className="py-2">Volume</th>
                      <th className="py-2 text-end rounded-end">Trajectory</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activeMovers.map((mover) => (
                      <tr key={mover.symbol} style={{ borderColor: "var(--border2)" }}>
                        <td className="py-3">
                          <div className="fw-bold d-flex align-items-center gap-1" style={{ color: "var(--ink)", fontSize: "0.9rem" }}>
                            {mover.symbol}
                            <span className="badge bg-secondary-subtle text-muted fw-normal" style={{ fontSize: "0.55rem", padding: "1px 3px" }}>SIM</span>
                          </div>
                          <div className="text-muted small" style={{ fontSize: "0.75rem" }}>{mover.name}</div>
                        </td>
                        <td className="py-3 fw-bold" style={{ color: "var(--ink)", fontSize: "0.9rem" }}>
                          {mover.price} <span className="text-warning small" style={{ fontSize: "0.6rem" }}>[SIM]</span>
                        </td>
                        <td className="py-3 text-muted small" style={{ fontSize: "0.8rem" }}>
                          {mover.volume}
                        </td>
                        <td className="py-3 text-end">
                          <span className={`badge ${mover.type === 'gainer' ? 'bg-success bg-opacity-10 text-success' : 'bg-danger bg-opacity-10 text-danger'} px-2 py-1 fw-bold`} style={{ fontSize: "0.8rem" }}>
                            {mover.change}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Embedded Integrated In-Depth Articles Feed */}
      <div className="container py-4 border-top border-secondary border-opacity-10">
        <div className="text-center mb-4">
          <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-1 rounded-pill mb-2 fw-bold">
            STRATEGIC INTELLIGENCE
          </span>
          <h2 className="fw-bold" style={{ fontFamily: "var(--serif)", color: "var(--ink)" }}>
            Financial Insights & Deep Dives
          </h2>
          <p className="text-muted mx-auto" style={{ maxWidth: "600px", fontSize: "0.95rem" }}>
            Complement your quantitative global metrics with peer-reviewed institutional guides covering ultimate personal wealth strategy.
          </p>
        </div>

        <BlogGrid />
      </div>

    </div>
  );
}
