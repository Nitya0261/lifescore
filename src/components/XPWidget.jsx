import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function XPWidget() {
  const { user, xp: contextXp, addXp, updateUserProfile } = useAuth() || {};
  const navigate = useNavigate();
  const [claimed, setClaimed] = useState(false);

  // Use active auth context XP if available, fallback to user.xp
  const liveXp = contextXp !== undefined ? contextXp : (user?.xp || 0);

  const levels = ["Beginner", "Saver", "Pro Saver", "Wealth Master"];
  const levelColors = ["#6b35a3", "#1a7a5e", "#b06a00", "#c0392b"];
  
  const currentLevelIndex = liveXp >= 2000 ? 3 : liveXp >= 1000 ? 2 : liveXp >= 500 ? 1 : 0;
  const currentLevelName = levels[currentLevelIndex];
  
  // Progress to next level
  let progress = 100;
  if (currentLevelIndex === 0) progress = (liveXp / 500) * 100;
  else if (currentLevelIndex === 1) progress = ((liveXp - 500) / 500) * 100;
  else if (currentLevelIndex === 2) progress = ((liveXp - 1000) / 1000) * 100;

  const handleClaim = async () => {
    if (claimed) return;
    if (addXp) {
      await addXp(50, "Daily XP Bonus Claimed!");
      if (updateUserProfile) {
        await updateUserProfile({ xp: liveXp + 50 });
      }
    }
    setClaimed(true);
  };

  const isGuest = !user || user.role === "guest";

  return (
    <div className="sidebar-widget mb-0 h-100 d-flex flex-column" style={{ position: "relative", overflow: "hidden" }}>
      <div className="sidebar-widget-header">
        <i className="bi bi-trophy-fill me-2"></i>Your Level
      </div>
      
      {/* If Guest, show locked blurred visual overlay */}
      {isGuest ? (
        <div 
          className="sidebar-widget-body flex-grow-1 d-flex flex-column align-items-center justify-content-center text-center p-4"
          style={{ background: "var(--cream2)", opacity: 0.95 }}
        >
          <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem", color: "var(--border2)" }}>
            🔒
          </div>
          <h6 style={{ fontFamily: "var(--serif)", fontWeight: 700, color: "var(--ink)", marginBottom: "0.25rem" }}>
            XP System Locked
          </h6>
          <p style={{ fontSize: "0.75rem", color: "var(--ink3)", marginBottom: "1.25rem", lineHeight: 1.3 }}>
            Sign in to track your permanent level progress, complete quests, and claim free Daily XP rewards.
          </p>
          <button 
            onClick={() => navigate("/login")}
            className="btn btn-dark btn-sm w-100 fw-bold"
            style={{ borderRadius: "6px", padding: "0.4rem 0" }}
          >
            Unlock With Login
          </button>
        </div>
      ) : (
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
            <span style={{ fontSize: "0.7rem", color: "var(--ink3)", fontWeight: 600 }}>
              {liveXp.toLocaleString()} XP
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
            disabled={claimed}
            className="mt-auto sim-tab-btn w-100 text-center fw-bold"
            style={{ 
              background: claimed ? "var(--border)" : "var(--accent-light)", 
              color: claimed ? "var(--ink3)" : "var(--accent)", 
              border: claimed ? "none" : "1px dashed var(--accent)",
              cursor: claimed ? "default" : "pointer"
            }}
          >
            {claimed ? "✅ Claimed Today" : "🎁 Claim +50 Daily XP"}
          </button>
        </div>
      )}
    </div>
  );
}
