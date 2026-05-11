import React, { useState } from 'react';
import ToolPageLayout from '../../components/ToolPageLayout';
import { useAuth } from '../../context/AuthContext';

export default function TaxEstimator() {
  const { addXp, XP_REWARDS } = useAuth();
  const [income, setIncome] = useState(75000);
  const [status, setStatus] = useState("single");
  const [calculated, setCalculated] = useState(false);
  const [results, setResults] = useState(null);

  const handleCalculate = () => {
    // Simplified 2024 Federal Tax Brackets (Rough Estimates)
    const standardDeduction = status === "single" ? 14600 : 29200;
    const taxableIncome = Math.max(0, income - standardDeduction);
    
    let tax = 0;
    if (status === "single") {
      if (taxableIncome > 609350) tax += (taxableIncome - 609350) * 0.37 + 183647;
      else if (taxableIncome > 243725) tax += (taxableIncome - 243725) * 0.35 + 55678;
      else if (taxableIncome > 191950) tax += (taxableIncome - 191950) * 0.32 + 39106;
      else if (taxableIncome > 100525) tax += (taxableIncome - 100525) * 0.24 + 17164;
      else if (taxableIncome > 47150) tax += (taxableIncome - 47150) * 0.22 + 5422;
      else if (taxableIncome > 11600) tax += (taxableIncome - 11600) * 0.12 + 1160;
      else tax += taxableIncome * 0.10;
    } else {
      // Married Filing Jointly
      if (taxableIncome > 731200) tax += (taxableIncome - 731200) * 0.37 + 195604;
      else if (taxableIncome > 487450) tax += (taxableIncome - 487450) * 0.35 + 110291;
      else if (taxableIncome > 383900) tax += (taxableIncome - 383900) * 0.32 + 77155;
      else if (taxableIncome > 201050) tax += (taxableIncome - 201050) * 0.24 + 33271;
      else if (taxableIncome > 94300) tax += (taxableIncome - 94300) * 0.22 + 10844;
      else if (taxableIncome > 23200) tax += (taxableIncome - 23200) * 0.12 + 2320;
      else tax += taxableIncome * 0.10;
    }

    const effectiveRate = income > 0 ? ((tax / income) * 100).toFixed(1) : 0;
    const takeHome = income - tax;

    setResults({ tax, effectiveRate, takeHome });
    setCalculated(true);
    addXp(XP_REWARDS?.USE_TOOL || 25, "Estimated Income Tax!");
  };

  const articleContent = (
    <>
      <p>Understanding how much you will owe the government in taxes is crucial for accurate financial planning and budgeting. Many people assume that if they are in the "24% tax bracket", all of their income is taxed at 24%. This is a common and costly misconception.</p>
      <p>The United States uses a progressive or "marginal" tax system. This means that as you make more money, only the income that falls into the higher bracket is taxed at the higher rate. The rest of your income is still taxed at the lower rates from the previous brackets.</p>
      <h3 className="mt-4 mb-3" style={{ fontFamily: "var(--serif)", fontWeight: 800 }}>Marginal vs. Effective Tax Rate</h3>
      <p>Your <strong>Marginal Tax Rate</strong> is the tax bracket that your highest dollar of income falls into. For example, if you are single making $100,000, your marginal tax rate is 22%.</p>
      <p>Your <strong>Effective Tax Rate</strong> is the actual percentage of your total income that goes to taxes. Because of the standard deduction and the fact that your first chunk of income is taxed at 10% and 12%, your effective tax rate is almost always significantly lower than your marginal tax rate. Our calculator helps you find your true effective tax rate.</p>
    </>
  );

  const faq = [
    { question: "Does this calculator include State taxes?", answer: "No. This tool provides a simplified estimate of Federal Income Taxes based on the standard deduction. State income taxes, local taxes, and FICA (Social Security and Medicare) taxes will also reduce your total take-home pay." },
    { question: "What is the Standard Deduction?", answer: "The standard deduction is a specific dollar amount that reduces your taxable income. For 2024, it is $14,600 for single filers and $29,200 for married couples filing jointly. You do not pay federal income tax on this portion of your income." }
  ];

  return (
    <ToolPageLayout
      title="Income Tax Estimator | Calculate Your Effective Tax Rate"
      description="Estimate your Federal income tax and discover your true effective tax rate with our free Tax Calculator."
      url="https://lifescore.app/tools/tax-estimator"
      keyword="Income Tax Estimator"
      faq={faq}
      articleContent={articleContent}
    >
      <h3 style={{ fontWeight: 800, marginBottom: "1.5rem" }}>Estimate Federal Taxes</h3>
      
      <div className="mb-4">
        <label className="form-label fw-bold text-uppercase small text-muted">Filing Status</label>
        <select className="form-select form-select-lg" value={status} onChange={e => setStatus(e.target.value)}>
          <option value="single">Single</option>
          <option value="married">Married Filing Jointly</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="form-label d-flex justify-content-between fw-bold">
          Gross Annual Income <span>${income.toLocaleString()}</span>
        </label>
        <input type="range" className="form-range" min="10000" max="500000" step="5000" value={income} onChange={e => setIncome(Number(e.target.value))} />
      </div>

      <button className="btn btn-dark w-100 py-3 fw-bold mb-4" onClick={handleCalculate}>Estimate Taxes</button>

      {calculated && results && (
        <div style={{ background: "var(--cream2)", padding: "1.5rem", borderRadius: "12px", border: "1px solid var(--border)" }}>
          <div className="text-center mb-4">
            <div className="text-muted mb-1" style={{ fontSize: "0.9rem", textTransform: "uppercase", fontWeight: 700 }}>Estimated Federal Tax Owed</div>
            <div className="fw-bold text-danger" style={{ fontSize: "2.5rem", fontFamily: "var(--serif)" }}>${Math.round(results.tax).toLocaleString()}</div>
          </div>
          
          <div className="row text-center border-top pt-3">
            <div className="col-6" style={{ borderRight: "1px solid var(--border)" }}>
              <div className="text-muted" style={{ fontSize: "0.8rem", textTransform: "uppercase", fontWeight: 700 }}>Effective Tax Rate</div>
              <div className="fw-bold" style={{ fontSize: "1.2rem" }}>{results.effectiveRate}%</div>
            </div>
            <div className="col-6">
              <div className="text-muted" style={{ fontSize: "0.8rem", textTransform: "uppercase", fontWeight: 700 }}>Est. Take Home Pay</div>
              <div className="fw-bold text-success" style={{ fontSize: "1.2rem" }}>${Math.round(results.takeHome).toLocaleString()}</div>
            </div>
          </div>
        </div>
      )}
    </ToolPageLayout>
  );
}
