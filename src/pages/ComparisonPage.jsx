import React from 'react';
import { useParams, Link } from 'react-router-dom';
import SEO from '../components/SEO';

const DUMMY_COMPARISONS = {
  "roth-ira-vs-401k": {
    title: "Roth IRA vs 401(k): Which is Better?",
    optionA: "Roth IRA",
    optionB: "401(k)",
    tldr: "A 401(k) gives you a tax break today and usually comes with an employer match. A Roth IRA gives you tax-free income in retirement. For most people, the best strategy is: get the full 401(k) match first, then max out a Roth IRA.",
    tableData: [
      { feature: "Tax Advantage", a: "Tax-free withdrawals in retirement", b: "Tax deduction now, taxed on withdrawal" },
      { feature: "Employer Match", a: "No", b: "Often Yes (Free Money)" },
      { feature: "Contribution Limit (2024)", a: "$7,000", b: "$23,000" },
      { feature: "Income Limits", a: "Yes (phases out at $146k for singles)", b: "No income limits" },
      { feature: "Required Minimum Distributions", a: "No", b: "Yes (starting at age 73)" }
    ],
    prosA: ["Tax-free growth and withdrawals", "No RMDs during your lifetime", "Can withdraw contributions penalty-free anytime"],
    prosB: ["Employer matching (free money)", "Higher contribution limits", "Lowers your taxable income today"],
    consA: ["No upfront tax break", "Strict income limits to contribute", "Lower contribution limits"],
    consB: ["Withdrawals are taxed as ordinary income", "Fewer investment choices usually", "Required withdrawals in retirement"],
    verdict: "Always contribute enough to your 401(k) to get the maximum employer match. After that, prioritize fully funding a Roth IRA for its incredible tax-free growth and flexibility."
  },
  "etf-vs-mutual-fund": {
    title: "ETF vs Mutual Fund: What's the Difference?",
    optionA: "ETF",
    optionB: "Mutual Fund",
    tldr: "ETFs (Exchange Traded Funds) trade like individual stocks throughout the day and are highly tax-efficient. Mutual Funds trade only once at the end of the day and may carry higher minimum investments. Both are excellent ways to diversify.",
    tableData: [
      { feature: "Trading", a: "Intraday (like a stock)", b: "End of day only" },
      { feature: "Minimum Investment", a: "Price of one share", b: "Usually $1,000 to $3,000" },
      { feature: "Tax Efficiency", a: "Very High", b: "Moderate to Low (capital gains distributions)" },
      { feature: "Management Style", a: "Mostly Passive (Index)", b: "Passive or Active" }
    ],
    prosA: ["Lower expense ratios generally", "Highly tax-efficient", "Can buy fractional shares easily"],
    prosB: ["Automatic investing is easier to set up", "Great for target-date retirement funds", "Actively managed options available"],
    consA: ["Must buy in whole shares (at some brokers)", "Bid/ask spreads can increase cost"],
    consB: ["Higher expense ratios", "Unexpected capital gains taxes", "High minimum investments"],
    verdict: "For most individual investors using a standard brokerage account, ETFs are superior due to their lower costs and higher tax efficiency. For automated 401(k) investing, mutual funds are perfectly fine."
  }
};

export default function ComparisonPage() {
  const { slug } = useParams();
  
  const data = DUMMY_COMPARISONS[slug] || {
    title: slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
    optionA: "Option A",
    optionB: "Option B",
    tldr: "This is a placeholder comparison page. In a live environment, this highly profitable VS page content is dynamically rendered from Sanity CMS.",
    tableData: [
      { feature: "Cost", a: "Low", b: "High" },
      { feature: "Flexibility", a: "High", b: "Low" }
    ],
    prosA: ["Advantage 1", "Advantage 2"],
    prosB: ["Advantage 1", "Advantage 2"],
    consA: ["Disadvantage 1", "Disadvantage 2"],
    consB: ["Disadvantage 1", "Disadvantage 2"],
    verdict: "Determine your personal goals before choosing between these two financial options."
  };

  return (
    <>
      <SEO 
        title={`${data.title} - Comprehensive Financial Comparison`}
        description={data.tldr}
        type="article"
      />

      <div style={{ background: "var(--cream)", minHeight: "100vh", padding: "4rem 0" }}>
        <div className="container">
          
          <div className="row justify-content-center">
            <div className="col-lg-10">
              
              <div className="text-center mb-5">
                <span className="badge mb-3 px-3 py-2" style={{ background: "var(--teal-light)", color: "var(--teal)", fontSize: "0.9rem", letterSpacing: "1px" }}>
                  VERSUS
                </span>
                <h1 className="fw-bold mb-4" style={{ fontFamily: "var(--serif)", color: "var(--ink)", fontSize: "3.5rem" }}>
                  {data.optionA} <span className="text-muted" style={{ fontStyle: "italic", fontWeight: 400 }}>vs</span> {data.optionB}
                </h1>
              </div>

              {/* TLDR Box */}
              <div className="card border-0 mb-5 p-4" style={{ background: "var(--card-bg)", borderRadius: "var(--radius-lg)", boxShadow: "0 10px 30px rgba(0,0,0,0.05)", borderTop: "4px solid var(--teal)" }}>
                <h4 className="fw-bold d-flex align-items-center mb-3" style={{ color: "var(--ink)" }}>
                  <i className="bi bi-lightning-charge text-warning me-2"></i> The Short Answer (TL;DR)
                </h4>
                <p className="mb-0 text-muted" style={{ fontSize: "1.15rem", lineHeight: "1.7" }}>
                  {data.tldr}
                </p>
              </div>

              {/* Head to Head Table */}
              <h3 className="fw-bold mb-4" style={{ fontFamily: "var(--serif)" }}>Head-to-Head Comparison</h3>
              <div className="table-responsive mb-5 shadow-sm rounded-4 overflow-hidden">
                <table className="table table-hover mb-0" style={{ background: "white" }}>
                  <thead style={{ background: "var(--ink)", color: "white" }}>
                    <tr>
                      <th className="py-3 px-4 border-0">Feature</th>
                      <th className="py-3 px-4 border-0">{data.optionA}</th>
                      <th className="py-3 px-4 border-0">{data.optionB}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.tableData.map((row, idx) => (
                      <tr key={idx}>
                        <td className="py-3 px-4 fw-bold" style={{ color: "var(--ink2)", width: "25%" }}>{row.feature}</td>
                        <td className="py-3 px-4" style={{ width: "37.5%" }}>{row.a}</td>
                        <td className="py-3 px-4" style={{ width: "37.5%" }}>{row.b}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pros and Cons Split */}
              <div className="row g-4 mb-5">
                <div className="col-md-6">
                  <div className="card h-100 border-0" style={{ background: "var(--card-bg)", borderRadius: "var(--radius)" }}>
                    <div className="card-header bg-transparent border-0 pt-4 pb-0 px-4">
                      <h4 className="fw-bold mb-0">{data.optionA}</h4>
                    </div>
                    <div className="card-body p-4">
                      <h6 className="text-success fw-bold mb-3"><i className="bi bi-plus-circle me-2"></i>Pros</h6>
                      <ul className="text-muted mb-4" style={{ lineHeight: "1.7", paddingLeft: "1.2rem" }}>
                        {data.prosA.map((p, i) => <li key={i}>{p}</li>)}
                      </ul>
                      <h6 className="text-danger fw-bold mb-3"><i className="bi bi-dash-circle me-2"></i>Cons</h6>
                      <ul className="text-muted mb-0" style={{ lineHeight: "1.7", paddingLeft: "1.2rem" }}>
                        {data.consA.map((c, i) => <li key={i}>{c}</li>)}
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="col-md-6">
                  <div className="card h-100 border-0" style={{ background: "var(--card-bg)", borderRadius: "var(--radius)" }}>
                    <div className="card-header bg-transparent border-0 pt-4 pb-0 px-4">
                      <h4 className="fw-bold mb-0">{data.optionB}</h4>
                    </div>
                    <div className="card-body p-4">
                      <h6 className="text-success fw-bold mb-3"><i className="bi bi-plus-circle me-2"></i>Pros</h6>
                      <ul className="text-muted mb-4" style={{ lineHeight: "1.7", paddingLeft: "1.2rem" }}>
                        {data.prosB.map((p, i) => <li key={i}>{p}</li>)}
                      </ul>
                      <h6 className="text-danger fw-bold mb-3"><i className="bi bi-dash-circle me-2"></i>Cons</h6>
                      <ul className="text-muted mb-0" style={{ lineHeight: "1.7", paddingLeft: "1.2rem" }}>
                        {data.consB.map((c, i) => <li key={i}>{c}</li>)}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Final Verdict */}
              <div className="card border-0 mb-5 text-center" style={{ background: "var(--teal)", color: "white", borderRadius: "var(--radius-lg)" }}>
                <div className="card-body p-5">
                  <h3 className="fw-bold mb-4" style={{ fontFamily: "var(--serif)" }}>The Final Verdict</h3>
                  <p className="mb-4" style={{ fontSize: "1.2rem", lineHeight: "1.8", opacity: 0.9 }}>
                    {data.verdict}
                  </p>
                  <Link to="/tools" className="btn btn-light btn-lg rounded-pill fw-bold px-5">
                    Explore Financial Tools
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
