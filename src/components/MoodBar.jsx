import React, { useState } from "react";

export default function MoodBar() {
  const [mood, setMood] = useState("happy");
  const tips = {
    stressed:
      "🧘 Take a breath — here are calming, low-risk money moves for today",
    happy: "🚀 Great energy! Perfect time to tackle a big financial goal",
    neutral:
      "📊 Steady day — a good time to review your weekly spending report",
  };
  return (
    <div className="mood-strip">
      <div className="container">
        <div className="d-flex align-items-center gap-3 flex-wrap">
          <span className="mood-label-text">
            <i className="bi bi-stars me-1"></i>Today's mood:
          </span>
          <div className="d-flex gap-2">
            {["stressed", "happy", "neutral"].map((m) => (
              <button
                key={m}
                className={`mood-pill ${mood === m ? "active" : ""}`}
                onClick={() => setMood(m)}
              >
                {m === "stressed" ? "😟" : m === "happy" ? "😄" : "😐"}{" "}
                {m.charAt(0).toUpperCase() + m.slice(1)}
              </button>
            ))}
          </div>
          <span className="mood-tip-text">{tips[mood]}</span>
        </div>
      </div>
    </div>
  );
}
