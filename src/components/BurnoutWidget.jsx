import React, { useState, useEffect, useRef } from "react";

export default function BurnoutWidget() {
  const [meters, setMeters] = useState([
    { label: "Spend spike", val: 72, color: "var(--accent)" },
    { label: "Late activity", val: 58, color: "var(--gold)" },
    { label: "Stress level", val: 45, color: "var(--teal)" },
  ]);
  const [detoxed, setDetoxed] = useState(false);

  const average = Math.round(meters.reduce((acc, m) => acc + m.val, 0) / meters.length);
  const riskLabel = average > 60 ? "⚠ High Risk" : average > 40 ? "⚠ Moderate Risk" : "✅ Low Risk";

  const handleDetox = () => {
    if (detoxed) return;
    setMeters(meters.map(m => ({ ...m, val: Math.max(10, m.val - 25) })));
    setDetoxed(true);
  };

  return (
    <div className="sidebar-widget mb-0 h-100">
      <div className="sidebar-widget-header">
        <i className="bi bi-heart-pulse-fill me-2"></i>Burnout Risk
      </div>
      <div className="sidebar-widget-body">
        <div className="d-flex align-items-center gap-2 mb-3">
          <span
            style={{
              fontSize: "0.72rem",
              color: average > 60 ? "var(--accent)" : average > 40 ? "var(--gold)" : "var(--teal)",
              background: average > 60 ? "var(--accent-light)" : average > 40 ? "var(--gold-light)" : "var(--teal-light)",
              padding: "0.2rem 0.6rem",
              borderRadius: "20px",
              fontWeight: 600,
              border: `1px solid ${average > 60 ? 'rgba(192,57,43,0.2)' : average > 40 ? 'rgba(212,160,23,0.2)' : 'rgba(26,122,94,0.2)'}`,
            }}
          >
            {riskLabel}
          </span>
        </div>
        {meters.map((m) => (
          <div key={m.label} className="burnout-meter-row">
            <span className="burnout-label-el">{m.label}</span>
            <div className="burnout-track">
              <div
                className="burnout-fill-el"
                style={{ width: `${m.val}%`, background: m.color }}
              />
            </div>
            <span className="burnout-val-el" style={{ color: m.color }}>
              {m.val}
            </span>
          </div>
        ))}
        <button
          onClick={handleDetox}
          disabled={detoxed}
          style={{
            fontSize: "0.68rem",
            color: detoxed ? "var(--teal)" : "var(--ink3)",
            marginTop: "0.75rem",
            padding: "0.5rem",
            background: detoxed ? "var(--teal-light)" : "var(--cream2)",
            borderRadius: "var(--radius)",
            lineHeight: 1.5,
            border: "none",
            width: "100%",
            textAlign: "left",
            cursor: detoxed ? "default" : "pointer"
          }}
        >
          {detoxed ? "✨ Detox activated. Risk levels lowered." : "💡 Click here for a digital detox to reduce burnout signals."}
        </button>
      </div>
    </div>
  );
}
