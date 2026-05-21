import React, { useState } from 'react';
import ToolPageLayout from '../../components/ToolPageLayout';
import { useAuth } from '../../context/AuthContext';

export default function CompoundInterest() {
  const { addXp, XP_REWARDS } = useAuth();
  const [principal, setPrincipal] = useState(10000);
  const [rate, setRate] = useState(8);
  const [years, setYears] = useState(10);
  const [calculated, setCalculated] = useState(false);

  const futureValue = principal * Math.pow(1 + (rate / 100), years);
  const totalInterest = futureValue - principal;

  const handleCalculate = () => {
    setCalculated(true);
    addXp(XP_REWARDS?.USE_TOOL || 25, "Used Compound Interest Calculator!");
  };

  const articleContent = (
    <>
      <p>Compound interest is often referred to as the eighth wonder of the world. It is the simple concept of earning interest on your initial investment, and then earning interest on that interest in subsequent years. This creates an exponential growth curve that can turn small, consistent savings into massive wealth over time.</p>
      <p>This Compound Interest Calculator helps you visualize that growth. By inputting your initial principal, expected annual return, and time horizon, you can instantly see how your money multiplies. The longer you leave your money invested, the steeper the growth curve becomes.</p>
      <h3 className="mt-4 mb-3" style={{ fontFamily: "var(--serif)", fontWeight: 800 }}>The Formula</h3>
      <p>The standard compound interest formula is A = P(1 + r/n)^(nt), where A is the future value, P is the principal amount, r is the annual interest rate, n is the number of times interest is compounded per year, and t is the time in years. Our calculator simplifies this for annual compounding, allowing you to focus on the long-term impact of your investments.</p>
    </>
  );

  const faq = [
    { question: "What is the difference between simple and compound interest?", answer: "Simple interest is calculated only on the principal amount. Compound interest is calculated on the principal amount AND the accumulated interest of previous periods." },
    { question: "How often does interest compound?", answer: "It depends on the account or investment. Savings accounts often compound monthly or daily, while bonds might compound semi-annually. Stock market investments are generally modeled with annual compounding." },
  ];

  return (
    <ToolPageLayout
      title="Compound Interest Calculator | Visualize Your Wealth"
      description="Calculate compound interest and see how your investments grow exponentially over time with our free calculator."
      url="https://lifesscore.live/tools/compound-interest"
      keyword="Compound Interest Calculator"
      faq={faq}
      articleContent={articleContent}
    >
      <h3 style={{ fontWeight: 800, marginBottom: "1.5rem" }}>Calculate Compound Growth</h3>
      <div className="mb-4">
        <label className="form-label d-flex justify-content-between fw-bold">
          Initial Principal <span>${principal.toLocaleString()}</span>
        </label>
        <input type="range" className="form-range" min="1000" max="100000" step="1000" value={principal} onChange={e => setPrincipal(Number(e.target.value))} />
      </div>
      <div className="mb-4">
        <label className="form-label d-flex justify-content-between fw-bold">
          Annual Interest Rate <span>{rate}%</span>
        </label>
        <input type="range" className="form-range" min="1" max="25" step="0.5" value={rate} onChange={e => setRate(Number(e.target.value))} />
      </div>
      <div className="mb-4">
        <label className="form-label d-flex justify-content-between fw-bold">
          Time Period <span>{years} Years</span>
        </label>
        <input type="range" className="form-range" min="1" max="50" step="1" value={years} onChange={e => setYears(Number(e.target.value))} />
      </div>

      <button className="btn btn-dark w-100 py-3 fw-bold mb-4" onClick={handleCalculate}>Calculate Growth</button>

      {calculated && (
        <div style={{ background: "var(--cream2)", padding: "1.5rem", borderRadius: "12px", border: "1px solid var(--border)" }}>
          <div className="row text-center">
            <div className="col-4">
              <div className="text-muted" style={{ fontSize: "0.8rem", textTransform: "uppercase", fontWeight: 700 }}>Principal</div>
              <div className="fw-bold" style={{ fontSize: "1.2rem", color: "var(--ink)" }}>${Math.round(principal).toLocaleString()}</div>
            </div>
            <div className="col-4" style={{ borderLeft: "1px solid var(--border)", borderRight: "1px solid var(--border)" }}>
              <div className="text-muted" style={{ fontSize: "0.8rem", textTransform: "uppercase", fontWeight: 700 }}>Interest Earned</div>
              <div className="fw-bold text-success" style={{ fontSize: "1.2rem" }}>${Math.round(totalInterest).toLocaleString()}</div>
            </div>
            <div className="col-4">
              <div className="text-muted" style={{ fontSize: "0.8rem", textTransform: "uppercase", fontWeight: 700 }}>Total Value</div>
              <div className="fw-bold text-teal" style={{ fontSize: "1.2rem" }}>${Math.round(futureValue).toLocaleString()}</div>
            </div>
          </div>
        </div>
      )}
    </ToolPageLayout>
  );
}
