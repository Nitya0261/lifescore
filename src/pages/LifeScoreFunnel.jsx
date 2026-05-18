import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import NewsletterForm from '../components/NewsletterForm';

export default function LifeScoreFunnel() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({
    age: '',
    income: '',
    savings: '',
    debt: '',
    goal: 'freedom'
  });
  const [isCalculating, setIsCalculating] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const runCalculation = () => {
    setIsCalculating(true);
    setTimeout(() => {
      setIsCalculating(false);
      setShowResult(true);
    }, 2000);
  };

  const calculateScore = () => {
    // Mock calculation logic
    const i = parseInt(data.income) || 0;
    const s = parseInt(data.savings) || 0;
    const d = parseInt(data.debt) || 0;
    const base = 50;
    const incomeFactor = Math.min(25, i / 10000);
    const savingsFactor = Math.min(25, s / 5000);
    const debtPenalty = Math.min(30, d / 2000);
    return Math.round(base + incomeFactor + savingsFactor - debtPenalty);
  };

  const score = calculateScore();

  return (
    <div style={{ background: "var(--cream)", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
      <SEO title="Calculate Your LifeScore | Private Financial Health Engine" description="Find out your real financial standing in 2 minutes. Get a personalized wealth trajectory." />
      
      <div className="card border-0 shadow-lg p-4 p-md-5" style={{ maxWidth: "600px", width: "100%", borderRadius: "var(--radius-lg)", background: "var(--card-bg)" }}>
        {!showResult ? (
          <>
            <div className="text-center mb-4">
              <div className="progress mb-3" role="progressbar" aria-label="Assessment progress" aria-valuenow={(step/4)*100} aria-valuemin="0" aria-valuemax="100" style={{ height: "6px", background: "var(--cream2)" }}>
                <div className="progress-bar bg-teal" style={{ width: `${(step/4)*100}%`, transition: "width 0.3s ease" }}></div>
              </div>
              <span className="text-muted small fw-bold text-uppercase">Step {step} of 4</span>
            </div>

            {step === 1 && (
              <div className="animate__animated animate__fadeIn">
                <h1 className="ls-heading mb-3 text-center" style={{ fontSize: "clamp(1.4rem, 4vw, 1.8rem)" }}>Let's start with the basics</h1>
                <div className="mb-4">
                  <label htmlFor="age" className="form-label fw-bold">How old are you?</label>
                  <input id="age" type="number" className="form-control form-control-lg" placeholder="e.g. 30" value={data.age} onChange={e => setData({...data, age: e.target.value})} />
                </div>
                <button className="btn btn-teal w-100 py-3 fw-bold rounded-pill" onClick={handleNext} disabled={!data.age}>Continue</button>
              </div>
            )}

            {step === 2 && (
              <div className="animate__animated animate__fadeIn">
                <h1 className="ls-heading mb-3 text-center" style={{ fontSize: "clamp(1.4rem, 4vw, 1.8rem)" }}>Your Monthly Cashflow</h1>
                <div className="mb-4">
                  <label htmlFor="income" className="form-label fw-bold">Monthly Post-Tax Income ($)</label>
                  <input id="income" type="number" className="form-control form-control-lg" placeholder="e.g. 5000" value={data.income} onChange={e => setData({...data, income: e.target.value})} />
                </div>
                <div className="d-flex gap-3">
                  <button className="btn btn-outline-dark flex-grow-1 py-3 fw-bold rounded-pill" onClick={handleBack}>Back</button>
                  <button className="btn btn-teal flex-grow-1 py-3 fw-bold rounded-pill" onClick={handleNext} disabled={!data.income}>Continue</button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="animate__animated animate__fadeIn">
                <h1 className="ls-heading mb-3 text-center" style={{ fontSize: "clamp(1.4rem, 4vw, 1.8rem)" }}>Savings & Debt</h1>
                <div className="mb-3">
                  <label htmlFor="savings" className="form-label fw-bold">Total Liquid Savings ($)</label>
                  <input id="savings" type="number" className="form-control form-control-lg" placeholder="e.g. 25000" value={data.savings} onChange={e => setData({...data, savings: e.target.value})} />
                </div>
                <div className="mb-4">
                  <label htmlFor="debt" className="form-label fw-bold">Total High-Interest Debt ($)</label>
                  <input id="debt" type="number" className="form-control form-control-lg" placeholder="e.g. 5000" value={data.debt} onChange={e => setData({...data, debt: e.target.value})} />
                </div>
                <div className="d-flex gap-3">
                  <button className="btn btn-outline-dark flex-grow-1 py-3 fw-bold rounded-pill" onClick={handleBack}>Back</button>
                  <button className="btn btn-teal flex-grow-1 py-3 fw-bold rounded-pill" onClick={handleNext}>Continue</button>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="animate__animated animate__fadeIn text-center">
                <h1 className="ls-heading mb-3" style={{ fontSize: "clamp(1.4rem, 4vw, 1.8rem)" }}>One last thing...</h1>
                <p className="text-muted mb-4">What is your primary financial focus right now?</p>
                <div className="d-flex flex-column gap-2 mb-4">
                  {['Building Wealth', 'Paying Off Debt', 'Early Retirement', 'Saving for a House'].map(goal => (
                    <button 
                      key={goal}
                      className={`btn py-3 rounded-pill fw-bold ${data.goal === goal ? 'btn-teal' : 'btn-outline-dark'}`}
                      onClick={() => setData({...data, goal})}
                    >
                      {goal}
                    </button>
                  ))}
                </div>
                {isCalculating ? (
                  <div className="py-4">
                    <div className="spinner-border text-teal mb-3" role="status"></div>
                    <p className="fw-bold">Calculating your unique LifeScore...</p>
                  </div>
                ) : (
                  <div className="d-flex gap-3">
                    <button className="btn btn-outline-dark flex-grow-1 py-3 fw-bold rounded-pill" onClick={handleBack}>Back</button>
                    <button className="btn btn-teal flex-grow-1 py-3 fw-bold rounded-pill" onClick={runCalculation}>Get My Score</button>
                  </div>
                )}
              </div>
            )}
          </>
        ) : (
          <div className="animate__animated animate__fadeInUp text-center">
            <div className="mb-4">
              <h1 className="text-muted small fw-bold text-uppercase fs-6 m-0">Your Calculated LifeScore</h1>
              <div className="display-1 fw-black text-teal mt-2" style={{ fontWeight: 900 }}>{score}</div>
              <div className="badge rounded-pill bg-success px-3 py-2 mt-2">
                {score > 70 ? 'EXCELLENT' : score > 40 ? 'STABLE' : 'ACTION REQUIRED'}
              </div>
            </div>
            
            <div className="p-4 rounded-4 mb-4" style={{ background: "var(--cream2)", border: "1px solid var(--border)" }}>
              <h4 className="fw-bold mb-3">Unlock Your Full Wealth Report</h4>
              <p className="text-muted small mb-4">We've generated a 5-page PDF breakdown of your score, including 3 critical moves to boost your wealth by 2027. Enter your email to receive it instantly.</p>
              <NewsletterForm source="lifescore_funnel" />
              <p className="mt-3 x-small text-muted mb-0"><i className="bi bi-lock me-1"></i> We never share your financial data. Ever.</p>
            </div>

            <button className="btn btn-link text-dark fw-bold text-decoration-none" onClick={() => setShowResult(false)}>
              <i className="bi bi-arrow-left me-2"></i> Retake Assessment
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
