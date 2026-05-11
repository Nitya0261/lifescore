import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import AdSlot from "./AdSlot";

export default function CommunitySection() {
  const { toggleAuthModal } = useAuth();
  return (
    <section
      className="py-5"
      style={{
        background: "var(--cream)",
        borderTop: "3px solid var(--ink)",
      }}
    >
      <div className="container">
        <div className="row mb-4">
          <div className="col-12">
            <div className="section-divider mb-3"></div>
            <div className="section-eyebrow">
              <i className="bi bi-people-fill me-1"></i>Community & Life Roadmap
            </div>
            <h2 className="section-title-serif">
              Your Timeline, Community & Weekly Report
            </h2>
          </div>
        </div>
        <div className="row g-4">
          {/* Timeline */}
          <div className="col-lg-3 col-md-6">
            <div className="sidebar-widget h-100">
              <div className="sidebar-widget-header">
                <i className="bi bi-map me-2"></i>Visual Life Timeline
              </div>
              <div className="sidebar-widget-body">
                {[
                  {
                    year: "NOW",
                    val: "$8,200 saved",
                    note: "Current position",
                    color: "var(--teal)",
                  },
                  {
                    year: "2027",
                    val: "Emergency fund: $15K",
                    note: "Goal: 6-month buffer",
                    color: "var(--navy)",
                  },
                  {
                    year: "2029",
                    val: "Home down payment: $40K",
                    note: "Homeownership target",
                    color: "var(--gold)",
                  },
                  {
                    year: "2032",
                    val: "Investment portfolio: $120K",
                    note: "Compound growth kicks in",
                    color: "#6b35a3",
                  },
                  {
                    year: "2036",
                    val: "Financial freedom: $250K",
                    note: "FIRE milestone",
                    color: "var(--accent)",
                  },
                ].map((item, i, arr) => (
                  <div
                    key={i}
                    className="timeline-item"
                    style={{
                      paddingBottom: i === arr.length - 1 ? 0 : "1.1rem",
                    }}
                  >
                    <div className="timeline-side">
                      <div
                        className="timeline-dot"
                        style={{ background: item.color }}
                      />
                      {i < arr.length - 1 && (
                        <div className="timeline-connector" />
                      )}
                    </div>
                    <div>
                      <div className="timeline-year">{item.year}</div>
                      <div className="timeline-val">{item.val}</div>
                      <div className="timeline-note">{item.note}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Comparison */}
          <div className="col-lg-3 col-md-6">
            <div className="sidebar-widget h-100">
              <div className="sidebar-widget-header">
                <i className="bi bi-bar-chart-fill me-2"></i>Anonymous
                Comparison
              </div>
              <div className="sidebar-widget-body">
                <p
                  style={{
                    fontSize: "0.72rem",
                    color: "var(--ink3)",
                    marginBottom: "0.85rem",
                  }}
                >
                  People like you (age 25–35, similar income)
                </p>
                {[
                  {
                    icon: "💰",
                    label: "Monthly savings",
                    avg: "Avg: $430",
                    you: "You: $520",
                    pct: 70,
                    color: "var(--teal)",
                  },
                  {
                    icon: "🍔",
                    label: "Food spending",
                    avg: "Avg: 28%",
                    you: "You: 22%",
                    pct: 55,
                    color: "var(--navy)",
                  },
                  {
                    icon: "💤",
                    label: "Avg sleep",
                    avg: "Avg: 6.8h",
                    you: "You: 7.2h",
                    pct: 80,
                    color: "#6b35a3",
                  },
                  {
                    icon: "💳",
                    label: "Credit card debt",
                    avg: "Avg: $4,200",
                    you: "You: $1,800",
                    pct: 85,
                    color: "var(--teal)",
                  },
                ].map((c, i) => (
                  <div key={i} className="compare-row-item">
                    <span style={{ fontSize: "1.1rem" }}>{c.icon}</span>
                    <div style={{ flex: 1 }}>
                      <div className="compare-label-text">{c.label}</div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          fontSize: "0.72rem",
                          marginBottom: "0.3rem",
                        }}
                      >
                        <span style={{ color: "var(--ink3)" }}>{c.avg}</span>
                        <span style={{ color: c.color, fontWeight: 600 }}>
                          {c.you}
                        </span>
                      </div>
                      <div className="compare-track">
                        <div
                          className="compare-fill-bar"
                          style={{
                            width: `${c.pct}%`,
                            background: c.color,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
                <div
                  style={{
                    fontSize: "0.65rem",
                    color: "var(--ink3)",
                    padding: "0.5rem 0.7rem",
                    background: "var(--cream2)",
                    borderRadius: "var(--radius)",
                    border: "1px solid var(--border)",
                    marginTop: "0.5rem",
                  }}
                >
                  🔒 All comparisons use anonymized, aggregated data only.
                </div>
              </div>
            </div>
          </div>

          {/* Pods */}
          <div className="col-lg-3 col-md-6">
            <div className="sidebar-widget h-100">
              <div className="sidebar-widget-header">
                <i className="bi bi-people me-2"></i>Micro Communities
              </div>
              <div className="sidebar-widget-body">
                <p
                  style={{
                    fontSize: "0.72rem",
                    color: "var(--ink3)",
                    marginBottom: "0.85rem",
                  }}
                >
                  Anonymous pods of 5–10 people with similar goals
                </p>
                {/* Pod List */}
                <div className="d-flex flex-column gap-2">
                  {[
                    {
                      name: "Frugal 30s Pod",
                      members: "7 members",
                      status: "live",
                      avs: ["#c0392b", "#1a7a5e", "#1a3a5c", "#6b35a3"],
                    },
                    {
                      name: "Side Hustle Squad",
                      members: "5 members",
                      status: "new",
                      avs: ["#1a7a5e", "#b06a00", "#c0392b"],
                    },
                    {
                      name: "Health + Wealth",
                      members: "8 members",
                      status: "live",
                      avs: ["#6b35a3", "#1a3a5c", "#1a7a5e", "#b06a00"],
                    },
                    {
                      name: "FIRE Chasers",
                      members: "6 members",
                      status: "new",
                      avs: ["#b06a00", "#c0392b", "#1a7a5e"],
                    },
                  ].map((pod, i) => (
                    <div 
                      key={i} 
                      className="pod-row ls-card-hover p-2 rounded-2" 
                      style={{ cursor: 'pointer' }}
                      onClick={() => toggleAuthModal(true)}
                    >
                      <div className="pod-avatar-stack">
                        {pod.avs.map((c, j) => (
                          <div
                            key={j}
                            className="pod-av-circle"
                            style={{ background: c, color: "#fff" }}
                          >
                            {String.fromCharCode(65 + j)}
                          </div>
                        ))}
                      </div>
                      <div className="flex-grow-1">
                        <div className="pod-row-name fw-bold" style={{ fontSize: '0.85rem' }}>{pod.name}</div>
                        <div className="pod-row-meta opacity-75" style={{ fontSize: '0.7rem' }}>
                          {pod.members} · Anonymous
                        </div>
                      </div>
                      <span
                        className={`pod-status-pill ${pod.status === "live" ? "pod-live" : "pod-new"}`}
                      >
                        {pod.status === "live" ? "● LIVE" : "NEW"}
                      </span>
                    </div>
                  ))}
                </div>
                <button
                  className="sim-tab-btn w-100 mt-3"
                  style={{
                    textAlign: "center",
                    borderColor: "var(--teal)",
                    color: "var(--teal)",
                    borderRadius: '8px'
                  }}
                  onClick={() => toggleAuthModal(true)}
                >
                  <i className="bi bi-plus-circle me-1"></i>Join a Pod
                </button>
              </div>
            </div>
          </div>

          {/* Weekly Report */}
          <div className="col-lg-3 col-md-6">
            <div
              className="report-card-wrap h-100"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <div
                style={{
                  fontSize: "0.65rem",
                  color: "rgba(255,255,255,0.45)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginBottom: "0.3rem",
                }}
              >
                📄 Weekly Life Report
              </div>
              <h4
                style={{
                  fontFamily: "var(--serif)",
                  fontSize: "1.1rem",
                  fontWeight: 900,
                  marginBottom: "0.2rem",
                }}
              >
                Apr 28 – May 4, 2026
              </h4>
              <p
                style={{
                  fontSize: "0.72rem",
                  color: "rgba(255,255,255,0.5)",
                  marginBottom: "1rem",
                }}
              >
                Auto-generated summary of your week
              </p>
              <div className="row g-2 mb-3">
                {[
                  ["$520", "Total Saved"],
                  ["78", "Life Score"],
                  ["1,240", "XP Earned"],
                  ["3/5", "Goals Hit"],
                ].map(([v, l]) => (
                  <div className="col-6" key={l}>
                    <div className="report-stat-col">
                      <div
                        className="report-stat-number"
                        style={{
                          color:
                            l === "Life Score"
                              ? "#d4a017"
                              : l === "XP Earned"
                                ? "#c0392b"
                                : "#fff",
                        }}
                      >
                        {v}
                      </div>
                      <div className="report-stat-lbl">{l}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="report-insight">
                💡 You saved 21% more than last week. Sleep improved by +0.4hrs.
                One burnout signal detected — consider a digital detox this
                weekend. Dining out dropped 12%.
              </div>
              <div style={{ flex: 1 }} />
              <div className="d-flex gap-2 flex-wrap">
                <button className="btn-report btn-report-primary flex-fill">
                  <i className="bi bi-file-earmark-pdf me-1"></i>Export PDF
                </button>
                <button className="btn-report btn-report-secondary flex-fill">
                  <i className="bi bi-share me-1"></i>Share
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Ad */}
        <div className="mt-4">
          <AdSlot
            type="leaderboard"
            label="Advertisement — Google AdSense 728×90"
          />
        </div>
      </div>
    </section>
  );
}
