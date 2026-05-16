import React from "react";

export const ExpertQuote = ({ quote, author, title, avatar }) => (
  <div className="expert-quote-box my-5 p-4 rounded-4 border-start border-4 border-teal" style={{ background: "var(--cream)", position: "relative" }}>
    <i className="bi bi-quote position-absolute top-0 start-0 opacity-10" style={{ fontSize: "4rem", transform: "translate(10px, -10px)" }}></i>
    <p className="fs-5 mb-3 fw-medium" style={{ fontFamily: "var(--serif)", lineHeight: 1.6, color: "var(--ink)" }}>
      "{quote}"
    </p>
    <div className="d-flex align-items-center gap-3">
      {avatar ? (
        <div className="rounded-circle overflow-hidden shadow-sm" style={{ width: "48px", height: "48px" }}>
          <img src={avatar} alt={author} className="w-100 h-100 object-fit-cover" />
        </div>
      ) : (
        <div className="rounded-circle bg-teal text-white d-flex align-items-center justify-content-center fw-bold shadow-sm" style={{ width: "48px", height: "48px" }}>
          {author.split(' ').map(n => n[0]).join('')}
        </div>
      )}
      <div>
        <div className="fw-bold small text-uppercase" style={{ letterSpacing: "0.5px", color: "var(--ink)" }}>{author}</div>
        <div className="text-muted extra-small">{title}</div>
      </div>
    </div>
  </div>
);

export const ArticleSource = ({ sources }) => (
  <div className="article-sources mt-5 pt-4 border-top">
    <h5 className="small fw-bold text-uppercase mb-3" style={{ letterSpacing: "1px", color: "var(--ink3)" }}>
      <i className="bi bi-link-45deg me-1"></i> Data & Sources
    </h5>
    <ul className="list-unstyled d-flex flex-column gap-2">
      {sources.map((source, idx) => (
        <li key={idx} className="extra-small d-flex align-items-start gap-2">
          <span className="text-teal">•</span>
          <a href={source.url} target="_blank" rel="noopener noreferrer" className="text-muted text-decoration-none hover-teal transition-all">
            {source.label} <span className="opacity-50">— {source.type} ({source.year})</span>
          </a>
        </li>
      ))}
    </ul>
  </div>
);

export const DataHighlight = ({ label, value, trend, desc }) => (
  <div className="data-highlight-card p-3 rounded-3 mb-4 text-center" style={{ background: "var(--card-bg)", border: "1px solid var(--border)" }}>
    <div className="extra-small text-uppercase fw-bold text-muted mb-1" style={{ letterSpacing: "0.5px" }}>{label}</div>
    <div className="h4 fw-black mb-0" style={{ color: "var(--ink)" }}>{value}</div>
    {trend && (
      <div className={`extra-small fw-bold ${trend > 0 ? 'text-success' : 'text-danger'} mb-2`}>
        <i className={`bi bi-graph-${trend > 0 ? 'up' : 'down'} me-1`}></i>
        {trend > 0 ? '+' : ''}{trend}% vs avg
      </div>
    )}
    <p className="extra-small text-muted mb-0 lh-sm">{desc}</p>
  </div>
);
