import React from "react";
import { useAuth } from "../context/AuthContext";

export default function XPToast() {
  const { notifications } = useAuth();

  if (!notifications || notifications.length === 0) return null;

  return (
    <div style={{
      position: "fixed",
      bottom: "7rem",
      right: "2rem",
      zIndex: 2000,
      display: "flex",
      flexDirection: "column",
      gap: "0.5rem",
      pointerEvents: "none",
    }}>
      {notifications.map((n) => (
        <div
          key={n.id}
          style={{
            background: "linear-gradient(135deg, var(--teal), #0d382b)",
            color: "#fff",
            padding: "0.75rem 1.25rem",
            borderRadius: "50px",
            fontSize: "0.85rem",
            fontWeight: 700,
            boxShadow: "0 4px 16px rgba(0,0,0,0.25)",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            animation: "slideInRight 0.3s ease",
          }}
        >
          <span style={{ fontSize: "1.1rem" }}>⚡</span>
          {n.message}
        </div>
      ))}
      <style>{`
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(60px); }
          to   { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
