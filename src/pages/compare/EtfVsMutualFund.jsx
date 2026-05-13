import React, { useState } from "react";
import { Link } from "react-router-dom";
import SEO from "../../components/SEO";

export default function EtfVsMutualFund() {
  // Expense Ratio & Return Drag Simulator state
  const [investment, setInvestment] = useState(25000);
  const [etfFee, setEtfFee] = useState(0.04); // 0.04%
  const [mfFee, setMfFee] = useState(0.65); // 0.65%
  const [horizon, setHorizon] = useState(20);
  const annualGrowth = 0.08; // 8% expected raw market growth

  // Calculate compounded final value minus expense ratio drag
  const calcNetReturns = (principal, growthRate, feeRate, years) => {
    const netRate = growthRate - (feeRate / 100);
    return principal * Math.pow(1 + netRate, years);
  };

  const etfNetTotal = calcNetReturns(investment, annualGrowth, etfFee, horizon);
  const mfNetTotal = calcNetReturns(investment, annualGrowth, mfFee, horizon);
  const totalFeeSavings = etfNetTotal - mfNetTotal;

  return (
    <>
      <SEO 
        title="ETF vs Mutual Fund: Expense Ratios & Tax Efficiency Guide"
        description="Understand the critical intraday trading, tax efficiency, and fee drag differences between Exchange Traded Funds and Mutual Funds."
        type="article"
      />

      <div style={{ background: "var(--cream)", minHeight: "100vh", padding: "3rem 0" }}>
        <div className="container">
          
          {/* Compare Navigation Switcher */}
          <div className="d-flex justify-content-center gap-2 mb-4">
            <Link 
              to="/compare/roth-ira-vs-401k" 
              className="btn btn-outline-secondary rounded-pill px-4 py-2 fw-bold"
              style={{ background: "var(--card-bg)" }}
            >
              Roth IRA vs 401(k)
            </Link>
            <Link 
              to="/compare/etf-vs-mutual-fund" 
              className="btn btn-dark rounded-pill px-4 py-2 fw-bold shadow-sm"
            >
              ETF vs Mutual Fund
            </Link>
          </div>

          {/* Hero Header */}
          <div className="text-center max-w-3xl mx-auto mb-5">
            <span 
              className="badge mb-3 px-3 py-2 fw-bold" 
              style={{ background: "var(--teal-light)", color: "var(--teal)", letterSpacing: "1px" }}
            >
              ASSET ALLOCATION SHOWDOWN
            </span>
            <h1 className="fw-bold mb-3" style={{ fontFamily: "var(--serif)", color: "var(--ink)", fontSize: "clamp(2.2rem, 4vw, 3.5rem)", lineHeight: 1.15 }}>
              ETF <span style={{ fontStyle: "italic", fontWeight: 300, color: "var(--accent)" }}>vs</span> Mutual Fund
            </h1>
            <p className="lead text-muted" style={{ fontSize: "1.1rem", lineHeight: 1.6 }}>
              Both vehicles bundle hundreds of equities into single, highly diversified portfolio containers. However, underlying differences in structural tax creation mechanics, intraday liquidity behaviors, and internal expense ratios can heavily dictate long-term portfolio yields.
            </p>
          </div>

          {/* TL;DR Executive Card */}
          <div className="row justify-content-center mb-5">
            <div className="col-lg-10">
              <div 
                className="card border-0 p-4 p-md-5" 
                style={{ 
                  background: "var(--card-bg)", 
                  borderRadius: "var(--radius-lg)", 
                  boxShadow: "var(--shadow-md)",
                  borderLeft: "5px solid var(--teal)"
                }}
              >
                <h4 className="fw-bold mb-3 d-flex align-items-center" style={{ color: "var(--ink)" }}>
                  <i className="bi bi-shield-check text-success me-2"></i> Quick Summary (TL;DR)
                </h4>
                <p className="mb-0" style={{ fontSize: "1.05rem", color: "var(--ink2)", lineHeight: 1.6 }}>
                  For individual taxable brokerage account investors, <strong>ETFs (Exchange-Traded Funds)</strong> represent the superior choice due to near-zero expense ratios, total intraday trading autonomy, and specialized structural creation mechanics that shield owners from unexpected phantom capital gain distribution taxes. <strong>Mutual funds</strong> remain perfectly viable inside automated 401(k) arrays where programmatic recurring fractional contributions take precedence over absolute intraday liquidity.
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Fee Drag & Net Yield Simulator */}
          <div className="row justify-content-center mb-5">
            <div className="col-lg-10">
              <div className="card border-0 p-4 p-md-5 overflow-hidden" style={{ background: "var(--cream2)", borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow)" }}>
                <div className="text-center mb-4">
                  <span className="badge bg-dark text-white px-2 py-1 mb-2">FEE IMPACT TRACKER</span>
                  <h3 className="fw-bold" style={{ fontFamily: "var(--serif)", color: "var(--ink)" }}>
                    Expense Ratio Drag Simulator
                  </h3>
                  <p className="text-muted small">
                    Observe how seemingly negligible internal fee variations drain hundreds of thousands in expected lifecycle returns.
                  </p>
                </div>

                <div className="row g-4 align-items-center">
                  <div className="col-md-6">
                    <div className="mb-4">
                      <label className="form-label d-flex justify-content-between fw-bold small" style={{ color: "var(--ink)" }}>
                        <span>Initial Capital Principal</span>
                        <span style={{ color: "var(--accent)" }}>${investment.toLocaleString()}</span>
                      </label>
                      <input 
                        type="range" 
                        className="form-range" 
                        min="5000" 
                        max="250000" 
                        step="5000" 
                        value={investment} 
                        onChange={(e) => setInvestment(Number(e.target.value))} 
                      />
                    </div>

                    <div className="mb-4">
                      <label className="form-label d-flex justify-content-between fw-bold small" style={{ color: "var(--ink)" }}>
                        <span>ETF Expense Ratio</span>
                        <span className="text-success">{etfFee}%</span>
                      </label>
                      <input 
                        type="range" 
                        className="form-range" 
                        min="0.01" 
                        max="0.25" 
                        step="0.01" 
                        value={etfFee} 
                        onChange={(e) => setEtfFee(Number(e.target.value))} 
                      />
                    </div>

                    <div className="mb-4">
                      <label className="form-label d-flex justify-content-between fw-bold small" style={{ color: "var(--ink)" }}>
                        <span>Mutual Fund Expense Ratio</span>
                        <span className="text-danger">{mfFee}%</span>
                      </label>
                      <input 
                        type="range" 
                        className="form-range" 
                        min="0.20" 
                        max="2.00" 
                        step="0.05" 
                        value={mfFee} 
                        onChange={(e) => setMfFee(Number(e.target.value))} 
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label d-flex justify-content-between fw-bold small" style={{ color: "var(--ink)" }}>
                        <span>Investment Horizon</span>
                        <span>{horizon} Years</span>
                      </label>
                      <input 
                        type="range" 
                        className="form-range" 
                        min="5" 
                        max="40" 
                        step="1" 
                        value={horizon} 
                        onChange={(e) => setHorizon(Number(e.target.value))} 
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="p-4 rounded-4" style={{ background: "var(--card-bg)", border: "1px solid var(--border)" }}>
                      <div className="mb-4 pb-3 border-bottom">
                        <span className="text-muted small fw-bold d-block mb-1">LOW-COST ETF FINAL VALUE</span>
                        <h2 className="fw-bold mb-0" style={{ color: "var(--ink)", fontFamily: "var(--serif)" }}>
                          ${Math.round(etfNetTotal).toLocaleString()}
                        </h2>
                        <span className="text-success small fw-bold">✓ Preserves Maximum Capital Acceleration</span>
                      </div>

                      <div className="mb-4 pb-3 border-bottom">
                        <span className="text-muted small fw-bold d-block mb-1">MUTUAL FUND FINAL VALUE</span>
                        <h2 className="fw-bold mb-0" style={{ color: "var(--ink3)", fontFamily: "var(--serif)" }}>
                          ${Math.round(mfNetTotal).toLocaleString()}
                        </h2>
                        <span className="text-danger small">Subjected to compounding basis-point management drag.</span>
                      </div>

                      <div className="pt-1 text-center">
                        <span className="text-muted small d-block">TOTAL ESTIMATED FEE DRAINS AVOIDED</span>
                        <span className="fw-bold text-success" style={{ fontSize: "1.1rem" }}>
                          +${Math.round(totalFeeSavings).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Matrix Specs Table */}
          <div className="row justify-content-center mb-5">
            <div className="col-lg-10">
              <h3 className="fw-bold mb-4 text-center" style={{ fontFamily: "var(--serif)", color: "var(--ink)" }}>
                Core Structural Distinctions
              </h3>
              
              <div className="table-responsive shadow-sm rounded-4 overflow-hidden" style={{ border: "1px solid var(--border)" }}>
                <table className="table table-hover mb-0 align-middle" style={{ background: "var(--card-bg)" }}>
                  <thead style={{ background: "var(--ink)", color: "#fff" }}>
                    <tr>
                      <th className="py-3 px-4 border-0">Metric</th>
                      <th className="py-3 px-4 border-0" style={{ width: "38%" }}>Exchange-Traded Fund (ETF)</th>
                      <th className="py-3 px-4 border-0" style={{ width: "38%" }}>Mutual Fund</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-3 px-4 fw-bold text-muted">Trading Frequency</td>
                      <td className="py-3 px-4 fw-bold text-success">Continuous Intraday Market execution.</td>
                      <td className="py-3 px-4 text-muted">Executed exactly once daily post-market close (NAV).</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 fw-bold text-muted">Minimum Entry Barrier</td>
                      <td className="py-3 px-4">Price of one standalone stock share <span className="text-muted small">(or fractional base)</span>.</td>
                      <td className="py-3 px-4 fw-bold" style={{ color: "var(--ink)" }}>Usually $1,000 – $3,000 absolute initial base setup.</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 fw-bold text-muted">Structural Tax Protection</td>
                      <td className="py-3 px-4"><span className="badge bg-success bg-opacity-10 text-success border border-success border-opacity-25 me-1">High</span> In-kind redemption architecture insulates capital distributions.</td>
                      <td className="py-3 px-4"><span className="badge bg-warning bg-opacity-10 text-warning border border-warning border-opacity-25 me-1">Moderate</span> Forced portfolio liquidations can pass taxable distributions to owners.</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 fw-bold text-muted">Management Expense Ratios</td>
                      <td className="py-3 px-4 fw-bold text-success">Extremely low <span className="text-muted small">(often 0.03% to 0.15% overall)</span>.</td>
                      <td className="py-3 px-4 text-muted">Elevated active oversight margins <span className="text-muted small">(typically 0.50% to 1.50%+)</span>.</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 fw-bold text-muted">Pricing Transparency</td>
                      <td className="py-3 px-4">Real-time dynamic spread updates stream across live charting ticks.</td>
                      <td className="py-3 px-4 text-muted">Net Asset Value (NAV) explicitly computed at 4:00 PM EST daily.</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 fw-bold text-muted">Automated Investing Ease</td>
                      <td className="py-3 px-4 text-muted">Requires select modern broker networks supporting fractional splits.</td>
                      <td className="py-3 px-4 fw-bold text-success">Superb. Seamless setup for exact recurring dollar sums.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Pros / Cons Layout */}
          <div className="row justify-content-center g-4 mb-5">
            <div className="col-lg-5">
              <div className="card h-100 border-0 p-4" style={{ background: "var(--card-bg)", borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow)" }}>
                <h4 className="fw-bold mb-4 pb-2 border-bottom" style={{ color: "var(--ink)", fontFamily: "var(--serif)" }}>
                  ETF Profile
                </h4>
                
                <h6 className="text-success fw-bold mb-2"><i className="bi bi-check-circle-fill me-2"></i>Core Strengths</h6>
                <ul className="mb-4 text-muted small" style={{ lineHeight: 1.6, paddingLeft: "1.2rem" }}>
                  <li className="mb-2">Highly tax-efficient due to specialized institutional creation/redemption rules.</li>
                  <li className="mb-2">Zero initial wealth thresholds democratize instant retail market tracking.</li>
                  <li>Ultra-low cost index tracking preserves near-total underlying portfolio upside.</li>
                </ul>

                <h6 className="text-danger fw-bold mb-2"><i className="bi bi-x-circle-fill me-2"></i>Considerations</h6>
                <ul className="mb-0 text-muted small" style={{ lineHeight: 1.6, paddingLeft: "1.2rem" }}>
                  <li className="mb-2">Bid/ask market quote fluctuations can add minor fractional transaction costs.</li>
                  <li>Intraday accessibility tests behavioral investor discipline during standard market corrections.</li>
                </ul>
              </div>
            </div>

            <div className="col-lg-5">
              <div className="card h-100 border-0 p-4" style={{ background: "var(--card-bg)", borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow)" }}>
                <h4 className="fw-bold mb-4 pb-2 border-bottom" style={{ color: "var(--ink)", fontFamily: "var(--serif)" }}>
                  Mutual Fund Profile
                </h4>
                
                <h6 className="text-success fw-bold mb-2"><i className="bi bi-check-circle-fill me-2"></i>Core Strengths</h6>
                <ul className="mb-4 text-muted small" style={{ lineHeight: 1.6, paddingLeft: "1.2rem" }}>
                  <li className="mb-2">Optimal container strategy for set-and-forget target-date lifecycle allocations.</li>
                  <li className="mb-2">Always guarantees purchases execute precisely at Net Asset Value without bid/ask spread risk.</li>
                  <li>Seamlessly integrates automated fiat bank deductions natively inside older payroll arrays.</li>
                </ul>

                <h6 className="text-danger fw-bold mb-2"><i className="bi bi-x-circle-fill me-2"></i>Considerations</h6>
                <ul className="mb-0 text-muted small" style={{ lineHeight: 1.6, paddingLeft: "1.2rem" }}>
                  <li className="mb-2">Carries persistent risk of unintended taxable capital distribution pass-through allocations.</li>
                  <li>Substantial initial minimum investment requirements gate immediate retail entry.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Call to Action Grid */}
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="card border-0 text-center p-5 rounded-4" style={{ background: "var(--dark-surface)", color: "#fff" }}>
                <h3 className="fw-bold mb-3" style={{ fontFamily: "var(--serif)" }}>
                  Track Live Global Index Appreciations
                </h3>
                <p className="text-muted max-w-xl mx-auto mb-4" style={{ fontSize: "0.95rem", color: "rgba(255,255,255,0.7)" }}>
                  Monitor daily real-time pricing indicators, assess specific financial options, and follow live ticker movements straight from our tailored index terminal.
                </p>
                <div>
                  <Link to="/markets" className="btn btn-primary fw-bold px-4 py-2 me-2 mb-2" style={{ background: "var(--accent)", border: "none" }}>
                    Launch Markets Terminal
                  </Link>
                  <Link to="/" className="btn btn-outline-light fw-bold px-4 py-2 mb-2">
                    Back to Home Feed
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
