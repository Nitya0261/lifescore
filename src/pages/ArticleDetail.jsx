import React, { useEffect, useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { BLOG_POSTS, TRENDING } from '../data/mockData';
import CatTag from '../components/CatTag';
import Byline from '../components/Byline';
import Sidebar from '../components/Sidebar';
import CrossLinks from '../components/CrossLinks';
import BookmarkButton from '../components/BookmarkButton';
import RelatedToolCTA from '../components/RelatedToolCTA';
import { ExpertQuote, ArticleSource, DataHighlight } from '../components/CredibilitySignals';
import SEO from '../components/SEO';

export default function ArticleDetail() {
  const { slug } = useParams();
  const location = useLocation();
  const [post, setPost] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const found = BLOG_POSTS.find(p => p.slug === slug);
    setPost(found);
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.pageYOffset / totalHeight) * 100;
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!post) {
    return (
      <div className="container py-5 text-center">
        <h2 className="ls-heading ls-heading-lg">Article Not Found</h2>
        <Link to="/" className="ls-btn ls-btn-teal mt-4 text-decoration-none">Return Home</Link>
      </div>
    );
  }

  const canonicalUrl = `https://lifescore-ten.vercel.app/article/${post.slug}`;
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.deck,
    "author": { "@type": "Person", "name": post.author },
    "publisher": { "@type": "Organization", "name": "LifeScore", "url": "https://lifescore-ten.vercel.app" },
    "datePublished": post.date,
    "dateModified": post.date,
    "mainEntityOfPage": { "@type": "WebPage", "@id": canonicalUrl },
    "image": post.image || "https://lifescore-ten.vercel.app/og-default.png"
  };

  return (
    <div className="article-page">
      <SEO
        title={post.title}
        description={post.deck}
        url={canonicalUrl}
        image={post.image}
        type="article"
      >
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
      </SEO>
      {/* Reading Progress Bar */}
      <div 
        className="reading-progress-bar" 
        style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          height: '4px', 
          background: 'var(--teal)', 
          width: `${scrollProgress}%`, 
          zIndex: 1060,
          transition: 'width 0.1s ease'
        }} 
      />

      <article className="py-5">
        <div className="container">
          <div className="row g-5">
            {/* Main content */}
            <div className="col-lg-8">
              <header className="mb-5">
                <CatTag cat={post.cat} color={post.catColor} bg={post.catBg} style={{ marginBottom: '1rem' }} />
                <h1 className="ls-heading mb-3" style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', lineHeight: 1.1 }}>
                  {post.title}
                </h1>
                <p className="ls-text-muted fs-4 mb-4" style={{ fontFamily: 'var(--serif2)', fontWeight: 400 }}>
                  {post.deck}
                </p>
                <hr className="my-4" />
                <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
                  <Byline author={post.author} avatar={post.avatar} date={post.date} readTime={post.readTime} />
                  <div className="d-flex gap-2 align-items-center">
                    <span className="text-muted small fw-semibold me-2"><i className="bi bi-calendar-check me-1"></i>Updated {post.date}</span>
                    <button className="ls-btn ls-btn-outline px-3 py-2" aria-label="Share this article"><i className="bi bi-share" aria-hidden="true"></i></button>
                    <BookmarkButton itemType="article" title={post.title} slug={`/article/${post.slug}`} />
                  </div>
                </div>
                <div className="mt-3 p-2 px-3 rounded-2 small" style={{ background: "var(--cream2)", border: "1px solid var(--border)", color: "var(--ink3)" }}>
                  <i className="bi bi-shield-check text-teal me-2"></i>
                  <strong>Editorial Integrity:</strong> This guide has been verified for factual accuracy and adheres to our <Link to="/editorial-policy" className="text-teal text-decoration-none fw-bold">Editorial Policy</Link>.
                </div>
              </header>

              {post.image ? (
                <div className="article-hero-img-container mb-5 overflow-hidden rounded-4 shadow-sm border" style={{ maxHeight: '500px' }}>
                  <img src={post.image} alt={post.title} className="w-100 h-100 object-fit-cover" />
                  <div className="p-2 px-3 bg-light border-top extra-small text-muted italic">
                    <i className="bi bi-camera me-1"></i> LifeScore Visual Intelligence: {post.title} (Simulated Analysis)
                  </div>
                </div>
              ) : (
                <div 
                  className="article-hero-img rounded-4 mb-5" 
                  style={{ 
                    background: post.bg, 
                    height: '400px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    fontSize: '6rem' 
                  }}
                >
                  {post.icon}
                </div>
              )}

              {post.highlights && (
                <div className="row g-3 mb-5">
                  {post.highlights.map((h, i) => (
                    <div key={i} className="col-md-4">
                      <DataHighlight {...h} />
                    </div>
                  ))}
                </div>
              )}

              <div className="article-content ls-text-muted" style={{ fontSize: '1.15rem', lineHeight: 1.8 }}>
                <p>
                  In the rapidly evolving financial landscape of 2026, managing your money effectively requires more than just traditional wisdom. 
                  As inflation fluctuates and new digital asset classes emerge, the strategy outlined in <strong>"{post.title}"</strong> 
                  provides a critical roadmap for stability and growth.
                </p>
                
                {post.quote && (
                  <ExpertQuote 
                    quote={post.quote.text} 
                    author={post.quote.author} 
                    title={post.quote.title} 
                  />
                )}

                <h3 className="ls-heading ls-heading-md mt-5 mb-3">The Fundamentals of {post.cat}</h3>
                <p>
                  Most experts agree that the first step toward financial intelligence is awareness. By understanding the core mechanics of 
                  how money flows in and out of your accounts, you gain the "LifeScore" necessary to make informed decisions under pressure. 
                  Whether you are focused on {post.cat} or broader wealth building, the principles remain the same: discipline, 
                  automation, and continuous education.
                </p>

                <div className="ls-card p-4 my-5 bg-light border-0" style={{ borderLeft: '5px solid var(--teal) !important' }}>
                  <h5 className="ls-heading ls-heading-sm mb-2">Key Takeaway</h5>
                  <p className="mb-0 italic">"Financial freedom isn't about how much you earn, but how much you keep and how effectively that money works for you while you sleep."</p>
                </div>

                <h3 className="ls-heading ls-heading-md mt-5 mb-3">Implementation Strategy</h3>
                <p>
                  To apply these concepts effectively, we recommend starting with small, measurable "Micro-Actions." 
                  These daily habits build the psychological momentum needed for long-term success. Over the next 30 days, 
                  try to track every transaction related to {post.cat.toLowerCase()} and look for patterns of inefficiency.
                </p>

                {post.sources && <ArticleSource sources={post.sources} />}
                
                <RelatedToolCTA category={post.cat} />
              </div>

              <footer className="mt-5 pt-5 border-top">
                <div className="d-flex align-items-center gap-3 mb-4">
                  <div className="bg-teal text-white rounded-circle d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px', fontSize: '1.2rem', fontWeight: 700 }}>
                    {post.avatar}
                  </div>
                  <div>
                    <h6 className="ls-heading ls-heading-sm mb-0">Written by {post.author}</h6>
                    <span className="ls-text-muted small">Financial Columnist at LifeScore</span>
                  </div>
                </div>
                
                <div className="ls-card p-4 bg-navy text-white mt-4">
                  <h4 className="ls-heading mb-2 text-white">Enjoyed this guide?</h4>
                  <p className="opacity-75 mb-3">Subscribe to our newsletter and never miss a money move.</p>
                  <div className="d-flex flex-wrap gap-2">
                    <label htmlFor="article-newsletter-email" className="visually-hidden">Email address</label>
                    <input id="article-newsletter-email" type="email" name="email" placeholder="Your email" className="form-control flex-grow-1" style={{ minWidth: '200px', maxWidth: '300px' }} autoComplete="email" required />
                    <button type="submit" className="ls-btn ls-btn-teal">Join 10k+ Readers</button>
                  </div>
                </div>
              </footer>

              <section className="mt-5">
                <CrossLinks currentCategory={post.cat} />
              </section>
            </div>

            {/* Sidebar */}
            <div className="col-lg-4">
              <div className="sticky-top" style={{ top: '100px' }}>
                <Sidebar />
                <div className="ls-card p-4 mt-4">
                  <h5 className="ls-heading ls-heading-sm mb-3">Trending in {post.cat}</h5>
                  <ul className="list-unstyled mb-0">
                    {TRENDING.slice(0,3).map(t => (
                      <li key={t.id} className="mb-3">
                        <Link to={t.slug ? `/article/${t.slug}` : "/blog"} className="text-decoration-none text-dark fw-bold small hover-teal">{t.title}</Link>
                        <div className="ls-text-muted mt-1" style={{ fontSize: '0.7rem' }}>{t.time} read · {t.date}</div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
