import React, { useState } from 'react';
import ToolPageLayout from '../../components/ToolPageLayout';
import { useAuth } from '../../context/AuthContext';

export default function RetirementNumber() {
  const { addXp, XP_REWARDS } = useAuth();
  const [monthlyExpenses, setMonthlyExpenses] = useState(4000);
  const [withdrawalRate, setWithdrawalRate] = useState(4);
  const [calculated, setCalculated] = useState(false);

  const annualExpenses = monthlyExpenses * 12;
  const retirementNumber = annualExpenses / (withdrawalRate / 100);

  const handleCalculate = () => {
    setCalculated(true);
    addXp(XP_REWARDS?.USE_TOOL || 25, "Calculated Retirement Number!");
  };

  const articleContent = (
    <>
      <p>Knowing exactly how much money you need to retire is the most important step in financial planning. This is often referred to as your "FIRE Number" (Financial Independence, Retire Early). It represents the total investment portfolio required to sustain your lifestyle indefinitely without ever needing to work for an active income again.</p>
      <p>This Retirement Number Calculator uses the famous "Safe Withdrawal Rate" method (often called the 4% Rule) to determine your target. By inputting your expected monthly expenses in retirement, the calculator instantly determines the nest egg required to support that spending level.</p>
      <h3 className="mt-4 mb-3" style={{ fontFamily: "var(--serif)", fontWeight: 800 }}>The 4% Rule Explained</h3>
      <p>The 4% rule is a rule of thumb used to determine how much you can withdraw from your retirement portfolio each year without running out of money. It is based on historical stock and bond market returns. If you expect to withdraw 4% of your portfolio annually, your retirement number is simply your annual expenses multiplied by 25.</p>
      <p>For example, if you need $48,000 a year to live comfortably ($4,000/month), you would need an investment portfolio of $1,200,000 ($48,000 x 25). If you want to be more conservative and use a 3% withdrawal rate, you would multiply by 33.3 instead.</p>
    </>
  );

  const faq = [
    { question: "Does the 4% rule account for inflation?", answer: "Yes, the original Trinity Study (which established the 4% rule) assumed that you withdraw 4% of the initial portfolio value in year one, and then adjust that withdrawal amount for inflation every subsequent year." },
    { question: "Should I include Social Security in this calculation?", answer: "To be conservative, many FIRE practitioners calculate their number without assuming Social Security. However, if you are nearing traditional retirement age, you can subtract your expected annual Social Security benefits from your total annual expenses before calculating your number." },
  ];

  return (
    <ToolPageLayout
      title="Retirement Number Calculator | Find Your FIRE Number"
      description="Calculate exactly how much money you need to retire based on the 4% rule and your expected monthly expenses."
      url="https://lifesscore.live/tools/retirement-number"
      keyword="Retirement Number Calculator"
      faq={faq}
      articleContent={articleContent}
    >
      <h3 style={{ fontWeight: 800, marginBottom: "1.5rem" }}>Calculate Your FIRE Number</h3>
      <div className="mb-4">
        <label className="form-label d-flex justify-content-between fw-bold">
          Expected Monthly Expenses <span>${monthlyExpenses.toLocaleString()}</span>
        </label>
        <input type="range" className="form-range" min="1000" max="20000" step="500" value={monthlyExpenses} onChange={e => setMonthlyExpenses(Number(e.target.value))} />
      </div>
      <div className="mb-4">
        <label className="form-label d-flex justify-content-between fw-bold">
          Safe Withdrawal Rate <span>{withdrawalRate}%</span>
        </label>
        <input type="range" className="form-range" min="2" max="6" step="0.5" value={withdrawalRate} onChange={e => setWithdrawalRate(Number(e.target.value))} />
      </div>

      <button className="btn btn-dark w-100 py-3 fw-bold mb-4" onClick={handleCalculate}>Calculate Retirement Number</button>

      {calculated && (
        <div style={{ background: "var(--cream2)", padding: "1.5rem", borderRadius: "12px", border: "1px solid var(--border)" }}>
          <div className="text-center mb-3">
            <div className="text-muted mb-1" style={{ fontSize: "0.9rem", textTransform: "uppercase", fontWeight: 700 }}>Your Target Retirement Portfolio</div>
            <div className="fw-bold text-teal" style={{ fontSize: "2.5rem", fontFamily: "var(--serif)" }}>${Math.round(retirementNumber).toLocaleString()}</div>
          </div>
          <p className="text-center text-muted mb-0" style={{ fontSize: "0.9rem" }}>
            Based on annual expenses of <strong>${annualExpenses.toLocaleString()}</strong> and a <strong>{withdrawalRate}%</strong> withdrawal rate.
          </p>
        </div>
      )}
    </ToolPageLayout>
  );
}
