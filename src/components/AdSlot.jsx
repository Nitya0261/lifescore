import React, { useState, useEffect, useRef } from "react";

export default function AdSlot({
  type = "rectangle",
  label = "Advertisement",
}) {
  return (
    <div
      className={`ad-slot ${type === "leaderboard" ? "ad-leaderboard" : type === "banner" ? "ad-banner" : "ad-rectangle"}`}
    >
      {label}
    </div>
  );
}
