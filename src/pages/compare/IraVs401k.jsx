import React, { useState } from "react";
import { Link } from "react-router-dom";
import SEO from "../../components/SEO";

export default function IraVs401k() {
  // Simulator state
  const [contribution, setContribution] = useState(6000);
  const [matchPercent, setMatchPercent] = useState(50);
  const [years, setYears] = useState(25);
  const rate = 0.08; // 8% expected growth

  // Simple growth calculation
  const calcFutureValue = (pmt, r, n) => {
    return pmt * ((Math.pow(1 + r, n) - 1) / r);
  };

  const iraTotal = calcFutureValue(contribution, rate, years);
  const employerMatchAmt = contribution * (matchPercent / 100);
  const k401Total = calcFutureValue(contribution + employerMatchAmt, rate, years);

  return (
    <>
      <SEO 
        title="Roth IRA vs 401(k): Ultimate Tax & Growth Comparison"
        description="Compare contribution limits, employer match benefits, and tax rules. Use our dynamic calculator to see which retirement account makes you richer."
        type="article"
      />

      <div style={{ background: "var(--cream)", minHeight: "100vh", padding: "3rem 0" }}>
        <div className="container">
          
          {/* Internal Compare Switcher Navigation */}
          <div className="d-flex flex-wrap justify-content-center gap-2 mb-4">
            <Link 
              to="/compare/roth-ira-vs-401k" 
              className="btn btn-dark rounded-pill px-3 px-sm-4 py-2 fw-bold shadow-sm"
              style={{ fontSize: "0.9rem" }}
            >
              Roth IRA vs 401(k)
            </Link>
            <Link 
              to="/compare/etf-vs-mutual-fund" 
              className="btn btn-outline-secondary rounded-pill px-3 px-sm-4 py-2 fw-bold"
              style={{ background: "var(--card-bg)", fontSize: "0.9rem" }}
            >
              ETF vs Mutual Fund
            </Link>
          </div>

          {/* Hero Heading */}
          <div className="text-center max-w-3xl mx-auto mb-5">
            <span 
              className="badge mb-3 px-3 py-2 fw-bold" 
              style={{ background: "var(--teal-light)", color: "var(--teal)", letterSpacing: "1px" }}
            >
              RETIREMENT SHOWDOWN
            </span>
            <h1 className="fw-bold mb-3" style={{ fontFamily: "var(--serif)", color: "var(--ink)", fontSize: "clamp(2.2rem, 4vw, 3.5rem)", lineHeight: 1.15 }}>
              Roth IRA <span style={{ fontStyle: "italic", fontWeight: 300, color: "var(--accent)" }}>vs</span> 401(k)
            </h1>
            <p className="lead text-muted" style={{ fontSize: "1.1rem", lineHeight: 1.6 }}>
              Two powerful investment vehicles. One offers upfront tax breaks with free employer matching money; the other provides complete lifetime tax-free compound growth. Here is how to combine both to build generational wealth.
            </p>
          </div>

          {/* Core TL;DR Card */}
          <div className="row justify-content-center mb-5">
            <div className="col-lg-10">
              <div 
                className="card border-0 p-3 p-sm-4 p-md-5" 
                style={{ 
                  background: "var(--card-bg)", 
                  borderRadius: "var(--radius-lg)", 
                  boxShadow: "var(--shadow-md)",
                  borderLeft: "5px solid var(--accent)"
                }}
              >
                <h4 className="fw-bold mb-3 d-flex align-items-center" style={{ color: "var(--ink)", fontSize: "clamp(1.2rem, 3vw, 1.5rem)" }}>
                  <i className="bi bi-lightbulb-fill text-warning me-2"></i> Quick Answer (TL;DR)
                </h4>
                <p className="mb-0" style={{ fontSize: "clamp(0.95rem, 2vw, 1.05rem)", color: "var(--ink2)", lineHeight: 1.6 }}>
                  <strong>Always capture the complete 401(k) employer match first.</strong> That is immediate, guaranteed free compensation. Once you maximize the matched money, redirect remaining savings to fully fund a <strong>Roth IRA</strong> for unmatched tax-free withdrawal flexibility and customized equity asset controls.
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Calculator Component */}
          <div className="row justify-content-center mb-5">
            <div className="col-lg-10">
              <div className="card border-0 p-3 p-sm-4 p-md-5 overflow-hidden" style={{ background: "var(--cream2)", borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow)" }}>
                <div className="text-center mb-4">
                  <span className="badge bg-dark text-white px-2 py-1 mb-2">INTERACTIVE TOOL</span>
                  <h3 className="fw-bold" style={{ fontFamily: "var(--serif)", color: "var(--ink)", fontSize: "clamp(1.3rem, 3vw, 1.75rem)" }}>
                    Growth Impact Simulator
                  </h3>
                  <p className="text-muted small">
                    See how compounding interest behaves with and without free employer capital matching.
                  </p>
                </div>

                <div className="row g-4 align-items-center">
                  <div className="col-md-6">
                    <div className="mb-4">
                      <label className="form-label d-flex justify-content-between fw-bold small" style={{ color: "var(--ink)" }}>
                        <span>Annual Savings Base</span>
                        <span style={{ color: "var(--accent)" }}>${contribution.toLocaleString()}/yr</span>
                      </label>
                      <input 
                        type="range" 
                        className="form-range" 
                        min="1000" 
                        max="23000" 
                        step="500" 
                        value={contribution} 
                        onChange={(e) => setContribution(Number(e.target.value))} 
                      />
                    </div>

                    <div className="mb-4">
                      <label className="form-label d-flex justify-content-between fw-bold small" style={{ color: "var(--ink)" }}>
                        <span>Employer Match %</span>
                        <span className="text-success">{matchPercent}%</span>
                      </label>
                      <input 
                        type="range" 
                        className="form-range" 
                        min="0" 
                        max="100" 
                        step="10" 
                        value={matchPercent} 
                        onChange={(e) => setMatchPercent(Number(e.target.value))} 
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label d-flex justify-content-between fw-bold small" style={{ color: "var(--ink)" }}>
                        <span>Compounding Horizon</span>
                        <span>{years} Years</span>
                      </label>
                      <input 
                        type="range" 
                        className="form-range" 
                        min="5" 
                        max="40" 
                        step="1" 
                        value={years} 
                        onChange={(e) => setYears(Number(e.target.value))} 
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="p-3 p-sm-4 rounded-4" style={{ background: "var(--card-bg)", border: "1px solid var(--border)" }}>
                      <div className="mb-4 pb-3 border-bottom">
                        <span className="text-muted small fw-bold d-block mb-1">ROTH IRA FUTURE TOTAL</span>
                        <h2 className="fw-bold mb-0" style={{ color: "var(--ink)", fontFamily: "var(--serif)", fontSize: "clamp(1.5rem, 3.5vw, 2rem)" }}>
                          ${Math.round(iraTotal).toLocaleString()}
                        </h2>
                        <span className="text-success small fw-bold">✓ 100% Tax-Free at Withdrawal</span>
                      </div>

                      <div>
                        <span className="text-muted small fw-bold d-block mb-1">401(k) WITH MATCH TOTAL</span>
                        <h2 className="fw-bold mb-0" style={{ color: "var(--teal)", fontFamily: "var(--serif)", fontSize: "clamp(1.5rem, 3.5vw, 2rem)" }}>
                          ${Math.round(k401Total).toLocaleString()}
                        </h2>
                        <span className="text-muted small">
                          Includes <strong>${Math.round(employerMatchAmt).toLocaleString()}/yr</strong> free match capital.
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Matrix Feature Table */}
          <div className="row justify-content-center mb-5">
            <div className="col-lg-10">
              <h3 className="fw-bold mb-4 text-center" style={{ fontFamily: "var(--serif)", color: "var(--ink)" }}>
                Head-to-Head Feature Comparison
              </h3>
              
              <div className="table-responsive shadow-sm rounded-4 overflow-hidden" style={{ border: "1px solid var(--border)" }}>
                <table className="table table-hover mb-0 align-middle" style={{ background: "var(--card-bg)" }}>
                  <thead style={{ background: "var(--ink)", color: "#fff" }}>
                    <tr>
                      <th className="py-3 px-4 border-0">Specification</th>
                      <th className="py-3 px-4 border-0" style={{ width: "38%" }}>Roth IRA</th>
                      <th className="py-3 px-4 border-0" style={{ width: "38%" }}>Standard 401(k)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-3 px-4 fw-bold text-muted">2026 Annual Limit</td>
                      <td className="py-3 px-4 fw-bold" style={{ color: "var(--ink)" }}>$7,000 <span className="text-muted small">($8k age 50+)</span></td>
                      <td className="py-3 px-4 fw-bold" style={{ color: "var(--ink)" }}>$23,500 <span className="text-muted small">($31k age 50+)</span></td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 fw-bold text-muted">Tax Timeline</td>
                      <td className="py-3 px-4"><span className="badge bg-success bg-opacity-10 text-success border border-success border-opacity-25 me-1">Post-Tax</span> Contributions taxed now; gains tax-free.</td>
                      <td className="py-3 px-4"><span className="badge bg-primary bg-opacity-10 text-primary border border-primary border-opacity-25 me-1">Pre-Tax</span> Contributions lower taxable pay today; withdrawals taxed later.</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 fw-bold text-muted">Employer Matching</td>
                      <td className="py-3 px-4 text-muted">None available.</td>
                      <td className="py-3 px-4 fw-bold text-success">Often provided (free incremental cash yield).</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 fw-bold text-muted">Investment Catalog</td>
                      <td className="py-3 px-4">Unlimited individual stocks, mutual index equities, options, and real estate.</td>
                      <td className="py-3 px-4 text-muted">Restricted institutional portfolio selections preset by employer administrators.</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 fw-bold text-muted">Early Access Controls</td>
                      <td className="py-3 px-4">Contributions can be extracted completely tax- and penalty-free anytime.</td>
                      <td className="py-3 px-4 text-muted">Strict 10% penalty fee alongside ordinary income taxation brackets prior to age 59½.</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 fw-bold text-muted">RMD Regulations</td>
                      <td className="py-3 px-4 text-success fw-bold">None. Can accrue untaxed compounding indefinitely.</td>
                      <td className="py-3 px-4 text-muted">Mandatory minimum distributions activate automatically upon attaining age 73.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Side by side Pros and Cons */}
          <div className="row justify-content-center g-4 mb-5">
            <div className="col-lg-5">
              <div className="card h-100 border-0 p-4" style={{ background: "var(--card-bg)", borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow)" }}>
                <h4 className="fw-bold mb-4 pb-2 border-bottom" style={{ color: "var(--ink)", fontFamily: "var(--serif)" }}>
                  Roth IRA Strategy
                </h4>
                
                <h6 className="text-success fw-bold mb-2"><i className="bi bi-check-circle-fill me-2"></i>Advantages</h6>
                <ul className="mb-4 text-muted small" style={{ lineHeight: 1.6, paddingLeft: "1.2rem" }}>
                  <li className="mb-2">Absolute zero taxation applied to cumulative compound appreciation at maturity.</li>
                  <li className="mb-2">Acts as a backup emergency fund since direct contribution principals remain unpenalized.</li>
                  <li>Immune to potential future systemic legislative bracket hikes.</li>
                </ul>

                <h6 className="text-danger fw-bold mb-2"><i className="bi bi-x-circle-fill me-2"></i>Disadvantages</h6>
                <ul className="mb-0 text-muted small" style={{ lineHeight: 1.6, paddingLeft: "1.2rem" }}>
                  <li className="mb-2">Strict modified adjusted gross income phase-out boundaries forbid direct top-earner subscriptions.</li>
                  <li>Lower comparative aggregate intake caps restrict maximum standalone wealth acceleration.</li>
                </ul>
              </div>
            </div>

            <div className="col-lg-5">
              <div className="card h-100 border-0 p-4" style={{ background: "var(--card-bg)", borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow)" }}>
                <h4 className="fw-bold mb-4 pb-2 border-bottom" style={{ color: "var(--ink)", fontFamily: "var(--serif)" }}>
                  401(k) Strategy
                </h4>
                
                <h6 className="text-success fw-bold mb-2"><i className="bi bi-check-circle-fill me-2"></i>Advantages</h6>
                <ul className="mb-4 text-muted small" style={{ lineHeight: 1.6, paddingLeft: "1.2rem" }}>
                  <li className="mb-2">Employer match immediately guarantees exponential baseline asset equity returns.</li>
                  <li className="mb-2">Substantially drops net current calendar year taxable compensation thresholds immediately.</li>
                  <li>Automatic corporate paycheck withholding bypasses behavioral procrastination bottlenecks.</li>
                </ul>

                <h6 className="text-danger fw-bold mb-2"><i className="bi bi-x-circle-fill me-2"></i>Disadvantages</h6>
                <ul className="mb-0 text-muted small" style={{ lineHeight: 1.6, paddingLeft: "1.2rem" }}>
                  <li className="mb-2">Locked institutional structures carry hidden custodial management expense surcharges.</li>
                  <li>Withdrawals trigger normal state and federal progressive income brackets in retirement.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Action Call */}
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="card border-0 text-center p-4 p-sm-5 rounded-4" style={{ background: "var(--ink)", color: "#fff" }}>
                <h3 className="fw-bold mb-3" style={{ fontFamily: "var(--serif)", fontSize: "clamp(1.5rem, 3.5vw, 2rem)" }}>
                  Ready to optimize your portfolio layout?
                </h3>
                <p className="text-muted max-w-xl mx-auto mb-4" style={{ fontSize: "0.95rem" }}>
                  Track your full net worth, monitor portfolio balances, and evaluate your tailored retirement timeline with our built-in suite of dynamic tools.
                </p>
                <div>
                  <Link to="/tools/retirement-number" className="btn btn-primary fw-bold px-4 py-2 me-2 mb-2" style={{ background: "var(--accent)", border: "none" }}>
                    Calculate Retirement Target
                  </Link>
                  <Link to="/tools" className="btn btn-outline-light fw-bold px-4 py-2 mb-2">
                    Browse All Calculators
                  </Link>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
