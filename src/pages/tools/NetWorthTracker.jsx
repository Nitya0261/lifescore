import React, { useState } from 'react';
import ToolPageLayout from '../../components/ToolPageLayout';
import { useAuth } from '../../context/AuthContext';

export default function NetWorthTracker() {
  const { addXp, XP_REWARDS } = useAuth();
  
  // Assets
  const [cash, setCash] = useState(5000);
  const [investments, setInvestments] = useState(25000);
  const [realEstate, setRealEstate] = useState(0);
  
  // Liabilities
  const [mortgage, setMortgage] = useState(0);
  const [studentLoans, setStudentLoans] = useState(10000);
  const [creditCardDebt, setCreditCardDebt] = useState(0);

  const [calculated, setCalculated] = useState(false);

  const totalAssets = cash + investments + realEstate;
  const totalLiabilities = mortgage + studentLoans + creditCardDebt;
  const netWorth = totalAssets - totalLiabilities;

  const handleCalculate = () => {
    setCalculated(true);
    addXp(XP_REWARDS?.USE_TOOL || 25, "Calculated Net Worth!");
  };

  const articleContent = (
    <>
      <p>Your Net Worth is the ultimate scorecard of your personal finances. It provides a crystal-clear snapshot of exactly where you stand financially at any given moment. Unlike your income, which only tells you how much money you make, your net worth tells you how much wealth you actually keep.</p>
      <p>Tracking your net worth over time is the most effective way to ensure you are moving in the right financial direction. A positive, growing net worth means you are building wealth and increasing your financial security. A negative net worth means your debts exceed your assets, which is a signal to focus aggressively on debt payoff.</p>
      <h3 className="mt-4 mb-3" style={{ fontFamily: "var(--serif)", fontWeight: 800 }}>How to Calculate Net Worth</h3>
      <p>The calculation is incredibly simple: <strong>Assets - Liabilities = Net Worth</strong>.</p>
      <p><strong>Assets</strong> include everything you own that has significant financial value. This includes cash in your checking and savings accounts, investment accounts (401k, IRA, brokerage), and the current market value of any real estate you own.</p>
      <p><strong>Liabilities</strong> are what you owe to others. This includes your mortgage balance, student loans, auto loans, credit card balances, and personal loans.</p>
    </>
  );

  const faq = [
    { question: "How often should I track my net worth?", answer: "Most financial experts recommend tracking your net worth once a month. This is frequent enough to keep you accountable, but not so frequent that you obsess over daily market fluctuations." },
    { question: "Is it normal to have a negative net worth?", answer: "Yes, especially for recent college graduates with student loans and little to no savings. The goal is simply to ensure the number is moving in a positive direction over time." },
    { question: "Should I include my car as an asset?", answer: "Cars are depreciating assets. While you can include the Kelley Blue Book value of your car, many conservative wealth builders choose to leave vehicles out of their net worth calculation entirely to avoid artificially inflating their number." }
  ];

  return (
    <ToolPageLayout
      title="Net Worth Calculator | Track Your Total Wealth"
      description="Calculate your exact net worth by adding up your assets and subtracting your liabilities. Start tracking your financial progress today."
      url="https://lifescore.app/tools/net-worth-tracker"
      keyword="Net Worth Tracker"
      faq={faq}
      articleContent={articleContent}
    >
      <h3 style={{ fontWeight: 800, marginBottom: "1.5rem" }}>Calculate Your Net Worth</h3>
      
      <h5 className="mb-3" style={{ color: "var(--teal)", fontWeight: 700 }}>Assets (What You Own)</h5>
      <div className="mb-3">
        <label className="form-label text-muted small fw-bold text-uppercase">Cash & Bank Accounts</label>
        <div className="input-group">
          <span className="input-group-text bg-light border-end-0">$</span>
          <input type="number" className="form-control border-start-0 ps-0" value={cash} onChange={e => setCash(Number(e.target.value))} />
        </div>
      </div>
      <div className="mb-3">
        <label className="form-label text-muted small fw-bold text-uppercase">Investments & Retirement</label>
        <div className="input-group">
          <span className="input-group-text bg-light border-end-0">$</span>
          <input type="number" className="form-control border-start-0 ps-0" value={investments} onChange={e => setInvestments(Number(e.target.value))} />
        </div>
      </div>
      <div className="mb-4">
        <label className="form-label text-muted small fw-bold text-uppercase">Real Estate Value</label>
        <div className="input-group">
          <span className="input-group-text bg-light border-end-0">$</span>
          <input type="number" className="form-control border-start-0 ps-0" value={realEstate} onChange={e => setRealEstate(Number(e.target.value))} />
        </div>
      </div>

      <h5 className="mb-3 mt-4" style={{ color: "#e53e3e", fontWeight: 700 }}>Liabilities (What You Owe)</h5>
      <div className="mb-3">
        <label className="form-label text-muted small fw-bold text-uppercase">Mortgage Balance</label>
        <div className="input-group">
          <span className="input-group-text bg-light border-end-0">$</span>
          <input type="number" className="form-control border-start-0 ps-0" value={mortgage} onChange={e => setMortgage(Number(e.target.value))} />
        </div>
      </div>
      <div className="mb-3">
        <label className="form-label text-muted small fw-bold text-uppercase">Student & Auto Loans</label>
        <div className="input-group">
          <span className="input-group-text bg-light border-end-0">$</span>
          <input type="number" className="form-control border-start-0 ps-0" value={studentLoans} onChange={e => setStudentLoans(Number(e.target.value))} />
        </div>
      </div>
      <div className="mb-4">
        <label className="form-label text-muted small fw-bold text-uppercase">Credit Card Debt</label>
        <div className="input-group">
          <span className="input-group-text bg-light border-end-0">$</span>
          <input type="number" className="form-control border-start-0 ps-0" value={creditCardDebt} onChange={e => setCreditCardDebt(Number(e.target.value))} />
        </div>
      </div>

      <button className="btn btn-dark w-100 py-3 fw-bold mb-4 mt-3" onClick={handleCalculate}>Calculate Net Worth</button>

      {calculated && (
        <div style={{ background: netWorth >= 0 ? "rgba(56, 178, 172, 0.1)" : "rgba(229, 62, 62, 0.1)", padding: "1.5rem", borderRadius: "12px", border: `1px solid ${netWorth >= 0 ? 'var(--teal)' : '#e53e3e'}` }}>
          <div className="row text-center">
            <div className="col-4">
              <div className="text-muted" style={{ fontSize: "0.8rem", textTransform: "uppercase", fontWeight: 700 }}>Total Assets</div>
              <div className="fw-bold" style={{ fontSize: "1.1rem" }}>${Math.round(totalAssets).toLocaleString()}</div>
            </div>
            <div className="col-4" style={{ borderLeft: "1px solid rgba(0,0,0,0.1)", borderRight: "1px solid rgba(0,0,0,0.1)" }}>
              <div className="text-muted" style={{ fontSize: "0.8rem", textTransform: "uppercase", fontWeight: 700 }}>Total Liabilities</div>
              <div className="fw-bold" style={{ fontSize: "1.1rem" }}>${Math.round(totalLiabilities).toLocaleString()}</div>
            </div>
            <div className="col-4">
              <div className="text-muted" style={{ fontSize: "0.8rem", textTransform: "uppercase", fontWeight: 700 }}>Net Worth</div>
              <div className="fw-bold" style={{ fontSize: "1.2rem", color: netWorth >= 0 ? "var(--teal)" : "#e53e3e" }}>${Math.round(netWorth).toLocaleString()}</div>
            </div>
          </div>
        </div>
      )}
    </ToolPageLayout>
  );
}
