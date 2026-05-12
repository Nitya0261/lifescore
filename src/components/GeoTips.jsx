import React, { useState } from "react";
import { GEO_TIPS } from "../data/mockData";

export default function GeoTips() {
  const [geo, setGeo] = useState("us");
  const geos = [
    { key: "us", flag: "🇺🇸" },
    { key: "uk", flag: "🇬🇧" },
    { key: "ca", flag: "🇨🇦" },
    { key: "in", flag: "🇮🇳" },
  ];
  return (
    <div>
      <div className="d-flex gap-2 mb-3">
        {geos.map((g) => (
          <button
            key={g.key}
            className={`geo-tab-btn ${geo === g.key ? "active" : ""}`}
            onClick={() => setGeo(g.key)}
          >
            {g.flag} {g.key.toUpperCase()}
          </button>
        ))}
      </div>
      <div>
        {GEO_TIPS[geo].map((tip, i) => (
          <div key={i} className="geo-tip-row">
            <span style={{ fontSize: "1rem", flexShrink: 0 }}>
              {tip.slice(0, 2)}
            </span>
            {tip.slice(2)}
          </div>
        ))}
      </div>
    </div>
  );
}
