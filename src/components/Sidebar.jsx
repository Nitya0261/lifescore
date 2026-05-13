import React from "react";
import { Link } from "react-router-dom";
import { TRENDING } from "../data/mockData";
import AdSlot from "./AdSlot";
import EMICalculator from "./EMICalculator";
import GeoTips from "./GeoTips";

export default function Sidebar() {
  return (
    <div>
      {/* Ad */}
      <AdSlot type="rectangle" label="Advertisement — Google AdSense 300×250" />

      {/* Trending */}
      <div className="sidebar-widget mb-4">
        <div className="sidebar-widget-header">
          <i className="bi bi-graph-up-arrow me-2"></i>Most Read This Week
        </div>
        <div className="sidebar-widget-body">
          {TRENDING.map((a, i) => (
            <Link 
              to={`/article/${a.slug}`} 
              className="sidebar-article text-decoration-none d-flex gap-3 mb-3" 
              key={a.id}
            >
              <span className="sidebar-num">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <div className="sidebar-article-title fw-bold" style={{ color: "var(--ink)", fontSize: '0.9rem', lineHeight: '1.4' }}>
                  {a.title}
                </div>
                <div className="sidebar-article-meta mt-1 opacity-75" style={{ fontSize: '0.7rem' }}>
                  {a.date} · {a.time} read
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* EMI Calculator */}
      <div className="sidebar-widget mb-4">
        <div className="sidebar-widget-header">
          <i className="bi bi-calculator me-2"></i>Quick EMI Calculator
        </div>
        <div className="sidebar-widget-body p-0">
          <EMICalculator />
        </div>
      </div>

      {/* Ad */}
      <AdSlot type="rectangle" label="Advertisement — Google AdSense 300×250" />

      {/* Geo Tips */}
      <div className="sidebar-widget mb-4">
        <div className="sidebar-widget-header">
          <i className="bi bi-globe2 me-2"></i>Tips For Your Country
        </div>
        <div className="sidebar-widget-body">
          <GeoTips />
        </div>
      </div>

      {/* Topics */}
      <div className="sidebar-widget mb-4">
        <div className="sidebar-widget-header">
          <i className="bi bi-tags me-2"></i>Browse By Topic
        </div>
        <div className="sidebar-widget-body">
          <div className="d-flex flex-wrap gap-2">
            {[
              { label: "Budgeting", path: "/saving-money" },
              { label: "Investing", path: "/investing" },
              { label: "Credit Score", path: "/economy" },
              { label: "Debt", path: "/debt" },
              { label: "401(k)", path: "/retirement" },
              { label: "Roth IRA", path: "/retirement" },
              { label: "Side Hustle", path: "/side-income" },
              { label: "FIRE", path: "/retirement" },
              { label: "Real Estate", path: "/real-estate" },
              { label: "ETFs", path: "/investing" },
              { label: "Crypto", path: "/crypto" },
              { label: "Insurance", path: "/economy" },
              { label: "Tax Planning", path: "/economy" },
              { label: "Emergency Fund", path: "/saving-money" },
            ].map((t) => (
              <Link
                key={t.label}
                to={t.path}
                className="text-decoration-none"
                style={{
                  padding: "0.25rem 0.65rem",
                  background: "var(--cream2)",
                  border: "1px solid var(--border)",
                  borderRadius: "20px",
                  fontSize: "0.7rem",
                  color: "var(--ink3)",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = "var(--accent)";
                  e.target.style.color = "#fff";
                  e.target.style.borderColor = "var(--accent)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "var(--cream2)";
                  e.target.style.color = "var(--ink3)";
                  e.target.style.borderColor = "var(--border)";
                }}
              >
                {t.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
