import React, { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../../config/api';
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
      try {
        const res = await fetch(`${API_BASE_URL}/api/budget/${user.id}`);
        const data = await res.json();
        setEntries(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchEntries();
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!category || !amount) return;

    try {
      const res = await fetch(`${API_BASE_URL}/api/budget`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          month: selectedMonth,
          type,
          category,
          amount: Number(amount)
        })
      });
      const newEntry = await res.json();
      setEntries([newEntry, ...entries]);
      setCategory('');
      setAmount('');
      addXp(15, "Logged a budget entry!");
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`${API_BASE_URL}/api/budget/${id}`, { method: 'DELETE' });
      setEntries(entries.filter(e => e._id !== id));
    } catch (err) {
      console.error(err);
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
      <div className="row mb-4 align-items-center">
        <div className="col-md-6">
          <h2 className="fw-bold mb-1" style={{ fontFamily: "var(--serif)", color: "var(--ink)" }}>Budget Tracker</h2>
          <p className="text-muted">Track income, monitor expenses, and maximize your savings rate.</p>
        </div>
        <div className="col-md-6 text-md-end">
          <input 
            type="month" 
            className="form-control d-inline-block w-auto" 
            value={selectedMonth} 
            onChange={e => setSelectedMonth(e.target.value)}
          />
        </div>
      </div>

      {/* Top Metrics Cards */}
      <div className="row g-4 mb-4">
        <div className="col-md-3 col-6">
          <div className="card border-0 p-3 h-100" style={{ background: "rgba(56, 178, 172, 0.1)", borderRadius: "var(--radius-lg)" }}>
            <div className="text-muted small fw-bold text-uppercase mb-1">Income</div>
            <h3 className="mb-0 text-teal">${totalIncome.toLocaleString()}</h3>
          </div>
        </div>
        <div className="col-md-3 col-6">
          <div className="card border-0 p-3 h-100" style={{ background: "rgba(239, 68, 68, 0.1)", borderRadius: "var(--radius-lg)" }}>
            <div className="text-muted small fw-bold text-uppercase mb-1">Expenses</div>
            <h3 className="mb-0 text-danger">${totalExpense.toLocaleString()}</h3>
          </div>
        </div>
        <div className="col-md-3 col-6">
          <div className="card border-0 p-3 h-100" style={{ background: "var(--card-bg)", boxShadow: "var(--shadow)", borderRadius: "var(--radius-lg)" }}>
            <div className="text-muted small fw-bold text-uppercase mb-1">Savings</div>
            <h3 className="mb-0" style={{ color: "var(--ink)" }}>${savings.toLocaleString()}</h3>
          </div>
        </div>
        <div className="col-md-3 col-6">
          <div className="card border-0 p-3 h-100" style={{ background: "var(--ink)", borderRadius: "var(--radius-lg)" }}>
            <div className="text-muted small fw-bold text-uppercase mb-1" style={{ color: "rgba(255,255,255,0.7)" }}>Savings Rate</div>
            <h3 className="mb-0 text-white">{savingsRate}%</h3>
          </div>
        </div>
      </div>

      <div className="row g-4">
        {/* Left Col: Entry Form & List */}
        <div className="col-lg-5">
          <div className="card border-0 mb-4" style={{ background: "var(--card-bg)", boxShadow: "var(--shadow)", borderRadius: "var(--radius-lg)" }}>
            <div className="card-body p-4">
              <h5 className="fw-bold mb-3" style={{ color: "var(--ink)" }}>Add Entry</h5>
              <form onSubmit={handleSubmit}>
                <div className="row g-2 mb-3">
                  <div className="col-4">
                    <select className="form-select" value={type} onChange={e => setType(e.target.value)}>
                      <option value="expense">Expense</option>
                      <option value="income">Income</option>
                    </select>
                  </div>
                  <div className="col-8">
                    <input type="text" className="form-control" placeholder={type === 'expense' ? "e.g. Groceries, Rent" : "e.g. Salary, Side Hustle"} value={category} onChange={e => setCategory(e.target.value)} required />
                  </div>
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text">$</span>
                  <input type="number" className="form-control" placeholder="0.00" min="0" step="0.01" value={amount} onChange={e => setAmount(e.target.value)} required />
                  <button className="btn text-white fw-bold" style={{ background: "var(--teal)" }} type="submit">Add</button>
                </div>
              </form>
            </div>
          </div>

          <div className="card border-0" style={{ background: "var(--card-bg)", boxShadow: "var(--shadow)", borderRadius: "var(--radius-lg)", maxHeight: "400px", overflowY: "auto" }}>
            <div className="card-body p-4">
              <h5 className="fw-bold mb-3" style={{ color: "var(--ink)" }}>Transactions</h5>
              {monthEntries.length === 0 ? (
                <p className="text-muted small">No entries for this month yet.</p>
              ) : (
                <ul className="list-group list-group-flush">
                  {monthEntries.map(entry => (
                    <li key={entry._id} className="list-group-item d-flex justify-content-between align-items-center px-0 bg-transparent border-light">
                      <div>
                        <div className="fw-bold" style={{ fontSize: "0.9rem", color: "var(--ink)" }}>{entry.category}</div>
                        <small className="text-muted">{new Date(entry.createdAt).toLocaleDateString()}</small>
                      </div>
                      <div className="d-flex align-items-center gap-3">
                        <span className={`fw-bold ${entry.type === 'income' ? 'text-teal' : 'text-danger'}`}>
                          {entry.type === 'income' ? '+' : '-'}${entry.amount.toLocaleString()}
                        </span>
                        <button className="btn btn-link text-muted p-0" onClick={() => handleDelete(entry._id)}>
                          <i className="bi bi-trash"></i>
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
        <div className="col-lg-7">
          <div className="card border-0 mb-4" style={{ background: "var(--card-bg)", boxShadow: "var(--shadow)", borderRadius: "var(--radius-lg)" }}>
            <div className="card-body p-4">
              <h5 className="fw-bold mb-4" style={{ color: "var(--ink)" }}>Cash Flow ({new Date(selectedMonth + '-01').toLocaleString('default', { month: 'long' })})</h5>
              <div style={{ height: "250px" }}>
                <Bar 
                  data={barData} 
                  options={{ 
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false } },
                    scales: { y: { beginAtZero: true } }
                  }} 
                />
              </div>
            </div>
          </div>

          <div className="card border-0" style={{ background: "var(--card-bg)", boxShadow: "var(--shadow)", borderRadius: "var(--radius-lg)" }}>
            <div className="card-body p-4">
              <h5 className="fw-bold mb-4" style={{ color: "var(--ink)" }}>6-Month Savings Trend</h5>
              <div style={{ height: "250px" }}>
                <Line 
                  data={trendData} 
                  options={{ 
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false } },
                    scales: { y: { beginAtZero: true } }
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
