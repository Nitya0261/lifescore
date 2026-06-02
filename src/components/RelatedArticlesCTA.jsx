import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BLOG_POSTS } from '../data/mockData';
import { sanityClient } from '../sanityClient';

const CATEGORY_MAP = {
  "Saving Money": ["Saving Money", "Savings", "Psychology"],
  "Investing": ["Investing"],
  "Retirement": ["Retirement"],
  "Debt": ["Debt Freedom", "Credit Score", "Debt"],
  "Emergency Fund": ["Emergency Fund", "Savings", "Saving Money"],
  "Net Worth": ["Financial Planning", "Credit Score", "Savings"],
  "Taxes": ["Investing", "Financial Planning"],
  "Financial Planning": ["Financial Planning", "Savings"]
};

export default function RelatedArticlesCTA({ category }) {
  const mappedCats = CATEGORY_MAP[category] || [category];
  const localPosts = BLOG_POSTS.filter(post => 
    mappedCats.some(catName => 
      (post.cat || '').toLowerCase() === catName.toLowerCase()
    )
  ).slice(0, 3);

  const [articles, setArticles] = useState(localPosts);

  useEffect(() => {
    let isMounted = true;
    
    // Fetch from Sanity client to enrich/override
    const query = `*[_type == "blogPost" && category in $categories][0...3]{
      title,
      "slug": slug.current,
      publishedAt,
      category,
      deck
    }`;
    
    sanityClient.fetch(query, { categories: mappedCats })
      .then(sanityPosts => {
        if (isMounted && sanityPosts && sanityPosts.length > 0) {
          const formatted = sanityPosts.map(p => ({
            title: p.title,
            slug: p.slug,
            date: p.publishedAt ? new Date(p.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'May 2026',
            deck: p.deck || '',
            cat: p.category,
            isSanity: true
          }));
          
          // Merge Sanity and local posts (deduplicating by slug)
          const combined = [...formatted];
          localPosts.forEach(lp => {
            if (combined.length < 3 && !combined.some(cp => cp.slug === lp.slug)) {
              combined.push(lp);
            }
          });
          setArticles(combined);
        }
      })
      .catch(err => {
        console.warn("Sanity fetch failed for RelatedArticlesCTA, using local mock data:", err);
      });

    return () => {
      isMounted = false;
    };
  }, [category]);

  if (articles.length === 0) return null;

  const getPostLink = (post) => {
    if (post.isSanity || !BLOG_POSTS.some(p => p.slug === post.slug)) {
      return `/blog/${post.slug}`;
    }
    return `/article/${post.slug}`;
  };

  return (
    <div className="mt-5 pt-4 border-top">
      <h4 className="fw-bold mb-4" style={{ fontFamily: "var(--serif)", color: "var(--ink)", letterSpacing: "-0.5px" }}>
        <i className="bi bi-journal-text text-teal me-2"></i>Recommended Reading
      </h4>
      <div className="row g-4">
        {articles.map((post) => (
          <div key={post.slug} className="col-md-4">
            <Link 
              to={getPostLink(post)} 
              className="card h-100 border-0 p-4 text-decoration-none transition-all"
              style={{
                background: "var(--card-bg)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-lg)",
                boxShadow: "var(--shadow)",
                transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                display: "flex",
                flexDirection: "column"
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.08)';
                e.currentTarget.style.borderColor = 'var(--teal)';
                const titleEl = e.currentTarget.querySelector('.article-title');
                if (titleEl) titleEl.style.color = 'var(--teal)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = 'var(--shadow)';
                e.currentTarget.style.borderColor = 'var(--border)';
                const titleEl = e.currentTarget.querySelector('.article-title');
                if (titleEl) titleEl.style.color = 'var(--ink)';
              }}
            >
              <div className="mb-2">
                <span className="badge" style={{ background: "var(--teal-light)", color: "var(--teal)", fontSize: "0.75rem" }}>
                  {post.cat || post.category || "Finance"}
                </span>
              </div>
              <h5 
                className="fw-bold article-title mb-2" 
                style={{ 
                  fontFamily: "var(--serif)", 
                  fontSize: "1.1rem", 
                  lineHeight: "1.4", 
                  color: "var(--ink)",
                  transition: "color 0.2s"
                }}
              >
                {post.title}
              </h5>
              <p 
                className="text-muted small flex-grow-1 mb-3" 
                style={{ 
                  lineHeight: "1.5",
                  display: "-webkit-box",
                  WebkitLineClamp: "3",
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  textOverflow: "ellipsis"
                }}
              >
                {post.deck}
              </p>
              <div className="d-flex align-items-center justify-content-between mt-auto pt-2 border-top" style={{ borderColor: "rgba(0,0,0,0.05)", fontSize: "0.75rem", color: "var(--ink3)" }}>
                <span><i className="bi bi-clock me-1"></i>{post.readTime || "5 min read"}</span>
                <span>{post.date || "May 2026"}</span>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
