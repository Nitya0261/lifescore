import React from "react";
import BlogGrid from "../components/BlogGrid";
import CrossLinks from "../components/CrossLinks";
import SEO from "../components/SEO";

export default function SavingMoney() {
  const stats = [
    { label: "High-Yield Avg", value: "4.85%", change: "+0.1%", desc: "National Average" },
    { label: "50/30/20 Rule", value: "20%", change: "Target", desc: "Savings Goal" },
    { label: "Avg Monthly Savings", value: "$450", change: "+12%", desc: "Per Household" },
    { label: "Emergency Fund", value: "3-6", change: "Months", desc: "Recommended Buffer" },
  ];

  return (
    <div style={{ background: "var(--cream)" }}>
      <SEO
        title="Saving Money — Guides, Tips & Strategies"
        description="Discover smart ways to cut expenses, build your emergency fund, and make your money work harder. Expert guides updated for 2026."
        url="https://lifescore-ten.vercel.app/saving-money"
      />
      {/* Category Hero */}
      <div style={{ background: "linear-gradient(135deg, #1a7a5e, #04342c)", color: "#fff", padding: "4rem 0" }}>
        <div className="container">
          <div className="section-eyebrow" style={{ color: "#e8f5f0" }}>
            <i className="bi bi-piggy-bank-fill me-2"></i>Personal Finance
          </div>
          <h1 style={{ fontFamily: "var(--serif)", fontSize: "3rem", fontWeight: 900, marginBottom: "1rem" }}>
            Saving Money
          </h1>
          <p style={{ fontSize: "1.1rem", opacity: 0.8, maxWidth: "600px", fontFamily: "var(--serif2)" }}>
            Discover smart ways to cut expenses, build your emergency fund, and make your money work harder without sacrificing the things you love.
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
                  <span style={{ fontWeight: 700, color: "var(--teal)" }}>
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

      <CrossLinks currentCategory="/saving-money" />
    </div>
  );
}
