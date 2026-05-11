import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const DUMMY_ADVISORS = [
  {
    id: 1,
    name: "Sarah Jenkins, CFP®",
    company: "Apex Wealth Management",
    location: "New York, NY",
    locationType: "In-Person & Virtual",
    feeStructure: "Fee-Only",
    specialties: ["Retirement", "Investing"],
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
    bio: "Sarah specializes in helping tech professionals and executives transition smoothly into early retirement.",
    featured: true
  },
  {
    id: 2,
    name: "Michael Chen, CFA",
    company: "Chen Financial Group",
    location: "San Francisco, CA",
    locationType: "Virtual Only",
    feeStructure: "AUM",
    specialties: ["Investing", "Tax Strategy"],
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80",
    bio: "Over 15 years of experience managing complex portfolios and minimizing tax liabilities for high-net-worth individuals.",
    featured: true
  },
  {
    id: 3,
    name: "Elena Rodriguez, CPA, CFP®",
    company: "Clear Path Financial",
    location: "Austin, TX",
    locationType: "In-Person & Virtual",
    feeStructure: "Flat Fee",
    specialties: ["Debt Payoff", "Small Business"],
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
    bio: "Passionate about helping young families eliminate debt and build generational wealth through simple, actionable plans.",
    featured: false
  },
  {
    id: 4,
    name: "David Thorne",
    company: "Thorne Partners",
    location: "Chicago, IL",
    locationType: "In-Person",
    feeStructure: "Fee-Only",
    specialties: ["Retirement", "Estate Planning"],
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80",
    bio: "Dedicated to comprehensive estate planning and ensuring your assets are protected for your heirs.",
    featured: false
  }
];

export default function FindAdvisor() {
  const [filterSpecialty, setFilterSpecialty] = useState('All');
  const [filterFee, setFilterFee] = useState('All');
  const [filterLocation, setFilterLocation] = useState('All');

  const filteredAdvisors = DUMMY_ADVISORS.filter(adv => {
    if (filterSpecialty !== 'All' && !adv.specialties.includes(filterSpecialty)) return false;
    if (filterFee !== 'All' && adv.feeStructure !== filterFee) return false;
    if (filterLocation === 'Virtual' && !adv.locationType.includes('Virtual')) return false;
    if (filterLocation === 'In-Person' && !adv.locationType.includes('In-Person')) return false;
    return true;
  });

  return (
    <>
      <SEO 
        title="Find a Certified Financial Advisor | LifeScore Directory"
        description="Connect with vetted, fee-only financial planners and investment advisors to help you reach your money goals."
      />

      <div style={{ background: "var(--cream)", minHeight: "100vh", padding: "4rem 0" }}>
        <div className="container">
          
          <div className="text-center mb-5">
            <h1 className="fw-bold mb-3" style={{ fontFamily: "var(--serif)", color: "var(--ink)", fontSize: "3rem" }}>
              Find Your Financial Co-Pilot
            </h1>
            <p className="text-muted mx-auto" style={{ maxWidth: "700px", fontSize: "1.1rem" }}>
              Browse our exclusive directory of vetted Certified Financial Planners (CFP®). Filter by specialty, fee structure, and location to find the perfect match for your financial journey.
            </p>
          </div>

          {/* Filters Bar */}
          <div className="card border-0 mb-5 p-4" style={{ background: "var(--card-bg)", borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow)" }}>
            <div className="row g-3">
              <div className="col-md-4">
                <label className="form-label fw-bold text-muted small text-uppercase">Specialty</label>
                <select className="form-select border-0 bg-light" value={filterSpecialty} onChange={e => setFilterSpecialty(e.target.value)}>
                  <option value="All">Any Specialty</option>
                  <option value="Retirement">Retirement</option>
                  <option value="Investing">Investing</option>
                  <option value="Debt Payoff">Debt Payoff</option>
                  <option value="Small Business">Small Business</option>
                  <option value="Estate Planning">Estate Planning</option>
                  <option value="Tax Strategy">Tax Strategy</option>
                </select>
              </div>
              <div className="col-md-4">
                <label className="form-label fw-bold text-muted small text-uppercase">Fee Structure</label>
                <select className="form-select border-0 bg-light" value={filterFee} onChange={e => setFilterFee(e.target.value)}>
                  <option value="All">Any Structure</option>
                  <option value="Fee-Only">Fee-Only</option>
                  <option value="Flat Fee">Flat Fee</option>
                  <option value="AUM">Assets Under Management (AUM)</option>
                </select>
              </div>
              <div className="col-md-4">
                <label className="form-label fw-bold text-muted small text-uppercase">Meeting Type</label>
                <select className="form-select border-0 bg-light" value={filterLocation} onChange={e => setFilterLocation(e.target.value)}>
                  <option value="All">Any Location</option>
                  <option value="Virtual">Virtual Only</option>
                  <option value="In-Person">In-Person Only</option>
                </select>
              </div>
            </div>
          </div>

          {/* Directory Grid */}
          <div className="row g-4 mb-5">
            {filteredAdvisors.length > 0 ? filteredAdvisors.map(adv => (
              <div key={adv.id} className="col-lg-6">
                <div className="card h-100 border-0" style={{ background: "var(--card-bg)", borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow)", overflow: "hidden" }}>
                  {adv.featured && (
                    <div className="bg-teal text-white text-center py-1 text-uppercase fw-bold" style={{ fontSize: "0.75rem", letterSpacing: "1px", background: "var(--teal)" }}>
                      <i className="bi bi-star-fill me-1"></i> Featured Partner
                    </div>
                  )}
                  <div className="card-body p-4 p-md-5">
                    <div className="d-flex flex-column flex-sm-row gap-4 mb-4">
                      <img src={adv.image} alt={adv.name} className="rounded-circle" style={{ width: "90px", height: "90px", objectFit: "cover", border: "3px solid var(--cream2)" }} />
                      <div>
                        <h4 className="fw-bold mb-1" style={{ fontFamily: "var(--serif)", color: "var(--ink)" }}>{adv.name}</h4>
                        <p className="text-teal fw-bold mb-2">{adv.company}</p>
                        <div className="d-flex flex-wrap gap-2 text-muted small">
                          <span><i className="bi bi-geo-alt-fill me-1"></i>{adv.location}</span>
                          <span>&bull;</span>
                          <span><i className="bi bi-camera-video-fill me-1"></i>{adv.locationType}</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-muted mb-4" style={{ lineHeight: "1.6" }}>{adv.bio}</p>

                    <div className="mb-4">
                      <div className="d-flex flex-wrap gap-2">
                        <span className="badge text-dark bg-light border p-2 px-3">
                          <i className="bi bi-cash-stack me-2 text-success"></i>{adv.feeStructure}
                        </span>
                        {adv.specialties.map(spec => (
                          <span key={spec} className="badge" style={{ background: "var(--teal-light)", color: "var(--teal)", padding: "0.5rem 1rem" }}>
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>

                    <button className="btn btn-dark w-100 py-3 fw-bold rounded-pill">
                      Request Consultation
                    </button>
                  </div>
                </div>
              </div>
            )) : (
              <div className="col-12 text-center py-5">
                <h3 className="text-muted fw-bold">No advisors found.</h3>
                <p className="text-muted">Try adjusting your filters to see more results.</p>
                <button className="btn btn-outline-dark mt-3" onClick={() => { setFilterSpecialty('All'); setFilterFee('All'); setFilterLocation('All'); }}>
                  Clear Filters
                </button>
              </div>
            )}
          </div>

          {/* Advertiser CTA */}
          <div className="card border-0 text-center p-5" style={{ background: "var(--ink)", color: "white", borderRadius: "var(--radius-lg)" }}>
            <div className="card-body">
              <span className="badge bg-warning text-dark mb-3 px-3 py-2 text-uppercase fw-bold">For Financial Planners</span>
              <h2 className="fw-bold mb-3" style={{ fontFamily: "var(--serif)" }}>Grow Your Practice</h2>
              <p className="mx-auto mb-4" style={{ maxWidth: "600px", color: "var(--cream)", fontSize: "1.1rem" }}>
                Connect with highly-qualified prospective clients actively seeking financial guidance. Join the LifeScore directory today.
              </p>
              <div className="d-flex justify-content-center gap-3">
                <Link to="/admin" className="btn btn-teal btn-lg rounded-pill fw-bold px-4" style={{ background: "var(--teal)", border: "none" }}>
                  Get Listed ($99/mo)
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
