import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function XPWidget() {
  const { user, xp: contextXp, addXp, updateUserProfile } = useAuth() || {};
  const navigate = useNavigate();
  
  const todayDateStr = new Date().toDateString();
  const [claimed, setClaimed] = useState(() => {
    return localStorage.getItem("daily_claim_date") === todayDateStr;
  });

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
    localStorage.setItem("daily_claim_date", todayDateStr);
    setClaimed(true);
    if (addXp) {
      await addXp(50, "Daily XP Bonus Claimed!");
      if (updateUserProfile) {
        await updateUserProfile({ xp: liveXp + 50 });
      }
    }
  };

  const isGuest = !user || user.role === "guest";

  return (
    <div 
      className="sidebar-widget mb-0 d-flex flex-column" 
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
        <i className="bi bi-trophy-fill me-2" style={{ color: "var(--gold)" }}></i>Your Progress
      </div>
      
      {/* If Guest, show locked blurred visual overlay */}
      {isGuest ? (
        <div 
          className="sidebar-widget-body flex-grow-1 d-flex flex-column align-items-center justify-content-center text-center p-4"
          style={{ background: "rgba(255,255,255,0.7)", backdropFilter: "blur(4px)" }}
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
            style={{ borderRadius: "8px", padding: "0.5rem 0" }}
          >
            Unlock With Login
          </button>
        </div>
      ) : (
        <div className="sidebar-widget-body flex-grow-1 d-flex flex-column p-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <span
              className="badge rounded-pill"
              style={{
                background: `linear-gradient(135deg, ${levelColors[currentLevelIndex]}20 0%, ${levelColors[currentLevelIndex]}10 100%)`,
                color: levelColors[currentLevelIndex],
                border: `1px solid ${levelColors[currentLevelIndex]}40`,
                padding: "0.4rem 0.8rem",
                fontWeight: 700,
                fontSize: "0.75rem"
              }}
            >
              🏆 {currentLevelName}
            </span>
            <span style={{ fontSize: "0.85rem", color: "var(--ink)", fontWeight: 800 }}>
              {liveXp.toLocaleString()} <span style={{ color: "var(--ink3)", fontWeight: 600, fontSize: "0.7rem" }}>XP</span>
            </span>
          </div>

          <div className="xp-progress-wrap mb-2" style={{ background: "var(--border)", height: "8px", borderRadius: "10px", overflow: "hidden" }}>
            <div 
              className="xp-progress-fill" 
              style={{ 
                width: `${Math.min(progress, 100)}%`, 
                height: "100%",
                background: `linear-gradient(90deg, ${levelColors[currentLevelIndex]} 0%, ${levelColors[currentLevelIndex]}dd 100%)`, 
                boxShadow: `0 0 10px ${levelColors[currentLevelIndex]}80`,
                transition: "width 1s cubic-bezier(0.4, 0, 0.2, 1)" 
              }} 
            />
          </div>

          <div className="d-flex justify-content-between mb-4">
            {levels.map((l, i) => (
              <span
                key={l}
                style={{
                  fontSize: "0.6rem",
                  color: i <= currentLevelIndex ? levelColors[i] : "var(--ink3)",
                  fontWeight: i === currentLevelIndex ? 800 : 500,
                  textAlign: "center",
                  lineHeight: 1.2,
                  maxWidth: "45px",
                  opacity: i <= currentLevelIndex ? 1 : 0.6
                }}
              >
                {i <= currentLevelIndex ? <i className="bi bi-check-circle-fill d-block mb-1"></i> : <i className="bi bi-circle d-block mb-1"></i>}
                {l.split(" ")[0]}
              </span>
            ))}
          </div>
          
          <button 
            onClick={handleClaim}
            disabled={claimed}
            className="w-100 text-center fw-bold mt-2"
            style={{ 
              background: claimed ? "var(--cream2)" : "var(--ink)", 
              color: claimed ? "var(--ink3)" : "#fff", 
              border: claimed ? "1px solid var(--border)" : "none",
              cursor: claimed ? "default" : "pointer",
              padding: "0.75rem",
              borderRadius: "8px",
              fontSize: "0.85rem",
              transition: "all 0.2s ease",
              boxShadow: claimed ? "none" : "0 4px 12px rgba(0,0,0,0.15)"
            }}
          >
            {claimed ? (
              <><i className="bi bi-check2-all me-2"></i>Claimed Today</>
            ) : (
              <><i className="bi bi-stars me-2 text-warning"></i>Claim +50 Daily XP</>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
