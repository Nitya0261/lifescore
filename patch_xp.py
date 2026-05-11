with open("src/components/XPWidget.jsx", "w") as f:
    f.write("""import React, { useState } from "react";

export default function XPWidget() {
  const [xp, setXp] = useState(1240);
  const levels = ["Beginner", "Saver", "Pro Saver", "Wealth Master"];
  const levelColors = ["#6b35a3", "#1a7a5e", "#b06a00", "#c0392b"];
  
  const currentLevelIndex = xp >= 2000 ? 3 : xp >= 1000 ? 2 : xp >= 500 ? 1 : 0;
  const currentLevelName = levels[currentLevelIndex];
  
  // Progress to next level
  let progress = 100;
  if (currentLevelIndex === 0) progress = (xp / 500) * 100;
  else if (currentLevelIndex === 1) progress = ((xp - 500) / 500) * 100;
  else if (currentLevelIndex === 2) progress = ((xp - 1000) / 1000) * 100;

  const handleClaim = () => setXp(prev => prev + 50);

  return (
    <div className="sidebar-widget mb-0 h-100 d-flex flex-column">
      <div className="sidebar-widget-header">
        <i className="bi bi-trophy-fill me-2"></i>Your Level
      </div>
      <div className="sidebar-widget-body flex-grow-1 d-flex flex-column">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <span
            className="level-pill"
            style={{
              background: "rgba(212,160,23,0.12)",
              color: levelColors[currentLevelIndex],
              border: `1px solid ${levelColors[currentLevelIndex]}40`,
            }}
          >
            🏆 {currentLevelName}
          </span>
          <span style={{ fontSize: "0.7rem", color: "var(--ink3)" }}>
            {xp.toLocaleString()} XP
          </span>
        </div>
        <div className="xp-progress-wrap mb-2">
          <div className="xp-progress-fill" style={{ width: `${Math.min(progress, 100)}%`, background: levelColors[currentLevelIndex], transition: "width 0.5s ease" }} />
        </div>
        <div className="d-flex justify-content-between mb-3">
          {levels.map((l, i) => (
            <span
              key={l}
              style={{
                fontSize: "0.55rem",
                color: i <= currentLevelIndex ? levelColors[i] : "var(--border2)",
                fontWeight: i === currentLevelIndex ? 700 : 400,
                textAlign: "center",
                lineHeight: 1.2,
                maxWidth: "40px",
              }}
            >
              {i <= currentLevelIndex ? "✓" : ""}
              <br/>{l.split(" ")[0]}
            </span>
          ))}
        </div>
        
        <button 
          onClick={handleClaim}
          className="mt-auto sim-tab-btn w-100 text-center"
          style={{ background: "var(--accent-light)", color: "var(--accent)", border: "1px dashed var(--accent)" }}
        >
          🎁 Claim +50 Daily XP
        </button>
      </div>
    </div>
  );
}
""")
