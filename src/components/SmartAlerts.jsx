import React, { useState, useEffect, useRef } from "react";

export default function SmartAlerts() {
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: "warn",
      icon: "⚡",
      text: "You're spending 34% more on food this week than last week. Consider meal prepping.",
      badge: "Spending Alert",
    },
    {
      id: 2,
      type: "danger",
      icon: "🔥",
      text: "Burnout risk detected — 3 late-night sessions and unusual spending spikes this week.",
      badge: "Wellness Alert",
    },
    {
      id: 3,
      type: "info",
      icon: "📈",
      text: "Your BMI trend is improving. Keep up the daily walk — it's making a difference!",
      badge: "Health Update",
    },
  ]);
  const dismiss = (id) => setAlerts((a) => a.filter((x) => x.id !== id));
  const typeClass = {
    warn: "alert-warn-style",
    danger: "alert-danger-style",
    info: "alert-info-style",
  };
  const iconBg = {
    warn: "rgba(212,160,23,0.12)",
    danger: "rgba(192,57,43,0.1)",
    info: "rgba(26,58,92,0.08)",
  };
  if (!alerts.length) return null;
  return (
    <div
      className="smart-alerts-section bg-white border-bottom py-3"
      style={{ borderColor: "var(--border)" }}
    >
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <span
            className="section-eyebrow mb-0"
            style={{ fontSize: "0.62rem" }}
          >
            <i className="bi bi-bell-fill me-1"></i>Smart Alert Engine
          </span>
          <span
            style={{
              fontSize: "0.7rem",
              color: "var(--ink3)",
              cursor: "pointer",
            }}
          >
            Manage alerts →
          </span>
        </div>
        <div className="row g-2">
          {alerts.map((a) => (
            <div className="col-md-4" key={a.id}>
              <div className={`smart-alert ${typeClass[a.type]}`}>
                <div
                  className="alert-icon-circle"
                  style={{ background: iconBg[a.type] }}
                >
                  {a.icon}
                </div>
                <span className="alert-text-body">{a.text}</span>
                <button
                  className="alert-dismiss-btn"
                  onClick={() => dismiss(a.id)}
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
