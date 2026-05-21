import React, { useState } from 'react';
import ToolPageLayout from '../../components/ToolPageLayout';
import { useAuth } from '../../context/AuthContext';

export default function DebtPayoff() {
  const { addXp, XP_REWARDS } = useAuth();
  
  // Debts state starting with 3 default realistic loans
  const [debts, setDebts] = useState([
    { id: 1, name: "Credit Card A", balance: 5000, rate: 22, minPayment: 150 },
    { id: 2, name: "Car Loan", balance: 15000, rate: 6, minPayment: 350 },
    { id: 3, name: "Student Loan", balance: 25000, rate: 4.5, minPayment: 250 },
  ]);

  const [extraBudget, setExtraBudget] = useState(300);
  const [calculated, setCalculated] = useState(false);

  // Helper functions to manage inputs
  const handleAddDebt = () => {
    const newId = debts.length > 0 ? Math.max(...debts.map(d => d.id)) + 1 : 1;
    setDebts([...debts, { id: newId, name: `Debt ${newId}`, balance: 3000, rate: 12, minPayment: 100 }]);
  };

  const handleRemoveDebt = (id) => {
    setDebts(debts.filter(d => d.id !== id));
  };

  const handleUpdateDebt = (id, field, value) => {
    setDebts(debts.map(d => {
      if (d.id === id) {
        return { ...d, [field]: value };
      }
      return d;
    }));
  };

  // Math simulation for Avalanche (highest rate first) and Snowball (lowest balance first)
  const simulateStrategy = (strategy) => {
    // Clone debts to avoid mutation
    let activeDebts = debts.map(d => ({
      ...d,
      remaining: d.balance,
      interestAccumulated: 0,
      monthsToPayoff: 0,
    }));

    const totalMinPayments = activeDebts.reduce((sum, d) => sum + d.minPayment, 0);
    const totalMonthlyBudget = totalMinPayments + extraBudget;

    let months = 0;
    let totalInterestPaid = 0;
    const history = [];

    // Max cap to avoid infinite loops in case budget is insufficient to cover monthly interest
    const maxMonths = 360; // 30 years

    while (activeDebts.some(d => d.remaining > 0) && months < maxMonths) {
      months++;
      let monthlyPot = totalMonthlyBudget;

      // 1. Pay monthly interest first and apply minimum payments
      let requiredMin = 0;
      activeDebts.forEach(d => {
        if (d.remaining > 0) {
          const monthlyInterest = (d.remaining * (d.rate / 100)) / 12;
          d.remaining += monthlyInterest;
          d.interestAccumulated += monthlyInterest;
          totalInterestPaid += monthlyInterest;

          // Apply minimum payment (or remaining balance if it is smaller)
          const payment = Math.min(d.minPayment, d.remaining);
          d.remaining -= payment;
          monthlyPot -= payment;
          requiredMin += payment;
        }
      });

      if (monthlyPot < 0) {
        // If our budget cannot even cover the interest/minimums, break
        break;
      }

      // 2. Sort remaining debts based on selected strategy for extra payment
      let sortedDebts = [...activeDebts].filter(d => d.remaining > 0);
      if (strategy === 'avalanche') {
        // High interest first
        sortedDebts.sort((a, b) => b.rate - a.rate);
      } else if (strategy === 'snowball') {
        // Low balance first
        sortedDebts.sort((a, b) => a.remaining - b.remaining);
      } else {
        // Minimums only (no sorting needed, monthlyPot would be ~extraBudget which is not deployed extra)
        sortedDebts = [];
      }

      // 3. Apply extra budget to the target debt
      if (sortedDebts.length > 0 && monthlyPot > 0) {
        let target = sortedDebts[0];
        const extraPayment = Math.min(monthlyPot, target.remaining);
        
        // Find the index in the activeDebts list to update
        activeDebts = activeDebts.map(d => {
          if (d.id === target.id) {
            const updatedRemaining = d.remaining - extraPayment;
            return { ...d, remaining: updatedRemaining };
          }
          return d;
        });
        monthlyPot -= extraPayment;
      }

      // Record which debts are paid off in this month
      activeDebts.forEach(d => {
        if (d.remaining <= 0 && d.monthsToPayoff === 0 && d.balance > 0) {
          d.monthsToPayoff = months;
        }
      });
    }

    return {
      months: months === maxMonths ? "30+ Years" : months,
      totalInterest: totalInterestPaid,
      debtBreakdown: activeDebts,
    };
  };

  const avalancheResults = simulateStrategy('avalanche');
  const snowballResults = simulateStrategy('snowball');
  const minimumsOnlyResults = simulateStrategy('minimums');

  const totalOriginalDebt = debts.reduce((sum, d) => sum + d.balance, 0);
  const totalMinRequired = debts.reduce((sum, d) => sum + d.minPayment, 0);

  const handleCalculate = () => {
    setCalculated(true);
    addXp(XP_REWARDS?.USE_TOOL || 25, "Used Debt Payoff Calculator!");
  };

  const articleContent = (
    <>
      <p>Paying off debt is one of the most liberating steps you can take toward financial independence. However, the path to zero debt isn't always intuitive. Two mathematically and psychologically distinct strategies dominate the debt payoff landscape: <strong>Debt Avalanche</strong> and <strong>Debt Snowball</strong>.</p>
      
      <h3 className="mt-4 mb-3" style={{ fontFamily: "var(--serif)", fontWeight: 800 }}>The Strategies Explained</h3>
      <div className="row g-4">
        <div className="col-md-6">
          <div className="card h-100 border-0 p-4 shadow-sm" style={{ background: "var(--cream2)", borderRadius: "12px" }}>
            <h5 className="fw-bold mb-2 text-danger">🛡️ Debt Avalanche</h5>
            <p className="small text-muted mb-0">Under the Avalanche strategy, you pay the minimums on all debts, and throw all extra funds toward the debt with the <strong>highest interest rate (APR)</strong>, regardless of the balance. Once that is paid, you move to the next highest rate.</p>
            <hr className="my-2" />
            <div className="small fw-semibold text-danger">Pros: Mathematically superior. Saves the most interest and pays off debt fastest in theory.</div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card h-100 border-0 p-4 shadow-sm" style={{ background: "var(--cream2)", borderRadius: "12px" }}>
            <h5 className="fw-bold mb-2 text-teal">❄️ Debt Snowball</h5>
            <p className="small text-muted mb-0">Popularized by finance columnists, the Snowball strategy targets the debt with the <strong>smallest balance</strong> first. You pay minimums on everything else and aggressively pay down the smallest loan to secure a quick mental win.</p>
            <hr className="my-2" />
            <div className="small fw-semibold text-teal">Pros: Psychological gamechanger. Quick wins build momentum and keep you motivated.</div>
          </div>
        </div>
      </div>

      <h3 className="mt-4 mb-3" style={{ fontFamily: "var(--serif)", fontWeight: 800 }}>Which One is Right for You?</h3>
      <p>While Avalanche is the mathematically logical choice, humans are not calculators. If you have several small debts (e.g., medical bills under $500, a small credit card balance), starting with the <strong>Snowball strategy</strong> to completely wipe them out can simplify your bills and provide high emotional reward.</p>
      <p>However, if you have extremely high-interest debts (like credit cards charging 20% to 28% APR) alongside low-interest student loans, the <strong>Avalanche strategy</strong> is almost always superior, as high APR debt compounds rapidly and can trap you in a cycle of interest charges.</p>
    </>
  );

  const faq = [
    { question: "Should I invest while paying off debt?", answer: "If you have high-interest debt (above 7-8%), you should pause investing (except to get an employer 401k match, which is a guaranteed 100% return) and aggressively clear the debt. If your debt is low-interest (e.g., a 3.5% mortgage or student loan), you should pay the minimums and invest extra capital in broad index funds, which historically return 8-10% annually." },
    { question: "What is the 'debt rollover' or rollup?", answer: "When you pay off a debt, you don't spend that monthly amount! Instead, you add that debt's former minimum payment to your 'extra payment pot' for the next debt in line. This creates a powerful rolling snowball effect that accelerates your payoff pace." },
    { question: "Does my credit score drop when I pay off a loan?", answer: "Yes, it is common to see a temporary, minor drop in your credit score when a loan is fully paid off and closed. This is because closing an account can slightly reduce the average age of your active accounts and your credit mix. However, the benefits of being debt-free far outweigh a temporary minor dip in credit score." }
  ];

  return (
    <ToolPageLayout
      title="Debt Payoff Strategy Visualizer | Snowball vs. Avalanche"
      description="Compare Snowball and Avalanche debt payoff models. Build your tailored roadmap to total freedom, optimize extra budgets, and save thousands in interest."
      url="https://lifesscore.live/tools/debt-payoff"
      keyword="Debt Payoff Strategy Visualizer"
      faq={faq}
      articleContent={articleContent}
    >
      <h3 style={{ fontWeight: 800, marginBottom: "1.5rem" }}>
        <i className="bi bi-fire text-danger me-2"></i>Debt Payoff Strategy Visualizer
      </h3>

      {/* Debt Input Rows */}
      <h5 className="fw-bold mb-3" style={{ color: "var(--ink)" }}>Your Current Debts</h5>
      
      <div className="d-flex flex-column gap-3 mb-4">
        {debts.map((debt, index) => (
          <div 
            key={debt.id} 
            className="p-3 border rounded-3 position-relative animate__animated animate__fadeIn"
            style={{ background: "var(--card-bg)", borderColor: "var(--border)" }}
          >
            <button 
              className="btn btn-sm btn-outline-danger position-absolute" 
              style={{ right: "12px", top: "12px", border: "none" }}
              aria-label="Remove debt"
              onClick={() => handleRemoveDebt(debt.id)}
            >
              <i className="bi bi-trash"></i>
            </button>

            <div className="row g-2 align-items-center pe-md-4">
              <div className="col-md-3 col-12">
                <label className="form-label small fw-bold mb-1">Debt Name</label>
                <input 
                  type="text" 
                  className="form-control form-control-sm" 
                  value={debt.name} 
                  onChange={e => handleUpdateDebt(debt.id, 'name', e.target.value)} 
                />
              </div>
              <div className="col-md-3 col-4">
                <label className="form-label small fw-bold mb-1">Balance ($)</label>
                <input 
                  type="number" 
                  className="form-control form-control-sm" 
                  value={debt.balance} 
                  onChange={e => handleUpdateDebt(debt.id, 'balance', Number(e.target.value))} 
                />
              </div>
              <div className="col-md-3 col-4">
                <label className="form-label small fw-bold mb-1">Interest APR (%)</label>
                <input 
                  type="number" 
                  className="form-control form-control-sm" 
                  value={debt.rate} 
                  onChange={e => handleUpdateDebt(debt.id, 'rate', Number(e.target.value))} 
                />
              </div>
              <div className="col-md-3 col-4">
                <label className="form-label small fw-bold mb-1">Min Payment ($)</label>
                <input 
                  type="number" 
                  className="form-control form-control-sm" 
                  value={debt.minPayment} 
                  onChange={e => handleUpdateDebt(debt.id, 'minPayment', Number(e.target.value))} 
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="btn btn-sm btn-outline-dark fw-bold mb-4" onClick={handleAddDebt}>
        <i className="bi bi-plus-lg me-1"></i>Add Another Debt
      </button>

      {/* Extra Monthly Payment Slider */}
      <div className="mb-4 p-3 rounded-3" style={{ background: "var(--cream2)", border: "1px solid var(--border)" }}>
        <label className="form-label d-flex justify-content-between fw-bold m-0 mb-2">
          Extra Monthly Payoff Budget <span>+${extraBudget.toLocaleString()}</span>
        </label>
        <input 
          type="range" 
          className="form-range" 
          min="50" 
          max="3000" 
          step="50" 
          value={extraBudget} 
          onChange={e => setExtraBudget(Number(e.target.value))} 
        />
        <div className="form-text mt-1" style={{ fontSize: "0.75rem" }}>
          This is the extra money you can put toward your debts <strong>in addition to</strong> the required minimum payments of <strong>${totalMinRequired.toLocaleString()}/mo</strong>.
        </div>
      </div>

      <button className="btn btn-dark w-100 py-3 fw-bold mb-4 shadow-sm" onClick={handleCalculate}>
        Simulate Payoff Freedom
      </button>

      {calculated && (
        <div className="animate__animated animate__fadeIn">
          {/* Comparison Cards Grid */}
          <h5 className="fw-bold mb-3" style={{ color: "var(--ink)" }}>Strategy Comparison</h5>
          
          <div className="row g-3 mb-4">
            {/* Avalanche Column */}
            <div className="col-md-6">
              <div className="card h-100 border-0 p-3 shadow-sm text-center" style={{ background: "linear-gradient(135deg, rgba(239, 68, 68, 0.08) 0%, rgba(239, 68, 68, 0.03) 100%)", border: "1px solid rgba(239, 68, 68, 0.2) !important", borderRadius: "12px" }}>
                <span className="badge rounded-pill mx-auto mb-2 py-1.5 px-3 bg-danger" style={{ fontSize: "0.75rem" }}>🛡️ DEBT AVALANCHE</span>
                <div className="text-muted small mt-2">Months to Debt Free</div>
                <div className="fw-bold mb-2 text-danger" style={{ fontSize: "2rem" }}>
                  {avalancheResults.months} {typeof avalancheResults.months === 'number' && 'Months'}
                </div>
                <div className="text-muted small">Total Interest Paid</div>
                <div className="fw-bold text-dark fs-5 mb-2">${Math.round(avalancheResults.totalInterest).toLocaleString()}</div>
                <hr className="my-2 opacity-50" />
                <div className="small text-success fw-semibold">
                  Saved ${Math.max(0, Math.round(minimumsOnlyResults.totalInterest - avalancheResults.totalInterest)).toLocaleString()} vs Minimums!
                </div>
              </div>
            </div>

            {/* Snowball Column */}
            <div className="col-md-6">
              <div className="card h-100 border-0 p-3 shadow-sm text-center" style={{ background: "linear-gradient(135deg, rgba(13, 148, 136, 0.08) 0%, rgba(13, 148, 136, 0.03) 100%)", border: "1px solid rgba(13, 148, 136, 0.2) !important", borderRadius: "12px" }}>
                <span className="badge rounded-pill mx-auto mb-2 py-1.5 px-3 bg-teal" style={{ fontSize: "0.75rem" }}>❄️ DEBT SNOWBALL</span>
                <div className="text-muted small mt-2">Months to Debt Free</div>
                <div className="fw-bold mb-2 text-teal" style={{ fontSize: "2rem" }}>
                  {snowballResults.months} {typeof snowballResults.months === 'number' && 'Months'}
                </div>
                <div className="text-muted small">Total Interest Paid</div>
                <div className="fw-bold text-dark fs-5 mb-2">${Math.round(snowballResults.totalInterest).toLocaleString()}</div>
                <hr className="my-2 opacity-50" />
                <div className="small text-success fw-semibold">
                  Saved ${Math.max(0, Math.round(minimumsOnlyResults.totalInterest - snowballResults.totalInterest)).toLocaleString()} vs Minimums!
                </div>
              </div>
            </div>
          </div>

          {/* Quick Summary Alert */}
          <div className="p-3 rounded-3 mb-4 small" style={{ background: "var(--cream2)", border: "1px solid var(--border)", lineHeight: "1.6" }}>
            <i className="bi bi-info-circle-fill text-teal me-2"></i>
            {avalancheResults.totalInterest < snowballResults.totalInterest ? (
              <span><strong>Strategy Analysis:</strong> The <strong>Avalanche</strong> strategy saves you <strong>${Math.round(snowballResults.totalInterest - avalancheResults.totalInterest).toLocaleString()}</strong> in interest charges compared to Snowball, by targeting high APR loans first. Choose Avalanche for mathematical efficiency!</span>
            ) : (
              <span><strong>Strategy Analysis:</strong> Both strategies result in identical interest payments for this configuration. Choose <strong>Snowball</strong> to capture psychological momentum with quick account closures!</span>
            )}
          </div>
        </div>
      )}
    </ToolPageLayout>
  );
}
