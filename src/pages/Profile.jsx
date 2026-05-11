import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import XPWidget from "../components/XPWidget";
import LifeScoreWidget from "../components/LifeScoreWidget";
import BurnoutWidget from "../components/BurnoutWidget";

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  if (!user || user.role === "guest" || user.role === "admin") {
    return (
      <div className="container py-5 text-center">
        <h2>Please log in as a User to view your dashboard.</h2>
        <button className="btn btn-primary mt-3" onClick={() => navigate("/login")}>Go to Login</button>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const tabs = [
    { id: "overview", label: "Overview", icon: "bi-grid-1x2" },
    { id: "achievements", label: "Achievements", icon: "bi-trophy" },
    { id: "bookmarks", label: "Bookmarks", icon: "bi-bookmark" },
    { id: "settings", label: "Settings", icon: "bi-gear" },
    { id: "billing", label: "Billing", icon: "bi-credit-card" }
  ];

  return (
    <div style={{ background: "var(--cream)", minHeight: "80vh", padding: "3rem 0" }}>
      <div className="container">
        
        {/* Top Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 style={{ fontFamily: "var(--serif)", fontWeight: 900, color: "var(--ink)", margin: 0 }}>
            My Dashboard
          </h1>
          <button className="btn btn-outline-danger btn-sm" onClick={handleLogout}>
            <i className="bi bi-box-arrow-right me-1"></i>Sign Out
          </button>
        </div>

        <div className="row g-4">
          {/* Sidebar */}
          <div className="col-lg-3 mb-4 mb-lg-0">
            {/* User Info Card */}
            <div style={{ background: "var(--card-bg)", padding: "1.5rem", borderRadius: "var(--radius-md)", boxShadow: "var(--shadow)", border: "1px solid var(--border)", textAlign: "center", marginBottom: "1.5rem" }}>
              <div 
                style={{ 
                  width: "80px", height: "80px", borderRadius: "50%", 
                  background: user.role === "premium" ? "var(--gold-light)" : "var(--teal-light)", 
                  color: user.role === "premium" ? "var(--gold)" : "var(--teal)", 
                  display: "flex", alignItems: "center", justifyContent: "center", 
                  fontSize: "2rem", margin: "0 auto 1rem" 
                }}
              >
                <i className={`bi ${user.role === "premium" ? "bi-star-fill" : "bi-person-fill"}`}></i>
              </div>
              <h4 style={{ fontFamily: "var(--serif)", fontWeight: 700, margin: 0 }}>
                Alex Johnson
              </h4>
              <p style={{ fontSize: "0.8rem", color: "var(--ink3)" }}>
                {user.role === "premium" ? "Pro Member" : "Standard User"}
              </p>
              
              {/* Profile Navigation */}
              <div className="d-flex flex-column gap-2 mt-4 text-start">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    style={{
                      background: activeTab === tab.id ? "var(--cream2)" : "transparent",
                      border: "none",
                      padding: "0.5rem 1rem",
                      borderRadius: "var(--radius)",
                      color: activeTab === tab.id ? "var(--ink)" : "var(--ink3)",
                      fontWeight: activeTab === tab.id ? 700 : 500,
                      textAlign: "left",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                      transition: "all 0.2s ease"
                    }}
                  >
                    <i className={`bi ${tab.icon}`}></i>
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <XPWidget />

            {/* Dashboard Quick Links */}
            <div style={{ background: "var(--card-bg)", padding: "1.2rem", borderRadius: "var(--radius-md)", boxShadow: "var(--shadow)", border: "1px solid var(--border)", marginTop: "1.5rem" }}>
              <p className="fw-bold small text-uppercase text-muted mb-2" style={{ letterSpacing: "1px" }}>Quick Links</p>
              <div className="d-flex flex-column gap-1">
                {[
                  { icon: "bi-bar-chart-line", label: "Budget Tracker", path: "/dashboard/budget" },
                  { icon: "bi-bookmark-heart", label: "Saved Articles", path: "/dashboard/saved" },
                  { icon: "bi-tools", label: "All Tools", path: "/tools" },
                  { icon: "bi-book", label: "Finance Glossary", path: "/glossary" },
                  { icon: "bi-person-badge", label: "Find an Advisor", path: "/find-advisor" },
                ].map(link => (
                  <a 
                    key={link.path}
                    href={link.path}
                    className="d-flex align-items-center gap-2 text-decoration-none py-1"
                    style={{ color: "var(--ink2)", fontSize: "0.9rem" }}
                  >
                    <i className={`bi ${link.icon}`}></i> {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="col-lg-9">
            {activeTab === "overview" && (
              <>
                {user.role === "premium" && (
                  <div style={{ background: "linear-gradient(135deg, var(--gold-light), #fff)", padding: "1.5rem", borderRadius: "var(--radius-md)", border: "1px solid rgba(212,160,23,0.3)", marginBottom: "2rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div>
                      <span style={{ color: "var(--gold)", fontWeight: 700, fontSize: "0.8rem", textTransform: "uppercase" }}>
                        <i className="bi bi-star-fill me-1"></i> Premium Active
                      </span>
                      <h4 style={{ margin: "0.5rem 0", fontFamily: "var(--serif)", fontWeight: 700 }}>Welcome to LifeScore Pro</h4>
                      <p style={{ margin: 0, fontSize: "0.9rem", color: "var(--ink)" }}>
                        You have full access to personalized AI advice, unlimited historical tracking, and ad-free guides.
                      </p>
                    </div>
                    <button className="btn btn-dark">Consult AI</button>
                  </div>
                )}

                <div className="row g-4">
                  <div className="col-md-6">
                    <div style={{ height: "450px" }}>
                      <LifeScoreWidget />
                    </div>
                  </div>
                  <div className="col-md-6 d-flex flex-column gap-4">
                    <div style={{ height: "215px" }}>
                      <BurnoutWidget />
                    </div>
                    <div style={{ background: "var(--card-bg)", padding: "1.5rem", borderRadius: "var(--radius-md)", border: "1px solid var(--border)", boxShadow: "var(--shadow)", flex: 1 }}>
                      <h5 style={{ fontFamily: "var(--serif)", fontWeight: 700, marginBottom: "1rem" }}>Recent Activity</h5>
                      <div className="d-flex flex-column gap-3">
                        <div className="d-flex gap-3 align-items-start">
                          <div style={{ background: "var(--teal-light)", color: "var(--teal)", padding: "0.5rem", borderRadius: "50%", display: "flex" }}>
                            <i className="bi bi-check2-circle"></i>
                          </div>
                          <div>
                            <div style={{ fontWeight: 600, fontSize: "0.9rem" }}>Completed "Review budget"</div>
                            <div style={{ fontSize: "0.75rem", color: "var(--ink3)" }}>2 hours ago • +20 XP</div>
                          </div>
                        </div>
                        <div className="d-flex gap-3 align-items-start">
                          <div style={{ background: "var(--accent-light)", color: "var(--accent)", padding: "0.5rem", borderRadius: "50%", display: "flex" }}>
                            <i className="bi bi-bookmark-plus"></i>
                          </div>
                          <div>
                            <div style={{ fontWeight: 600, fontSize: "0.9rem" }}>Saved article on 50/30/20 Rule</div>
                            <div style={{ fontSize: "0.75rem", color: "var(--ink3)" }}>Yesterday</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeTab === "achievements" && (
              <div style={{ background: "var(--card-bg)", padding: "2rem", borderRadius: "var(--radius-md)", boxShadow: "var(--shadow)", border: "1px solid var(--border)", minHeight: "500px" }}>
                <h3 style={{ fontFamily: "var(--serif)", fontWeight: 700, marginBottom: "1.5rem" }}>Community & Achievements</h3>
                
                <div style={{ background: "linear-gradient(135deg, var(--ink), var(--ink2))", color: "#fff", padding: "1.5rem", borderRadius: "var(--radius-md)", marginBottom: "2rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <h5 style={{ margin: 0, fontWeight: 700, fontFamily: "var(--serif)" }}>Your Global Rank</h5>
                    <p style={{ margin: "0.2rem 0 0 0", color: "rgba(255,255,255,0.7)", fontSize: "0.85rem" }}>Top 12% of all LifeScore users</p>
                  </div>
                  <div style={{ fontSize: "2rem", fontWeight: 900, color: "var(--gold)" }}>#14,202</div>
                </div>

                <h5 style={{ fontWeight: 700, marginBottom: "1rem" }}>Unlocked Badges</h5>
                <div className="row g-3 mb-4">
                  {[
                    { icon: "💰", title: "First $1k Saved", desc: "You saved your first $1,000", color: "var(--teal)" },
                    { icon: "🛡️", title: "Emergency Ready", desc: "3 months of expenses saved", color: "var(--accent)" },
                    { icon: "🧠", title: "Knowledge Seeker", desc: "Read 10 financial articles", color: "var(--navy)" }
                  ].map((badge, i) => (
                    <div className="col-md-4" key={i}>
                      <div style={{ border: `1px solid ${badge.color}`, borderRadius: "var(--radius)", padding: "1rem", textAlign: "center", height: "100%", background: "rgba(255,255,255,0.5)" }}>
                        <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>{badge.icon}</div>
                        <h6 style={{ fontWeight: 700, color: "var(--ink)", margin: 0 }}>{badge.title}</h6>
                        <p style={{ fontSize: "0.75rem", color: "var(--ink3)", margin: "0.5rem 0 0 0" }}>{badge.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <h5 style={{ fontWeight: 700, marginBottom: "1rem" }}>Locked Badges</h5>
                <div className="row g-3">
                  {[
                    { icon: "🔒", title: "Debt Free", desc: "Pay off all non-mortgage debt" },
                    { icon: "🔒", title: "Maxed Out", desc: "Max out your yearly IRA contribution" }
                  ].map((badge, i) => (
                    <div className="col-md-4" key={i}>
                      <div style={{ border: "1px dashed var(--border2)", borderRadius: "var(--radius)", padding: "1rem", textAlign: "center", height: "100%", opacity: 0.6 }}>
                        <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem", filter: "grayscale(100%)" }}>{badge.icon}</div>
                        <h6 style={{ fontWeight: 700, color: "var(--ink)", margin: 0 }}>{badge.title}</h6>
                        <p style={{ fontSize: "0.75rem", color: "var(--ink3)", margin: "0.5rem 0 0 0" }}>{badge.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "bookmarks" && (
              <div style={{ background: "var(--card-bg)", padding: "2rem", borderRadius: "var(--radius-md)", boxShadow: "var(--shadow)", border: "1px solid var(--border)", minHeight: "500px" }}>
                <h3 style={{ fontFamily: "var(--serif)", fontWeight: 700, marginBottom: "1.5rem" }}>Saved Articles</h3>
                <div className="d-flex flex-column gap-3">
                  {[1, 2, 3].map(i => (
                    <div key={i} style={{ display: "flex", gap: "1rem", padding: "1rem", border: "1px solid var(--border2)", borderRadius: "var(--radius)" }}>
                      <div style={{ width: "80px", height: "80px", background: "var(--cream2)", borderRadius: "var(--radius)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2rem" }}>
                        📚
                      </div>
                      <div style={{ flex: 1 }}>
                        <h5 style={{ fontWeight: 700, marginBottom: "0.3rem" }}>How to negotiate your salary in 2026</h5>
                        <p style={{ fontSize: "0.85rem", color: "var(--ink3)", marginBottom: "0.5rem" }}>Learn the exact scripts and strategies to increase your total compensation package...</p>
                        <button style={{ background: "transparent", border: "none", color: "var(--accent)", fontSize: "0.8rem", padding: 0 }}><i className="bi bi-trash"></i> Remove</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "settings" && (
              <div style={{ background: "var(--card-bg)", padding: "2rem", borderRadius: "var(--radius-md)", boxShadow: "var(--shadow)", border: "1px solid var(--border)", minHeight: "500px" }}>
                <h3 style={{ fontFamily: "var(--serif)", fontWeight: 700, marginBottom: "1.5rem" }}>Profile Settings</h3>
                <form>
                  <div className="row g-3 mb-4">
                    <div className="col-md-6">
                      <label className="form-label" style={{ fontSize: "0.85rem", fontWeight: 600 }}>First Name</label>
                      <input type="text" className="form-control" defaultValue="Alex" />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label" style={{ fontSize: "0.85rem", fontWeight: 600 }}>Last Name</label>
                      <input type="text" className="form-control" defaultValue="Johnson" />
                    </div>
                    <div className="col-12">
                      <label className="form-label" style={{ fontSize: "0.85rem", fontWeight: 600 }}>Email Address</label>
                      <input type="email" className="form-control" defaultValue="alex.j@example.com" />
                    </div>
                  </div>
                  
                  <h5 style={{ fontWeight: 700, marginBottom: "1rem" }}>Preferences</h5>
                  <div className="form-check form-switch mb-3">
                    <input className="form-check-input" type="checkbox" role="switch" id="notif1" defaultChecked />
                    <label className="form-check-label" htmlFor="notif1">Weekly LifeScore Report emails</label>
                  </div>
                  <div className="form-check form-switch mb-4">
                    <input className="form-check-input" type="checkbox" role="switch" id="notif2" defaultChecked />
                    <label className="form-check-label" htmlFor="notif2">Market Volatility Alerts</label>
                  </div>

                  <button type="button" className="btn btn-dark">Save Changes</button>
                </form>
              </div>
            )}

            {activeTab === "billing" && (
              <div style={{ background: "var(--card-bg)", padding: "2rem", borderRadius: "var(--radius-md)", boxShadow: "var(--shadow)", border: "1px solid var(--border)", minHeight: "500px" }}>
                <h3 style={{ fontFamily: "var(--serif)", fontWeight: 700, marginBottom: "1.5rem" }}>Billing & Plan</h3>
                
                <div style={{ border: "1px solid var(--border)", borderRadius: "var(--radius-md)", padding: "1.5rem", marginBottom: "2rem" }}>
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div>
                      <h4 style={{ margin: 0, fontWeight: 700 }}>{user.role === "premium" ? "LifeScore Pro" : "LifeScore Basic"}</h4>
                      <p style={{ color: "var(--ink3)", margin: "0.5rem 0 0 0" }}>
                        {user.role === "premium" ? "Billed $9.99/month. Next charge on June 15, 2026." : "You are currently on the free plan."}
                      </p>
                    </div>
                    {user.role === "premium" ? (
                      <span className="badge bg-success">Active</span>
                    ) : (
                      <span className="badge bg-secondary">Free</span>
                    )}
                  </div>
                  {user.role === "premium" ? (
                    <div className="d-flex gap-2">
                      <button className="btn btn-outline-dark btn-sm">Update Payment Method</button>
                      <button className="btn btn-outline-danger btn-sm">Cancel Plan</button>
                    </div>
                  ) : (
                    <button className="btn btn-dark">Upgrade to Pro</button>
                  )}
                </div>

                <h5 style={{ fontWeight: 700, marginBottom: "1rem" }}>Billing History</h5>
                {user.role === "premium" ? (
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Amount</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>May 15, 2026</td>
                        <td>$9.99</td>
                        <td><span style={{ color: "var(--teal)", fontWeight: 600 }}>Paid</span></td>
                      </tr>
                      <tr>
                        <td>Apr 15, 2026</td>
                        <td>$9.99</td>
                        <td><span style={{ color: "var(--teal)", fontWeight: 600 }}>Paid</span></td>
                      </tr>
                    </tbody>
                  </table>
                ) : (
                  <p style={{ color: "var(--ink3)" }}>No billing history available.</p>
                )}
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
