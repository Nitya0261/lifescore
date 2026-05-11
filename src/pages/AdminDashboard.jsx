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

  useEffect(() => {
    if (user && user.role === "admin") {
      fetch(`${API_BASE_URL}/api/analytics`)
        .then(res => res.json())
        .then(data => setAnalytics(data))
        .catch(err => console.error("Failed to fetch analytics", err));
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

  // --- Mock State for "News in 30s" Management ---
  const [newsItems, setNewsItems] = useState([
    { id: 1, icon: "📉", title: "Fed holds interest rates steady", time: "2h ago", status: "Published" },
    { id: 2, icon: "💹", title: "S&P 500 closes at a new all-time high", time: "4h ago", status: "Published" },
    { id: 3, icon: "🏡", title: "Home sales cool for 3rd straight month", time: "5h ago", status: "Draft" },
  ]);

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
                      <form>
                        <div className="mb-3">
                          <label className="form-label" style={{ fontSize: "0.8rem", fontWeight: 600 }}>Headline / Title</label>
                          <input type="text" className="form-control" placeholder="e.g. S&P 500 hits record high" />
                        </div>
                        <div className="mb-3">
                          <label className="form-label" style={{ fontSize: "0.8rem", fontWeight: 600 }}>30-Second Summary</label>
                          <textarea className="form-control" rows="3" placeholder="Write the simplified summary here..."></textarea>
                        </div>
                        <div className="row g-2 mb-4">
                          <div className="col-6">
                            <label className="form-label" style={{ fontSize: "0.8rem", fontWeight: 600 }}>Emoji Icon</label>
                            <input type="text" className="form-control" placeholder="📈" />
                          </div>
                          <div className="col-6">
                            <label className="form-label" style={{ fontSize: "0.8rem", fontWeight: 600 }}>Category Tag</label>
                            <select className="form-select">
                              <option>Markets</option>
                              <option>Economy</option>
                              <option>Crypto</option>
                              <option>Real Estate</option>
                            </select>
                          </div>
                        </div>
                        <button type="button" className="btn btn-dark w-100" onClick={() => alert("Added to mock database!")}>
                          <i className="bi bi-cloud-arrow-up me-2"></i>Publish to Live Site
                        </button>
                      </form>
                    </div>
                  </div>

                  {/* Table of Existing News */}
                  <div className="col-lg-8">
                    <div style={{ background: "var(--card-bg)", padding: "2rem", borderRadius: "var(--radius-md)", border: "1px solid var(--border)", boxShadow: "var(--shadow)", height: "100%" }}>
                      <div className="d-flex justify-content-between align-items-center mb-4">
                        <h5 style={{ fontWeight: 700, margin: 0 }}>Live News Feed Database</h5>
                        <input type="text" className="form-control form-control-sm w-25" placeholder="Search news..." />
                      </div>
                      <table className="table align-middle">
                        <thead className="table-light">
                          <tr>
                            <th>Icon</th>
                            <th>Headline</th>
                            <th>Status</th>
                            <th>Published</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {newsItems.map(item => (
                            <tr key={item.id}>
                              <td style={{ fontSize: "1.5rem" }}>{item.icon}</td>
                              <td style={{ fontWeight: 600, fontSize: "0.9rem" }}>{item.title}</td>
                              <td><span className={`badge ${item.status === 'Published' ? 'bg-success' : 'bg-warning text-body'}`}>{item.status}</span></td>
                              <td style={{ fontSize: "0.8rem", color: "var(--ink3)" }}>{item.time}</td>
                              <td>
                                <button className="btn btn-sm btn-outline-secondary me-1"><i className="bi bi-pencil"></i></button>
                                <button className="btn btn-sm btn-outline-danger"><i className="bi bi-trash"></i></button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* --- USER MANAGEMENT TAB --- */}
            {activeTab === "users" && (
              <div style={{ background: "var(--card-bg)", padding: "2rem", borderRadius: "var(--radius-md)", boxShadow: "var(--shadow)", border: "1px solid var(--border)", minHeight: "700px" }}>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h2 style={{ fontFamily: "var(--serif)", fontWeight: 900, margin: 0 }}>User Database</h2>
                  <div className="d-flex gap-2">
                    <button className="btn btn-outline-success"><i className="bi bi-file-earmark-excel me-1"></i> Export CSV</button>
                    <button className="btn btn-dark"><i className="bi bi-person-plus me-1"></i> Add User</button>
                  </div>
                </div>
                
                <div className="row mb-4">
                  <div className="col-md-3"><input type="text" className="form-control" placeholder="Search by name, email, ID..." /></div>
                  <div className="col-md-2">
                    <select className="form-select">
                      <option>All Roles</option>
                      <option>Premium Only</option>
                      <option>Standard Only</option>
                    </select>
                  </div>
                  <div className="col-md-2">
                    <select className="form-select">
                      <option>Status: Active</option>
                      <option>Status: Suspended</option>
                    </select>
                  </div>
                </div>
                
                <div className="table-responsive">
                  <table className="table table-hover align-middle border">
                    <thead className="table-light">
                      <tr>
                        <th>ID</th>
                        <th>User Info</th>
                        <th>Subscription</th>
                        <th>Total XP</th>
                        <th>Last Login</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { id: "USR-9921", name: "John Doe", email: "john.d@mail.com", role: "Premium ($9.99/mo)", xp: 1240, date: "2 mins ago" },
                        { id: "USR-8832", name: "Emma Smith", email: "emma.s@mail.com", role: "Standard (Free)", xp: 450, date: "1 hr ago" },
                        { id: "USR-7743", name: "Robert Chen", email: "rob.chen@mail.com", role: "Premium ($9.99/mo)", xp: 3200, date: "3 hrs ago" },
                        { id: "USR-6654", name: "Lisa Wong", email: "lisa.w@mail.com", role: "Standard (Free)", xp: 890, date: "Yesterday" },
                        { id: "USR-5565", name: "Marcus Johnson", email: "marcus.j@mail.com", role: "Premium ($99/yr)", xp: 5400, date: "2 days ago" },
                      ].map((u, i) => (
                        <tr key={i}>
                          <td style={{ fontSize: "0.8rem", color: "var(--ink3)" }}>{u.id}</td>
                          <td>
                            <div style={{ fontWeight: 600 }}>{u.name}</div>
                            <div style={{ fontSize: "0.75rem", color: "var(--ink3)" }}>{u.email}</div>
                          </td>
                          <td>
                            <span className={`badge ${u.role.includes('Premium') ? 'bg-warning text-body' : 'bg-secondary'}`}>{u.role}</span>
                          </td>
                          <td><strong style={{ color: "var(--teal)" }}>{u.xp}</strong></td>
                          <td style={{ fontSize: "0.85rem", color: "var(--ink3)" }}>{u.date}</td>
                          <td>
                            <button className="btn btn-sm btn-light border me-1">View</button>
                            <button className="btn btn-sm btn-light border me-1">Edit</button>
                            <button className="btn btn-sm btn-outline-danger"><i className="bi bi-ban"></i></button>
                          </td>
                        </tr>
                      ))}
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
                          await fetch(`${API_BASE_URL}/api/notifications`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ title, message, audience })
                          });
                          alert('Notification broadcasted to backend successfully!');
                          document.getElementById('pushTitle').value = '';
                          document.getElementById('pushMessage').value = '';
                        } catch (e) {
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
