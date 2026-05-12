import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function EMICalculator() {
  const { awardUseTool, user, toggleAuthModal } = useAuth();
  const [hasAwarded, setHasAwarded] = useState(false);
  const [loan, setLoan] = useState(10000);
  const [rate, setRate] = useState(8);
  const [term, setTerm] = useState(5);
  const r = rate / 100 / 12,
    n = term * 12;
  const emi =
    r > 0
      ? (loan * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
      : loan / n;
  const total = emi * n;
  const interest = total - loan;
  const fmt = (v) => "$" + Math.round(v).toLocaleString();
  return (
    <div className="tool-card-body" style={{ background: "var(--navy-light)" }}>
      <div className="tool-field">
        <label>Loan Amount</label>
        <input
          type="number"
          value={loan}
          onChange={(e) => setLoan(+e.target.value)}
          step="500"
        />
      </div>
      <div className="tool-field">
        <label>Interest Rate (%/yr)</label>
        <input
          type="number"
          value={rate}
          onChange={(e) => setRate(+e.target.value)}
          step="0.5"
        />
      </div>
      <div className="tool-field">
        <label>Term (Years)</label>
        <input
          type="number"
          value={term}
          onChange={(e) => setTerm(+e.target.value)}
          step="1"
        />
      </div>
      <div className="tool-result-highlight">
        <div className="tool-result-big">
          {fmt(emi)}
          <span style={{ fontSize: "0.9rem", fontWeight: 400 }}>/mo</span>
        </div>
        <div className="tool-result-sub">Monthly EMI</div>
        <div className="mt-2">
          <div className="tool-result-row">
            <span className="label">Total Interest</span>
            <span className="val" style={{ color: "#ff9a9a" }}>
              {fmt(interest)}
            </span>
          </div>
          <div className="tool-result-row">
            <span className="label">Total Payment</span>
            <span className="val">{fmt(total)}</span>
          </div>
          <div className="tool-result-row">
            <span className="label">Principal</span>
            <span className="val">{fmt(loan)}</span>
          </div>
        </div>
        <button 
          className="btn btn-outline-light w-100 mt-3" 
          style={{ fontSize: "0.85rem", fontWeight: 600, borderRadius: "6px" }}
          onClick={() => {
            if (!hasAwarded && user?.role !== 'guest') {
              awardUseTool();
              setHasAwarded(true);
            } else if (user?.role === 'guest') {
              toggleAuthModal(true);
            }
          }}
        >
          {hasAwarded ? "✓ Calculation Saved" : "Save Calculation (+25 XP)"}
        </button>
      </div>
    </div>
  );
}
