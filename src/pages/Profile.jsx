import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import XPWidget from "../components/XPWidget";
import LifeScoreWidget from "../components/LifeScoreWidget";
import BurnoutWidget from "../components/BurnoutWidget";
import API_BASE_URL from "../config/api";

export default function Profile() {
  const { user, logout, token, xpLog, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [profileData, setProfileData] = useState(null);
  const [savedArticles, setSavedArticles] = useState([]);
  const [twoFactorState, setTwoFactorState] = useState("disabled"); // 'disabled', 'setup', 'enabled'
  const [verificationCode, setVerificationCode] = useState("");
  const [copiedSecret, setCopiedSecret] = useState(false);
  const fileInputRef = useRef(null);

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (updateUserProfile) {
          updateUserProfile({ avatarUrl: reader.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePhotoRemove = () => {
    if (updateUserProfile) {
      updateUserProfile({ avatarUrl: null });
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  useEffect(() => {
    const fetchMe = async () => {
      if (!token) return;
      try {
        const res = await fetch(`${API_BASE_URL}/api/user/me`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        if (res.ok && data) {
          if (data.isSuspended) {
            alert("Your account has been suspended by an Administrator.");
            logout();
            navigate("/");
            return;
          }
          setProfileData(data);
        }
      } catch (err) {
        console.error("Failed to fetch live profile data:", err);
      }
    };
    fetchMe();
  }, [token, logout, navigate]);

  useEffect(() => {
    const fetchBookmarks = async () => {
      if (!user?.id) return;
      try {
        const res = await fetch(`${API_BASE_URL}/api/bookmarks/${user.id}`);
        if (res.ok) {
          const data = await res.json();
          setSavedArticles(data);
          return;
        }
        throw new Error("Backend response not ok");
      } catch (err) {
        console.warn("Backend offline, falling back to local simulation:", err.message);
        if (user.bookmarks && Array.isArray(user.bookmarks)) {
          const fallbackData = user.bookmarks.map(b => {
            if (typeof b === 'string') {
              const guessedTitle = b.split('/').pop().replace(/-/g, ' ');
              return { 
                _id: b, 
                slug: b, 
                title: guessedTitle.charAt(0).toUpperCase() + guessedTitle.slice(1), 
                itemType: b.includes('tool') ? 'tool' : 'article', 
                createdAt: new Date().toISOString() 
              };
            }
            return b;
          });
          setSavedArticles(fallbackData);
        }
      }
    };
    if (activeTab === "bookmarks") {
      fetchBookmarks();
    }
  }, [user?.id, activeTab]);

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

  const displayName = profileData 
    ? `${profileData.firstName} ${profileData.lastName}` 
    : (user?.firstName ? `${user.firstName} ${user.lastName}` : "Alex Johnson");

  const displayEmail = profileData?.email || user?.email || "alex.j@example.com";

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
                {displayName}
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

                <div className="row g-4 align-items-stretch">
                  <div className="col-md-6">
                    <div className="h-100" style={{ minHeight: "450px" }}>
                      <LifeScoreWidget />
                    </div>
                  </div>
                  <div className="col-md-6 d-flex flex-column gap-4 justify-content-between">
                    <div style={{ flex: "0 0 auto" }}>
                      <BurnoutWidget />
                    </div>
                    <div className="d-flex flex-column justify-content-center" style={{ background: "var(--card-bg)", padding: "1.5rem", borderRadius: "var(--radius-md)", border: "1px solid var(--border)", boxShadow: "var(--shadow)", flex: "1 1 auto" }}>
                      <h5 style={{ fontFamily: "var(--serif)", fontWeight: 700, marginBottom: "1rem" }}>Recent Activity</h5>
                      <div className="d-flex flex-column gap-3">
                        {(!xpLog || xpLog.length === 0) ? (
                          <div className="text-muted text-center" style={{ fontSize: "0.85rem" }}>
                            No recent activity yet. Explore the platform to earn XP!
                          </div>
                        ) : (
                          xpLog.slice(0, 3).map((logItem, index) => (
                            <div key={logItem.id || index} className="d-flex gap-3 align-items-start">
                              <div style={{ background: "var(--teal-light)", color: "var(--teal)", padding: "0.5rem", borderRadius: "50%", display: "flex" }}>
                                <i className={logItem.reason?.toLowerCase().includes("save") || logItem.reason?.toLowerCase().includes("bookmark") ? "bi bi-bookmark-star" : "bi bi-check2-circle"}></i>
                              </div>
                              <div>
                                <div style={{ fontWeight: 600, fontSize: "0.9rem" }}>{logItem.reason}</div>
                                <div style={{ fontSize: "0.75rem", color: "var(--ink3)" }}>{logItem.timestamp} • +{logItem.amount} XP</div>
                              </div>
                            </div>
                          ))
                        )}
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
                <h3 style={{ fontFamily: "var(--serif)", fontWeight: 700, marginBottom: "1.5rem" }}>Saved Articles & Tools</h3>
                <div className="d-flex flex-column gap-3">
                  {savedArticles.length > 0 ? savedArticles.map((article, idx) => (
                    <div key={idx} style={{ display: "flex", gap: "1rem", padding: "1rem", border: "1px solid var(--border2)", borderRadius: "var(--radius)", background: "var(--card-bg)", transition: "all 0.2s ease" }} className="hover-lift">
                      <div style={{ width: "80px", height: "80px", background: "var(--cream2)", borderRadius: "var(--radius)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2rem" }}>
                        {article.itemType === 'tool' ? '🛠️' : '📚'}
                      </div>
                      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                        <h5 style={{ fontWeight: 700, marginBottom: "0.3rem" }}>
                          {article.slug.startsWith('http') ? (
                            <a href={article.slug} target="_blank" rel="noopener noreferrer" style={{ color: "var(--ink)", textDecoration: "none" }} className="hover-underline">
                              {article.title}
                            </a>
                          ) : (
                            <Link to={article.slug} style={{ color: "var(--ink)", textDecoration: "none" }} className="hover-underline">
                              {article.title}
                            </Link>
                          )}
                        </h5>
                        <p style={{ fontSize: "0.85rem", color: "var(--ink3)", marginBottom: 0 }}>
                          Added {new Date(article.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        {article.slug.startsWith('http') ? (
                          <a href={article.slug} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-dark rounded-pill px-3">Open <i className="bi bi-arrow-right ms-1"></i></a>
                        ) : (
                          <Link to={article.slug} className="btn btn-sm btn-outline-dark rounded-pill px-3">Open <i className="bi bi-arrow-right ms-1"></i></Link>
                        )}
                        <button 
                          className="btn btn-sm btn-outline-danger rounded-pill"
                          onClick={async () => {
                            try {
                              const res = await fetch(`${API_BASE_URL}/api/bookmarks/toggle`, {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ userId: user.id, itemType: article.itemType, title: article.title, slug: article.slug })
                              });
                              if (!res.ok) throw new Error("Backend delete failed");
                              setSavedArticles(prev => prev.filter(a => a._id !== article._id));
                            } catch (e) {
                              console.warn("Backend offline, applying local deletion:", e.message);
                              setSavedArticles(prev => prev.filter(a => a._id !== article._id));
                              if (updateUserProfile && user?.bookmarks) {
                                const nextBookmarks = user.bookmarks.filter(b => (typeof b === 'string' ? b !== article.slug : b.slug !== article.slug));
                                updateUserProfile({ bookmarks: nextBookmarks });
                              }
                            }
                          }}
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </div>
                    </div>
                  )) : (
                    <div className="text-center py-5 text-muted" style={{ border: "1px dashed var(--border2)", borderRadius: "var(--radius)" }}>
                      <i className="bi bi-heartbreak" style={{ fontSize: "3rem", opacity: 0.5, color: "var(--ink3)" }}></i>
                      <p className="mt-3 fw-bold">No saved items yet.</p>
                      <p className="small">Click the heart icon on any article or tool to save it here for quick access.</p>
                      <Link to="/" className="btn btn-sm btn-dark mt-2">Explore Content</Link>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === "settings" && (
              <div style={{ background: "var(--card-bg)", padding: "2.5rem", borderRadius: "var(--radius-md)", boxShadow: "var(--shadow)", border: "1px solid var(--border)", minHeight: "500px" }}>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h3 style={{ fontFamily: "var(--serif)", fontWeight: 700, margin: 0 }}>Account Settings</h3>
                  <span className="badge" style={{ background: "var(--cream2)", color: "var(--ink2)", border: "1px solid var(--border)" }}>Last updated: Today</span>
                </div>
                
                <form>
                  {/* Personal Information */}
                  <div className="mb-5">
                    <h5 style={{ fontWeight: 700, marginBottom: "1.2rem", color: "var(--ink)", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <i className="bi bi-person-badge text-teal"></i> Personal Information
                    </h5>
                    
                    <div className="d-flex align-items-center gap-4 mb-4 p-3 rounded-4" style={{ background: "var(--cream2)", border: "1px solid var(--border)" }}>
                      <div 
                        style={{ 
                          width: "70px", height: "70px", borderRadius: "50%", 
                          background: "var(--teal-light)", color: "var(--teal)", 
                          display: "flex", alignItems: "center", justifyContent: "center", 
                          fontSize: "1.8rem", fontWeight: "bold",
                          overflow: "hidden"
                        }}
                      >
                        {user?.avatarUrl ? (
                          <img src={user.avatarUrl} alt="Avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        ) : (
                          displayName.charAt(0)
                        )}
                      </div>
                      <div>
                        <h6 className="fw-bold mb-1">Profile Avatar</h6>
                        <p className="text-muted small mb-2">JPG, GIF or PNG. Max size of 5MB.</p>
                        <div className="d-flex gap-2">
                          <input 
                            type="file" 
                            accept="image/*" 
                            ref={fileInputRef} 
                            style={{ display: "none" }} 
                            onChange={handlePhotoUpload} 
                          />
                          <button 
                            type="button" 
                            className="btn btn-sm btn-dark px-3 rounded-pill"
                            onClick={() => fileInputRef.current?.click()}
                          >
                            Upload New
                          </button>
                          <button 
                            type="button" 
                            className="btn btn-sm btn-outline-danger px-3 rounded-pill"
                            onClick={handlePhotoRemove}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="row g-4">
                      <div className="col-md-6">
                        <label className="form-label text-muted small fw-bold text-uppercase" style={{ letterSpacing: "0.5px" }}>First Name</label>
                        <input type="text" className="form-control form-control-lg bg-transparent" defaultValue={profileData?.firstName || user?.firstName || "Alex"} style={{ fontSize: "0.95rem", borderColor: "var(--border2)" }} />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label text-muted small fw-bold text-uppercase" style={{ letterSpacing: "0.5px" }}>Last Name</label>
                        <input type="text" className="form-control form-control-lg bg-transparent" defaultValue={profileData?.lastName || user?.lastName || "Johnson"} style={{ fontSize: "0.95rem", borderColor: "var(--border2)" }} />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label text-muted small fw-bold text-uppercase" style={{ letterSpacing: "0.5px" }}>Email Address</label>
                        <input type="email" className="form-control form-control-lg bg-transparent" defaultValue={displayEmail} style={{ fontSize: "0.95rem", borderColor: "var(--border2)" }} />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label text-muted small fw-bold text-uppercase" style={{ letterSpacing: "0.5px" }}>Phone Number</label>
                        <input type="tel" className="form-control form-control-lg bg-transparent" placeholder="+1 (555) 000-0000" style={{ fontSize: "0.95rem", borderColor: "var(--border2)" }} />
                      </div>
                    </div>
                  </div>

                  <hr className="my-5" style={{ opacity: 0.1 }} />

                  {/* Localization & Preferences */}
                  <div className="mb-5">
                    <h5 style={{ fontWeight: 700, marginBottom: "1.2rem", color: "var(--ink)", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <i className="bi bi-globe-americas text-accent"></i> Localization & Display
                    </h5>
                    <div className="row g-4">
                      <div className="col-md-6">
                        <label className="form-label text-muted small fw-bold text-uppercase" style={{ letterSpacing: "0.5px" }}>Base Currency</label>
                        <select className="form-select form-select-lg bg-transparent" style={{ fontSize: "0.95rem", borderColor: "var(--border2)" }} defaultValue="USD">
                          <option value="USD">USD ($) - US Dollar</option>
                          <option value="EUR">EUR (€) - Euro</option>
                          <option value="GBP">GBP (£) - British Pound</option>
                          <option value="INR">INR (₹) - Indian Rupee</option>
                        </select>
                      </div>
                      <div className="col-md-6">
                        <label className="form-label text-muted small fw-bold text-uppercase" style={{ letterSpacing: "0.5px" }}>Timezone</label>
                        <select className="form-select form-select-lg bg-transparent" style={{ fontSize: "0.95rem", borderColor: "var(--border2)" }} defaultValue="EST">
                          <option value="EST">Eastern Time (EST)</option>
                          <option value="PST">Pacific Time (PST)</option>
                          <option value="GMT">Greenwich Mean Time (GMT)</option>
                          <option value="IST">Indian Standard Time (IST)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <hr className="my-5" style={{ opacity: 0.1 }} />

                  {/* Notifications */}
                  <div className="mb-5">
                    <h5 style={{ fontWeight: 700, marginBottom: "1.2rem", color: "var(--ink)", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <i className="bi bi-bell-fill text-warning"></i> Notification Preferences
                    </h5>
                    <div className="d-flex flex-column gap-3">
                      <div className="d-flex justify-content-between align-items-center p-3 rounded-4" style={{ border: "1px solid var(--border2)", background: "transparent" }}>
                        <div>
                          <h6 className="fw-bold mb-1">Weekly LifeScore Report</h6>
                          <p className="text-muted small mb-0">Get a personalized AI summary of your finances every Monday.</p>
                        </div>
                        <div className="form-check form-switch fs-5">
                          <input className="form-check-input" type="checkbox" role="switch" defaultChecked />
                        </div>
                      </div>
                      
                      <div className="d-flex justify-content-between align-items-center p-3 rounded-4" style={{ border: "1px solid var(--border2)", background: "transparent" }}>
                        <div>
                          <h6 className="fw-bold mb-1">Market Volatility Alerts</h6>
                          <p className="text-muted small mb-0">Receive instant push notifications during extreme market swings.</p>
                        </div>
                        <div className="form-check form-switch fs-5">
                          <input className="form-check-input" type="checkbox" role="switch" defaultChecked />
                        </div>
                      </div>

                      <div className="d-flex justify-content-between align-items-center p-3 rounded-4" style={{ border: "1px solid var(--border2)", background: "transparent" }}>
                        <div>
                          <h6 className="fw-bold mb-1">Goal Milestones</h6>
                          <p className="text-muted small mb-0">Celebrate when you hit 50%, 75%, and 100% of your savings goals.</p>
                        </div>
                        <div className="form-check form-switch fs-5">
                          <input className="form-check-input" type="checkbox" role="switch" defaultChecked />
                        </div>
                      </div>
                    </div>
                  </div>

                  <hr className="my-5" style={{ opacity: 0.1 }} />

                  {/* Security */}
                  <div className="mb-5">
                    <h5 style={{ fontWeight: 700, marginBottom: "1.2rem", color: "var(--ink)", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <i className="bi bi-shield-lock-fill text-success"></i> Security & Authentication
                    </h5>
                    <div className="d-flex flex-column gap-3">
                      <div className="d-flex justify-content-between align-items-center p-3 rounded-4" style={{ border: "1px solid var(--border2)" }}>
                        <div>
                          <h6 className="fw-bold mb-1">Password</h6>
                          <p className="text-muted small mb-0">Last changed 3 months ago</p>
                        </div>
                        <button 
                          type="button" 
                          className="btn btn-sm btn-outline-dark rounded-pill px-3"
                          onClick={() => alert("🔒 A secure password configuration token has been dispatched to your primary email address.")}
                        >
                          Update Password
                        </button>
                      </div>

                      <div className="p-4 rounded-4" style={{ border: "1px solid var(--border2)", background: twoFactorState === "enabled" ? "rgba(16, 185, 129, 0.03)" : "transparent", transition: "all 0.3s ease" }}>
                        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
                          <div>
                            <h6 className="fw-bold mb-1 d-flex align-items-center gap-2">
                              Two-Factor Authentication (2FA)
                              {twoFactorState === "enabled" && <span className="badge bg-success small">Active</span>}
                            </h6>
                            <p className="text-muted small mb-0">
                              {twoFactorState === "enabled" 
                                ? "Your account is secured with a secondary verification app layer." 
                                : "Add an extra layer of security using an authenticator app."}
                            </p>
                          </div>
                          {twoFactorState === "disabled" && (
                            <button 
                              type="button" 
                              className="btn btn-sm btn-dark rounded-pill px-3" 
                              onClick={() => setTwoFactorState("setup")}
                            >
                              Enable 2FA
                            </button>
                          )}
                          {twoFactorState === "setup" && (
                            <button 
                              type="button" 
                              className="btn btn-sm btn-outline-secondary rounded-pill px-3" 
                              onClick={() => setTwoFactorState("disabled")}
                            >
                              Cancel Setup
                            </button>
                          )}
                          {twoFactorState === "enabled" && (
                            <button 
                              type="button" 
                              className="btn btn-sm btn-outline-danger rounded-pill px-3" 
                              onClick={() => {
                                setTwoFactorState("disabled");
                                setVerificationCode("");
                              }}
                            >
                              Disable 2FA
                            </button>
                          )}
                        </div>

                        {twoFactorState === "setup" && (
                          <div className="mt-4 pt-4 border-top">
                            <div className="alert border-0 p-3 rounded-3 small mb-4" style={{ background: "var(--cream2)", color: "var(--ink2)" }}>
                              <i className="bi bi-info-circle-fill me-2 text-teal"></i>
                              Scan the secure barcode block below or enter the initial private token key into Google Authenticator, Authy, or 1Password.
                            </div>

                            <div className="row g-4 align-items-center mb-4">
                              <div className="col-sm-auto text-center">
                                {/* Visual Barcode Representation */}
                                <div className="p-3 bg-white rounded-4 shadow-sm border mx-auto d-flex flex-column align-items-center justify-content-center" style={{ width: "130px", height: "130px" }}>
                                  <i className="bi bi-qr-code text-dark" style={{ fontSize: "5rem", lineHeight: 1 }}></i>
                                  <span className="small text-muted fw-bold" style={{ fontSize: "0.55rem", marginTop: "-3px" }}>LifeScoreSecure</span>
                                </div>
                              </div>
                              <div className="col-sm">
                                <label className="form-label text-muted small fw-bold text-uppercase" style={{ letterSpacing: "0.5px" }}>Manual Setup Key</label>
                                <div className="d-flex gap-2">
                                  <input 
                                    type="text" 
                                    readOnly 
                                    className="form-control form-control-sm text-monospace bg-light" 
                                    style={{ fontFamily: "monospace", fontSize: "0.85rem" }}
                                    value="LIFESCORE-SECURE-2FA-TOKEN-2026" 
                                  />
                                  <button 
                                    type="button" 
                                    className="btn btn-sm btn-outline-dark px-3 flex-shrink-0"
                                    onClick={() => {
                                      navigator.clipboard?.writeText("LIFESCORE-SECURE-2FA-TOKEN-2026");
                                      setCopiedSecret(true);
                                      setTimeout(() => setCopiedSecret(false), 2000);
                                    }}
                                  >
                                    {copiedSecret ? <><i className="bi bi-check2"></i> Copied</> : "Copy"}
                                  </button>
                                </div>
                                <p className="small text-muted mt-2 mb-0" style={{ fontSize: "0.8rem" }}>Time-based One-Time Password (TOTP) algorithm.</p>
                              </div>
                            </div>

                            <div className="bg-light p-3 rounded-4 border">
                              <label className="form-label text-dark small fw-bold mb-2">Verify Authentication Code</label>
                              <div className="d-flex gap-2" style={{ maxWidth: "300px" }}>
                                <input 
                                  type="text" 
                                  maxLength="6" 
                                  placeholder="000000" 
                                  className="form-control text-center fw-bold bg-white" 
                                  style={{ letterSpacing: "4px", fontSize: "1.1rem" }}
                                  value={verificationCode}
                                  onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ''))}
                                />
                                <button 
                                  type="button" 
                                  className="btn px-4 fw-bold flex-shrink-0"
                                  style={{ background: "var(--teal)", color: "#fff" }}
                                  disabled={verificationCode.length < 6}
                                  onClick={() => {
                                    if (verificationCode.length >= 6) {
                                      setTwoFactorState("enabled");
                                    }
                                  }}
                                >
                                  Activate
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <hr className="my-5" style={{ opacity: 0.1 }} />

                  {/* Danger Zone */}
                  <div className="mb-5 p-4 rounded-4" style={{ border: "1px solid rgba(220,38,38,0.2)", background: "rgba(220,38,38,0.02)" }}>
                    <h5 style={{ fontWeight: 700, marginBottom: "0.5rem", color: "#dc2626" }}>Danger Zone</h5>
                    <p className="text-muted small mb-3">Once you delete your account, there is no going back. All financial data, tracking history, and personalized AI insights will be permanently wiped.</p>
                    <div className="d-flex gap-3">
                      <button type="button" className="btn btn-sm btn-outline-danger fw-bold rounded-pill px-4">Delete Account</button>
                      <button type="button" className="btn btn-sm btn-outline-secondary fw-bold rounded-pill px-4">Download My Data</button>
                    </div>
                  </div>

                  {/* Save Footer */}
                  <div className="d-flex justify-content-end gap-3 sticky-bottom py-3" style={{ background: "var(--card-bg)", borderTop: "1px solid var(--border)" }}>
                    <button type="button" className="btn btn-outline-secondary rounded-pill px-4 fw-bold">Cancel</button>
                    <button type="button" className="btn btn-primary rounded-pill px-5 fw-bold" style={{ background: "var(--accent)", border: "none" }}>Save All Changes</button>
                  </div>

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
