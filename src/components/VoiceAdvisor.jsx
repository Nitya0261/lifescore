import React, { useState, useRef } from "react";

export default function VoiceAdvisor() {
  const [listening, setListening] = useState(false);
  const [label, setLabel] = useState(
    'Tap to speak — "How do I save more money?"',
  );
  const waveRef = useRef(null);
  const intervalRef = useRef(null);

  const tips = [
    "Try saving $50/week — that's $2,600/year in 12 months!",
    "Your recent spending shows high dining costs. Cooking at home twice a week saves ~$150/mo.",
    "Consider moving your emergency fund to a high-yield savings account earning 4%+.",
    "You have low stress levels today! It's a great time to tackle complex financial planning.",
    "Based on your habits, automating your 401(k) contributions will dramatically increase your retirement savings."
  ];

  const toggle = () => {
    if (listening) return;
    setListening(true);
    setLabel("Listening… speak your question now");
    if (waveRef.current) waveRef.current.style.display = "flex";
    intervalRef.current = setInterval(() => {
      if (waveRef.current) {
        Array.from(waveRef.current.children).forEach((b) => {
          b.style.height = Math.random() * 20 + 5 + "px";
        });
      }
    }, 120);
    setTimeout(() => {
      clearInterval(intervalRef.current);
      setListening(false);
      if (waveRef.current) waveRef.current.style.display = "none";
      const randomTip = tips[Math.floor(Math.random() * tips.length)];
      setLabel(`🤖 "${randomTip}"`);
    }, 3500);
  };

  return (
    <div className="sidebar-widget">
      <div className="sidebar-widget-header">
        <i className="bi bi-mic-fill me-2"></i>Voice AI Advisor
      </div>
      <div className="sidebar-widget-body text-center">
        <button
          className={`voice-btn-circle ${listening ? "listening" : ""}`}
          onClick={toggle}
        >
          🎙
        </button>
        <p
          style={{
            fontSize: "0.78rem",
            color: "var(--ink3)",
            lineHeight: 1.5,
            marginBottom: "0.5rem",
          }}
        >
          {label}
        </p>
        <div
          ref={waveRef}
          style={{
            display: "none",
            justifyContent: "center",
            alignItems: "center",
            height: "32px",
            gap: "3px",
          }}
        >
          {[6, 14, 22, 10, 18, 8, 16].map((h, i) => (
            <span
              key={i}
              className="wave-bar-el"
              style={{ height: h + "px" }}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
}
