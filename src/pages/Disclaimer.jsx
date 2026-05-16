import React from 'react';
import SEO from '../components/SEO';

export default function Disclaimer() {
  const lastUpdated = "May 16, 2026";

  return (
    <>
      <SEO 
        title="Disclaimer - LifeScore Platform Educational Bound" 
        description="Review the legal boundaries of LifeScore's financial simulations, market projections, and educational editorial content."
      />

      {/* Header */}
      <section className="py-5" style={{ background: "var(--cream)", borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
        <div className="container py-4 text-center">
          <span className="badge rounded-pill px-3 py-2 mb-3" style={{ background: "var(--teal-light)", color: "var(--teal)", letterSpacing: "1px" }}>
            LEGAL BOUNDARIES
          </span>
          <h1 className="fw-bold mb-3" style={{ fontFamily: "var(--serif)", color: "var(--ink)", fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>Disclaimer</h1>
          <p className="text-muted small mb-0">Effective Date: {lastUpdated}</p>
        </div>
      </section>

      {/* Content Body */}
      <section className="py-5">
        <div className="container py-4 max-w-4xl">
          <div className="card border-0 p-4 p-sm-5 shadow-sm" style={{ borderRadius: "var(--radius-lg)", background: "var(--card-bg)" }}>
            
            <div className="legal-content text-muted" style={{ fontSize: "1.05rem", lineHeight: "1.8" }}>
              <p className="lead fw-semibold text-dark">
                The information provided by LifeScore ("we", "us", or "our") on lifescore-ten.vercel.app (the "Site") is for general informational and educational purposes only.
              </p>

              <hr className="my-4" />

              <h4 className="fw-bold text-dark mt-4 mb-3">1. No Professional Advice</h4>
              <p>
                All information on the Site is provided in good faith, however we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the Site. <strong>UNDER NO CIRCUMSTANCE SHALL WE HAVE ANY LIABILITY TO YOU FOR ANY LOSS OR DAMAGE OF ANY KIND INCURRED AS A RESULT OF THE USE OF THE SITE OR RELIANCE ON ANY INFORMATION PROVIDED ON THE SITE.</strong>
              </p>
              <p>
                The Site cannot and does not contain financial, investment, tax, or legal advice. The financial information is provided for general informational and educational purposes only and is not a substitute for professional advice. Accordingly, before taking any actions based upon such information, we encourage you to consult with the appropriate professionals. We do not provide any kind of financial advice.
              </p>

              <h4 className="fw-bold text-dark mt-4 mb-3">2. Performance Simulations</h4>
              <p>
                The calculators, simulations, and projections provided on LifeScore are based on historical data and mathematical formulas. Past performance is not indicative of future results. Simulated outcomes are intended to help users understand financial concepts and do not guarantee actual wealth accumulation or debt reduction.
              </p>

              <h4 className="fw-bold text-dark mt-4 mb-3">3. External Links Disclaimer</h4>
              <p>
                The Site may contain (or you may be sent through the Site) links to other websites or content belonging to or originating from third parties or links to websites and features in banners or other advertising. Such external links are not investigated, monitored, or checked for accuracy, adequacy, validity, reliability, availability, or completeness by us.
              </p>

              <h4 className="fw-bold text-dark mt-4 mb-3">4. Errors and Omissions</h4>
              <p>
                While we have made every attempt to ensure that the information contained in this site has been obtained from reliable sources, LifeScore is not responsible for any errors or omissions, or for the results obtained from the use of this information.
              </p>

              <h4 className="fw-bold text-dark mt-4 mb-3">5. Logins and Data</h4>
              <p>
                Any data you enter into our tools is processed according to our Privacy Policy. While we employ industry-standard security, we cannot guarantee absolute data immunity against advanced cyber threats. Use the platform at your own discretion.
              </p>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
