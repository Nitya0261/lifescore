import React, { useState } from "react";

export default function DecisionTree() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  
  const steps = [
    {
      q: "Should I buy a car right now?",
      opts: ["Yes, I need one", "Maybe, not urgent", "Just exploring"],
    },
    {
      q: "Do you have an emergency fund (3–6 months expenses)?",
      opts: ["Yes, fully funded", "Partially funded", "Not yet"],
    },
    {
      q: "Will the EMI be under 15% of your monthly income?",
      opts: ["Yes, comfortable", "Close to 15%", "Over 15%"],
    },
  ];
  
  const handleAnswer = (optIndex) => {
    setAnswers([...answers, optIndex]);
    setStep(s => s + 1);
  };
  
  const getResult = () => {
    const isUrgent = answers[0] === 0;
    const hasEmergencyFund = answers[1] === 0;
    const hasGoodEMI = answers[2] === 0;
    
    if (isUrgent && hasEmergencyFund && hasGoodEMI) {
      return "✅ Recommended: You are in a strong financial position to buy. Go ahead, but negotiate well!";
    } else if (hasEmergencyFund && answers[2] === 1) {
      return "⚠️ Caution: You can buy, but consider a cheaper used car to keep EMI comfortable.";
    } else if (!hasEmergencyFund) {
      return "🛑 Not Recommended: Build your emergency fund first before taking on car debt.";
    } else {
      return "🤔 Think twice: Since it's not urgent and finances are tight, wait 6 months.";
    }
  };

  return (
    <div className="sidebar-widget">
      <div className="sidebar-widget-header">
        <i className="bi bi-diagram-3 me-2"></i>Decision Tree
      </div>
      <div className="sidebar-widget-body">
        <div className="tree-question-box">
          {step < steps.length ? steps[step].q : getResult()}
        </div>
        {step < steps.length ? (
          <div className="d-flex flex-wrap gap-2">
            {steps[step].opts.map((o, i) => (
              <button
                key={i}
                className="sim-tab-btn"
                onClick={() => handleAnswer(i)}
                style={{ fontSize: "0.7rem" }}
              >
                {o}
              </button>
            ))}
          </div>
        ) : (
          <div>
            {[
              { n: 1, t: `Urgency? → ${steps[0].opts[answers[0]]}` },
              { n: 2, t: `Emergency fund? → ${steps[1].opts[answers[1]]}` },
              { n: 3, t: `EMI < 15%? → ${steps[2].opts[answers[2]]}` },
            ].map((s) => (
              <div key={s.n} className="tree-step-item" style={{display: 'flex', gap: '0.5rem', marginBottom: '0.5rem', fontSize: '0.75rem'}}>
                <div className="tree-step-num" style={{width: '20px', height: '20px', background: 'var(--cream2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold'}}>{s.n}</div>
                <span style={{ color: "var(--ink3)" }}>
                  {s.t}
                </span>
              </div>
            ))}
            <button
              className="sim-tab-btn mt-2 w-100"
              onClick={() => { setStep(0); setAnswers([]); }}
              style={{ textAlign: "center" }}
            >
              ↺ Start over
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
