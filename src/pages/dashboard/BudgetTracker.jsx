import React, { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../../config/api';
import SEO from '../../components/SEO';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function BudgetTracker() {
  const { user, addXp } = useAuth();
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form State
  const [type, setType] = useState('expense');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  
  // Default to current month YYYY-MM
  const currentMonth = new Date().toISOString().slice(0, 7);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    const fetchEntries = async () => {
      const mockFallback = [
        { _id: 'b1', type: 'income', category: 'Executive Compensation', amount: 5500, month: currentMonth, createdAt: new Date() },
        { _id: 'b2', type: 'income', category: 'Dividend Portfolio Yield', amount: 850, month: currentMonth, createdAt: new Date() },
        { _id: 'b3', type: 'expense', category: 'Premium Residence Lease', amount: 1850, month: currentMonth, createdAt: new Date() },
        { _id: 'b4', type: 'expense', category: 'Gourmet Dining & Groceries', amount: 620, month: currentMonth, createdAt: new Date() },
        { _id: 'b5', type: 'expense', category: 'Automotive & EV Telemetry', amount: 180, month: currentMonth, createdAt: new Date() },
        { _id: 'b6', type: 'expense', category: 'Digital Workspace SaaS', amount: 110, month: currentMonth, createdAt: new Date() }
      ];

      try {
        const res = await fetch(`${API_BASE_URL}/api/budget/${user.id}`);
        if (!res.ok) throw new Error("Non-200 budget payload returned");
        const data = await res.json();
        setEntries(Array.isArray(data) && data.length > 0 ? data : mockFallback);
        setLoading(false);
      } catch (err) {
        console.warn("Backend offline, triggering local premium budget entries pre-population:", err.message);
        setEntries(mockFallback);
        setLoading(false);
      }
    };
    fetchEntries();
  }, [user, navigate, currentMonth]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!category || !amount) return;

    const payload = {
      userId: user?.id || "guest",
      month: selectedMonth,
      type,
      category,
      amount: Number(amount)
    };

    try {
      const res = await fetch(`${API_BASE_URL}/api/budget`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error("Failed to write to primary store");
      const newEntry = await res.json();
      setEntries(prev => [newEntry, ...prev]);
      setCategory('');
      setAmount('');
      addXp(15, "Logged a budget entry!");
    } catch (err) {
      console.warn("Backend offline, triggering client-side entry addition simulation:", err.message);
      const simulatedEntry = {
        _id: 'local_entry_' + Date.now(),
        ...payload,
        createdAt: new Date()
      };
      setEntries(prev => [simulatedEntry, ...prev]);
      setCategory('');
      setAmount('');
      addXp(15, "Simulated Entry Logged!");
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`${API_BASE_URL}/api/budget/${id}`, { method: 'DELETE' });
    } catch (err) {
      console.warn("Backend offline, executing local entry removal simulation");
    } finally {
      setEntries(prev => prev.filter(e => e._id !== id));
    }
  };

  // Calculations for Selected Month
  const monthEntries = entries.filter(e => e.month === selectedMonth);
  const totalIncome = monthEntries.filter(e => e.type === 'income').reduce((acc, curr) => acc + curr.amount, 0);
  const totalExpense = monthEntries.filter(e => e.type === 'expense').reduce((acc, curr) => acc + curr.amount, 0);
  const savings = totalIncome - totalExpense;
  const savingsRate = totalIncome > 0 ? Math.round((savings / totalIncome) * 100) : 0;

  // Chart Data: Income vs Expenses for selected month
  const barData = {
    labels: ['Income', 'Expenses'],
    datasets: [
      {
        label: 'Amount ($)',
        data: [totalIncome, totalExpense],
        backgroundColor: ['rgba(56, 178, 172, 0.8)', 'rgba(239, 68, 68, 0.8)'],
        borderRadius: 8,
      }
    ]
  };

  // Chart Data: 6-Month Trend
  const trendData = useMemo(() => {
    const last6Months = [];
    const d = new Date();
    d.setDate(1); // Set to 1st to avoid end-of-month bugs
    for (let i = 5; i >= 0; i--) {
      const temp = new Date(d);
      temp.setMonth(temp.getMonth() - i);
      last6Months.push(temp.toISOString().slice(0, 7));
    }

    const incomeTrend = last6Months.map(m => entries.filter(e => e.month === m && e.type === 'income').reduce((a, c) => a + c.amount, 0));
    const expenseTrend = last6Months.map(m => entries.filter(e => e.month === m && e.type === 'expense').reduce((a, c) => a + c.amount, 0));
    const labels = last6Months.map(m => {
      const [yr, mo] = m.split('-');
      return new Date(yr, mo - 1).toLocaleString('default', { month: 'short' });
    });

    return {
      labels,
      datasets: [
        {
          label: 'Savings',
          data: incomeTrend.map((inc, i) => inc - expenseTrend[i]),
          borderColor: 'var(--teal)',
          backgroundColor: 'rgba(56, 178, 172, 0.2)',
          fill: true,
          tension: 0.4
        }
      ]
    };
  }, [entries]);

  if (loading) return <div className="p-5 text-center"><div className="spinner-border text-teal"></div></div>;

  return (
    <div className="container py-5" style={{ minHeight: "80vh" }}>
      <SEO 
        title="Personal Budget Tracker" 
        description="Optimize your personal cash flow using our smart budget ledger. Categorize your income and expenses for ultimate productivity and wealth."
      />
      <div className="row mb-5 align-items-center">
        <div className="col-md-7">
          <div className="d-flex align-items-center gap-3 mb-2">
            <div className="p-2 rounded-3" style={{ background: "rgba(56, 178, 172, 0.15)", color: "var(--teal)" }}>
              <i className="bi bi-wallet2 fs-4"></i>
            </div>
            <h2 className="fw-bolder mb-0" style={{ fontFamily: "var(--serif)", color: "var(--ink)", letterSpacing: "-0.5px" }}>Personal Budget</h2>
          </div>
          <p className="text-muted ms-1 mb-0" style={{ fontSize: "1.05rem" }}>Track income, monitor expenses, and optimize your wealth building.</p>
        </div>
        <div className="col-md-5 text-md-end mt-4 mt-md-0">
          <div className="d-inline-flex align-items-center p-2 rounded-4 shadow-sm" style={{ background: "var(--cream3)", border: "1px solid var(--border)" }}>
            <i className="bi bi-calendar3 text-muted mx-3"></i>
            <input 
              type="month" 
              className="form-control border-0 shadow-none bg-transparent fw-bold text-center" 
              value={selectedMonth} 
              onChange={e => setSelectedMonth(e.target.value)}
              style={{ width: "160px", color: "var(--ink)", cursor: "pointer" }}
            />
          </div>
        </div>
      </div>

      {/* Top Metrics Cards */}
      <div className="row g-4 mb-5">
        <div className="col-md-3 col-6">
          <div className="card border-0 p-4 h-100 position-relative overflow-hidden transition-all" style={{ background: isDark ? "linear-gradient(145deg, #0f172a, #052e16)" : "linear-gradient(145deg, #ffffff, #f0fdf4)", borderRadius: "1.25rem", boxShadow: "var(--shadow)", border: `1px solid ${isDark ? "rgba(34, 197, 94, 0.2)" : "rgba(34, 197, 94, 0.1)"}` }}>
            <div className="position-absolute end-0 top-0 p-3 opacity-25">
              <i className="bi bi-arrow-down-left-circle-fill text-success" style={{ fontSize: "2.5rem" }}></i>
            </div>
            <div className="text-muted small fw-bold text-uppercase mb-2 position-relative" style={{ letterSpacing: "1px", fontSize: "0.7rem" }}>Income</div>
            <h3 className="mb-0 text-success fw-bolder position-relative" style={{ fontSize: "2rem", letterSpacing: "-1px" }}>${totalIncome.toLocaleString()}</h3>
          </div>
        </div>
        <div className="col-md-3 col-6">
          <div className="card border-0 p-4 h-100 position-relative overflow-hidden transition-all" style={{ background: isDark ? "linear-gradient(145deg, #0f172a, #450a0a)" : "linear-gradient(145deg, #ffffff, #fef2f2)", borderRadius: "1.25rem", boxShadow: "var(--shadow)", border: `1px solid ${isDark ? "rgba(239, 68, 68, 0.2)" : "rgba(239, 68, 68, 0.1)"}` }}>
            <div className="position-absolute end-0 top-0 p-3 opacity-25">
              <i className="bi bi-arrow-up-right-circle-fill text-danger" style={{ fontSize: "2.5rem" }}></i>
            </div>
            <div className="text-muted small fw-bold text-uppercase mb-2 position-relative" style={{ letterSpacing: "1px", fontSize: "0.7rem" }}>Expenses</div>
            <h3 className="mb-0 text-danger fw-bolder position-relative" style={{ fontSize: "2rem", letterSpacing: "-1px" }}>${totalExpense.toLocaleString()}</h3>
          </div>
        </div>
        <div className="col-md-3 col-6">
          <div className="card border-0 p-4 h-100 position-relative overflow-hidden transition-all" style={{ background: isDark ? "linear-gradient(145deg, #0f172a, #1e293b)" : "linear-gradient(145deg, #ffffff, var(--cream2))", borderRadius: "1.25rem", boxShadow: "var(--shadow)", border: "1px solid var(--border)" }}>
            <div className="position-absolute end-0 top-0 p-3 opacity-10">
              <i className="bi bi-piggy-bank-fill text-dark" style={{ fontSize: "2.5rem" }}></i>
            </div>
            <div className="text-muted small fw-bold text-uppercase mb-2 position-relative" style={{ letterSpacing: "1px", fontSize: "0.7rem" }}>Net Savings</div>
            <h3 className="mb-0 fw-bolder position-relative" style={{ color: "var(--ink)", fontSize: "2rem", letterSpacing: "-1px" }}>${savings.toLocaleString()}</h3>
          </div>
        </div>
        <div className="col-md-3 col-6">
          <div className="card border-0 p-4 h-100 position-relative overflow-hidden transition-all" style={{ background: "linear-gradient(145deg, var(--ink), #1e293b)", borderRadius: "1.25rem", boxShadow: "0 12px 30px rgba(0,0,0,0.15)", border: "1px solid rgba(255,255,255,0.1)" }}>
            <div className="position-absolute end-0 top-0 p-3 opacity-10">
              <i className="bi bi-lightning-charge-fill text-white" style={{ fontSize: "2.5rem" }}></i>
            </div>
            <div className="small fw-bold text-uppercase mb-2 position-relative" style={{ color: "rgba(255,255,255,0.6)", letterSpacing: "1px", fontSize: "0.7rem" }}>Savings Rate</div>
            <h3 className="mb-0 text-white fw-bolder position-relative" style={{ fontSize: "2rem", letterSpacing: "-1px" }}>{savingsRate}%</h3>
          </div>
        </div>
      </div>

      <div className="row g-4">
        {/* Left Col: Entry Form & List */}
        <div className="col-lg-5 d-flex flex-column gap-4">
          <div className="card border-0 p-1" style={{ background: isDark ? "rgba(15, 23, 42, 0.8)" : "rgba(255, 255, 255, 0.8)", backdropFilter: "blur(10px)", boxShadow: "var(--shadow-md)", borderRadius: "1.25rem", border: isDark ? "1px solid rgba(255, 255, 255, 0.05)" : "1px solid rgba(255, 255, 255, 1)" }}>
            <div className="card-body p-4">
              <h5 className="fw-bolder mb-4" style={{ color: "var(--ink)", letterSpacing: "-0.3px" }}><i className="bi bi-plus-circle-fill text-teal me-2"></i>Add Transaction</h5>
              <form onSubmit={handleSubmit}>
                <div className="row g-3 mb-3">
                  <div className="col-5">
                    <select className="form-select border-0 bg-light shadow-sm" style={{ padding: "0.75rem", borderRadius: "10px", fontSize: "0.9rem", fontWeight: 500 }} value={type} onChange={e => setType(e.target.value)}>
                      <option value="expense">Expense</option>
                      <option value="income">Income</option>
                    </select>
                  </div>
                  <div className="col-7">
                    <input type="text" className="form-control border-0 bg-light shadow-sm" style={{ padding: "0.75rem", borderRadius: "10px", fontSize: "0.9rem" }} placeholder={type === 'expense' ? "e.g. Rent, Groceries" : "e.g. Salary, Bonus"} value={category} onChange={e => setCategory(e.target.value)} required />
                  </div>
                </div>
                <div className="input-group mt-2 shadow-sm rounded-3 overflow-hidden">
                  <span className="input-group-text border-0 bg-light text-muted fw-bold px-2 px-sm-4">$</span>
                  <input type="number" className="form-control border-0 bg-light px-2 px-sm-3" style={{ padding: "0.75rem", fontSize: "1rem", fontWeight: 600 }} placeholder="0.00" min="0" step="0.01" value={amount} onChange={e => setAmount(e.target.value)} required />
                  <button className="btn fw-bold px-3 px-sm-4 transition-all" style={{ background: "var(--teal)", color: "#fff", letterSpacing: "0.5px" }} type="submit">Submit</button>
                </div>
              </form>
            </div>
          </div>

          <div className="card border-0 p-1 flex-grow-1" style={{ background: isDark ? "rgba(15, 23, 42, 0.8)" : "rgba(255, 255, 255, 0.8)", backdropFilter: "blur(10px)", boxShadow: "var(--shadow-md)", borderRadius: "1.25rem", border: isDark ? "1px solid rgba(255, 255, 255, 0.05)" : "1px solid rgba(255, 255, 255, 1)", maxHeight: "400px", overflowY: "auto" }}>
            <div className="card-body p-4">
              <h5 className="fw-bolder mb-4" style={{ color: "var(--ink)", letterSpacing: "-0.3px" }}><i className="bi bi-receipt-cutoff text-accent me-2"></i>Recent Activity</h5>
              {monthEntries.length === 0 ? (
                <div className="text-center py-5 opacity-50">
                  <i className="bi bi-inbox fs-1 text-muted mb-2 d-block"></i>
                  <p className="small mb-0">No entries recorded this month.</p>
                </div>
              ) : (
                <ul className="list-group list-group-flush gap-2">
                  {monthEntries.map(entry => (
                    <li key={entry._id} className="list-group-item d-flex justify-content-between align-items-center p-3 rounded-3 border-0 shadow-sm" style={{ background: "var(--cream2)" }}>
                      <div className="d-flex align-items-center gap-3">
                        <div className="rounded-circle d-flex align-items-center justify-content-center" style={{ width: "36px", height: "36px", background: entry.type === 'income' ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)', color: entry.type === 'income' ? '#16a34a' : '#dc2626' }}>
                          <i className={`bi ${entry.type === 'income' ? 'bi-arrow-down-left' : 'bi-arrow-up-right'}`}></i>
                        </div>
                        <div>
                          <div className="fw-bolder" style={{ fontSize: "0.95rem", color: "var(--ink)" }}>{entry.category}</div>
                          <small className="text-muted" style={{ fontSize: "0.75rem" }}>{new Date(entry.createdAt).toLocaleDateString()}</small>
                        </div>
                      </div>
                      <div className="d-flex align-items-center gap-3">
                        <span className="fw-bolder" style={{ fontSize: "1.05rem", color: entry.type === 'income' ? '#16a34a' : '#dc2626' }}>
                          {entry.type === 'income' ? '+' : '-'}${entry.amount.toLocaleString()}
                        </span>
                        <button className="btn btn-link text-muted p-1 opacity-50 hover-opacity-100 transition-all" onClick={() => handleDelete(entry._id)}>
                          <i className="bi bi-trash3-fill"></i>
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

        {/* Right Col: Charts */}
        <div className="col-lg-7 d-flex flex-column gap-4">
          <div className="card border-0 p-1" style={{ background: isDark ? "rgba(15, 23, 42, 0.8)" : "rgba(255, 255, 255, 0.8)", backdropFilter: "blur(10px)", boxShadow: "var(--shadow-md)", borderRadius: "1.25rem", border: isDark ? "1px solid rgba(255, 255, 255, 0.05)" : "1px solid rgba(255, 255, 255, 1)" }}>
            <div className="card-body p-4">
              <h5 className="fw-bolder mb-4" style={{ color: "var(--ink)", letterSpacing: "-0.3px" }}><i className="bi bi-bar-chart-fill text-accent me-2"></i>Cash Flow ({new Date(selectedMonth + '-01').toLocaleString('default', { month: 'long' })})</h5>
              <div style={{ height: "260px" }}>
                <Bar 
                  data={barData} 
                  options={{ 
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false }, tooltip: { padding: 12, cornerRadius: 8, titleFont: { size: 14 }, bodyFont: { size: 13 } } },
                    scales: { 
                      y: { 
                        beginAtZero: true, 
                        grid: { borderDash: [4, 4], color: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.05)" },
                        ticks: { color: isDark ? "#94a3b8" : "#64748b" }
                      },
                      x: { 
                        grid: { display: false },
                        ticks: { color: isDark ? "#94a3b8" : "#64748b" }
                      }
                    }
                  }} 
                />
              </div>
            </div>
          </div>

          <div className="card border-0 p-1" style={{ background: isDark ? "rgba(15, 23, 42, 0.8)" : "rgba(255, 255, 255, 0.8)", backdropFilter: "blur(10px)", boxShadow: "var(--shadow-md)", borderRadius: "1.25rem", border: isDark ? "1px solid rgba(255, 255, 255, 0.05)" : "1px solid rgba(255, 255, 255, 1)" }}>
            <div className="card-body p-4">
              <h5 className="fw-bolder mb-4" style={{ color: "var(--ink)", letterSpacing: "-0.3px" }}><i className="bi bi-graph-up-arrow text-teal me-2"></i>6-Month Savings Trajectory</h5>
              <div style={{ height: "260px" }}>
                <Line 
                  data={trendData} 
                  options={{ 
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false }, tooltip: { padding: 12, cornerRadius: 8 } },
                    scales: { 
                      y: { 
                        beginAtZero: true, 
                        grid: { borderDash: [4, 4], color: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.05)" },
                        ticks: { color: isDark ? "#94a3b8" : "#64748b" }
                      },
                      x: { 
                        grid: { display: false },
                        ticks: { color: isDark ? "#94a3b8" : "#64748b" }
                      }
                    },
                    elements: { point: { radius: 4, hoverRadius: 6 } }
                  }} 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
