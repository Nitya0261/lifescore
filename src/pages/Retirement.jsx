import React from "react";
import BlogGrid from "../components/BlogGrid";
import CrossLinks from "../components/CrossLinks";
import SEO from "../components/SEO";

export default function Retirement() {
  const stats = [
    { label: "401(k) Max", value: "$23,500", change: "2026 Limit", desc: "Before Catch-Up" },
    { label: "Roth IRA", value: "$7,000", change: "Annual", desc: "Max Contribution" },
    { label: "FIRE Number", value: "25x", change: "Annual Rule", desc: "Expenses to Retire" },
    { label: "Avg Retirement", value: "65 yrs", change: "Age", desc: "In the US" },
  ];

  return (
    <div style={{ background: "var(--cream)" }}>
      <SEO
        title="Retirement & FIRE — Planning Your Financial Freedom"
        description="Plan your exit strategy with 401(k), IRA, and FIRE guides. From contribution limits to early retirement calculators, updated for 2026."
        url="https://lifescore-ten.vercel.app/retirement"
      />
      {/* Category Hero */}
      <div style={{ background: "linear-gradient(135deg, #1a3a5c, #d4a017)", color: "#fff", padding: "4rem 0" }}>
        <div className="container">
          <div className="section-eyebrow" style={{ color: "#fdf6e3" }}>
            <i className="bi bi-sunset-fill me-2"></i>Retirement Planning
          </div>
          <h1 style={{ fontFamily: "var(--serif)", fontSize: "3rem", fontWeight: 900, marginBottom: "1rem" }}>
            Retirement & FIRE
          </h1>
          <p style={{ fontSize: "1.1rem", opacity: 0.8, maxWidth: "600px", fontFamily: "var(--serif2)" }}>
            Plan your exit strategy. From traditional 401(k)s and IRAs to Financial Independence, Retire Early (FIRE) strategies.
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
                  <span style={{ fontWeight: 700, color: "var(--gold)" }}>
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

      <CrossLinks currentCategory="/retirement" />
    </div>
  );
}
