import React, { useState } from "react";

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
    <div 
      className="sidebar-widget mb-0 d-flex flex-column h-100"
      style={{ 
        position: "relative", 
        overflow: "hidden", 
        background: "var(--card-bg)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-md)",
        boxShadow: "var(--shadow)"
      }}
    >
      <div 
        style={{ 
          borderBottom: "1px dashed var(--border)", 
          padding: "1rem 1.25rem 0.5rem",
          background: "transparent",
          fontFamily: "var(--serif)",
          fontWeight: 800,
          fontSize: "1rem",
          color: "var(--ink)",
          display: "flex",
          alignItems: "center"
        }}
      >
        <i className="bi bi-heart-pulse-fill me-2" style={{ color: "var(--accent)" }}></i>Burnout Risk
      </div>
      <div className="sidebar-widget-body flex-grow-1 d-flex flex-column p-4 pt-3">
        <div className="d-flex align-items-center gap-2 mb-3">
          <span
            className="badge rounded-pill"
            style={{
              fontSize: "0.75rem",
              color: average > 60 ? "var(--accent)" : average > 40 ? "var(--gold)" : "var(--teal)",
              background: average > 60 ? "rgba(192,57,43,0.1)" : average > 40 ? "rgba(212,160,23,0.1)" : "rgba(26,122,94,0.1)",
              padding: "0.4rem 0.8rem",
              fontWeight: 700,
              border: `1px solid ${average > 60 ? 'rgba(192,57,43,0.3)' : average > 40 ? 'rgba(212,160,23,0.3)' : 'rgba(26,122,94,0.3)'}`,
            }}
          >
            {riskLabel}
          </span>
        </div>
        
        <div className="d-flex flex-column gap-3 mb-4">
          {meters.map((m) => (
            <div key={m.label} className="d-flex flex-column gap-1">
              <div className="d-flex justify-content-between align-items-center">
                <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--ink)" }}>{m.label}</span>
                <span style={{ fontSize: "0.78rem", fontWeight: 800, color: m.color }}>{m.val}%</span>
              </div>
              <div style={{ background: "var(--border)", height: "6px", borderRadius: "10px", overflow: "hidden" }}>
                <div
                  style={{ 
                    width: `${m.val}%`, 
                    height: "100%",
                    background: `linear-gradient(90deg, ${m.color} 0%, ${m.color}dd 100%)`,
                    transition: "width 1s cubic-bezier(0.4, 0, 0.2, 1)",
                    boxShadow: `0 0 8px ${m.color}80`
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={handleDetox}
          disabled={detoxed}
          className="w-100 text-center fw-bold mt-auto"
          style={{
            background: detoxed ? "var(--teal-light)" : "var(--cream2)",
            color: detoxed ? "var(--teal)" : "var(--ink)",
            border: detoxed ? "1px solid var(--teal)" : "1px solid var(--border)",
            cursor: detoxed ? "default" : "pointer",
            padding: "0.75rem",
            borderRadius: "8px",
            fontSize: "0.82rem",
            transition: "all 0.2s ease",
            boxShadow: detoxed ? "none" : "0 2px 8px rgba(0,0,0,0.05)"
          }}
        >
          {detoxed ? (
            <><i className="bi bi-stars me-2"></i>Detox Active</>
          ) : (
            <><i className="bi bi-cup-hot me-2 text-accent"></i>Start Digital Detox</>
          )}
        </button>
      </div>
    </div>
  );
}
