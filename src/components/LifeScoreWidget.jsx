import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";
import API_BASE_URL from "../config/api";
import { useAuth } from "../context/AuthContext";

export default function LifeScoreWidget() {
  const { user, awardLifeScore, updateUserProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [sharing, setSharing] = useState(false);
  const widgetRef = useRef(null);

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

  // Convert VAPID key
  const urlBase64ToUint8Array = (base64String) => {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  };

  const subscribeUserToPush = async () => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js');
        const publicVapidKey = 'BFiAQ40xi_XWgoXd8xMUXk7c0NRrfkUjho6V6WAQ2zgCM5_Gg7fnEFJwiDTHEbhBjTsb8YoWgWb7H9OotvKXAg4';
        
        const subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
        });

        // Send subscription to backend
        await fetch(`${API_BASE_URL}/api/push/subscribe`, {
          method: 'POST',
          body: JSON.stringify(subscription),
          headers: {
            'content-type': 'application/json'
          }
        });
        console.log('Subscribed to push notifications!');
      } catch (err) {
        console.error('Failed to subscribe to push notifications', err);
      }
    }
  };

  const handleSaveScore = () => {
    setIsEditing(false);
    if (updateUserProfile) {
      updateUserProfile({ lifeScore: score });
      if (awardLifeScore) awardLifeScore();
    }
    
    // Only ask if not already denied or granted
    if (window.Notification && Notification.permission === 'default') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          subscribeUserToPush();
        }
      });
    }
  };

  const handleShare = async () => {
    if (!widgetRef.current) return;
    setSharing(true);
    
    try {
      // Create canvas from widget
      const canvas = await html2canvas(widgetRef.current, {
        scale: 2, // High resolution for social share
        backgroundColor: '#1a1f2b' // Dark background matching the theme
      });
      
      const imgData = canvas.toDataURL('image/png');
      
      // Try Native Web Share API if supported
      if (navigator.share && navigator.canShare) {
        // Convert base64 to Blob
        const fetchRes = await fetch(imgData);
        const blob = await fetchRes.blob();
        const file = new File([blob], 'my-life-score.png', { type: 'image/png' });
        
        if (navigator.canShare({ files: [file] })) {
          await navigator.share({
            title: `My LifeScore is ${score}!`,
            text: `I just calculated my LifeScore: ${score}/100. Find out yours and let's compare! 🧠💸`,
            files: [file],
            url: window.location.origin
          });
          setSharing(false);
          return;
        }
      }
      
      // Fallback: Copy URL and download image
      const link = document.createElement('a');
      link.download = `LifeScore-${score}.png`;
      link.href = imgData;
      link.click();
      
      // Copy URL
      navigator.clipboard.writeText(`${window.location.origin}?ref=share_${score}`);
      alert("Image downloaded and link copied to clipboard! Share it with your friends.");
    } catch (err) {
      console.error("Error sharing score:", err);
      alert("Something went wrong trying to share.");
    } finally {
      setSharing(false);
    }
  };

  return (
    <div className="score-widget h-100 d-flex flex-column" ref={widgetRef}>
      <div className="score-widget-header">
        <span className="score-widget-title">🧠 My Life Score</span>
        <span className="score-widget-badge">↑ +4 this week</span>
      </div>
      
      {isEditing ? (
        <div className="p-3 flex-grow-1" style={{ background: "var(--dark-surface)" }}>
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
            onClick={handleSaveScore}
          >
            Save & Update Score
          </button>
        </div>
      ) : (
        <>
          <div className="score-ring-container" style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "1.25rem 0" }}>
            <div style={{ position: "relative", width: "130px", height: "130px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="130" height="130" viewBox="0 0 130 130" style={{ position: "absolute", top: 0, left: 0 }}>
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
              <div className="score-number" style={{ position: "relative", zIndex: 1 }}>{score}</div>
            </div>
            <div className="score-subtitle" style={{ marginTop: "0.5rem" }}>Life Health Score</div>
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
            className="score-cta mx-3 mb-2"
            onClick={() => setIsEditing(true)}
          >
            <i className="bi bi-sliders me-1"></i>Recalculate Your Score
          </button>
          {!isEditing && (
            <button
              className="btn btn-outline-light mx-3 mb-3 border-secondary text-white"
              onClick={handleShare}
              disabled={sharing}
              style={{ fontSize: "0.85rem", fontWeight: 600 }}
            >
              {sharing ? (
                <span className="spinner-border spinner-border-sm me-2"></span>
              ) : (
                <i className="bi bi-share-fill me-2"></i>
              )}
              Share Score & Challenge Friends
            </button>
          )}
        </>
      )}
    </div>
  );
}
