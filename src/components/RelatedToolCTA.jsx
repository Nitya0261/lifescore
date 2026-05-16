import React from 'react';
import { Link } from 'react-router-dom';

const TOOL_MAPPING = {
  "Saving Money": {
    title: "50/30/20 Budget Tracker",
    path: "/dashboard/budget",
    icon: "bi-pie-chart",
    color: "#1a7a5e",
    bg: "#ecfdf5"
  },
  "Investing": {
    title: "SIP Wealth Calculator",
    path: "/tools/sip-calculator",
    icon: "bi-calculator",
    color: "#0d9488",
    bg: "#f0fdfa"
  },
  "Retirement": {
    title: "Retirement Number Tool",
    path: "/tools/retirement-number",
    icon: "bi-umbrella",
    color: "#7c3aed",
    bg: "#f5f3ff"
  },
  "Debt": {
    title: "Debt Repayment Planner",
    path: "/tools/debt-payoff",
    icon: "bi-fire",
    color: "#dc2626",
    bg: "#fef2f2"
  }
};

const DEFAULT_TOOL = {
  title: "Net Worth Tracker",
  path: "/tools/net-worth",
  icon: "bi-wallet2",
  color: "#2563eb",
  bg: "#eff6ff"
};

export default function RelatedToolCTA({ category }) {
  const tool = TOOL_MAPPING[category] || DEFAULT_TOOL;

  return (
    <div className="p-4 my-5 rounded-4 d-flex align-items-center justify-content-between flex-wrap gap-3" style={{ background: "var(--cream2)", border: "1px solid var(--border)" }}>
      <div className="d-flex align-items-center gap-3">
        <div className="d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: "60px", height: "60px", borderRadius: "15px", background: tool.bg, color: tool.color, fontSize: "1.8rem" }}>
          <i className={`bi ${tool.icon}`} aria-hidden="true"></i>
        </div>
        <div>
          <h5 className="fw-bold mb-1" style={{ color: "var(--ink)" }}>Run your own numbers</h5>
          <p className="text-muted small mb-0">Use our {tool.title} to see how these principles apply to you.</p>
        </div>
      </div>
      <Link to={tool.path} className="btn fw-bold px-4 py-2 rounded-pill shadow-sm" style={{ background: tool.color, color: "#fff" }}>
        Launch Tool <i className="bi bi-rocket-takeoff ms-2" aria-hidden="true"></i>
      </Link>
    </div>
  );
}
