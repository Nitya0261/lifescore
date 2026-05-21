import React, { useState } from 'react';
import ToolPageLayout from '../../components/ToolPageLayout';
import { useAuth } from '../../context/AuthContext';

export default function SIPCalculator() {
  const { addXp, XP_REWARDS } = useAuth();
  const [monthly, setMonthly] = useState(500);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(10);
  const [calculated, setCalculated] = useState(false);

  const months = years * 12;
  const monthlyRate = (rate / 100) / 12;
  const futureValue = monthly * (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate));
  const totalInvested = monthly * months;
  const wealthGained = futureValue - totalInvested;

  const handleCalculate = () => {
    setCalculated(true);
    addXp(XP_REWARDS?.USE_TOOL || 25, "Used SIP Calculator!");
  };

  const articleContent = (
    <>
      <p>A Systematic Investment Plan (SIP) is a highly disciplined and powerful approach to investing in mutual funds or ETFs. Instead of trying to time the market with a large lump sum, a SIP allows you to invest a fixed amount regularly (usually monthly), directly from your bank account.</p>
      <p>This SIP Calculator helps you visualize the magic of compounding over time. By combining the principles of Rupee Cost Averaging (buying more units when the market is low and fewer when high) with compound interest, SIPs smooth out market volatility and build massive long-term wealth.</p>
      <h3 className="mt-4 mb-3" style={{ fontFamily: "var(--serif)", fontWeight: 800 }}>How the SIP Formula Works</h3>
      <p>The mathematical formula used in our calculator is based on the future value of an annuity due. When you input your monthly investment amount, expected annual return, and time horizon, the calculator computes the exponential growth of your money.</p>
      <p>For example, investing just $500 a month at a 12% average annual return for 20 years results in a staggering $499,000+ portfolio, despite only investing $120,000 out of pocket. That is the true power of compounding.</p>
    </>
  );

  const faq = [
    { question: "What is a good SIP amount to start with?", answer: "There is no minimum required, but a common rule of thumb is to invest at least 15-20% of your monthly income towards long-term wealth building." },
    { question: "Are returns from SIP guaranteed?", answer: "No, SIPs in equity mutual funds are subject to market risks. However, over a 10-15 year horizon, equity markets have historically delivered inflation-beating returns around 10-12%." },
    { question: "Can I stop or pause my SIP anytime?", answer: "Yes! Most brokerages allow you to pause, stop, or increase your SIP amounts at any time without any massive penalties." }
  ];

  return (
    <ToolPageLayout
      title="SIP Calculator | Free Systematic Investment Planner"
      description="Calculate your future wealth with our free Systematic Investment Plan (SIP) calculator. See the power of compounding in action."
      url="https://lifesscore.live/tools/sip-calculator"
      keyword="SIP Return Calculator"
      faq={faq}
      articleContent={articleContent}
    >
      <h3 style={{ fontWeight: 800, marginBottom: "1.5rem" }}>Calculate SIP Returns</h3>
      <div className="mb-4">
        <label className="form-label d-flex justify-content-between fw-bold">
          Monthly Investment <span>${monthly.toLocaleString()}</span>
        </label>
        <input type="range" className="form-range" min="50" max="10000" step="50" value={monthly} onChange={e => setMonthly(Number(e.target.value))} />
      </div>
      <div className="mb-4">
        <label className="form-label d-flex justify-content-between fw-bold">
          Expected Return Rate (p.a) <span>{rate}%</span>
        </label>
        <input type="range" className="form-range" min="1" max="30" step="0.5" value={rate} onChange={e => setRate(Number(e.target.value))} />
      </div>
      <div className="mb-4">
        <label className="form-label d-flex justify-content-between fw-bold">
          Time Period <span>{years} Years</span>
        </label>
        <input type="range" className="form-range" min="1" max="40" step="1" value={years} onChange={e => setYears(Number(e.target.value))} />
      </div>

      <button className="btn btn-dark w-100 py-3 fw-bold mb-4" onClick={handleCalculate}>Calculate Wealth</button>

      {calculated && (
        <div style={{ background: "var(--cream2)", padding: "1.5rem", borderRadius: "12px", border: "1px solid var(--border)" }}>
          <div className="row text-center">
            <div className="col-4">
              <div className="text-muted" style={{ fontSize: "0.8rem", textTransform: "uppercase", fontWeight: 700 }}>Invested</div>
              <div className="fw-bold" style={{ fontSize: "1.2rem", color: "var(--ink)" }}>${Math.round(totalInvested).toLocaleString()}</div>
            </div>
            <div className="col-4" style={{ borderLeft: "1px solid var(--border)", borderRight: "1px solid var(--border)" }}>
              <div className="text-muted" style={{ fontSize: "0.8rem", textTransform: "uppercase", fontWeight: 700 }}>Est. Returns</div>
              <div className="fw-bold text-success" style={{ fontSize: "1.2rem" }}>${Math.round(wealthGained).toLocaleString()}</div>
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
