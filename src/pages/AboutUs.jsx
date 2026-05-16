import React from 'react';
import SEO from '../components/SEO';
import { Link } from 'react-router-dom';

export default function AboutUs() {
  const stats = [
    { label: "Monthly Active Readers", value: "120K+" },
    { label: "Community Members", value: "45K" },
    { label: "Financial Models Simulated", value: "2.4M" },
    { label: "Countries Reached", value: "140+" }
  ];

  const values = [
    { icon: "shield-check", title: "Complete Independence", desc: "We are proudly independent. No private equity mandates, no hidden bank incentives. Our loyalty belongs exclusively to our readers." },
    { icon: "graph-up-arrow", title: "Data-Driven Truths", desc: "Financial decisions should rely on math, not emotional hype. Every calculator and framework we build is rigorously backtested." },
    { icon: "heart-pulse", title: "Holistic Intelligence", desc: "Money is just fuel for living well. We bridge the gap between pure compounding returns and true psychological wellness." }
  ];

  const team = [
    { name: "Elena Rostova", role: "Founder & Chief Editor", bio: "Former algorithmic trader turned financial literacy advocate. Believes compounding habits beat raw alpha.", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80" },
    { name: "Marcus Vance", role: "VP of Product & Tools", bio: "Architect of the LifeScore Engine. 12+ years building enterprise quantitative portfolio analytics.", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80" },
    { name: "Siddharth Mehta", role: "Head of Behavioral Finance", bio: "Author and researcher mapping cognitive biases in consumer credit and generational wealth planning.", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80" }
  ];

  return (
    <>
      <SEO 
        title="About LifeScore - Bridging Finance & Life Intelligence" 
        description="Learn about the origins, mission, and independent data principles driving the LifeScore personal finance ecosystem."
      />

      {/* Hero Banner */}
      <section className="about-hero py-5" style={{ background: "linear-gradient(135deg, var(--navy) 0%, var(--ink) 100%)", color: "white" }}>
        <div className="container py-4 py-md-5 text-center">
          <span className="badge rounded-pill px-3 py-2 mb-3" style={{ background: "rgba(255,255,255,0.1)", color: "var(--teal-light)", letterSpacing: "1px" }}>
            OUR ORIGIN STORY
          </span>
          <h1 className="fw-bold mb-4" style={{ fontFamily: "var(--serif)", fontSize: "clamp(2.5rem, 6vw, 4.5rem)", letterSpacing: "-0.5px" }}>
            Decoding Financial Freedom.
          </h1>
          <p className="mx-auto text-light opacity-75 mb-0" style={{ maxWidth: "750px", fontSize: "clamp(1.1rem, 2.5vw, 1.35rem)", lineHeight: "1.7" }}>
            Founded in 2024, LifeScore emerged from a singular conviction: existing financial media was optimized for clicks, not clarity. We set out to build an institutional-grade, completely accessible wealth navigation engine for daily life.
          </p>
        </div>
      </section>

      {/* Stats Ribbon */}
      <section className="stats-ribbon py-4" style={{ background: "var(--teal)", color: "white" }}>
        <div className="container">
          <div className="row g-4 text-center justify-content-center">
            {stats.map((s, idx) => (
              <div className="col-6 col-md-3" key={idx}>
                <div className="fw-bold mb-1" style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", letterSpacing: "-1px" }}>{s.value}</div>
                <div className="small text-uppercase opacity-75 fw-semibold" style={{ letterSpacing: "0.5px" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Mission & Philosophy */}
      <section className="py-5" style={{ background: "var(--cream)" }}>
        <div className="container py-4">
          <div className="row justify-content-center mb-5">
            <div className="col-lg-8 text-center">
              <h2 className="fw-bold mb-3" style={{ fontFamily: "var(--serif)", color: "var(--ink)", fontSize: "clamp(2rem, 4vw, 2.8rem)" }}>Our Guiding Principles</h2>
              <p className="text-muted fs-5">We hold ourselves to absolute standards of objective analysis and community empowerment. Every guide is bound by our <Link to="/editorial-policy" className="text-teal text-decoration-none fw-bold">Editorial Policy</Link>.</p>
            </div>
          </div>

          <div className="row g-4">
            {values.map((v, i) => (
              <div className="col-md-4" key={i}>
                <div className="card h-100 border-0 p-4 p-sm-5 shadow-sm" style={{ borderRadius: "var(--radius-lg)", background: "var(--card-bg)" }}>
                  <div className="icon-wrapper mb-4 d-flex align-items-center justify-content-center rounded-circle" style={{ width: "60px", height: "60px", background: "var(--teal-light)", color: "var(--teal)", fontSize: "1.5rem" }}>
                    <i className={`bi bi-${v.icon}`}></i>
                  </div>
                  <h4 className="fw-bold mb-3" style={{ color: "var(--ink)" }}>{v.title}</h4>
                  <p className="text-muted mb-0" style={{ lineHeight: "1.7" }}>{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial Leadership */}
      <section className="py-5 bg-white">
        <div className="container py-4">
          <div className="row justify-content-center mb-5">
            <div className="col-lg-8 text-center">
              <h2 className="fw-bold mb-3" style={{ fontFamily: "var(--serif)", color: "var(--ink)" }}>Editorial Leadership</h2>
              <p className="text-muted fs-5">Meet the quantitative minds, behavioral scientists, and financial columnists steering the platform.</p>
            </div>
          </div>

          <div className="row g-4 justify-content-center">
            {team.map((member, i) => (
              <div className="col-md-4" key={i}>
                <div className="card border-0 text-center h-100">
                  <div className="position-relative mx-auto mb-4 overflow-hidden rounded-circle shadow-sm" style={{ width: "160px", height: "160px" }}>
                    <img src={member.img} alt={member.name} className="w-100 h-100 object-fit-cover" />
                  </div>
                  <h4 className="fw-bold mb-1" style={{ color: "var(--ink)" }}>{member.name}</h4>
                  <div className="text-teal fw-semibold mb-3 small">{member.role}</div>
                  <p className="text-muted px-3 mb-0" style={{ fontSize: "0.95rem", lineHeight: "1.6" }}>{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Movement Callout */}
      <section className="py-5" style={{ background: "var(--card-bg)", borderTop: "1px solid rgba(0,0,0,0.05)" }}>
        <div className="container text-center py-4">
          <h3 className="fw-bold mb-3" style={{ fontFamily: "var(--serif)", color: "var(--ink)" }}>Ready to elevate your personal trajectory?</h3>
          <p className="text-muted mb-4 max-w-xl mx-auto fs-5">Access our free premium calculators, custom dashboards, and daily insights.</p>
          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <Link to="/tools" className="btn btn-dark rounded-pill px-4 py-2 fw-bold">Explore Core Tools</Link>
            <Link to="/contact" className="btn btn-outline-secondary rounded-pill px-4 py-2 fw-bold">Get In Touch</Link>
          </div>
        </div>
      </section>
    </>
  );
}
