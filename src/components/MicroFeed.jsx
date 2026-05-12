import React, { useState } from "react";
import { MICRO_ACTIONS } from "../data/mockData";

export default function MicroFeed() {
  const [items, setItems] = useState(
    MICRO_ACTIONS.map((a, i) => ({ ...a, id: i })),
  );
  const toggle = (id) =>
    setItems((arr) =>
      arr.map((a) => (a.id === id ? { ...a, done: !a.done } : a)),
    );
  const done = items.filter((a) => a.done).length;
  return (
    <div className="sidebar-widget mb-0">
      <div className="sidebar-widget-header">
        <i className="bi bi-lightning-charge-fill me-2"></i>⚡ Daily
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
          >
            <div
              className="feed-dot-circle"
              style={{ background: a.color }}
            ></div>
            <span
              className="feed-item-text"
              style={{ textDecoration: a.done ? "line-through" : "" }}
            >
              {a.text}
            </span>
            <span className="feed-xp-badge">{a.xp}</span>
            <div className={`feed-check-box ${a.done ? "checked" : ""}`}>
              {a.done && (
                <i className="bi bi-check" style={{ fontSize: "0.7rem" }}></i>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
