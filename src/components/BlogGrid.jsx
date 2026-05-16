import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BLOG_POSTS } from "../data/mockData";
import CatTag from "./CatTag";
import Byline from "./Byline";
import Sidebar from "./Sidebar";
import BookmarkButton from "./BookmarkButton";

export default function BlogGrid() {
  const [activeTab, setActiveTab] = useState("All");
  const tabs = [
    "All",
    "Saving",
    "Investing",
    "Debt",
    "Real Estate",
    "Side Income",
    "Retirement",
    "Credit",
  ];
  const filtered =
    activeTab === "All"
      ? BLOG_POSTS.slice(2)
      : BLOG_POSTS.slice(2).filter((p) =>
          p.cat.toLowerCase().includes(activeTab.toLowerCase()),
        );
  return (
    <section className="py-4">
      <div className="container">
        <div className="row g-4">
          {/* MAIN CONTENT */}
          <div className="col-lg-8 d-flex flex-column">
            {/* Section header */}
            <div className="mb-3">
              <div className="section-divider mb-3"></div>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <div className="section-eyebrow">
                    <i className="bi bi-fire me-1"></i>Latest Stories
                  </div>
                  <h2 className="section-title-serif">
                    Personal Finance Guides
                  </h2>
                </div>
                <Link
                  to="/blog"
                  style={{
                    fontSize: "0.78rem",
                    color: "var(--accent)",
                    textDecoration: "none",
                    fontWeight: 600,
                  }}
                >
                  View all articles →
                </Link>
              </div>

              {/* Category tabs */}
              <div className="cat-tabs mb-4">
                {tabs.map((t) => (
                  <button
                    key={t}
                    className={`cat-tab ${activeTab === t ? "active" : ""}`}
                    onClick={() => setActiveTab(t)}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Top Editorial Card - Only show on 'All' tab */}
            {activeTab === "All" && (
              <div className="position-relative mb-4">
                <Link 
                  to="/article/2026-personal-finance-checklist"
                  className="blog-card-editorial rounded-3 text-decoration-none d-block h-100"
                  style={{
                    background: "var(--card-bg)",
                    cursor: "pointer"
                  }}
                >
                  <CatTag cat="Editor's Pick" color="#c0392b" bg="#fdf0ef" />
                  <h3
                    className="blog-card-title"
                    style={{
                      color: "var(--ink)",
                      fontFamily: "var(--serif)",
                      fontSize: "1.45rem",
                      fontWeight: 900,
                      marginBottom: "0.6rem",
                      paddingRight: "2rem"
                    }}
                  >
                    The Ultimate 2026 Personal Finance Checklist: 30 Moves to Make
                    This Year
                  </h3>
                  <p
                    className="blog-card-deck mb-3 text-muted"
                    style={{ fontSize: "0.88rem" }}
                  >
                    From maxing your retirement accounts to reviewing your insurance
                    coverage — here are the 30 financial moves that can transform
                    your net worth by December. Updated for 2026 tax rules, rate
                    changes, and new government programs.
                  </p>
                  <div className="d-flex align-items-center gap-3 flex-wrap">
                    <Byline
                      author="The LifeScore Team"
                      avatar="LS"
                      date="May 5, 2026"
                      readTime="15 min read"
                    />
                    <div className="d-flex gap-2 ms-auto">
                      <span
                        style={{
                          fontSize: "0.68rem",
                          padding: "0.2rem 0.6rem",
                          background: "var(--teal-light)",
                          color: "var(--teal)",
                          borderRadius: "3px",
                          fontWeight: 600,
                        }}
                      >
                        🔥 Trending
                      </span>
                      <span
                        style={{
                          fontSize: "0.68rem",
                          padding: "0.2rem 0.6rem",
                          background: "var(--navy-light)",
                          color: "var(--navy)",
                          borderRadius: "3px",
                          fontWeight: 600,
                        }}
                      >
                        📌 Pinned
                      </span>
                    </div>
                  </div>
                </Link>
                <div style={{ position: "absolute", top: "1rem", right: "1rem", zIndex: 10 }}>
                  <BookmarkButton itemType="article" title="The Ultimate 2026 Personal Finance Checklist: 30 Moves to Make This Year" slug="/article/2026-personal-finance-checklist" />
                </div>
              </div>
            )}

            {/* 2-column card grid */}
            {filtered.length === 0 && activeTab !== "All" && (
              <div className="text-center p-5" style={{ background: "var(--cream2)", borderRadius: "var(--radius)" }}>
                <i className="bi bi-journal-x text-muted" style={{ fontSize: "3rem", opacity: 0.5 }}></i>
                <h5 className="mt-3 text-muted">No articles found for "{activeTab}"</h5>
                <p className="small text-muted">Check back soon for new content in this category.</p>
              </div>
            )}
            
            {filtered.length > 0 && (
              <div className="row g-3 mb-4">
                {filtered.slice(0, 4).map((post) => (
                  <div className="col-sm-6" key={post.id}>
                    <div className="position-relative h-100">
                      <Link 
                        to={`/article/${post.slug}`}
                        className="blog-card text-decoration-none h-100 d-flex flex-column" 
                        style={{ cursor: "pointer", display: 'block' }}
                      >
                        <div className="blog-card-img overflow-hidden rounded-top-3">
                          {post.image ? (
                            <img src={post.image} alt={post.title} className="w-100 h-100 object-fit-cover" style={{ minHeight: "180px" }} />
                          ) : (
                            <div
                              className="blog-card-img-placeholder"
                              role="img"
                              aria-label={`Illustration for ${post.title}`}
                              style={{
                                background: post.bg,
                                minHeight: "140px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "2.5rem",
                              }}
                            >
                              {post.icon}
                            </div>
                          )}
                        </div>
                        <div className="blog-card-body flex-grow-1">
                          <CatTag
                            cat={post.cat}
                            color={post.catColor}
                            bg={post.catBg}
                          />
                          <h3 className="blog-card-title">{post.title}</h3>
                          <p className="blog-card-deck">{post.deck}</p>
                          <div className="blog-card-footer mt-auto">
                            <div
                              className="byline-avatar"
                              style={{
                                width: 22,
                                height: 22,
                                fontSize: "0.55rem",
                              }}
                            >
                              {post.avatar}
                            </div>
                            <span className="blog-card-author">{post.author}</span>
                            <span className="blog-card-read">{post.readTime}</span>
                          </div>
                        </div>
                      </Link>
                      <div style={{ position: "absolute", top: "0.5rem", right: "0.5rem", zIndex: 10 }}>
                        <BookmarkButton itemType="article" title={post.title} slug={`/article/${post.slug}`} className="shadow-sm" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}


                <div className="mb-3">
                  <div className="section-eyebrow mt-4">
                    <i className="bi bi-bookmark-star me-1"></i>In-Depth Guides
                  </div>
                  <h3
                    className="section-title-serif mb-3"
                    style={{ fontSize: "1.3rem" }}
                  >
                    Long Reads Worth Your Time
                  </h3>
                </div>
                {filtered.slice(4).map((post) => (
                  <div className="blog-card-featured position-relative" key={post.id}>
                    <Link to={`/article/${post.slug}`} className="text-decoration-none d-flex flex-column flex-sm-row gap-3 w-100">
                      <div className="featured-img flex-shrink-0 overflow-hidden rounded-3" style={{ width: "160px" }}>
                        {post.image ? (
                          <img src={post.image} alt={post.title} className="w-100 h-100 object-fit-cover" />
                        ) : (
                          <div
                            className="blog-card-img-placeholder"
                            role="img"
                            aria-label={`Illustration for ${post.title}`}
                            style={{
                              background: post.bg,
                              height: "100%",
                              minWidth: "140px",
                              minHeight: "110px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: "2rem",
                              borderRadius: 'var(--radius)'
                            }}
                          >
                            {post.icon}
                          </div>
                        )}
                      </div>
                      <div className="featured-body" style={{ paddingRight: "2rem" }}>
                        <CatTag
                          cat={post.cat}
                          color={post.catColor}
                          bg={post.catBg}
                          style={{ marginBottom: "0.4rem" }}
                        />
                        <h4 className="blog-card-title" style={{ color: "var(--ink)" }}>{post.title}</h4>
                        <p
                          className="blog-card-deck"
                          style={{
                            fontSize: "0.82rem",
                            color: "var(--ink2)",
                            marginBottom: "0.5rem",
                            WebkitLineClamp: 2,
                            display: "-webkit-box",
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}
                        >
                          {post.deck}
                        </p>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                            fontSize: "0.75rem",
                            color: "var(--ink3)",
                          }}
                        >
                          <span>{post.author}</span>
                          <span>·</span>
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                    </Link>
                    <div style={{ position: "absolute", top: "1rem", right: "1rem", zIndex: 10 }}>
                      <BookmarkButton itemType="article" title={post.title} slug={`/article/${post.slug}`} />
                    </div>
                  </div>
                ))}
              </>
            )}

          </div>

          {/* SIDEBAR */}
          <div className="col-lg-4">
            <Sidebar />
          </div>
        </div>
      </div>
    </section>
  );
}
