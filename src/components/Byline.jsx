import React, { useState, useEffect, useRef } from "react";

export default function Byline({ author, avatar, date, readTime }) {
  return (
    <div className="hero-byline">
      <div className="byline-avatar">{avatar}</div>
      <span>{author}</span>
      <span className="byline-sep">·</span>
      <span>{date}</span>
      <span className="byline-sep">·</span>
      <span className="read-time">
        <i className="bi bi-clock me-1"></i>
        {readTime}
      </span>
    </div>
  );
}
