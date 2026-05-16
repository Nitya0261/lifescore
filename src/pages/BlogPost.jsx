import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { sanityClient } from '../sanityClient';
import { PortableText } from '@portabletext/react';
import SEO from '../components/SEO';
import NewsletterForm from '../components/NewsletterForm';
import CommentsSection from '../components/CommentsSection';
import BookmarkButton from '../components/BookmarkButton';
import RelatedToolCTA from '../components/RelatedToolCTA';

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [tocOpen, setTocOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const query = `{
      "post": *[_type == "blogPost" && slug.current == $slug][0]{
        title,
        "slug": slug.current,
        publishedAt,
        "authorName": author->name,
        "authorSlug": author->slug.current,
        "authorBio": author->bio,
        "authorImage": author->image.asset->url,
        category,
        body,
        seo
      }
    }`;

    sanityClient.fetch(query, { slug })
      .then((data) => {
        setPost(data.post);
        
        // If we found a post with a category, fetch related posts
        if (data.post && data.post.category) {
          const relatedQuery = `*[_type == "blogPost" && category == $category && slug.current != $slug][0...3]{
            title,
            "slug": slug.current,
            publishedAt
          }`;
          return sanityClient.fetch(relatedQuery, { category: data.post.category, slug });
        }
        return [];
      })
      .then((related) => {
        setRelatedPosts(related);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [slug]);

  // Extract TOC from Portable Text body
  const toc = post?.body ? post.body.filter(block => 
    block._type === 'block' && (block.style === 'h2' || block.style === 'h3')
  ).map(block => {
    const text = block.children.map(child => child.text).join('');
    const id = text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
    return { text, id, level: block.style };
  }) : [];

  // Custom PortableText components to add IDs to headings for anchor links
  const portableTextComponents = {
    block: {
      h2: ({ children }) => {
        const text = Array.isArray(children) ? children.join('') : children;
        const id = typeof text === 'string' ? text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '') : '';
        return <h2 id={id} className="mt-5 mb-3 fw-bold">{children}</h2>;
      },
      h3: ({ children }) => {
        const text = Array.isArray(children) ? children.join('') : children;
        const id = typeof text === 'string' ? text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '') : '';
        return <h3 id={id} className="mt-4 mb-2 fw-bold">{children}</h3>;
      }
    }
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-teal" role="status"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container py-5 text-center">
        <h2>Article not found</h2>
        <Link to="/" className="btn btn-dark mt-3">Back Home</Link>
      </div>
    );
  }

  // Generate JSON-LD for Google Rich Results
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.seo?.metaTitle || post.title,
    "description": post.seo?.metaDescription || "",
    "author": {
      "@type": "Person",
      "name": post.author || "LifeScore Team"
    },
    "datePublished": post.publishedAt,
  };

  return (
    <>
      <SEO 
        title={post.seo?.metaTitle || post.title} 
        description={post.seo?.metaDescription || `Read ${post.title} on LifeScore`}
        type="article"
      >
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </SEO>
      
      <div style={{ background: "var(--cream)", minHeight: "100vh", padding: "4rem 0" }}>
        <div className="container">
          <div className="row g-4 justify-content-center">
            {/* Main Content Column */}
            <div className="col-lg-8">
              <Link to="/" className="text-decoration-none text-muted mb-4 d-inline-block">
                <i className="bi bi-arrow-left me-2"></i>Back to Articles
              </Link>

              <div style={{ background: "var(--card-bg)", padding: "3rem", borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow)" }}>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div className="d-flex align-items-center gap-2">
                    <span className="badge" style={{ background: "var(--teal-light)", color: "var(--teal)" }}>{post.category || "Finance"}</span>
                    {post.authorName && (
                      <>
                        <span className="text-muted mx-1">•</span>
                        <Link to={`/author/${post.authorSlug}`} className="text-decoration-none" style={{ color: "var(--ink)", fontWeight: "600", fontSize: "0.85rem" }}>
                          {post.authorName}
                        </Link>
                      </>
                    )}
                    <span className="text-muted mx-1">•</span>
                    <span style={{ color: "var(--ink3)", fontSize: "0.85rem" }}>
                      Updated on {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>
                  
                  {/* Bookmark Button */}
                  <div className="d-flex gap-2">
                    <BookmarkButton 
                      itemType="article" 
                      title={post.title} 
                      slug={`/blog/${post.slug}`} 
                    />
                  </div>
                </div>

                <div className="mb-4 p-2 px-3 rounded-2 small" style={{ background: "var(--cream2)", border: "1px solid var(--border)", color: "var(--ink3)" }}>
                  <i className="bi bi-shield-check text-teal me-2"></i>
                  <strong>Accuracy Guarantee:</strong> This article follows our <Link to="/editorial-policy" className="text-teal text-decoration-none fw-bold">Editorial Standards</Link> for financial reporting.
                </div>
                
                <h1 style={{ fontFamily: "var(--serif)", fontWeight: 900, marginBottom: "2rem", color: "var(--ink)" }}>
                  {post.title}
                </h1>

                {/* Mobile TOC (Hidden on desktop) */}
                {toc.length > 0 && (
                  <div className="d-lg-none mb-4 p-3 rounded-3" style={{ background: "var(--cream2)", border: "1px solid var(--border)" }}>
                    <div 
                      className="d-flex justify-content-between align-items-center cursor-pointer" 
                      onClick={() => setTocOpen(!tocOpen)}
                      style={{ cursor: "pointer" }}
                    >
                      <h5 className="fw-bold mb-0" style={{ fontSize: "1.1rem" }}>Table of Contents</h5>
                      <i className={`bi bi-chevron-${tocOpen ? 'up' : 'down'}`}></i>
                    </div>
                    {tocOpen && (
                      <ul className="list-unstyled mt-3 mb-0">
                        {toc.map((item, idx) => (
                          <li key={idx} className="mb-2" style={{ paddingLeft: item.level === 'h3' ? '1rem' : '0' }}>
                            <a 
                              href={`#${item.id}`} 
                              className="text-decoration-none"
                              style={{ color: "var(--teal)", fontSize: item.level === 'h3' ? '0.9rem' : '0.95rem' }}
                              onClick={(e) => {
                                e.preventDefault();
                                document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                                setTocOpen(false);
                              }}
                            >
                              {item.text}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}

                <div className="portable-text-container" style={{ fontSize: "1.1rem", lineHeight: "1.8", color: "var(--ink2)" }}>
                  {post.body ? (
                    <PortableText value={post.body} components={portableTextComponents} />
                  ) : (
                    <p>Content is missing or not configured properly.</p>
                  )}
                </div>

                <RelatedToolCTA category={post.category} />

                <hr className="my-5" />
                <div className="p-4 mb-5" style={{ background: "var(--cream2)", borderRadius: "var(--radius-lg)", border: "1px solid var(--border)" }}>
                  <h4 className="fw-bold mb-2">Did you enjoy this article?</h4>
                  <p className="text-muted mb-4">Get our top 5 articles and one actionable finance tip delivered straight to your inbox every Monday.</p>
                  <NewsletterForm source="blog_post_footer" />
                </div>

                {/* Author Bio Section */}
                {post.authorName && (
                  <div className="author-bio-footer p-4 rounded-4 mb-5" style={{ border: "1px solid var(--border)", background: "var(--card-bg)" }}>
                    <div className="d-flex align-items-center gap-4 flex-wrap flex-sm-nowrap">
                      <div className="flex-shrink-0">
                        {post.authorImage ? (
                          <img src={post.authorImage} alt={post.authorName} style={{ width: "80px", height: "80px", borderRadius: "50%", objectFit: "cover", border: "4px solid var(--cream2)" }} />
                        ) : (
                          <div style={{ width: "80px", height: "80px", borderRadius: "50%", background: "var(--teal)", color: "#fff", display: "flex", alignItems: "center", justifyCenter: "center", fontSize: "2rem", fontWeight: 700 }}>
                            {post.authorName.charAt(0)}
                          </div>
                        )}
                      </div>
                      <div>
                        <h5 className="fw-bold mb-1" style={{ color: "var(--ink)" }}>About {post.authorName}</h5>
                        <p className="text-muted mb-3" style={{ fontSize: "0.95rem", lineHeight: 1.6 }}>
                          {post.authorBio || "Financial analyst and columnist at LifeScore, specializing in market trends and personal wealth growth strategies."}
                        </p>
                        <Link to={`/author/${post.authorSlug}`} className="btn btn-sm btn-outline-dark rounded-pill px-3">
                          View All Articles by {post.authorName}
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Comments Engine */}
                <CommentsSection slug={post.slug} />
                
                {/* Related Articles Section (Bottom) */}
                {relatedPosts.length > 0 && (
                  <div className="related-articles-bottom mt-5">
                    <h3 className="fw-bold mb-4" style={{ fontFamily: "var(--serif)" }}>Read Next</h3>
                    <div className="row g-3">
                      {relatedPosts.map(rp => (
                        <div className="col-md-6" key={rp.slug}>
                          <Link to={`/blog/${rp.slug}`} className="text-decoration-none">
                            <div className="card h-100 border-0" style={{ background: "var(--cream2)", transition: "transform 0.2s" }} onMouseOver={e => e.currentTarget.style.transform='translateY(-3px)'} onMouseOut={e => e.currentTarget.style.transform='none'}>
                              <div className="card-body">
                                <h6 className="fw-bold text-dark">{rp.title}</h6>
                                <small className="text-muted">{new Date(rp.publishedAt).toLocaleDateString()}</small>
                              </div>
                            </div>
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Sidebar Column */}
            <div className="col-lg-4 d-none d-lg-block">
              <div className="position-sticky" style={{ top: "80px" }}>
                
                {/* Desktop TOC */}
                {toc.length > 0 && (
                  <div className="card border-0 mb-4" style={{ background: "transparent" }}>
                    <div className="card-body p-0">
                      <h6 className="fw-bold text-uppercase text-muted mb-3" style={{ fontSize: "0.8rem", letterSpacing: "1px" }}>On This Page</h6>
                      <ul className="list-unstyled mb-0" style={{ borderLeft: "2px solid var(--border)", paddingLeft: "1rem" }}>
                        {toc.map((item, idx) => (
                          <li key={idx} className="mb-2" style={{ paddingLeft: item.level === 'h3' ? '1rem' : '0' }}>
                            <a 
                              href={`#${item.id}`} 
                              className="text-decoration-none text-muted toc-link"
                              style={{ fontSize: item.level === 'h3' ? '0.85rem' : '0.9rem', transition: "color 0.2s" }}
                              onClick={(e) => {
                                e.preventDefault();
                                document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                              }}
                              onMouseOver={e => e.currentTarget.style.color = "var(--teal)"}
                              onMouseOut={e => e.currentTarget.style.color = "var(--muted)"}
                            >
                              {item.text}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* "You might like" Sidebar Article (Just grabbing the first related or a default) */}
                {relatedPosts.length > 0 && (
                  <div className="card border-0 mb-4" style={{ background: "var(--card-bg)", boxShadow: "var(--shadow)", borderRadius: "var(--radius-lg)" }}>
                    <div className="card-body p-4">
                      <span className="badge mb-3" style={{ background: "var(--cream2)", color: "var(--ink)" }}>✨ You Might Like</span>
                      <h5 className="fw-bold mb-2">
                        <Link to={`/blog/${relatedPosts[0].slug}`} className="text-dark text-decoration-none">
                          {relatedPosts[0].title}
                        </Link>
                      </h5>
                      <p className="text-muted small mb-0">Continue reading this related guide...</p>
                    </div>
                  </div>
                )}

                {/* Sidebar Ad or Widget */}
                <div className="card border-0" style={{ background: "var(--teal-light)", borderRadius: "var(--radius-lg)" }}>
                  <div className="card-body p-4 text-center">
                    <h5 className="fw-bold text-teal mb-3">Calculate Your Net Worth</h5>
                    <p className="small text-muted mb-3">Find out exactly where you stand financially in 60 seconds.</p>
                    <Link to="/tools/net-worth-tracker" className="btn btn-sm w-100 text-white fw-bold" style={{ background: "var(--teal)" }}>
                      Launch Tool
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
