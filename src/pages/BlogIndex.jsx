import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { sanityClient } from '../sanityClient';
import SEO from '../components/SEO';

export default function BlogIndex() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const query = `*[_type == "blogPost"] | order(publishedAt desc) {
      title,
      "slug": slug.current,
      publishedAt,
      category,
      "authorName": author->name,
      excerpt
    }`;

    sanityClient.fetch(query)
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="container py-5 text-center" style={{ minHeight: "60vh" }}>
        <div className="spinner-border text-teal" role="status"></div>
      </div>
    );
  }

  return (
    <>
      <SEO 
        title="Blog - LifeScore Personal Finance & Wealth Insights" 
        description="Explore the latest articles on saving, investing, and financial independence from the LifeScore editorial team."
      />

      <div style={{ background: "var(--cream)", minHeight: "100vh", padding: "4rem 0" }}>
        <div className="container">
          <div className="text-center mb-5">
            <span className="badge rounded-pill px-3 py-2 mb-3" style={{ background: "var(--teal-light)", color: "var(--teal)", letterSpacing: "1px" }}>
              EDITORIAL FEED
            </span>
            <h1 className="fw-bold mb-3" style={{ fontFamily: "var(--serif)", color: "var(--ink)", fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>
              The Wealth Intelligence Blog
            </h1>
            <p className="text-muted max-w-2xl mx-auto fs-5">
              Deep dives into market trends, behavioral psychology, and actionable frameworks for your financial journey.
            </p>
          </div>

          <div className="row g-4">
            {/* Featured Tool Promo Card */}
            <div className="col-12 mb-4">
              <div className="p-4 p-md-5 rounded-4 d-flex align-items-center justify-content-between flex-wrap gap-4 shadow-sm" style={{ background: "linear-gradient(135deg, #0f1923 0%, #1a3a5c 100%)", color: "#fff" }}>
                <div style={{ maxWidth: "600px" }}>
                  <span className="badge rounded-pill bg-teal mb-3 px-3 py-2">MOST POPULAR TOOL</span>
                  <h2 className="fw-bold mb-3" style={{ fontFamily: "var(--serif)" }}>Personal Budgeting Engine (50/30/20)</h2>
                  <p className="opacity-75 fs-5">Don't just read about money—track it. Our advanced budget engine helps you categorize every dollar according to the gold standard of financial planning.</p>
                  <div className="d-flex gap-3 mt-4">
                    <Link to="/dashboard/budget" className="btn btn-teal fw-bold px-4 py-2 rounded-pill shadow">Launch Budget Tracker</Link>
                    <Link to="/tools" className="btn btn-outline-light fw-bold px-4 py-2 rounded-pill">View All Tools</Link>
                  </div>
                </div>
                <div className="d-none d-lg-block">
                  <i className="bi bi-pie-chart-fill" style={{ fontSize: "8rem", opacity: 0.2 }}></i>
                </div>
              </div>
            </div>

            {posts.length > 0 ? (
              posts.map((post) => (
                <div className="col-md-6 col-lg-4" key={post.slug}>
                  <Link to={`/blog/${post.slug}`} className="text-decoration-none h-100">
                    <div className="card h-100 border-0 shadow-sm blog-card" style={{ borderRadius: "var(--radius-lg)", background: "var(--card-bg)", transition: "all 0.3s ease" }}>
                      <div className="card-body p-4">
                        <div className="d-flex align-items-center gap-2 mb-3">
                          <span className="badge" style={{ background: "var(--cream2)", color: "var(--teal)" }}>{post.category || "Finance"}</span>
                          <span className="text-muted small">
                            {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </span>
                        </div>
                        <h4 className="fw-bold mb-3" style={{ color: "var(--ink)", fontFamily: "var(--serif)", lineHeight: "1.3" }}>
                          {post.title}
                        </h4>
                        <p className="text-muted small mb-4" style={{ display: "-webkit-box", WebkitLineClamp: "3", WebkitBoxOrient: "vertical", overflow: "hidden", lineHeight: "1.6" }}>
                          {post.excerpt || "Dive into our latest analysis on wealth building and financial freedom..."}
                        </p>
                        <div className="d-flex align-items-center justify-content-between mt-auto pt-3" style={{ borderTop: "1px solid rgba(0,0,0,0.05)" }}>
                          <span className="small fw-semibold text-dark">By {post.authorName || "LifeScore Team"}</span>
                          <span className="text-teal small fw-bold">Read More <i className="bi bi-arrow-right ms-1"></i></span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))
            ) : (
              <div className="col-12 text-center py-5">
                <h3>No articles found yet.</h3>
                <p className="text-muted">We're busy drafting high-quality insights for you.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .blog-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 15px 30px rgba(0,0,0,0.1) !important;
        }
        .blog-card:hover h4 {
          color: var(--teal) !important;
        }
      `}</style>
    </>
  );
}
