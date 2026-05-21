import React from "react";
import BlogGrid from "../components/BlogGrid";
import CrossLinks from "../components/CrossLinks";
import SEO from "../components/SEO";

export default function Debt() {
  const stats = [
    { label: "Avg Credit APR", value: "24.5%", change: "Record High", desc: "US Average" },
    { label: "Student Loan", value: "5.5%", change: "Fixed", desc: "Federal Rate" },
    { label: "Auto Loan", value: "7.2%", change: "+0.2%", desc: "60-Month New" },
    { label: "Avalanche Method", value: "Fastest", change: "Recommended", desc: "Saves Most Interest" },
  ];

  return (
    <div style={{ background: "var(--cream)" }}>
      <SEO
        title="Debt Payoff — Strategies to Get Debt Free"
        description="Crush your high-interest debt with proven strategies like Snowball and Avalanche methods. Reclaim your financial freedom starting today."
        url="https://lifesscore.live/debt"
      />
      {/* Category Hero */}
      <div style={{ background: "linear-gradient(135deg, #c0392b, #4a1b0c)", color: "#fff", padding: "4rem 0" }}>
        <div className="container">
          <div className="section-eyebrow" style={{ color: "#fdf0ef" }}>
            <i className="bi bi-credit-card-fill me-2"></i>Debt Management
          </div>
          <h1 style={{ fontFamily: "var(--serif)", fontSize: "3rem", fontWeight: 900, marginBottom: "1rem" }}>
            Get Out of Debt
          </h1>
          <p style={{ fontSize: "1.1rem", opacity: 0.8, maxWidth: "600px", fontFamily: "var(--serif2)" }}>
            Crush your high-interest debt with proven strategies like the Snowball and Avalanche methods. Reclaim your financial freedom starting today.
          </p>
        </div>
      </div>

      {/* Ticker Cards */}
      <div className="container" style={{ marginTop: "-2rem", position: "relative", zIndex: 10 }}>
        <div className="row g-3">
          {stats.map((stat, i) => (
            <div className="col-md-3 col-6" key={i}>
              <div style={{ background: "var(--card-bg)", padding: "1.25rem", borderRadius: "var(--radius-md)", boxShadow: "var(--shadow)", border: "1px solid var(--border)", height: "100%" }}>
                <div style={{ fontSize: "0.8rem", color: "var(--ink3)", fontWeight: 600, textTransform: "uppercase" }}>
                  {stat.label}
                </div>
                <div style={{ fontFamily: "var(--serif)", fontSize: "1.5rem", fontWeight: 900, color: "var(--ink)", margin: "0.3rem 0" }}>
                  {stat.value}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.75rem" }}>
                  <span style={{ fontWeight: 700, color: "var(--accent)" }}>
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

      <CrossLinks currentCategory="/debt" />
    </div>
  );
}
