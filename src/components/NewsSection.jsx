import React, { useState, useEffect } from 'react';
import API_BASE_URL from '../config/api';
import BookmarkButton from './BookmarkButton';

export default function NewsSection() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/news`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setNews(data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="py-5 text-center">
        <div className="spinner-border text-teal"></div>
      </div>
    );
  }

  if (news.length === 0) return null;

  return (
    <section className="ls-section" style={{ background: "var(--cream)" }}>
      <div className="container">
        <div className="d-flex justify-content-between align-items-end mb-4">
          <div>
            <h2 className="ls-heading ls-heading-lg mb-1">Market News</h2>
            <p className="ls-text-muted mb-0">The latest financial headlines updating 24/7.</p>
          </div>
        </div>

        <div className="row g-4">
          {news.slice(0, 6).map((item, idx) => (
            <div key={idx} className="col-md-6 col-lg-4">
              <div className="ls-card h-100 position-relative">
                <div className="card-body p-4 d-flex flex-column h-100">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <span className="ls-badge ls-badge-teal">
                      {item.source}
                    </span>
                    <small className="text-muted" style={{ fontSize: "0.8rem" }}>
                      {new Date(item.pubDate).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </small>
                  </div>
                  <h5 className="ls-heading ls-heading-md mb-3" style={{ lineHeight: "1.4", flexGrow: 1 }}>
                    <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-decoration-none stretched-link" style={{ color: "var(--ink)" }}>
                      {item.title}
                    </a>
                  </h5>
                  <div className="d-flex justify-content-between align-items-center mt-3 position-relative" style={{ zIndex: 2 }}>
                    <span className="text-teal fw-bold" style={{ fontSize: "0.9rem" }}>Read Full Story &rarr;</span>
                    <BookmarkButton itemType="article" title={item.title} slug={item.link} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
