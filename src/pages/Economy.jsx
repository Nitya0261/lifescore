import React from "react";
import BlogGrid from "../components/BlogGrid";
import BookmarkButton from "../components/BookmarkButton";

export default function Economy() {
  const indicators = [
    { name: "Inflation Rate", value: "2.3%", desc: "Lowest in 4 years", good: true },
    { name: "Unemployment", value: "3.8%", desc: "Stable from last month", good: true },
    { name: "GDP Growth", value: "2.1%", desc: "Q1 2026 annualized", good: true },
    { name: "Interest Rate", value: "5.25%", desc: "Unchanged", good: false },
  ];

  return (
    <div style={{ background: "var(--cream)" }}>
      {/* Category Hero */}
      <div style={{ background: "var(--navy)", color: "#fff", padding: "4rem 0" }}>
        <div className="container">
          <div className="section-eyebrow" style={{ color: "var(--teal-light)" }}>
            <i className="bi bi-globe-americas me-2"></i>Global Economy
          </div>
          <h1 style={{ fontFamily: "var(--serif)", fontSize: "3rem", fontWeight: 900, marginBottom: "1rem" }}>
            Economic Pulse
          </h1>
          <p style={{ fontSize: "1.1rem", opacity: 0.8, maxWidth: "600px", fontFamily: "var(--serif2)" }}>
            Understand the macro trends shaping your wallet. From inflation to Fed decisions, here's what it means for everyday people.
          </p>
        </div>
      </div>

      {/* Ticker Cards */}
      <div className="container" style={{ marginTop: "-2rem", position: "relative", zIndex: 10 }}>
        <div className="row g-3">
          {indicators.map((ind, i) => (
            <div className="col-md-3 col-6" key={i}>
              <div style={{ background: "var(--card-bg)", padding: "1.25rem", borderRadius: "var(--radius-md)", boxShadow: "var(--shadow)", border: "1px solid var(--border)", height: "100%" }}>
                <div className="d-flex justify-content-between align-items-start">
                  <div style={{ fontSize: "0.8rem", color: "var(--ink3)", fontWeight: 600, textTransform: "uppercase" }}>
                    {ind.name}
                  </div>
                  <BookmarkButton 
                    itemType="economic-indicator" 
                    title={ind.name} 
                    slug={`/economy/${ind.name.toLowerCase().replace(/\s+/g, '-')}`} 
                    className="btn-sm p-0"
                  />
                </div>
                <div style={{ fontFamily: "var(--serif)", fontSize: "1.5rem", fontWeight: 900, color: "var(--ink)", margin: "0.3rem 0" }}>
                  {ind.value}
                </div>
                <div style={{ fontSize: "0.75rem", color: ind.good ? "var(--teal)" : "var(--ink3)" }}>
                  {ind.desc}
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
