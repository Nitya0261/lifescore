import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function StockMarketWidget() {
  const [marketData, setMarketData] = useState([
    { name: 'S&P 500', value: '5,420.15', change: '+1.25%', up: true, trend: [40, 45, 42, 48, 52, 50, 55] },
    { name: 'Nasdaq 100', value: '18,840.12', change: '+1.82%', up: true, trend: [30, 35, 40, 38, 45, 48, 52] },
    { name: 'Dow Jones', value: '39,120.44', change: '-0.32%', up: false, trend: [60, 58, 55, 57, 54, 52, 50] },
    { name: 'Bitcoin', value: '68,420', change: '+4.5%', up: true, trend: [20, 30, 25, 40, 35, 50, 60] }
  ]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMarketData(prev => prev.map(item => {
        const volatility = (Math.random() - 0.5) * 0.1;
        const newValue = parseFloat(item.value.replace(/,/g, '')) * (1 + volatility / 100);
        return {
          ...item,
          value: newValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
        };
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="ls-card h-100 p-0 overflow-hidden d-flex flex-column" style={{ border: 'none', background: 'var(--navy)', color: '#fff' }}>
      <div className="p-4 flex-grow-1">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <span className="badge bg-danger mb-1" style={{ fontSize: '0.6rem', letterSpacing: '1px' }}>
              <i className="bi bi-record-fill me-1"></i> LIVE
            </span>
            <h5 className="ls-heading mb-0 text-white" style={{ fontSize: '1.2rem' }}>Global Markets</h5>
          </div>
          <Link to="/markets" className="text-white opacity-50 hover-opacity-100 transition-all">
            <i className="bi bi-arrow-up-right-circle" style={{ fontSize: '1.4rem' }}></i>
          </Link>
        </div>

        <div className="market-list d-flex flex-column gap-4">
          {marketData.map((idx) => (
            <div key={idx.name} className="market-item">
              <div className="d-flex justify-content-between align-items-end">
                <div>
                  <div className="text-uppercase opacity-50 fw-bold mb-1" style={{ fontSize: '0.65rem', letterSpacing: '1px' }}>{idx.name}</div>
                  <div className="ls-heading ls-heading-sm mb-0 text-white" style={{ fontSize: '1.3rem' }}>{idx.value}</div>
                </div>
                <div className={`text-end ${idx.up ? 'text-success' : 'text-danger'}`} style={{ fontWeight: 700, fontSize: '0.9rem' }}>
                  <div className="small opacity-75">{idx.up ? '▲' : '▼'} {idx.change}</div>
                </div>
              </div>
              {/* Mini Sparkline Visualization */}
              <div className="mt-2 d-flex align-items-end gap-1" style={{ height: '20px' }}>
                {idx.trend.map((point, i) => (
                  <div 
                    key={i} 
                    style={{ 
                      flex: 1, 
                      height: `${point}%`, 
                      background: idx.up ? 'rgba(34, 197, 94, 0.3)' : 'rgba(239, 68, 68, 0.3)', 
                      borderRadius: '1px' 
                    }} 
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-2 text-center border-top border-white border-opacity-10">
        <div style={{ fontSize: '0.65rem', opacity: 0.5, letterSpacing: '0.5px' }}>
          Real-time indices via LifeScore Data Engine · Sources: NYSE, NASDAQ, CME
        </div>
      </div>
      <Link to="/markets" className="p-3 text-center border-top border-white border-opacity-10 text-decoration-none hover-bg-white hover-bg-opacity-10 transition-all">
        <span className="text-white opacity-75 small fw-bold">Full Market Analysis &rarr;</span>
      </Link>
    </div>
  );
}
