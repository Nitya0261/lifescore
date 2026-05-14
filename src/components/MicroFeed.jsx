import React, { useState, useEffect } from "react";
import { MICRO_ACTIONS } from "../data/mockData";
import { useAuth } from "../context/AuthContext";

export default function MicroFeed() {
  const { user, xp: contextXp, addXp, updateUserProfile } = useAuth() || {};
  
  // Create a unique key for today and the current user
  const todayDate = new Date().toISOString().split("T")[0];
  const storageKey = `ls_daily_actions_${todayDate}_${user?.id || 'guest'}`;

  // Initialize state from local storage or default to MICRO_ACTIONS with all done=false
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse daily actions from local storage", e);
      }
    }
    return MICRO_ACTIONS.map((a, i) => ({ ...a, id: i, done: false }));
  });

  // Save to local storage whenever items change
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(items));
  }, [items, storageKey]);

  const toggle = async (id) => {
    const item = items.find(a => a.id === id);
    if (!item) return;
    
    // Prevent unchecking a completed task
    if (item.done) return;
    
    // Mark as done
    setItems((arr) => arr.map((a) => (a.id === id ? { ...a, done: true } : a)));
    
    // Award XP if authenticated
    if (user && user.role !== "guest" && addXp) {
      const xpAmount = parseInt(item.xp.replace(/[^\d]/g, ""), 10) || 5;
      await addXp(xpAmount, `Completed: ${item.text}`);
      
      if (updateUserProfile) {
        const currentXp = contextXp !== undefined ? contextXp : (user.xp || 0);
        await updateUserProfile({ xp: currentXp + xpAmount });
      }
    }
  };

  const done = items.filter((a) => a.done).length;
  
  return (
    <div className="sidebar-widget mb-0 h-100">
      <div className="sidebar-widget-header">
        <i className="bi bi-lightning-charge-fill me-2" style={{ color: "var(--gold)" }}></i>⚡ Daily
        Micro-Actions
        <span
          style={{
            marginLeft: "auto",
            fontSize: "0.65rem",
            background: "rgba(255,255,255,0.15)",
            padding: "0.15rem 0.5rem",
            borderRadius: "10px",
          }}
        >
          {done}/{items.length} done
        </span>
      </div>
      <div className="sidebar-widget-body py-1">
        {items.map((a) => (
          <div
            key={a.id}
            className="feed-item-row px-2"
            onClick={() => toggle(a.id)}
            style={{ 
              cursor: a.done ? "default" : "pointer",
              opacity: a.done ? 0.7 : 1,
              transition: "all 0.2s ease"
            }}
          >
            <div
              className="feed-dot-circle"
              style={{ background: a.done ? "var(--border2)" : a.color }}
            ></div>
            <span
              className="feed-item-text"
              style={{ 
                textDecoration: a.done ? "line-through" : "none",
                color: a.done ? "var(--ink3)" : "var(--ink)"
              }}
            >
              {a.text}
            </span>
            <span 
              className="feed-xp-badge" 
              style={{ 
                background: a.done ? "var(--cream)" : "rgba(212,160,23,0.1)", 
                color: a.done ? "var(--ink3)" : "var(--gold)",
                border: a.done ? "1px solid var(--border)" : "1px solid rgba(212,160,23,0.3)"
              }}
            >
              {a.xp}
            </span>
            <div 
              className={`feed-check-box ${a.done ? "checked" : ""}`}
              style={{ 
                borderColor: a.done ? "var(--teal)" : "var(--border2)",
                background: a.done ? "var(--teal)" : "transparent"
              }}
            >
              {a.done && (
                <i className="bi bi-check text-white" style={{ fontSize: "0.8rem", fontWeight: "bold" }}></i>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
