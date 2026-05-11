import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../../components/SEO';

export default function CreditCards() {
  const creditCards = [
    {
      id: 1,
      name: "Chase Sapphire Preferred®",
      annualFee: "$95",
      introOffer: "60,000 Points",
      creditNeeded: "Good/Excellent",
      features: ["Earn 60,000 bonus points after spending $4,000 in first 3 months", "3x points on dining and streaming", "25% more value when redeeming for travel"],
      link: "https://creditcards.chase.com/", // Replace with actual affiliate link
      badge: "Best for Travel"
    },
    {
      id: 2,
      name: "Capital One SavorOne Cash Rewards",
      annualFee: "$0",
      introOffer: "$200 Cash Bonus",
      creditNeeded: "Excellent",
      features: ["3% cash back on dining, entertainment, and groceries", "No foreign transaction fees", "Earn $200 bonus after spending $500 in first 3 months"],
      link: "https://www.capitalone.com/credit-cards/savorone-dining-rewards/", // Replace with actual affiliate link
      badge: "Best for Cash Back"
    },
    {
      id: 3,
      name: "Citi® Double Cash Card",
      annualFee: "$0",
      introOffer: "None",
      creditNeeded: "Good/Excellent",
      features: ["Earn 2% on every purchase (1% when bought, 1% when paid)", "No categories to track", "18-month 0% intro APR on balance transfers"],
      link: "https://www.citi.com/credit-cards/citi-double-cash-credit-card", // Replace with actual affiliate link
      badge: "Best Flat Rate"
    }
  ];

  return (
    <>
      <SEO 
        title="Best Credit Cards 2026 | Rewards, Travel & Cash Back | LifeScore" 
        description="Find the perfect credit card for your lifestyle. Compare the best travel, cash back, and 0% APR credit cards of 2026." 
      />
      <div style={{ background: "var(--cream)", minHeight: "100vh", padding: "4rem 0" }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="text-center mb-5">
                <span className="badge mb-3" style={{ background: "var(--teal-light)", color: "var(--teal)", padding: "0.5rem 1rem", fontSize: "0.9rem" }}>
                  Expert Reviewed
                </span>
                <h1 className="fw-bold mb-3" style={{ fontFamily: "var(--serif)", color: "var(--ink)" }}>
                  Best Credit Cards of 2026
                </h1>
                <p className="text-muted lead mx-auto" style={{ maxWidth: "700px" }}>
                  Whether you want free flights, flat-rate cash back, or 0% APR, these are the top cards on the market right now.
                </p>
                
                {/* FTC Disclosure */}
                <div className="mt-4 p-3 d-inline-block text-start" style={{ background: "rgba(0,0,0,0.03)", borderRadius: "var(--radius)", fontSize: "0.85rem", color: "var(--ink3)", maxWidth: "800px" }}>
                  <strong><i className="bi bi-info-circle me-1"></i> Advertiser Disclosure:</strong> The offers that appear on this site are from companies from which LifeScore receives compensation. This compensation may impact how and where products appear on this site. We do not include all financial companies or all available financial offers.
                </div>
              </div>

              <div className="row g-4">
                {creditCards.map(card => (
                  <div className="col-12" key={card.id}>
                    <div className="card border-0 p-4 p-lg-5" style={{ background: "var(--card-bg)", borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow)" }}>
                      <div className="row align-items-center">
                        <div className="col-lg-3 col-md-4 mb-4 mb-md-0 text-center text-md-start">
                          <span className="badge mb-2" style={{ background: "var(--ink)", color: "var(--cream)" }}>{card.badge}</span>
                          <h3 className="fw-bold mb-0" style={{ fontSize: "1.5rem" }}>{card.name}</h3>
                        </div>
                        
                        <div className="col-lg-6 col-md-5 mb-4 mb-md-0">
                          <div className="row text-center text-md-start g-3">
                            <div className="col-4">
                              <div className="text-muted small fw-bold text-uppercase">Annual Fee</div>
                              <div className="fs-4 fw-bold text-ink">{card.annualFee}</div>
                            </div>
                            <div className="col-4">
                              <div className="text-muted small fw-bold text-uppercase">Intro Offer</div>
                              <div className="fs-5 fw-bold text-teal">{card.introOffer}</div>
                            </div>
                            <div className="col-4">
                              <div className="text-muted small fw-bold text-uppercase">Credit Req.</div>
                              <div className="fs-6 fw-bold mt-1">{card.creditNeeded}</div>
                            </div>
                          </div>
                          
                          <div className="mt-4">
                            <ul className="list-unstyled mb-0 d-flex flex-column gap-2 text-muted small">
                              {card.features.map((feature, idx) => (
                                <li key={idx}><i className="bi bi-star-fill text-warning me-2"></i> {feature}</li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <div className="col-lg-3 col-md-3 text-center text-md-end">
                          <a 
                            href={card.link} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="btn btn-lg w-100 fw-bold text-white shadow-sm"
                            style={{ background: "var(--teal)" }}
                          >
                            Apply Now
                          </a>
                          <small className="text-muted d-block mt-2">Terms Apply</small>
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
