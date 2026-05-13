import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../config/api";
import { Line } from "react-chartjs-2";

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("content");
  const [analytics, setAnalytics] = useState(null);

  // Live database records state
  const [newsItems, setNewsItems] = useState([]);
  const [usersList, setUsersList] = useState([]);
  const [announcements, setAnnouncements] = useState([]);

  // Form states for News
  const [newTitle, setNewTitle] = useState("");
  const [newSummary, setNewSummary] = useState("");
  const [newIcon, setNewIcon] = useState("📈");
  const [newCategory, setNewCategory] = useState("Markets");
  const [newStatus, setNewStatus] = useState("Published");
  const [newLink, setNewLink] = useState("");

  // Form states for Announcement
  const [annMsg, setAnnMsg] = useState("");
  const [annType, setAnnType] = useState("info");
  const [annLink, setAnnLink] = useState("");
  const [annLinkText, setAnnLinkText] = useState("");

  useEffect(() => {
    if (user && user.role === "admin") {
      // Analytics
      fetch(`${API_BASE_URL}/api/analytics`)
        .then(res => res.json())
        .then(data => setAnalytics(data))
        .catch(err => console.error("Failed to fetch analytics", err));

      // Fetch live Admin News
      fetch(`${API_BASE_URL}/api/news/admin`)
        .then(res => res.json())
        .then(data => setNewsItems(Array.isArray(data) ? data : []))
        .catch(err => console.error("Failed to fetch news", err));

      // Fetch live Users
      fetch(`${API_BASE_URL}/api/users`)
        .then(res => res.json())
        .then(data => setUsersList(Array.isArray(data) ? data : []))
        .catch(err => console.error("Failed to fetch users", err));

      // Fetch active Announcements
      fetch(`${API_BASE_URL}/api/announcements`)
        .then(res => res.json())
        .then(data => setAnnouncements(Array.isArray(data) ? data : []))
        .catch(err => console.error("Failed to fetch announcements", err));
    }
  }, [user]);

  if (!user || user.role !== "admin") {
    return (
      <div className="container py-5 text-center">
        <h2>Unauthorized. Admin access required.</h2>
        <button className="btn btn-primary mt-3" onClick={() => navigate("/")}>Go Home</button>
      </div>
    );
  }

  // --- CRUD Actions for News ---
  const handleCreateNews = async (e) => {
    e.preventDefault();
    if (!newTitle || !newSummary) {
      alert("Please provide both headline and summary.");
      return;
    }
    try {
      const res = await fetch(`${API_BASE_URL}/api/news/admin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          icon: newIcon,
          title: newTitle,
          summary: newSummary,
          category: newCategory,
          status: newStatus,
          link: newLink
        })
      });
      const data = await res.json();
      if (res.ok) {
        setNewsItems(prev => [data, ...prev]);
        setNewTitle("");
        setNewSummary("");
        setNewLink("");
        alert("News successfully published to Live Site Database!");
      }
    } catch (err) {
      alert("Error creating news item.");
    }
  };

  const handleToggleNewsStatus = async (item) => {
    const nextStatus = item.status === "Published" ? "Draft" : "Published";
    try {
      const res = await fetch(`${API_BASE_URL}/api/news/${item._id || item.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: nextStatus })
      });
      if (res.ok) {
        const updated = await res.json();
        setNewsItems(prev => prev.map(n => (n._id === item._id || n.id === item.id) ? { ...n, status: updated.status } : n));
      }
    } catch (err) {
      alert("Failed to update status.");
    }
  };

  const handleDeleteNews = async (id) => {
    if (!confirm("Are you sure you want to permanently delete this news item?")) return;
    try {
      const res = await fetch(`${API_BASE_URL}/api/news/${id}`, { method: "DELETE" });
      if (res.ok) {
        setNewsItems(prev => prev.filter(n => n._id !== id && n.id !== id));
      }
    } catch (err) {
      alert("Failed to delete item.");
    }
  };

  // --- Actions for User Management ---
  const handleUpdateUserRole = async (id, currentRole) => {
    const newRole = prompt("Enter new role (standard, premium, admin):", currentRole);
    if (!newRole || newRole === currentRole) return;
    try {
      const res = await fetch(`${API_BASE_URL}/api/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: newRole.toLowerCase() })
      });
      if (res.ok) {
        const updated = await res.json();
        setUsersList(prev => prev.map(u => u._id === id ? { ...u, role: updated.role } : u));
      }
    } catch (err) {
      alert("Failed to update user role.");
    }
  };

  const handleUpdateUserXp = async (id, currentXp) => {
    const newXp = prompt("Enter new total XP amount:", currentXp);
    if (newXp === null || isNaN(newXp)) return;
    try {
      const res = await fetch(`${API_BASE_URL}/api/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ xp: Number(newXp) })
      });
      if (res.ok) {
        const updated = await res.json();
        setUsersList(prev => prev.map(u => u._id === id ? { ...u, xp: updated.xp } : u));
      }
    } catch (err) {
      alert("Failed to update XP.");
    }
  };

  const handleToggleBan = async (userObj) => {
    const nextSuspended = !userObj.isSuspended;
    const actionStr = nextSuspended ? "suspend/ban" : "restore access for";
    if (!confirm(`Are you sure you want to ${actionStr} user ${userObj.firstName} ${userObj.lastName}?`)) return;
    try {
      const res = await fetch(`${API_BASE_URL}/api/users/${userObj._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isSuspended: nextSuspended })
      });
      if (res.ok) {
        const updated = await res.json();
        setUsersList(prev => prev.map(u => u._id === userObj._id ? { ...u, isSuspended: updated.isSuspended } : u));
      }
    } catch (err) {
      alert("Failed to update ban status.");
    }
  };

  // --- CRUD Actions for Announcements ---
  const handleCreateAnnouncement = async (e) => {
    e.preventDefault();
    if (!annMsg) return alert("Announcement message is required.");
    try {
      const res = await fetch(`${API_BASE_URL}/api/announcements`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: annMsg,
          type: annType,
          link: annLink,
          linkText: annLinkText
        })
      });
      if (res.ok) {
        const item = await res.json();
        setAnnouncements(prev => [item, ...prev]);
        setAnnMsg("");
        setAnnLink("");
        setAnnLinkText("");
        alert("Global Announcement broadcast active!");
      }
    } catch (err) {
      alert("Failed to publish announcement.");
    }
  };

  const handleDeleteAnnouncement = async (id) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/announcements/${id}`, { method: "DELETE" });
      if (res.ok) {
        setAnnouncements(prev => prev.filter(a => a._id !== id));
      }
    } catch (err) {
      alert("Failed to disable announcement.");
    }
  };

  // --- Mock Chart Data for Revenue ---
  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Monthly Recurring Revenue ($)",
        data: [120000, 135000, 142000, 158000, 165000, 172000, 183825],
        borderColor: "var(--teal)",
        backgroundColor: "rgba(26, 122, 94, 0.1)",
        tension: 0.4,
        fill: true,
      },
    ],
  };
  const chartOptions = { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } };

  return (
    <div style={{ background: "var(--cream)", minHeight: "100vh", paddingBottom: "3rem" }}>
      
      {/* Top Navbar for Admin */}
      <div style={{ background: "#0f1923", padding: "1rem 2rem", color: "#fff", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, zIndex: 100 }}>
        <div className="d-flex align-items-center gap-3">
          <div style={{ background: "var(--accent)", color: "#fff", padding: "0.4rem 0.6rem", borderRadius: "6px", fontWeight: 900 }}>
            <i className="bi bi-shield-lock-fill me-2"></i>LIFE<span style={{color: "var(--gold)"}}>SCORE</span> ADMIN
          </div>
          <span style={{ opacity: 0.7, fontSize: "0.9rem" }}>v2.4.1 Production</span>
        </div>
        <button className="btn btn-outline-light btn-sm" onClick={() => { logout(); navigate("/"); }}>
          Exit to Main Site
        </button>
      </div>

      <div className="container-fluid px-4 mt-4">
        <div className="row g-4">
          
          {/* Sidebar Nav */}
          <div className="col-lg-2 mb-4 mb-lg-0">
            <div className="d-flex flex-row flex-lg-column gap-2 overflow-auto pb-2 pb-lg-0" style={{ position: "sticky", top: "100px", whiteSpace: "nowrap" }}>
              {[
                { id: "overview", label: "Dashboard", icon: "bi-grid-1x2" },
                { id: "content", label: "News & Articles", icon: "bi-newspaper" },
                { id: "announcements", label: "Announcements Banner", icon: "bi-megaphone" },
                { id: "users", label: "Users & Profiles", icon: "bi-people" },
                { id: "revenue", label: "Subscriptions & Rev", icon: "bi-currency-dollar" },
                { id: "push", label: "Push Notifications", icon: "bi-bell" },
                { id: "newsletters", label: "Newsletters", icon: "bi-envelope-paper" },
                { id: "analytics", label: "Analytics", icon: "bi-bar-chart" },
                { id: "settings", label: "System Config", icon: "bi-sliders" }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    background: activeTab === tab.id ? "var(--card-bg)" : "transparent",
                    border: "1px solid",
                    borderColor: activeTab === tab.id ? "var(--border)" : "transparent",
                    padding: "0.85rem 1rem",
                    borderRadius: "var(--radius-md)",
                    color: activeTab === tab.id ? "var(--accent)" : "var(--ink3)",
                    fontWeight: activeTab === tab.id ? 700 : 600,
                    textAlign: "left",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    transition: "all 0.2s ease",
                    boxShadow: activeTab === tab.id ? "var(--shadow)" : "none",
                  }}
                >
                  <i className={`bi ${tab.icon}`}></i>
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Main Dashboard Area */}
          <div className="col-lg-10">
            
            {/* --- CONTENT MANAGEMENT TAB --- */}
            {activeTab === "content" && (
              <div className="d-flex flex-column gap-4">
                <div className="d-flex justify-content-between align-items-center">
                  <h2 style={{ fontFamily: "var(--serif)", fontWeight: 900, margin: 0 }}>Content Management</h2>
                </div>

                <div className="row g-4">
                  {/* Form to Add New Article/News */}
                  <div className="col-lg-4">
                    <div style={{ background: "var(--card-bg)", padding: "2rem", borderRadius: "var(--radius-md)", border: "1px solid var(--border)", boxShadow: "var(--shadow)" }}>
                      <h5 style={{ fontWeight: 700, marginBottom: "1.5rem" }}>Publish New "News in 30s"</h5>
                      <form onSubmit={handleCreateNews}>
                        <div className="mb-3">
                          <label className="form-label" style={{ fontSize: "0.8rem", fontWeight: 600 }}>Headline / Title</label>
                          <input type="text" className="form-control" value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder="e.g. S&P 500 hits record high" />
                        </div>
                        <div className="mb-3">
                          <label className="form-label" style={{ fontSize: "0.8rem", fontWeight: 600 }}>30-Second Summary</label>
                          <textarea className="form-control" rows="3" value={newSummary} onChange={e => setNewSummary(e.target.value)} placeholder="Write the simplified summary here..."></textarea>
                        </div>
                        <div className="mb-3">
                          <label className="form-label" style={{ fontSize: "0.8rem", fontWeight: 600 }}>Optional Source URL</label>
                          <input type="url" className="form-control" value={newLink} onChange={e => setNewLink(e.target.value)} placeholder="https://..." />
                        </div>
                        <div className="row g-2 mb-4">
                          <div className="col-4">
                            <label className="form-label" style={{ fontSize: "0.8rem", fontWeight: 600 }}>Emoji Icon</label>
                            <input type="text" className="form-control" value={newIcon} onChange={e => setNewIcon(e.target.value)} placeholder="📈" />
                          </div>
                          <div className="col-4">
                            <label className="form-label" style={{ fontSize: "0.8rem", fontWeight: 600 }}>Category</label>
                            <select className="form-select" value={newCategory} onChange={e => setNewCategory(e.target.value)}>
                              <option value="Markets">Markets</option>
                              <option value="Economy">Economy</option>
                              <option value="Crypto">Crypto</option>
                              <option value="Real Estate">Real Estate</option>
                            </select>
                          </div>
                          <div className="col-4">
                            <label className="form-label" style={{ fontSize: "0.8rem", fontWeight: 600 }}>Status</label>
                            <select className="form-select" value={newStatus} onChange={e => setNewStatus(e.target.value)}>
                              <option value="Published">Published</option>
                              <option value="Draft">Draft</option>
                            </select>
                          </div>
                        </div>
                        <button type="submit" className="btn btn-dark w-100">
                          <i className="bi bi-cloud-arrow-up me-2"></i>Publish to Live Site Database
                        </button>
                      </form>
                    </div>
                  </div>

                  {/* Table of Existing News */}
                  <div className="col-lg-8">
                    <div style={{ background: "var(--card-bg)", padding: "2rem", borderRadius: "var(--radius-md)", border: "1px solid var(--border)", boxShadow: "var(--shadow)", height: "100%" }}>
                      <div className="d-flex justify-content-between align-items-center mb-4">
                        <h5 style={{ fontWeight: 700, margin: 0 }}>Live News Feed Database</h5>
                        <span className="badge bg-secondary">{newsItems.length} items loaded</span>
                      </div>
                      <table className="table align-middle">
                        <thead className="table-light">
                          <tr>
                            <th>Icon</th>
                            <th>Headline</th>
                            <th>Status</th>
                            <th>Category</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {newsItems.map(item => (
                            <tr key={item._id || item.id}>
                              <td style={{ fontSize: "1.5rem" }}>{item.icon}</td>
                              <td style={{ fontWeight: 600, fontSize: "0.9rem" }}>{item.title}</td>
                              <td>
                                <span 
                                  className={`badge ${item.status === 'Published' ? 'bg-success' : 'bg-warning text-body'}`}
                                  style={{ cursor: "pointer" }}
                                  onClick={() => handleToggleNewsStatus(item)}
                                  title="Click to toggle Status"
                                >
                                  {item.status} <i className="bi bi-arrow-repeat ms-1"></i>
                                </span>
                              </td>
                              <td style={{ fontSize: "0.85rem", color: "var(--ink3)" }}>{item.category}</td>
                              <td>
                                <button 
                                  className="btn btn-sm btn-outline-secondary me-1"
                                  onClick={() => handleToggleNewsStatus(item)}
                                  title="Toggle Status"
                                >
                                  <i className="bi bi-pencil"></i>
                                </button>
                                <button 
                                  className="btn btn-sm btn-outline-danger"
                                  onClick={() => handleDeleteNews(item._id || item.id)}
                                >
                                  <i className="bi bi-trash"></i>
                                </button>
                              </td>
                            </tr>
                          ))}
                          {newsItems.length === 0 && (
                            <tr>
                              <td colSpan="5" className="text-center py-4 text-muted">No news items found in database.</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* --- ANNOUNCEMENTS BANNER TAB --- */}
            {activeTab === "announcements" && (
              <div className="d-flex flex-column gap-4">
                <h2 style={{ fontFamily: "var(--serif)", fontWeight: 900, margin: 0 }}>Global Announcements Control</h2>
                <div className="row g-4">
                  <div className="col-lg-5">
                    <div style={{ background: "var(--card-bg)", padding: "2rem", borderRadius: "var(--radius-md)", border: "1px solid var(--border)", boxShadow: "var(--shadow)" }}>
                      <h5 style={{ fontWeight: 700, marginBottom: "1.5rem" }}>Broadcast New Site Banner</h5>
                      <form onSubmit={handleCreateAnnouncement}>
                        <div className="mb-3">
                          <label className="form-label fw-bold small">Announcement Message</label>
                          <textarea 
                            className="form-control" 
                            rows="3" 
                            value={annMsg} 
                            onChange={e => setAnnMsg(e.target.value)}
                            placeholder="e.g. Scheduled site maintenance on Saturday at 2 AM EST."
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label fw-bold small">Banner Urgency / Color</label>
                          <select className="form-select" value={annType} onChange={e => setAnnType(e.target.value)}>
                            <option value="info">Blue (Informational)</option>
                            <option value="warning">Yellow (Warning)</option>
                            <option value="success">Green (Success / Promo)</option>
                            <option value="danger">Red (Urgent / Alert)</option>
                          </select>
                        </div>
                        <div className="mb-3">
                          <label className="form-label fw-bold small">Optional Link URL</label>
                          <input 
                            type="text" 
                            className="form-control" 
                            value={annLink} 
                            onChange={e => setAnnLink(e.target.value)}
                            placeholder="/dashboard/budget or https://..."
                          />
                        </div>
                        <div className="mb-4">
                          <label className="form-label fw-bold small">Optional Link Text</label>
                          <input 
                            type="text" 
                            className="form-control" 
                            value={annLinkText} 
                            onChange={e => setAnnLinkText(e.target.value)}
                            placeholder="Learn More"
                          />
                        </div>
                        <button type="submit" className="btn btn-primary w-100 fw-bold">
                          <i className="bi bi-megaphone-fill me-2"></i> Activate Live Banner
                        </button>
                      </form>
                    </div>
                  </div>

                  <div className="col-lg-7">
                    <div style={{ background: "var(--card-bg)", padding: "2rem", borderRadius: "var(--radius-md)", border: "1px solid var(--border)", boxShadow: "var(--shadow)", height: "100%" }}>
                      <h5 style={{ fontWeight: 700, marginBottom: "1.5rem" }}>Active Banners Displayed to Users</h5>
                      <div className="d-flex flex-column gap-3">
                        {announcements.map(ann => (
                          <div 
                            key={ann._id} 
                            style={{ 
                              padding: "1rem", 
                              borderRadius: "var(--radius)", 
                              borderLeft: `4px solid var(--${ann.type === 'danger' ? 'accent' : ann.type === 'warning' ? 'gold' : 'teal'})`,
                              background: "var(--cream2)"
                            }}
                            className="d-flex justify-content-between align-items-center"
                          >
                            <div>
                              <p className="mb-1 fw-bold">{ann.message}</p>
                              {ann.link && (
                                <a href={ann.link} target="_blank" rel="noreferrer" className="small fw-bold text-decoration-underline">
                                  {ann.linkText || ann.link}
                                </a>
                              )}
                            </div>
                            <button className="btn btn-sm btn-outline-danger" onClick={() => handleDeleteAnnouncement(ann._id)}>
                              Disable
                            </button>
                          </div>
                        ))}
                        {announcements.length === 0 && (
                          <p className="text-muted small">No global announcements are currently broadcasting.</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* --- USER MANAGEMENT TAB --- */}
            {activeTab === "users" && (
              <div style={{ background: "var(--card-bg)", padding: "2rem", borderRadius: "var(--radius-md)", boxShadow: "var(--shadow)", border: "1px solid var(--border)", minHeight: "700px" }}>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h2 style={{ fontFamily: "var(--serif)", fontWeight: 900, margin: 0 }}>Live User Database</h2>
                  <div className="d-flex gap-2">
                    <span className="badge bg-secondary align-self-center">{usersList.length} total users</span>
                    <button className="btn btn-outline-success"><i className="bi bi-file-earmark-excel me-1"></i> Export CSV</button>
                  </div>
                </div>
                
                <div className="table-responsive">
                  <table className="table table-hover align-middle border">
                    <thead className="table-light">
                      <tr>
                        <th>ID</th>
                        <th>User Info</th>
                        <th>Role / Tier</th>
                        <th>Total XP</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {usersList.map((u) => (
                        <tr key={u._id} className={u.isSuspended ? "table-danger" : ""}>
                          <td style={{ fontSize: "0.8rem", color: "var(--ink3)", fontFamily: "monospace" }}>{u._id.substring(0,8)}...</td>
                          <td>
                            <div style={{ fontWeight: 600 }}>{u.firstName} {u.lastName}</div>
                            <div style={{ fontSize: "0.75rem", color: "var(--ink3)" }}>{u.email}</div>
                          </td>
                          <td>
                            <span 
                              className={`badge ${u.role === 'premium' ? 'bg-warning text-body' : u.role === 'admin' ? 'bg-danger' : 'bg-secondary'}`}
                              style={{ cursor: "pointer" }}
                              onClick={() => handleUpdateUserRole(u._id, u.role)}
                              title="Click to edit role"
                            >
                              {u.role.toUpperCase()} <i className="bi bi-pencil small ms-1"></i>
                            </span>
                          </td>
                          <td>
                            <strong 
                              style={{ color: "var(--teal)", cursor: "pointer" }}
                              onClick={() => handleUpdateUserXp(u._id, u.xp)}
                              title="Click to edit XP"
                            >
                              {u.xp} <i className="bi bi-pencil small"></i>
                            </strong>
                          </td>
                          <td>
                            {u.isSuspended ? (
                              <span className="badge bg-danger">Suspended</span>
                            ) : (
                              <span className="badge bg-success">Active</span>
                            )}
                          </td>
                          <td>
                            <button 
                              className="btn btn-sm btn-light border me-1"
                              onClick={() => handleUpdateUserRole(u._id, u.role)}
                              title="Edit Role"
                            >
                              Role
                            </button>
                            <button 
                              className="btn btn-sm btn-light border me-1"
                              onClick={() => handleUpdateUserXp(u._id, u.xp)}
                              title="Edit XP"
                            >
                              XP
                            </button>
                            <button 
                              className={`btn btn-sm ${u.isSuspended ? 'btn-success' : 'btn-outline-danger'}`}
                              onClick={() => handleToggleBan(u)}
                              title={u.isSuspended ? "Restore access" : "Suspend User"}
                            >
                              <i className={`bi ${u.isSuspended ? 'bi-check-circle' : 'bi-ban'}`}></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                      {usersList.length === 0 && (
                        <tr>
                          <td colSpan="6" className="text-center py-4 text-muted">No live users fetched from MongoDB yet.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* --- REVENUE MANAGEMENT TAB --- */}
            {activeTab === "revenue" && (
              <div className="d-flex flex-column gap-4">
                <h2 style={{ fontFamily: "var(--serif)", fontWeight: 900, margin: 0 }}>Revenue & Subscriptions</h2>
                
                <div className="row g-4">
                  <div className="col-md-3">
                    <div style={{ background: "var(--card-bg)", padding: "1.5rem", borderRadius: "var(--radius-md)", border: "1px solid var(--border)" }}>
                      <div style={{ color: "var(--ink3)", fontSize: "0.8rem", textTransform: "uppercase", fontWeight: 700 }}>Monthly Recurring Rev (MRR)</div>
                      <div style={{ fontSize: "2rem", fontWeight: 900, fontFamily: "var(--serif)", margin: "0.5rem 0", color: "var(--teal)" }}>$183,825</div>
                      <div style={{ color: "var(--teal)", fontSize: "0.8rem", fontWeight: 600 }}>↑ 8.4% vs last month</div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div style={{ background: "var(--card-bg)", padding: "1.5rem", borderRadius: "var(--radius-md)", border: "1px solid var(--border)" }}>
                      <div style={{ color: "var(--ink3)", fontSize: "0.8rem", textTransform: "uppercase", fontWeight: 700 }}>Active Subscribers</div>
                      <div style={{ fontSize: "2rem", fontWeight: 900, fontFamily: "var(--serif)", margin: "0.5rem 0", color: "var(--ink)" }}>18,401</div>
                      <div style={{ color: "var(--teal)", fontSize: "0.8rem", fontWeight: 600 }}>↑ 320 new this week</div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div style={{ background: "var(--card-bg)", padding: "1.5rem", borderRadius: "var(--radius-md)", border: "1px solid var(--border)" }}>
                      <div style={{ color: "var(--ink3)", fontSize: "0.8rem", textTransform: "uppercase", fontWeight: 700 }}>Churn Rate</div>
                      <div style={{ fontSize: "2rem", fontWeight: 900, fontFamily: "var(--serif)", margin: "0.5rem 0", color: "var(--accent)" }}>2.1%</div>
                      <div style={{ color: "var(--ink3)", fontSize: "0.8rem", fontWeight: 600 }}>Target: &lt; 3.0%</div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div style={{ background: "var(--card-bg)", padding: "1.5rem", borderRadius: "var(--radius-md)", border: "1px solid var(--border)" }}>
                      <div style={{ color: "var(--ink3)", fontSize: "0.8rem", textTransform: "uppercase", fontWeight: 700 }}>Lifetime Value (LTV)</div>
                      <div style={{ fontSize: "2rem", fontWeight: 900, fontFamily: "var(--serif)", margin: "0.5rem 0", color: "var(--ink)" }}>$184.50</div>
                      <div style={{ color: "var(--teal)", fontSize: "0.8rem", fontWeight: 600 }}>↑ $12 since Q1</div>
                    </div>
                  </div>
                </div>

                <div className="row g-4">
                  <div className="col-lg-7">
                    <div style={{ background: "var(--card-bg)", padding: "1.5rem", borderRadius: "var(--radius-md)", border: "1px solid var(--border)", height: "400px", display: "flex", flexDirection: "column" }}>
                      <h5 style={{ fontFamily: "var(--serif)", fontWeight: 700, margin: 0, marginBottom: "1rem" }}>MRR Growth (YTD)</h5>
                      <div style={{ flex: 1, position: "relative" }}>
                        <Line data={chartData} options={chartOptions} />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-5">
                    <div style={{ background: "var(--card-bg)", padding: "1.5rem", borderRadius: "var(--radius-md)", border: "1px solid var(--border)", height: "400px", overflowY: "auto" }}>
                      <h5 style={{ fontFamily: "var(--serif)", fontWeight: 700, marginBottom: "1.5rem" }}>Recent Transactions (Stripe)</h5>
                      <div className="d-flex flex-column gap-3">
                        {[
                          { id: "INV-091", user: "sarah.j@mail.com", amount: "$9.99", status: "Paid", time: "10:42 AM" },
                          { id: "INV-090", user: "mike99@mail.com", amount: "$99.00", status: "Failed", time: "09:15 AM" },
                          { id: "INV-089", user: "alex_new@mail.com", amount: "$9.99", status: "Paid", time: "Yesterday" },
                          { id: "INV-088", user: "robert.c@mail.com", amount: "$99.00", status: "Paid", time: "Yesterday" },
                          { id: "INV-087", user: "lisa.w@mail.com", amount: "$9.99", status: "Refunded", time: "May 3" }
                        ].map((tx, i) => (
                          <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--border)", paddingBottom: "0.75rem" }}>
                            <div>
                              <strong style={{ color: "var(--ink)", fontSize: "0.9rem" }}>{tx.amount}</strong>
                              <div style={{ color: "var(--ink3)", fontSize: "0.75rem" }}>{tx.user} ({tx.id})</div>
                            </div>
                            <div className="text-end">
                              <span className={`badge ${tx.status === 'Paid' ? 'bg-success' : tx.status === 'Failed' ? 'bg-danger' : 'bg-secondary'}`}>{tx.status}</span>
                              <div style={{ color: "var(--ink3)", fontSize: "0.7rem", marginTop: "4px" }}>{tx.time}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* --- PUSH NOTIFICATIONS TAB --- */}
            {activeTab === "push" && (
              <div style={{ background: "var(--card-bg)", padding: "2rem", borderRadius: "var(--radius-md)", boxShadow: "var(--shadow)", border: "1px solid var(--border)", minHeight: "700px" }}>
                <h2 style={{ fontFamily: "var(--serif)", fontWeight: 900, marginBottom: "1.5rem" }}>Push Notification Center</h2>
                <div className="row g-4">
                  <div className="col-lg-6">
                    <div style={{ padding: "1.5rem", border: "1px solid var(--border)", borderRadius: "var(--radius-md)" }}>
                      <h5 style={{ fontWeight: 700, marginBottom: "1rem" }}>Compose New Alert</h5>
                      <div className="mb-3">
                        <label className="form-label" style={{ fontWeight: 600, fontSize: "0.85rem" }}>Audience Segment</label>
                        <select className="form-select" id="pushAudience">
                          <option value="All Active Users">All Active Users</option>
                          <option value="Premium Subscribers Only">Premium Subscribers Only</option>
                          <option value="Inactive Users (>30 days)">Inactive Users (&gt;30 days)</option>
                          <option value="Test Group (Admins)">Test Group (Admins)</option>
                        </select>
                      </div>
                      <div className="mb-3">
                        <label className="form-label" style={{ fontWeight: 600, fontSize: "0.85rem" }}>Notification Title</label>
                        <input type="text" className="form-control" id="pushTitle" placeholder="e.g. Market Alert: S&P 500 hits new high" />
                      </div>
                      <div className="mb-4">
                        <label className="form-label" style={{ fontWeight: 600, fontSize: "0.85rem" }}>Message Body</label>
                        <textarea className="form-control" id="pushMessage" rows="3" placeholder="Brief details about the alert..."></textarea>
                      </div>
                      <button className="btn btn-primary w-100" onClick={async () => {
                        const title = document.getElementById('pushTitle').value;
                        const message = document.getElementById('pushMessage').value;
                        const audience = document.getElementById('pushAudience').value;
                        if (!title || !message) return alert('Title and Message required');
                        try {
                          const res = await fetch(`${API_BASE_URL}/api/notifications`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ title, message, audience })
                          });
                          const data = await res.json();
                          alert(`Notification broadcasted successfully! Active web-push endpoints reached: ${data.subscribersReached || 0}`);
                          document.getElementById('pushTitle').value = '';
                          document.getElementById('pushMessage').value = '';
                        } catch {
                          alert('Failed to send notification.');
                        }
                      }}>
                        <i className="bi bi-send me-2"></i> Send Broadcast Now
                      </button>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <h5 style={{ fontWeight: 700, marginBottom: "1rem" }}>Recent Broadcasts</h5>
                    <div className="table-responsive">
                      <table className="table table-hover align-middle">
                        <thead>
                          <tr>
                            <th style={{ fontSize: "0.85rem", color: "var(--ink3)" }}>TITLE</th>
                            <th style={{ fontSize: "0.85rem", color: "var(--ink3)" }}>AUDIENCE</th>
                            <th style={{ fontSize: "0.85rem", color: "var(--ink3)" }}>OPEN RATE</th>
                            <th style={{ fontSize: "0.85rem", color: "var(--ink3)" }}>DATE</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td style={{ fontWeight: 600, fontSize: "0.9rem" }}>Weekly Digest Available</td>
                            <td style={{ fontSize: "0.85rem" }}>All Users</td>
                            <td><span className="text-success fw-bold">42%</span></td>
                            <td style={{ fontSize: "0.85rem", color: "var(--ink3)" }}>Yesterday</td>
                          </tr>
                          <tr>
                            <td style={{ fontWeight: 600, fontSize: "0.9rem" }}>Pro Tip: Tax Season</td>
                            <td style={{ fontSize: "0.85rem" }}>Premium Only</td>
                            <td><span className="text-success fw-bold">68%</span></td>
                            <td style={{ fontSize: "0.85rem", color: "var(--ink3)" }}>May 1</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* --- NEWSLETTERS TAB --- */}
            {activeTab === "newsletters" && (
              <div style={{ background: "var(--card-bg)", padding: "2rem", borderRadius: "var(--radius-md)", boxShadow: "var(--shadow)", border: "1px solid var(--border)", minHeight: "700px" }}>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h2 style={{ fontFamily: "var(--serif)", fontWeight: 900, margin: 0 }}>Newsletter Campaigns</h2>
                  <button className="btn btn-dark"><i className="bi bi-plus-lg me-2"></i>Create Campaign</button>
                </div>
                
                <div className="row g-4 mb-4">
                  <div className="col-md-4">
                    <div style={{ padding: "1.5rem", border: "1px solid var(--border)", borderRadius: "var(--radius-md)", background: "var(--cream2)" }}>
                      <div style={{ fontSize: "0.8rem", color: "var(--ink3)", textTransform: "uppercase", fontWeight: 700 }}>Total Subscribers</div>
                      <div style={{ fontSize: "2rem", fontWeight: 900, color: "var(--teal)" }}>
                        {analytics ? analytics.totalUsers : "..."}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div style={{ padding: "1.5rem", border: "1px solid var(--border)", borderRadius: "var(--radius-md)", background: "var(--cream2)" }}>
                      <div style={{ fontSize: "0.8rem", color: "var(--ink3)", textTransform: "uppercase", fontWeight: 700 }}>Avg Open Rate</div>
                      <div style={{ fontSize: "2rem", fontWeight: 900, color: "var(--ink)" }}>38.4%</div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div style={{ padding: "1.5rem", border: "1px solid var(--border)", borderRadius: "var(--radius-md)", background: "var(--cream2)" }}>
                      <div style={{ fontSize: "0.8rem", color: "var(--ink3)", textTransform: "uppercase", fontWeight: 700 }}>Avg CTR</div>
                      <div style={{ fontSize: "2rem", fontWeight: 900, color: "var(--ink)" }}>12.1%</div>
                    </div>
                  </div>
                </div>

                <h5 style={{ fontWeight: 700, marginBottom: "1rem" }}>Past Campaigns</h5>
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>CAMPAIGN NAME</th>
                      <th>SENT DATE</th>
                      <th>RECIPIENTS</th>
                      <th>OPEN RATE</th>
                      <th>CTR</th>
                      <th>STATUS</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ fontWeight: 600 }}>May Finance Digest: 5 Moves to Make</td>
                      <td>May 5, 2026</td>
                      <td>124,502</td>
                      <td className="text-success fw-bold">41.2%</td>
                      <td>14.5%</td>
                      <td><span className="badge bg-success">Sent</span></td>
                    </tr>
                    <tr>
                      <td style={{ fontWeight: 600 }}>Crypto Updates & Market Slump</td>
                      <td>Apr 28, 2026</td>
                      <td>123,890</td>
                      <td className="text-success fw-bold">39.8%</td>
                      <td>11.2%</td>
                      <td><span className="badge bg-success">Sent</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {/* --- ANALYTICS TAB --- */}
            {activeTab === "analytics" && (
              <div style={{ background: "var(--card-bg)", padding: "2rem", borderRadius: "var(--radius-md)", boxShadow: "var(--shadow)", border: "1px solid var(--border)", minHeight: "700px" }}>
                <h2 style={{ fontFamily: "var(--serif)", fontWeight: 900, marginBottom: "1.5rem" }}>Platform Analytics</h2>
                
                <div className="row g-4 mb-4">
                  <div className="col-md-6">
                    <div style={{ background: "var(--cream2)", padding: "1.5rem", borderRadius: "var(--radius-md)", border: "1px solid var(--border)" }}>
                      <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--ink3)", textTransform: "uppercase" }}>Registered Users</div>
                      <div style={{ fontSize: "2.5rem", fontWeight: 900, color: "var(--ink)" }}>{analytics ? analytics.totalUsers : "..."}</div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div style={{ background: "var(--cream2)", padding: "1.5rem", borderRadius: "var(--radius-md)", border: "1px solid var(--border)" }}>
                      <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--ink3)", textTransform: "uppercase" }}>Total XP Awarded</div>
                      <div style={{ fontSize: "2.5rem", fontWeight: 900, color: "var(--gold)" }}>{analytics ? analytics.totalPlatformXp.toLocaleString() : "..."} XP</div>
                    </div>
                  </div>
                </div>

                <div className="row g-4 mb-4">
                  <div className="col-lg-8">
                    <div style={{ padding: "1.5rem", border: "1px solid var(--border)", borderRadius: "var(--radius-md)", height: "350px", display: "flex", flexDirection: "column" }}>
                      <h5 style={{ fontWeight: 700, marginBottom: "1rem" }}>Monthly Active Users (MAU) Trend</h5>
                      <div style={{ flex: 1, position: "relative" }}>
                        <Line data={chartData} options={chartOptions} />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div style={{ padding: "1.5rem", border: "1px solid var(--border)", borderRadius: "var(--radius-md)", height: "350px", overflowY: "auto" }}>
                      <h5 style={{ fontWeight: 700, marginBottom: "1rem" }}>Top Articles This Week</h5>
                      <div className="d-flex flex-column gap-3">
                        <div className="d-flex justify-content-between align-items-center border-bottom pb-2">
                          <div style={{ fontSize: "0.9rem", fontWeight: 600 }}>1. The Ultimate 2026 Personal Finance...</div>
                          <strong className="text-teal">45k views</strong>
                        </div>
                        <div className="d-flex justify-content-between align-items-center border-bottom pb-2">
                          <div style={{ fontSize: "0.9rem", fontWeight: 600 }}>2. 15 Legitimate Side Hustles...</div>
                          <strong className="text-teal">32k views</strong>
                        </div>
                        <div className="d-flex justify-content-between align-items-center border-bottom pb-2">
                          <div style={{ fontSize: "0.9rem", fontWeight: 600 }}>3. How Much Do You Actually Need...</div>
                          <strong className="text-teal">28k views</strong>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* --- SYSTEM CONFIG TAB --- */}
            {activeTab === "settings" && (
              <div style={{ background: "var(--card-bg)", padding: "2rem", borderRadius: "var(--radius-md)", boxShadow: "var(--shadow)", border: "1px solid var(--border)" }}>
                <h2 style={{ fontFamily: "var(--serif)", fontWeight: 900, marginBottom: "1.5rem" }}>System Configuration</h2>
                <div className="d-flex flex-column gap-3">
                  <div className="form-check form-switch">
                    <input className="form-check-input" type="checkbox" role="switch" id="cfg1" defaultChecked />
                    <label className="form-check-label fw-bold" htmlFor="cfg1">Enable automated RSS Feed imports for News in 30s</label>
                  </div>
                  <div className="form-check form-switch">
                    <input className="form-check-input" type="checkbox" role="switch" id="cfg2" defaultChecked />
                    <label className="form-check-label fw-bold" htmlFor="cfg2">Enforce strict Content Security Policy (CSP) headers</label>
                  </div>
                  <div className="form-check form-switch">
                    <input className="form-check-input" type="checkbox" role="switch" id="cfg3" />
                    <label className="form-check-label fw-bold" htmlFor="cfg3">Put website into Maintenance Mode</label>
                  </div>
                  <button className="btn btn-dark w-25 mt-3" onClick={() => alert("Settings updated.")}>Save Configuration</button>
                </div>
              </div>
            )}

            {/* Overivew fallback */}
            {activeTab === "overview" && (
              <div className="text-center py-5">
                <i className="bi bi-arrow-left-circle" style={{ fontSize: "3rem", color: "var(--ink3)" }}></i>
                <h3 className="mt-3" style={{ fontFamily: "var(--serif)", color: "var(--ink)" }}>Welcome to the Admin Control Center</h3>
                <p style={{ color: "var(--ink3)" }}>Select a module from the sidebar to begin managing the platform.</p>
              </div>
            )}
            
          </div>
        </div>
      </div>
    </div>
  );
}
