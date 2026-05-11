import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { sanityClient } from '../sanityClient';
import { PortableText } from '@portabletext/react';
import SEO from '../components/SEO';

export default function AuthorProfile() {
  const { slug } = useParams();
  const [author, setAuthor] = useState(null);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // GROQ Query to fetch author details and their articles
    const query = `{
      "author": *[_type == "author" && slug.current == $slug][0]{
        name,
        "slug": slug.current,
        "imageUrl": photo.asset->url,
        bio,
        expertiseAreas,
        socialLinks
      },
      "articles": *[_type == "blogPost" && author->slug.current == $slug] | order(publishedAt desc) {
        title,
        "slug": slug.current,
        publishedAt,
        category,
        "excerpt": array::join(string::split((pt::text(body)), "")[0..120], "") + "..."
      }
    }`;

    sanityClient.fetch(query, { slug })
      .then((data) => {
        setAuthor(data.author);
        setArticles(data.articles || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="container py-5 text-center" style={{ minHeight: "60vh" }}>
        <div className="spinner-border text-teal" role="status"></div>
      </div>
    );
  }

  if (!author) {
    return (
      <div className="container py-5 text-center" style={{ minHeight: "60vh" }}>
        <h2 className="fw-bold">Author Not Found</h2>
        <p className="text-muted">We couldn't find the profile you're looking for.</p>
        <Link to="/" className="btn btn-dark mt-3">Back to Articles</Link>
      </div>
    );
  }

  // Generate JSON-LD Person schema for E-E-A-T and SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": author.name,
    "description": author.bio ? author.bio.map(b => b.children[0].text).join(' ') : "",
    "url": window.location.href,
    "sameAs": author.socialLinks ? [author.socialLinks.twitter, author.socialLinks.linkedin].filter(Boolean) : []
  };

  return (
    <>
      <SEO 
        title={`${author.name} | Financial Expert at LifeScore`} 
        description={`Read articles and expert financial advice from ${author.name}.`}
        type="profile"
      >
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </SEO>
      
      <div style={{ background: "var(--cream)", minHeight: "100vh", padding: "4rem 0" }}>
        <div className="container">
          
          {/* Author Bio Header */}
          <div className="row justify-content-center mb-5">
            <div className="col-lg-8">
              <div className="card border-0 overflow-hidden" style={{ background: "var(--card-bg)", borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow)" }}>
                <div className="card-body p-4 p-md-5">
                  <div className="row align-items-center">
                    <div className="col-md-3 text-center mb-4 mb-md-0">
                      {author.imageUrl ? (
                        <img 
                          src={author.imageUrl} 
                          alt={author.name} 
                          className="rounded-circle img-fluid"
                          style={{ width: "120px", height: "120px", objectFit: "cover", border: "4px solid var(--teal-light)" }}
                        />
                      ) : (
                        <div 
                          className="rounded-circle d-flex align-items-center justify-content-center mx-auto" 
                          style={{ width: "120px", height: "120px", background: "var(--teal)", color: "white", fontSize: "3rem", fontWeight: "bold", border: "4px solid var(--teal-light)" }}
                        >
                          {author.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div className="col-md-9 text-center text-md-start">
                      <h1 className="fw-bold mb-2" style={{ fontFamily: "var(--serif)", color: "var(--ink)" }}>{author.name}</h1>
                      
                      {author.expertiseAreas && author.expertiseAreas.length > 0 && (
                        <div className="mb-3 d-flex flex-wrap gap-2 justify-content-center justify-content-md-start">
                          {author.expertiseAreas.map((area, idx) => (
                            <span key={idx} className="badge" style={{ background: "var(--cream2)", color: "var(--ink2)", border: "1px solid var(--border)" }}>
                              {area}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="text-muted mb-3" style={{ lineHeight: "1.6", fontSize: "0.95rem" }}>
                        {author.bio ? <PortableText value={author.bio} /> : "Financial expert and writer."}
                      </div>

                      {author.socialLinks && (
                        <div className="d-flex gap-3 justify-content-center justify-content-md-start">
                          {author.socialLinks.twitter && (
                            <a href={author.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-decoration-none" style={{ color: "#1DA1F2" }}>
                              <i className="bi bi-twitter fs-5"></i>
                            </a>
                          )}
                          {author.socialLinks.linkedin && (
                            <a href={author.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-decoration-none" style={{ color: "#0A66C2" }}>
                              <i className="bi bi-linkedin fs-5"></i>
                            </a>
                          )}
                          {author.socialLinks.website && (
                            <a href={author.socialLinks.website} target="_blank" rel="noopener noreferrer" className="text-decoration-none text-muted">
                              <i className="bi bi-globe fs-5"></i>
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Author's Articles List */}
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <h3 className="fw-bold mb-4" style={{ fontFamily: "var(--serif)" }}>Articles by {author.name}</h3>
              
              {articles.length === 0 ? (
                <p className="text-muted">No articles published yet.</p>
              ) : (
                <div className="d-flex flex-column gap-4">
                  {articles.map((article) => (
                    <div key={article.slug} className="card border-0" style={{ background: "var(--card-bg)", borderRadius: "var(--radius-lg)", transition: "transform 0.2s" }} onMouseOver={e => e.currentTarget.style.transform='translateY(-3px)'} onMouseOut={e => e.currentTarget.style.transform='none'}>
                      <div className="card-body p-4">
                        <div className="d-flex align-items-center gap-2 mb-2">
                          <span className="badge" style={{ background: "var(--teal-light)", color: "var(--teal)" }}>{article.category || "Finance"}</span>
                          <span style={{ color: "var(--ink3)", fontSize: "0.85rem" }}>
                            {new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </span>
                        </div>
                        <h4 className="fw-bold mb-2">
                          <Link to={`/blog/${article.slug}`} className="text-dark text-decoration-none stretched-link">
                            {article.title}
                          </Link>
                        </h4>
                        <p className="text-muted mb-0">{article.excerpt}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
