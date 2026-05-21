import React from "react";
import BlogGrid from "../components/BlogGrid";
import CrossLinks from "../components/CrossLinks";
import BookmarkButton from "../components/BookmarkButton";
import SEO from "../components/SEO";

export default function Investing() {
  const stats = [
    { label: "S&P 500 YTD", value: "+12.4%", change: "Trending", desc: "Historical Avg 10%" },
    { label: "10-Yr Treasury", value: "4.21%", change: "-0.05%", desc: "Yield Rate" },
    { label: "Vanguard VOO", value: "$495.20", change: "+1.1%", desc: "Index ETF" },
    { label: "Robo-Advisors", value: "0.25%", change: "Avg Fee", desc: "Management Cost" },
  ];

  return (
    <div style={{ background: "var(--cream)" }}>
      <SEO
        title="Investing — Stocks, ETFs & Wealth Building"
        description="Learn how to grow your wealth through smart investing. Expert guides on stocks, ETFs, mutual funds, and portfolio strategies for 2026."
        url="https://lifesscore.live/investing"
      />
      {/* Category Hero */}
      <div style={{ background: "linear-gradient(135deg, #1a3a5c, #042c53)", color: "#fff", padding: "4rem 0" }}>
        <div className="container">
          <div className="section-eyebrow" style={{ color: "#e8f0f8" }}>
            <i className="bi bi-graph-up-arrow me-2"></i>Wealth Building
          </div>
          <h1 style={{ fontFamily: "var(--serif)", fontSize: "3rem", fontWeight: 900, marginBottom: "1rem" }}>
            Investing
          </h1>
          <p style={{ fontSize: "1.1rem", opacity: 0.8, maxWidth: "600px", fontFamily: "var(--serif2)" }}>
            Build long-term wealth through smart, disciplined investing. Whether you are picking index funds, ETFs, or individual stocks, learn how to beat the market securely.
          </p>
        </div>
      </div>

      {/* Ticker Cards */}
      <div className="container" style={{ marginTop: "-2rem", position: "relative", zIndex: 10 }}>
        {/* Trust disclaimer banner */}
        <div className="alert alert-warning py-2 px-3 mb-3 d-flex align-items-center gap-2" style={{ borderRadius: "var(--radius-md)", border: "none", fontSize: "0.8rem", background: "rgba(245, 158, 11, 0.15)", color: "#b45309", fontWeight: 500 }}>
          <i className="bi bi-info-circle-fill"></i>
          <span><strong>Transparency Check:</strong> All asset statistics shown below are programmatically simulated for educational and demo purposes.</span>
        </div>
        <div className="row g-3">
          {stats.map((stat, i) => (
            <div className="col-md-3 col-6" key={i}>
              <div style={{ background: "var(--card-bg)", padding: "1.25rem", borderRadius: "var(--radius-md)", boxShadow: "var(--shadow)", border: "1px solid var(--border)", height: "100%" }}>
                <div className="d-flex justify-content-between align-items-start">
                  <div style={{ fontSize: "0.8rem", color: "var(--ink3)", fontWeight: 600, textTransform: "uppercase" }}>
                    {stat.label}
                  </div>
                  <BookmarkButton 
                    itemType="investment-stat" 
                    title={stat.label} 
                    slug={`/investing/${stat.label.toLowerCase().replace(/\s+/g, '-')}`} 
                    className="btn-sm p-0"
                  />
                </div>
                <div style={{ fontFamily: "var(--serif)", fontSize: "1.5rem", fontWeight: 900, color: "var(--ink)", margin: "0.3rem 0" }}>
                  {stat.value}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.75rem" }}>
                  <span style={{ fontWeight: 700, color: "var(--navy)" }}>
                    {stat.change}
                  </span>
                  <span style={{ color: "var(--ink3)" }}>{stat.desc}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="py-5">
        <BlogGrid />
      </div>

      <CrossLinks currentCategory="/investing" />
    </div>
  );
}
