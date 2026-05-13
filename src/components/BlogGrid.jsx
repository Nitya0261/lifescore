import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BLOG_POSTS } from "../data/mockData";
import CatTag from "./CatTag";
import Byline from "./Byline";
import AdSlot from "./AdSlot";
import Sidebar from "./Sidebar";

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
          <div className="col-lg-8">
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
                <a
                  href="#"
                  style={{
                    fontSize: "0.78rem",
                    color: "var(--accent)",
                    textDecoration: "none",
                    fontWeight: 600,
                  }}
                >
                  View all articles →
                </a>
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

            {/* Top Editorial Card */}
            <Link 
              to="/article/2026-personal-finance-checklist"
              className="blog-card-editorial rounded-3 mb-4 text-decoration-none d-block"
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

            {/* 2-column card grid */}
            <div className="row g-3 mb-4">
              {filtered.slice(0, 4).map((post) => (
                <div className="col-sm-6" key={post.id}>
                  <Link 
                    to={`/article/${post.slug}`}
                    className="blog-card text-decoration-none" 
                    style={{ cursor: "pointer", display: 'block' }}
                  >
                    <div className="blog-card-img">
                      <div
                        className="blog-card-img-placeholder"
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
                    </div>
                    <div className="blog-card-body">
                      <CatTag
                        cat={post.cat}
                        color={post.catColor}
                        bg={post.catBg}
                      />
                      <h3 className="blog-card-title">{post.title}</h3>
                      <p className="blog-card-deck">{post.deck}</p>
                      <div className="blog-card-footer">
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
                </div>
              ))}
            </div>

            {/* Ad Slot */}
            <AdSlot
              type="leaderboard"
              label="Advertisement — Google AdSense 728×90"
            />

            {/* Featured Horizontal Cards */}
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
              <div className="blog-card-featured" key={post.id}>
                <Link to={`/article/${post.slug}`} className="text-decoration-none d-flex gap-3 w-100">
                  <div className="featured-img" style={{ flexShrink: 0 }}>
                    <div
                      className="blog-card-img-placeholder"
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
                  </div>
                  <div className="featured-body">
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
              </div>
            ))}

            {/* Newsletter CTA */}
            <div
              className="rounded-3 p-4 mt-4"
              style={{
                background: "linear-gradient(135deg, #0f1923 0%, #1a3a5c 100%)",
                color: "#fff",
                border: "none",
              }}
            >
              <div className="row align-items-center g-3">
                <div className="col-md-7">
                  <h4
                    style={{
                      fontFamily: "var(--serif)",
                      fontSize: "1.2rem",
                      fontWeight: 900,
                      marginBottom: "0.3rem",
                    }}
                  >
                    Get Smarter About Money — Free
                  </h4>
                  <p
                    style={{
                      fontSize: "0.8rem",
                      color: "rgba(255,255,255,0.65)",
                      marginBottom: 0,
                      lineHeight: 1.6,
                    }}
                  >
                    Join 120,000+ readers who get our weekly finance digest: no
                    spam, no fluff — just the best money moves of the week.
                  </p>
                </div>
                <div className="col-md-5">
                  <div className="d-flex gap-2">
                    <input
                      type="email"
                      placeholder="Your email address"
                      className="form-control"
                      style={{
                        fontSize: "0.82rem",
                        borderRadius: "4px",
                        border: "none",
                      }}
                    />
                    <button
                      className="subscribe-btn"
                      style={{
                        borderRadius: "4px",
                        whiteSpace: "nowrap",
                        flexShrink: 0,
                      }}
                    >
                      Subscribe
                    </button>
                  </div>
                </div>
              </div>
            </div>
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
