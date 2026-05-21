import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../../components/SEO';

export default function HighYieldSavings() {
  const savingsAccounts = [
    {
      id: 1,
      name: "Sofi Checking and Savings",
      apy: "4.60%",
      minBalance: "$0",
      monthlyFee: "$0",
      features: ["Up to $300 welcome bonus", "No overdraft fees", "Early direct deposit"],
      link: "https://www.sofi.com/banking/", // Replace with actual affiliate link
      badge: "Best Overall"
    },
    {
      id: 2,
      name: "Marcus by Goldman Sachs",
      apy: "4.40%",
      minBalance: "$0",
      monthlyFee: "$0",
      features: ["Same-day transfers up to $100k", "No penalty CD options", "24/7 Customer Service"],
      link: "https://www.marcus.com/us/en/savings", // Replace with actual affiliate link
      badge: "Most Reliable"
    },
    {
      id: 3,
      name: "Ally Bank Savings",
      apy: "4.20%",
      minBalance: "$0",
      monthlyFee: "$0",
      features: ["Savings 'Buckets' feature", "Surprise savings boosters", "Reimburses ATM fees"],
      link: "https://www.ally.com/bank/online-savings-account/", // Replace with actual affiliate link
      badge: "Best Features"
    }
  ];

  return (
    <>
      <SEO 
        title="Best High-Yield Savings Accounts 2026 | LifeScore" 
        description="Compare the top high-yield savings accounts of 2026. Maximize your interest with no monthly fees." 
        url="https://lifesscore.live/recommendations/savings"
      />
      <div style={{ background: "var(--cream)", minHeight: "100vh", padding: "4rem 0" }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="text-center mb-5">
                <span className="badge mb-3" style={{ background: "var(--teal-light)", color: "var(--teal)", padding: "0.5rem 1rem", fontSize: "0.9rem" }}>
                  Updated Monthly
                </span>
                <h1 className="fw-bold mb-3" style={{ fontFamily: "var(--serif)", color: "var(--ink)" }}>
                  Best High-Yield Savings Accounts of 2026
                </h1>
                <p className="text-muted lead mx-auto" style={{ maxWidth: "700px" }}>
                  Stop losing money to inflation. We've hand-picked the highest earning, zero-fee savings accounts available today.
                </p>
                
                {/* FTC Disclosure */}
                <div className="mt-4 p-3 d-inline-block text-start" style={{ background: "rgba(0,0,0,0.03)", borderRadius: "var(--radius)", fontSize: "0.85rem", color: "var(--ink3)", maxWidth: "800px" }}>
                  <strong><i className="bi bi-info-circle me-1"></i> Advertiser Disclosure:</strong> The offers that appear on this site are from companies from which LifeScore receives compensation. This compensation may impact how and where products appear on this site. We do not include all financial companies or all available financial offers.
                </div>
              </div>

              <div className="row g-4">
                {savingsAccounts.map(account => (
                  <div className="col-12" key={account.id}>
                    <div className="card border-0 p-3 p-sm-4 p-lg-5" style={{ background: "var(--card-bg)", borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow)" }}>
                      <div className="row align-items-center g-3">
                        <div className="col-lg-3 col-md-4 text-center text-md-start">
                          <span className="badge mb-2" style={{ background: "var(--ink)", color: "var(--cream)" }}>{account.badge}</span>
                          <h3 className="fw-bold mb-0" style={{ fontSize: "clamp(1.2rem, 3vw, 1.5rem)" }}>{account.name}</h3>
                        </div>
                        
                        <div className="col-lg-6 col-md-5">
                          <div className="row text-center text-md-start g-2 g-sm-3">
                            <div className="col-4">
                              <div className="text-muted fw-bold text-uppercase" style={{ fontSize: "0.65rem" }}>APY</div>
                              <div className="fw-bold text-teal" style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)" }}>{account.apy}</div>
                            </div>
                            <div className="col-4">
                              <div className="text-muted fw-bold text-uppercase" style={{ fontSize: "0.65rem" }}>Min. Balance</div>
                              <div className="fw-bold" style={{ fontSize: "clamp(0.95rem, 2vw, 1.25rem)" }}>{account.minBalance}</div>
                            </div>
                            <div className="col-4">
                              <div className="text-muted fw-bold text-uppercase" style={{ fontSize: "0.65rem" }}>Monthly Fee</div>
                              <div className="fw-bold" style={{ fontSize: "clamp(0.95rem, 2vw, 1.25rem)" }}>{account.monthlyFee}</div>
                            </div>
                          </div>
                          
                          <div className="mt-3 mt-sm-4">
                            <ul className="list-unstyled mb-0 d-flex flex-wrap gap-2 gap-sm-3 justify-content-center justify-content-md-start text-muted small" style={{ fontSize: "0.85rem" }}>
                              {account.features.map((feature, idx) => (
                                <li key={idx}><i className="bi bi-check-circle-fill text-teal me-1"></i> {feature}</li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <div className="col-lg-3 col-md-3 text-center text-md-end mt-3 mt-md-0">
                          <a 
                            href={account.link} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="btn btn-lg w-100 fw-bold text-white shadow-sm py-2 py-sm-3"
                            style={{ background: "var(--teal)", fontSize: "0.95rem" }}
                          >
                            Open Account
                          </a>
                          <small className="text-muted d-block mt-1" style={{ fontSize: "0.7rem" }}>Secure site</small>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="text-center mt-5">
                <Link to="/" className="text-decoration-none text-muted">
                  <i className="bi bi-arrow-left me-2"></i>Back to Home
                </Link>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
