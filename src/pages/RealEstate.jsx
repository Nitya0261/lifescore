import React from "react";
import BlogGrid from "../components/BlogGrid";
import CrossLinks from "../components/CrossLinks";
import SEO from "../components/SEO";

export default function RealEstate() {
  const stats = [
    { label: "30-Yr Fixed Mortgage", value: "6.8%", change: "-0.1%", desc: "Since last week" },
    { label: "Avg Home Price", value: "$412,000", change: "+4.5%", desc: "Year over year" },
    { label: "Active Listings", value: "1.2M", change: "+12%", desc: "Year over year" },
    { label: "Rent Index", value: "$1,980/mo", change: "-1.2%", desc: "National average" },
  ];

  return (
    <div style={{ background: "var(--cream)" }}>
      <SEO
        title="Real Estate — Housing Market & Mortgage Insights"
        description="Navigate the housing market with confidence. Track mortgage rates, compare rent vs buy, and find the best real estate strategies for 2026."
        url="https://lifescore-ten.vercel.app/real-estate"
      />
      {/* Category Hero */}
      <div style={{ background: "linear-gradient(135deg, #5a3e28, #2d1a0e)", color: "#fff", padding: "4rem 0" }}>
        <div className="container">
          <div className="section-eyebrow" style={{ color: "#e6c2a5" }}>
            <i className="bi bi-house-door-fill me-2"></i>Housing Market
          </div>
          <h1 style={{ fontFamily: "var(--serif)", fontSize: "3rem", fontWeight: 900, marginBottom: "1rem" }}>
            Real Estate
          </h1>
          <p style={{ fontSize: "1.1rem", opacity: 0.8, maxWidth: "600px", fontFamily: "var(--serif2)" }}>
            Navigate the housing market with confidence. From tracking mortgage rates to deciding whether to rent or buy in 2026.
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
                  <span style={{ fontWeight: 700, color: stat.change.startsWith("+") ? "var(--teal)" : "var(--accent)" }}>
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

      <CrossLinks currentCategory="/real-estate" />
    </div>
  );
}
