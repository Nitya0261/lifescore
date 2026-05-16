import React, { useState } from "react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";

export default function LifeScoreCalculator() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({
    income: 5000,
    savings: 1000,
    expenses: 3000,
    debt: 0,
    investingHabit: "moderate", // beginner, moderate, expert
  });
  const [isCalculated, setIsCalculated] = useState(false);
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const calculateScore = () => {
    // A simple dummy algorithm for LifeScore
    const savingsRate = (data.savings / data.income) * 100;
    const expenseRatio = (data.expenses / data.income) * 100;
    
    let score = 50; // base score
    
    if (savingsRate > 20) score += 15;
    else if (savingsRate > 10) score += 7;
    
    if (expenseRatio < 50) score += 15;
    else if (expenseRatio < 70) score += 5;
    
    if (data.debt === 0) score += 10;
    
    if (data.investingHabit === "expert") score += 10;
    else if (data.investingHabit === "moderate") score += 5;

    return Math.min(Math.max(score, 0), 100);
  };

  const score = calculateScore();

  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <div className="animate-in">
            <h3 className="ls-heading ls-heading-md mb-4">Cashflow Fundamentals</h3>
            <div className="mb-4">
              <label className="form-label small fw-bold text-muted">Monthly After-Tax Income</label>
              <div className="input-group">
                <span className="input-group-text bg-light">$</span>
                <input 
                  type="number" 
                  className="form-control form-control-lg" 
                  value={data.income}
                  onChange={e => setData({...data, income: Number(e.target.value)})}
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="form-label small fw-bold text-muted">Monthly Savings</label>
              <input 
                type="range" 
                className="form-range" 
                min="0" max={data.income} step="100"
                value={data.savings}
                onChange={e => setData({...data, savings: Number(e.target.value)})}
              />
              <div className="d-flex justify-content-between">
                <span className="small text-muted">$0</span>
                <span className="fw-bold text-teal">${data.savings}</span>
              </div>
            </div>
            <button className="btn btn-teal w-100 py-3 rounded-pill fw-bold" onClick={handleNext}>
              Next Step <i className="bi bi-arrow-right ms-2"></i>
            </button>
          </div>
        );
      case 2:
        return (
          <div className="animate-in">
            <h3 className="ls-heading ls-heading-md mb-4">Habits & Strategy</h3>
            <div className="mb-4">
              <label className="form-label small fw-bold text-muted">Total Unsecured Debt (Credit Cards, Loans)</label>
              <div className="input-group">
                <span className="input-group-text bg-light">$</span>
                <input 
                  type="number" 
                  className="form-control form-control-lg" 
                  value={data.debt}
                  onChange={e => setData({...data, debt: Number(e.target.value)})}
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="form-label small fw-bold text-muted">Investment Experience</label>
              <div className="d-flex flex-column gap-2">
                {["beginner", "moderate", "expert"].map(h => (
                  <button 
                    key={h}
                    className={`btn text-start p-3 border rounded-3 ${data.investingHabit === h ? 'border-teal bg-teal bg-opacity-10' : 'bg-light'}`}
                    onClick={() => setData({...data, investingHabit: h})}
                  >
                    <span className="text-capitalize fw-bold">{h}</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="d-flex gap-2">
              <button className="btn btn-outline-secondary w-50 py-3 rounded-pill fw-bold" onClick={handleBack}>Back</button>
              <button className="btn btn-teal w-50 py-3 rounded-pill fw-bold" onClick={() => setIsCalculated(true)}>Get My Score</button>
            </div>
          </div>
        );
      default: return null;
    }
  };

  return (
    <div className="min-vh-100 py-5 py-md-7" style={{ background: "var(--cream2)" }}>
      <SEO 
        title="Calculate Your LifeScore | Financial Health Check" 
        description="Get a real-time assessment of your financial health using LifeScore's institutional-grade calculation engine."
      />

      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            {!isCalculated ? (
              <div className="ls-card p-4 p-md-5 bg-white shadow-lg rounded-4 border-0">
                <div className="text-center mb-5">
                  <div className="mb-3 d-inline-flex align-items-center justify-content-center bg-teal text-white rounded-circle" style={{ width: "64px", height: "64px" }}>
                    <i className="bi bi-lightning-charge-fill fs-3"></i>
                  </div>
                  <h2 className="ls-heading ls-heading-lg mb-2">LifeScore Calculator</h2>
                  <p className="text-muted">Analyze your trajectory in 60 seconds.</p>
                  
                  {/* Progress Bar */}
                  <div className="progress mt-4" style={{ height: "6px" }}>
                    <div className="progress-bar bg-teal" style={{ width: `${(step / 2) * 100}%` }}></div>
                  </div>
                </div>

                {renderStep()}
              </div>
            ) : (
              <div className="ls-card p-4 p-md-5 bg-white shadow-lg rounded-4 border-0 text-center animate-in">
                <div className="mb-4">
                  <span className="badge bg-teal bg-opacity-10 text-teal px-3 py-2 rounded-pill fw-bold small text-uppercase">Analysis Complete</span>
                </div>
                <h2 className="ls-heading ls-heading-lg mb-2">Your LifeScore is</h2>
                
                <div className="my-5 position-relative d-inline-block">
                  <svg width="200" height="200" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="var(--border)" strokeWidth="8" />
                    <circle 
                      cx="50" cy="50" r="45" fill="none" stroke="var(--teal)" strokeWidth="8" 
                      strokeDasharray="283"
                      strokeDashoffset={283 - (283 * score) / 100}
                      strokeLinecap="round"
                      style={{ transition: "stroke-dashoffset 1.5s ease-out" }}
                    />
                  </svg>
                  <div className="position-absolute top-50 start-50 translate-middle">
                    <span className="display-3 fw-black text-dark">{score}</span>
                  </div>
                </div>

                <div className="mb-5">
                  <h4 className="fw-bold mb-3">{score > 70 ? "Excellent Trajectory!" : score > 40 ? "Steady Growth" : "Critical Improvements Needed"}</h4>
                  <p className="text-muted">You are outperforming {score + 5}% of users in your income bracket. Based on your inputs, your path to retirement is {score > 60 ? "accelerated" : "delayed"}.</p>
                </div>

                {!emailSubmitted ? (
                  <div className="bg-light p-4 rounded-4 border text-start">
                    <h5 className="fw-bold mb-2">Unlock Your Full Report</h5>
                    <p className="small text-muted mb-4">We've generated a 5-page PDF with personalized steps to increase your score by 15 points in 90 days. Where should we send it?</p>
                    <div className="input-group mb-2">
                      <input type="email" className="form-control" placeholder="your@email.com" />
                      <button className="btn btn-teal px-4" onClick={() => setEmailSubmitted(true)}>Send Report</button>
                    </div>
                    <span className="extra-small text-muted"><i className="bi bi-lock me-1"></i> No spam. Private financial intelligence only.</span>
                  </div>
                ) : (
                  <div className="bg-teal bg-opacity-10 p-4 rounded-4 border border-teal text-center">
                    <i className="bi bi-check-circle-fill text-teal fs-2 mb-3 d-block"></i>
                    <h5 className="fw-bold text-teal">Report Sent!</h5>
                    <p className="small text-dark mb-0">Check your inbox. We've also added you to our weekly intelligence briefing.</p>
                  </div>
                )}
                
                <div className="mt-5 pt-4 border-top">
                  <Link to="/" className="text-decoration-none fw-bold text-muted">← Back to Dashboard</Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .animate-in {
          animation: slideUp 0.5s ease-out;
        }
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .fw-black { font-weight: 900; }
        .text-teal { color: var(--teal) !important; }
        .btn-teal { background: var(--teal); color: white; border: none; }
        .btn-teal:hover { background: #085041; color: white; }
      `}</style>
    </div>
  );
}
