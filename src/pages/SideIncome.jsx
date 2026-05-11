import React from "react";
import BlogGrid from "../components/BlogGrid";
import CrossLinks from "../components/CrossLinks";

export default function SideIncome() {
  const stats = [
    { label: "Freelancing", value: "$30-$80", change: "/ hr", desc: "Avg Freelance Pay" },
    { label: "Gig Economy", value: "36%", change: "Workers", desc: "US Workforce" },
    { label: "Passive Income", value: "$500+", change: "Monthly", desc: "Typical Goal" },
    { label: "E-Commerce", value: "$1T+", change: "Market", desc: "Online Sales" },
  ];

  return (
    <div style={{ background: "var(--cream)" }}>
      {/* Category Hero */}
      <div style={{ background: "linear-gradient(135deg, #6b35a3, #3d1a6e)", color: "#fff", padding: "4rem 0" }}>
        <div className="container">
          <div className="section-eyebrow" style={{ color: "#f3ecfb" }}>
            <i className="bi bi-briefcase-fill me-2"></i>Side Hustles
          </div>
          <h1 style={{ fontFamily: "var(--serif)", fontSize: "3rem", fontWeight: 900, marginBottom: "1rem" }}>
            Side Income
          </h1>
          <p style={{ fontSize: "1.1rem", opacity: 0.8, maxWidth: "600px", fontFamily: "var(--serif2)" }}>
            Discover legitimate ways to increase your cash flow. From freelancing and consulting to building passive income streams that run while you sleep.
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
                  <span style={{ fontWeight: 700, color: "#6b35a3" }}>
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

      <CrossLinks currentCategory="/side-income" />
    </div>
  );
}
