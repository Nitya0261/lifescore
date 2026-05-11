import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API_BASE_URL from "../config/api";

export default function Topbar() {
  const [time, setTime] = useState(new Date());
  const [markets, setMarkets] = useState([]);

  useEffect(() => {
    const i = setInterval(() => setTime(new Date()), 60000);
    return () => clearInterval(i);
  }, []);

  useEffect(() => {
    const fetchMarkets = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/market-data`);
        const data = await res.json();
        setMarkets(data);
      } catch (err) {
        console.error(err);
      }
    };
    
    fetchMarkets();
    // Refresh every 5 minutes on the client too
    const marketInterval = setInterval(fetchMarkets, 300000);
    return () => clearInterval(marketInterval);
  }, []);

  const fmt = (d) =>
    d.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  return (
    <div className="topbar">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
          <div className="d-flex gap-3 align-items-center">
            <span className="topbar-date d-none d-lg-inline">{fmt(time)}</span>
            <span className="d-none d-lg-inline" style={{ opacity: 0.3 }}>|</span>
            
            {/* Live Market Data */}
            <div className="d-flex gap-4 align-items-center fw-bold" style={{ fontSize: "0.85rem" }}>
              {markets.length > 0 ? markets.map((m, idx) => {
                const isPositive = m.change >= 0;
                return (
                  <div key={idx} className="d-flex align-items-center gap-1">
                    <span style={{ color: "var(--ink2)" }}>{m.name}</span>
                    <span>{m.price?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    <span style={{ color: isPositive ? "var(--teal)" : "#dc3545" }}>
                      {isPositive ? "▲" : "▼"} {Math.abs(m.changePercent || 0).toFixed(2)}%
                    </span>
                  </div>
                );
              }) : (
                <span className="text-muted" style={{ fontSize: "0.8rem" }}>Loading markets...</span>
              )}
            </div>
          </div>
          <div className="d-flex gap-3 align-items-center d-none d-md-flex">
            <a href="#">
              <i className="bi bi-twitter-x me-1"></i>Twitter
            </a>
            <a href="#">
              <i className="bi bi-instagram me-1"></i>Instagram
            </a>
            <a href="#">
              <i className="bi bi-youtube me-1"></i>YouTube
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
