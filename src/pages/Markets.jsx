import React from "react";
import BlogGrid from "../components/BlogGrid";

export default function Markets() {
  const indexes = [
    { name: "S&P 500", value: "5,420.15", change: "+1.2%", up: true },
    { name: "Dow Jones", value: "39,120.44", change: "+0.8%", up: true },
    { name: "Nasdaq", value: "16,840.12", change: "-0.3%", up: false },
    { name: "Russell 2000", value: "2,055.80", change: "+2.1%", up: true },
  ];

  return (
    <div style={{ background: "var(--cream)" }}>
      {/* Category Hero */}
      <div style={{ background: "linear-gradient(135deg, #0f1923 0%, #1a3a5c 100%)", color: "#fff", padding: "4rem 0" }}>
        <div className="container">
          <div className="section-eyebrow" style={{ color: "var(--gold)" }}>
            <i className="bi bi-graph-up-arrow me-2"></i>Stock Market
          </div>
          <h1 style={{ fontFamily: "var(--serif)", fontSize: "3rem", fontWeight: 900, marginBottom: "1rem" }}>
            Markets Overview
          </h1>
          <p style={{ fontSize: "1.1rem", opacity: 0.8, maxWidth: "600px", fontFamily: "var(--serif2)" }}>
            Stay ahead of the curve with real-time market insights, expert analysis, and actionable advice to optimize your portfolio.
          </p>
        </div>
      </div>

      {/* Ticker Cards */}
      <div className="container" style={{ marginTop: "-2rem", position: "relative", zIndex: 10 }}>
        <div className="row g-3">
          {indexes.map((idx, i) => (
            <div className="col-md-3 col-6" key={i}>
              <div style={{ background: "var(--card-bg)", padding: "1.25rem", borderRadius: "var(--radius-md)", boxShadow: "var(--shadow)", border: "1px solid var(--border)" }}>
                <div style={{ fontSize: "0.8rem", color: "var(--ink3)", fontWeight: 600, textTransform: "uppercase" }}>
                  {idx.name}
                </div>
                <div style={{ fontFamily: "var(--serif)", fontSize: "1.5rem", fontWeight: 900, color: "var(--ink)", margin: "0.3rem 0" }}>
                  {idx.value}
                </div>
                <div style={{ fontSize: "0.85rem", fontWeight: 700, color: idx.up ? "var(--teal)" : "var(--accent)" }}>
                  <i className={`bi bi-arrow-${idx.up ? 'up' : 'down'}-right me-1`}></i>
                  {idx.change}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="py-5">
        <BlogGrid />
      </div>
    </div>
  );
}
