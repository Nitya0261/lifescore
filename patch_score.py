import re

with open("src/components/LifeScoreWidget.jsx", "r") as f:
    content = f.read()

# We need to replace the static metrics and score with state
# And replace the "Calculate Your Score" button with a toggle to show sliders
new_component = """import React, { useState } from "react";

export default function LifeScoreWidget() {
  const [isEditing, setIsEditing] = useState(false);
  const [metrics, setMetrics] = useState([
    { label: "Savings", val: 82, color: "#1a7a5e" },
    { label: "Spending", val: 71, color: "#1a3a5c" },
    { label: "Sleep", val: 75, color: "#b06a00" },
    { label: "Stress", val: 68, color: "#c0392b" },
  ]);

  // Calculate overall score (average of the 4)
  const score = Math.round(metrics.reduce((acc, m) => acc + m.val, 0) / metrics.length);
  
  const circumference = 2 * Math.PI * 52;
  const offset = circumference - (score / 100) * circumference;

  const handleSliderChange = (index, newValue) => {
    const newMetrics = [...metrics];
    newMetrics[index].val = parseInt(newValue, 10);
    setMetrics(newMetrics);
  };

  return (
    <div className="score-widget h-100 d-flex flex-column">
      <div className="score-widget-header">
        <span className="score-widget-title">🧠 My Life Score</span>
        <span className="score-widget-badge">↑ +4 this week</span>
      </div>
      
      {isEditing ? (
        <div className="p-3 flex-grow-1" style={{ background: "var(--ink)" }}>
          <h6 className="text-white mb-3" style={{ fontSize: "0.85rem" }}>Adjust Your Metrics</h6>
          {metrics.map((m, i) => (
            <div key={m.label} className="mb-3">
              <div className="d-flex justify-content-between text-white" style={{ fontSize: "0.75rem", marginBottom: "4px" }}>
                <span>{m.label}</span>
                <span style={{ color: m.color, fontWeight: "bold" }}>{m.val}%</span>
              </div>
              <input 
                type="range" 
                className="form-range" 
                min="0" max="100" 
                value={m.val} 
                onChange={(e) => handleSliderChange(i, e.target.value)}
              />
            </div>
          ))}
          <button
            className="score-cta w-100 mt-2"
            onClick={() => setIsEditing(false)}
          >
            Save & Update Score
          </button>
        </div>
      ) : (
        <>
          <div className="score-ring-container">
            <svg width="130" height="130" viewBox="0 0 130 130">
              <defs>
                <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#c0392b" />
                  <stop offset="100%" stopColor="#d4a017" />
                </linearGradient>
              </defs>
              <circle
                cx="65" cy="65" r="52"
                fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="9"
              />
              <circle
                cx="65" cy="65" r="52"
                fill="none" stroke="url(#scoreGrad)" strokeWidth="9"
                strokeDasharray={circumference} strokeDashoffset={offset}
                strokeLinecap="round" transform="rotate(-90 65 65)"
                style={{ transition: "stroke-dashoffset 0.5s ease-in-out" }}
              />
            </svg>
            <div style={{ marginTop: "-70px", paddingBottom: "1rem" }}>
              <div className="score-number">{score}</div>
              <div className="score-subtitle">Life Health Score</div>
            </div>
          </div>
          <div className="score-bars flex-grow-1">
            {metrics.map((m) => (
              <div className="score-bar-row" key={m.label}>
                <span className="score-bar-label">{m.label}</span>
                <div className="score-bar-track">
                  <div
                    className="score-bar-fill"
                    style={{ width: `${m.val}%`, background: m.color, transition: "width 0.5s ease" }}
                  />
                </div>
                <span className="score-bar-val" style={{ color: m.color }}>
                  {m.val}
                </span>
              </div>
            ))}
          </div>
          <button
            className="score-cta mx-3 mb-3"
            onClick={() => setIsEditing(true)}
          >
            <i className="bi bi-sliders me-1"></i>Recalculate Your Score →
          </button>
        </>
      )}
    </div>
  );
}
"""

with open("src/components/LifeScoreWidget.jsx", "w") as f:
    f.write(new_component)
