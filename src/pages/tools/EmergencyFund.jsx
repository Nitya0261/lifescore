import React, { useState } from 'react';
import ToolPageLayout from '../../components/ToolPageLayout';
import { useAuth } from '../../context/AuthContext';

export default function EmergencyFund() {
  const { addXp, XP_REWARDS } = useAuth();
  const [monthlyExpenses, setMonthlyExpenses] = useState(3000);
  const [monthsOfCoverage, setMonthsOfCoverage] = useState(6);
  const [singleIncome, setSingleIncome] = useState(false);
  const [dependents, setDependents] = useState(false);
  const [healthRisks, setHealthRisks] = useState(false);
  const [careerVolatility, setCareerVolatility] = useState(false);
  const [petOwner, setPetOwner] = useState(false);
  const [calculated, setCalculated] = useState(false);

  // Math logic
  const baseFund = monthlyExpenses * monthsOfCoverage;
  
  // Buffers:
  let buffer = 0;
  if (singleIncome) buffer += monthlyExpenses * 1.5; // 1.5 months extra
  if (dependents) buffer += monthlyExpenses * 1.0;   // 1 month extra
  if (healthRisks) buffer += 1500;                  // Fixed medical buffer
  if (careerVolatility) buffer += monthlyExpenses * 2.0; // 2 months extra
  if (petOwner) buffer += 750;                      // Pet care buffer

  const totalEmergencyFund = baseFund + buffer;

  const handleCalculate = () => {
    setCalculated(true);
    addXp(XP_REWARDS?.USE_TOOL || 25, "Used Emergency Fund Calculator!");
  };

  const articleContent = (
    <>
      <p>An emergency fund is the bedrock of personal financial security. Before you invest in stocks, buy real estate, or pay off low-interest debt, you must build a buffer that protects you from life's unexpected setbacks. Without an emergency fund, a sudden job loss, car repair, or medical bill can force you into high-interest credit card debt, erasing years of financial progress.</p>
      
      <h3 className="mt-4 mb-3" style={{ fontFamily: "var(--serif)", fontWeight: 800 }}>How Much is Enough?</h3>
      <p>The traditional rule of thumb is to save <strong>3 to 6 months</strong> of living expenses. However, this is not a one-size-fits-all solution. Your ideal coverage depends heavily on your household volatility and liabilities:</p>
      <ul>
        <li><strong>3 Months:</strong> Best for dual-income households with highly stable jobs, no dependents, and no health conditions.</li>
        <li><strong>6 Months:</strong> The sweet spot for single-income households, freelancers, or anyone with minor dependents or pets.</li>
        <li><strong>9 to 12 Months:</strong> Recommended for business owners, commission-based professionals, individuals in highly cyclical industries, or those managing chronic health conditions.</li>
      </ul>

      <h3 className="mt-4 mb-3" style={{ fontFamily: "var(--serif)", fontWeight: 800 }}>Where to Keep Your Emergency Fund</h3>
      <p>Your emergency fund must prioritize <strong>liquidity and capital preservation</strong> over high returns. Do not invest these funds in the stock market or volatile assets. Instead, split your emergency fund into three main tiers:</p>
      <ol>
        <li><strong>Immediate Cash (5-10%):</strong> Keep a small amount in cash or in a standard checking account for instant weekend/holiday access.</li>
        <li><strong>High-Yield Savings Account (70-80%):</strong> The ideal home for the majority of your fund. High-Yield Savings Accounts (HYSAs) offer competitive yields (often 4-5% APY) while maintaining daily liquidity.</li>
        <li><strong>Short-Term Treasuries or CDs (10-20%):</strong> For advanced savers, short-term Treasury Bills or penalty-free Certificates of Deposit can squeeze out slightly higher yields while remaining extremely safe.</li>
      </ol>
    </>
  );

  const faq = [
    { question: "Should I pay off debt or build an emergency fund first?", answer: "We recommend building a starter emergency fund of $1,000 to $1,500 first. This prevents you from falling deeper into debt when small emergencies strike. Once the starter fund is ready, aggressively tackle high-interest debt (above 8%), then return to complete your full 3-6 month fund." },
    { question: "What actually counts as a financial emergency?", answer: "A true emergency is unexpected, necessary, and urgent. Valid examples include sudden job loss, non-elective medical procedures, emergency car repairs needed for work, or critical home repairs (like a broken furnace in winter). Vacation opportunities, electronics upgrades, and holiday gifts are NOT emergencies." },
    { question: "Can I invest my emergency fund in index funds?", answer: "No. Stock markets can decline by 30-50% in a recession—which is precisely when job losses peak. Selling stocks at a loss to cover an emergency locks in permanent losses and destroys your long-term compounding growth." }
  ];

  return (
    <ToolPageLayout
      title="Emergency Fund Calculator | Protect Your Wealth"
      description="Determine your exact financial safety net. Calculate living expenses, assess lifestyle risks, and structure your high-yield cash cushions."
      url="https://lifesscore.live/tools/emergency-fund"
      keyword="Emergency Fund Calculator"
      faq={faq}
      articleContent={articleContent}
      category="Emergency Fund"
    >
      <h3 style={{ fontWeight: 800, marginBottom: "1.5rem" }}>
        <i className="bi bi-shield-lock-fill text-teal me-2"></i>Emergency Fund Calculator
      </h3>
      
      <div className="mb-4">
        <label className="form-label d-flex justify-content-between fw-bold">
          Estimated Monthly Expenses <span>${monthlyExpenses.toLocaleString()}</span>
        </label>
        <input 
          type="range" 
          className="form-range" 
          min="500" 
          max="20000" 
          step="250" 
          value={monthlyExpenses} 
          onChange={e => setMonthlyExpenses(Number(e.target.value))} 
        />
        <div className="form-text">Include rent/mortgage, groceries, utilities, debt payments, and basic healthcare.</div>
      </div>

      <div className="mb-4">
        <label className="form-label d-flex justify-content-between fw-bold">
          Months of Coverage <span>{monthsOfCoverage} Months</span>
        </label>
        <input 
          type="range" 
          className="form-range" 
          min="3" 
          max="12" 
          step="1" 
          value={monthsOfCoverage} 
          onChange={e => setMonthsOfCoverage(Number(e.target.value))} 
        />
        <div className="form-text">Typically 3-6 months is standard, but freelancers or single-earners should aim for 9-12.</div>
      </div>

      <div className="mb-4 p-3 rounded-3" style={{ background: "var(--cream2)", border: "1px solid var(--border)" }}>
        <span className="fw-bold d-block mb-3" style={{ color: "var(--ink)" }}>
          <i className="bi bi-exclamation-triangle-fill text-warning me-2"></i>Add Risk Buffers
        </span>
        
        <div className="form-check mb-2">
          <input 
            className="form-check-input" 
            type="checkbox" 
            id="singleIncome" 
            checked={singleIncome} 
            onChange={e => setSingleIncome(e.target.checked)} 
          />
          <label className="form-check-label small fw-medium" htmlFor="singleIncome">
            Single-Income Household (+1.5 months expenses buffer)
          </label>
        </div>

        <div className="form-check mb-2">
          <input 
            className="form-check-input" 
            type="checkbox" 
            id="careerVolatility" 
            checked={careerVolatility} 
            onChange={e => setCareerVolatility(e.target.checked)} 
          />
          <label className="form-check-label small fw-medium" htmlFor="careerVolatility">
            High Career Volatility / Freelancer / Commission-based (+2 months buffer)
          </label>
        </div>

        <div className="form-check mb-2">
          <input 
            className="form-check-input" 
            type="checkbox" 
            id="dependents" 
            checked={dependents} 
            onChange={e => setDependents(e.target.checked)} 
          />
          <label className="form-check-label small fw-medium" htmlFor="dependents">
            Supporting Children or Elders (+1 month buffer)
          </label>
        </div>

        <div className="form-check mb-2">
          <input 
            className="form-check-input" 
            type="checkbox" 
            id="healthRisks" 
            checked={healthRisks} 
            onChange={e => setHealthRisks(e.target.checked)} 
          />
          <label className="form-check-label small fw-medium" htmlFor="healthRisks">
            Chronic Medical Conditions / High Deductible Health Plan (+$1,500 buffer)
          </label>
        </div>

        <div className="form-check">
          <input 
            className="form-check-input" 
            type="checkbox" 
            id="petOwner" 
            checked={petOwner} 
            onChange={e => setPetOwner(e.target.checked)} 
          />
          <label className="form-check-label small fw-medium" htmlFor="petOwner">
            Pet Owner — vet emergency coverage (+$750 buffer)
          </label>
        </div>
      </div>

      <button className="btn btn-dark w-100 py-3 fw-bold mb-4 shadow-sm" onClick={handleCalculate}>
        Calculate Safety Buffer
      </button>

      {calculated && (
        <div className="animate__animated animate__fadeIn">
          {/* Result Highlight Card */}
          <div className="p-4 rounded-3 text-center mb-4" style={{ background: "linear-gradient(135deg, var(--teal) 0%, #115e59 100%)", color: "#fff" }}>
            <div className="text-uppercase small fw-bold tracking-wider mb-1" style={{ opacity: 0.85 }}>Your Custom Safety Cushion</div>
            <div className="fw-bold mb-2" style={{ fontSize: "2.5rem", fontFamily: "var(--serif)" }}>
              ${Math.round(totalEmergencyFund).toLocaleString()}
            </div>
            <div className="small px-3 mx-auto" style={{ maxWidth: "450px", opacity: 0.9 }}>
              This covers your base target of <strong>${Math.round(baseFund).toLocaleString()}</strong> plus a <strong>${Math.round(buffer).toLocaleString()}</strong> custom volatility safety buffer.
            </div>
          </div>

          {/* Allocation Strategy Tiers */}
          <h5 className="fw-bold mb-3" style={{ color: "var(--ink)" }}>Recommended Deployment Plan</h5>
          <div className="row g-3 mb-4">
            <div className="col-md-4">
              <div className="card h-100 border-0 p-3 shadow-sm text-center" style={{ background: "var(--cream2)", borderRadius: "10px" }}>
                <span className="badge bg-danger rounded-pill mx-auto mb-2 py-1.5 px-3" style={{ fontSize: "0.7rem" }}>TIER 1 (LIQUID)</span>
                <h6 className="fw-bold mb-1">Cash / Checking</h6>
                <div className="fw-bold text-dark fs-5">${Math.round(totalEmergencyFund * 0.1).toLocaleString()}</div>
                <div className="text-muted small mt-1" style={{ fontSize: "0.75rem" }}>Instant cash, local ATM access.</div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 border-0 p-3 shadow-sm text-center" style={{ background: "var(--cream2)", borderRadius: "10px" }}>
                <span className="badge bg-teal rounded-pill mx-auto mb-2 py-1.5 px-3" style={{ fontSize: "0.7rem" }}>TIER 2 (HYSA)</span>
                <h6 className="fw-bold mb-1">High-Yield Savings</h6>
                <div className="fw-bold text-teal fs-5">${Math.round(totalEmergencyFund * 0.7).toLocaleString()}</div>
                <div className="text-muted small mt-1" style={{ fontSize: "0.75rem" }}>Liquidity + ~4.5% yield.</div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 border-0 p-3 shadow-sm text-center" style={{ background: "var(--cream2)", borderRadius: "10px" }}>
                <span className="badge bg-indigo rounded-pill mx-auto mb-2 py-1.5 px-3" style={{ fontSize: "0.7rem", backgroundColor: "#4f46e5" }}>TIER 3 (SHORT CD)</span>
                <h6 className="fw-bold mb-1">T-Bills / Free CDs</h6>
                <div className="fw-bold text-primary fs-5" style={{ color: "#4f46e5 !important" }}>${Math.round(totalEmergencyFund * 0.2).toLocaleString()}</div>
                <div className="text-muted small mt-1" style={{ fontSize: "0.75rem" }}>Zero-risk max rate booster.</div>
              </div>
            </div>
          </div>

          {/* Savings Roadmap */}
          <div className="card border-0 p-3 shadow-sm" style={{ background: "var(--cream2)", borderRadius: "12px", border: "1px solid var(--border)" }}>
            <span className="fw-bold d-block mb-3" style={{ color: "var(--ink)", fontSize: "0.9rem" }}>
              <i className="bi bi-clock-history me-2 text-teal"></i>Monthly Savings Path (Target: 4.5% APY Compounded)
            </span>
            <div className="table-responsive">
              <table className="table table-borderless m-0 table-sm text-center align-middle" style={{ fontSize: "0.85rem" }}>
                <thead>
                  <tr className="border-bottom" style={{ borderColor: "var(--border) !important" }}>
                    <th className="text-start pb-2">Target Timeline</th>
                    <th className="pb-2">Monthly Deposit Needed</th>
                    <th className="pb-2">Interest Earned</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-start fw-semibold py-2">6 Months</td>
                    <td className="fw-bold text-teal">${Math.round(totalEmergencyFund / 6.07).toLocaleString()}</td>
                    <td className="text-success">+${Math.round(totalEmergencyFund - (totalEmergencyFund / 6.07) * 6).toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td className="text-start fw-semibold py-2">12 Months</td>
                    <td className="fw-bold text-teal">${Math.round(totalEmergencyFund / 12.3).toLocaleString()}</td>
                    <td className="text-success">+${Math.round(totalEmergencyFund - (totalEmergencyFund / 12.3) * 12).toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td className="text-start fw-semibold py-2">24 Months</td>
                    <td className="fw-bold text-teal">${Math.round(totalEmergencyFund / 25.1).toLocaleString()}</td>
                    <td className="text-success">+${Math.round(totalEmergencyFund - (totalEmergencyFund / 25.1) * 24).toLocaleString()}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </ToolPageLayout>
  );
}
