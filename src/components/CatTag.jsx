import React from "react";

export default function CatTag({ cat, color, bg, style = {} }) {
  return (
    <span className="blog-cat-tag" style={{ color, background: bg, ...style }}>
      {cat}
    </span>
  );
}
